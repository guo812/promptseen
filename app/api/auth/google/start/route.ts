import { NextRequest, NextResponse } from 'next/server';
import { getEnv, hasSecret } from '@/lib/backend';

export const dynamic = 'force-dynamic';

function base64Url(bytes: Uint8Array) {
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export async function GET(request: NextRequest) {
  const env = getEnv();
  if (!hasSecret(env.GOOGLE_CLIENT_ID)) {
    return NextResponse.json({ ok: false, error: 'Google OAuth is not configured.' }, { status: 503 });
  }

  const url = new URL(request.url);
  const next = url.searchParams.get('next') || '/generate';
  const plan = url.searchParams.get('plan') || 'free';
  const nonceBytes = new Uint8Array(24);
  crypto.getRandomValues(nonceBytes);
  const nonce = base64Url(nonceBytes);
  const state = base64Url(new TextEncoder().encode(JSON.stringify({ next, plan, nonce })));

  const redirectUri = env.GOOGLE_REDIRECT_URI || `${url.origin}/api/auth/callback/google`;
  const google = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  google.searchParams.set('client_id', env.GOOGLE_CLIENT_ID!);
  google.searchParams.set('redirect_uri', redirectUri);
  google.searchParams.set('response_type', 'code');
  google.searchParams.set('scope', 'openid email profile');
  google.searchParams.set('state', state);
  google.searchParams.set('prompt', 'select_account');
  google.searchParams.set('access_type', 'online');

  const response = NextResponse.redirect(google);
  response.cookies.set('promptseen_oauth_state', state, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    maxAge: 10 * 60,
  });
  return response;
}
