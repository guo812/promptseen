import { NextRequest, NextResponse } from 'next/server';
import { getEnv, hasSecret } from '@/lib/backend';
import { userIdFromSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

function safeNext(next: string | null) {
  if (!next || !next.startsWith('/') || next.startsWith('//')) return '/generate';
  return next;
}

function base64Url(value: string) {
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function signSession(payload: Record<string, unknown>, secret: string) {
  const body = base64Url(JSON.stringify(payload));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sigBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
  const sigBytes = new Uint8Array(sigBuffer);
  let binary = '';
  sigBytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return `${body}.${btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')}`;
}

export async function GET(request: NextRequest) {
  const env = getEnv();
  const url = new URL(request.url);
  const plan = url.searchParams.get('plan') || 'free';
  const destination = safeNext(url.searchParams.get('next'));
  const secret = env.SESSION_SECRET || env.GOOGLE_CLIENT_SECRET;

  if (!hasSecret(secret)) {
    return NextResponse.json({ ok: false, error: 'Session sign-in is not configured.' }, { status: 503 });
  }

  const existing = request.cookies.get('promptseen_guest_id')?.value;
  const guestId = existing && /^[a-z0-9_-]{8,80}$/i.test(existing) ? existing : crypto.randomUUID().replace(/-/g, '').slice(0, 20);
  const sessionPayload = {
    provider: 'promptseen_free',
    sub: `free_${guestId}`,
    email: `free-${guestId}@promptseen.local`,
    name: 'Free plan user',
    plan,
    iat: Date.now(),
  };
  const session = await signSession(sessionPayload, secret!);

  if (env.DB) {
    const userId = userIdFromSession(sessionPayload);
    await env.DB.prepare(`
      INSERT INTO users (id, email, name, auth_provider, google_sub, created_at, updated_at)
      VALUES (?, ?, ?, 'promptseen_free', NULL, datetime('now'), datetime('now'))
      ON CONFLICT(id) DO UPDATE SET name = excluded.name, auth_provider = 'promptseen_free', updated_at = datetime('now')
    `).bind(userId, sessionPayload.email, sessionPayload.name).run();
    await env.DB.prepare(`
      INSERT INTO entitlements (user_id, plan, credits_remaining, source, created_at, updated_at)
      VALUES (?, ?, 1, 'promptseen_free_signin', datetime('now'), datetime('now'))
      ON CONFLICT(user_id) DO NOTHING
    `).bind(userId, plan || 'free').run();
  }

  const response = NextResponse.redirect(new URL(destination, url.origin));
  response.cookies.set('promptseen_guest_id', guestId, { path: '/', sameSite: 'lax', secure: true, maxAge: 60 * 60 * 24 * 365 });
  response.cookies.set('promptseen_session', session, { path: '/', httpOnly: true, sameSite: 'lax', secure: true, maxAge: 60 * 60 * 24 * 30 });
  response.cookies.set('promptseen_signed_in', 'yes', { path: '/', sameSite: 'lax', secure: true, maxAge: 60 * 60 * 24 * 30 });
  response.cookies.set('promptseen_plan', plan, { path: '/', sameSite: 'lax', secure: true, maxAge: 60 * 60 * 24 * 30 });
  response.cookies.delete('promptseen_oauth_state');
  return response;
}
