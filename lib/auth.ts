import { cookies } from 'next/headers';
import { getEnv, hasSecret } from '@/lib/backend';

export type PromptSeenSession = {
  provider?: string;
  sub?: string;
  email?: string;
  name?: string;
  picture?: string;
  plan?: string;
  iat?: number;
};

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4);
  return atob(padded);
}

async function hmacSha256(value: string, secret: string) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sigBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  const sigBytes = new Uint8Array(sigBuffer);
  let binary = '';
  sigBytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export async function verifySessionCookie(sessionCookie?: string): Promise<PromptSeenSession | null> {
  const env = getEnv();
  const secret = env.SESSION_SECRET || env.GOOGLE_CLIENT_SECRET;
  if (!sessionCookie || !hasSecret(secret)) return null;

  const [body, signature] = sessionCookie.split('.');
  if (!body || !signature) return null;
  const expected = await hmacSha256(body, secret!);
  if (expected !== signature) return null;

  try {
    const parsed = JSON.parse(base64UrlDecode(body)) as PromptSeenSession;
    if (!parsed.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function getSessionFromCookies(): Promise<PromptSeenSession | null> {
  const cookieStore = await cookies();
  return verifySessionCookie(cookieStore.get('promptseen_session')?.value);
}

export function userIdFromSession(session: PromptSeenSession) {
  const source = session.sub || session.email || 'anonymous';
  return `usr_${source.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 80)}`;
}
