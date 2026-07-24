import { NextRequest, NextResponse } from 'next/server';
import { getEnv, hasSecret } from '@/lib/backend';
import { userIdFromSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

type GoogleTokenResponse = {
  access_token?: string;
  id_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

type GoogleUserInfo = {
  sub?: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
};

function decodeState(state: string | null) {
  if (!state) return { next: '/generate', plan: 'free', nonce: '' };
  try {
    const normalized = state.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4);
    const json = atob(padded);
    const parsed = JSON.parse(json) as { next?: string; plan?: string; nonce?: string };
    return {
      next: parsed.next && parsed.next.startsWith('/') ? parsed.next : '/generate',
      plan: parsed.plan || 'free',
      nonce: parsed.nonce || '',
    };
  } catch {
    return { next: '/generate', plan: 'free', nonce: '' };
  }
}

function safeNext(next: string) {
  return next.startsWith('/') && !next.startsWith('//') ? next : '/generate';
}

async function signSession(payload: Record<string, unknown>, secret: string) {
  const body = btoa(JSON.stringify(payload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sigBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
  const sigBytes = new Uint8Array(sigBuffer);
  let binary = '';
  sigBytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  const sig = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  return `${body}.${sig}`;
}

export async function GET(request: NextRequest) {
  const env = getEnv();
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const savedState = request.cookies.get('promptseen_oauth_state')?.value;
  const { next, plan } = decodeState(state);
  const destination = safeNext(next);

  if (!code || !state || !savedState || state !== savedState) {
    return NextResponse.redirect(new URL(`/app/sign-in?error=oauth_state&next=${encodeURIComponent(destination)}`, url.origin));
  }

  if (!hasSecret(env.GOOGLE_CLIENT_ID) || !hasSecret(env.GOOGLE_CLIENT_SECRET)) {
    return NextResponse.redirect(new URL(`/app/sign-in?error=oauth_not_configured&next=${encodeURIComponent(destination)}`, url.origin));
  }

  const redirectUri = env.GOOGLE_REDIRECT_URI || `${url.origin}/api/auth/callback/google`;
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID!,
      client_secret: env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  const token = await tokenResponse.json() as GoogleTokenResponse;
  if (!tokenResponse.ok || !token.access_token) {
    return NextResponse.redirect(new URL(`/app/sign-in?error=google_token&next=${encodeURIComponent(destination)}`, url.origin));
  }

  const userResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: { authorization: `Bearer ${token.access_token}` },
  });
  const user = await userResponse.json() as GoogleUserInfo;
  if (!userResponse.ok || !user.email) {
    return NextResponse.redirect(new URL(`/app/sign-in?error=google_user&next=${encodeURIComponent(destination)}`, url.origin));
  }

  const sessionPayload = {
    provider: 'google',
    sub: user.sub,
    email: user.email,
    name: user.name,
    picture: user.picture,
    plan,
    iat: Date.now(),
  };
  const session = await signSession(sessionPayload, env.SESSION_SECRET || env.GOOGLE_CLIENT_SECRET!);

  if (env.DB) {
    const userId = userIdFromSession(sessionPayload);
    await env.DB.prepare(`
      INSERT INTO users (id, email, name, auth_provider, google_sub, created_at, updated_at)
      VALUES (?, ?, ?, 'google', ?, datetime('now'), datetime('now'))
      ON CONFLICT(id) DO UPDATE SET email = excluded.email, name = excluded.name, auth_provider = 'google', google_sub = excluded.google_sub, updated_at = datetime('now')
    `).bind(userId, user.email, user.name || user.email, user.sub || null).run();
    await env.DB.prepare(`
      INSERT INTO entitlements (user_id, plan, credits_remaining, source, created_at, updated_at)
      VALUES (?, ?, 1, 'google_oauth', datetime('now'), datetime('now'))
      ON CONFLICT(user_id) DO NOTHING
    `).bind(userId, plan || 'free').run();
  }

  const response = NextResponse.redirect(new URL(destination, url.origin));
  response.cookies.delete('promptseen_oauth_state');
  response.cookies.set('promptseen_session', session, { path: '/', httpOnly: true, sameSite: 'lax', secure: true, maxAge: 60 * 60 * 24 * 30 });
  response.cookies.set('promptseen_signed_in', 'yes', { path: '/', sameSite: 'lax', secure: true, maxAge: 60 * 60 * 24 * 30 });
  response.cookies.set('promptseen_plan', plan, { path: '/', sameSite: 'lax', secure: true, maxAge: 60 * 60 * 24 * 30 });
  return response;
}
