import { getEnv, hasSecret, json } from '@/lib/backend';

export const dynamic = 'force-dynamic';

export async function GET() {
  const env = getEnv();
  return json({
    ok: true,
    provider: 'google',
    configured: hasSecret(env.GOOGLE_CLIENT_ID) && hasSecret(env.GOOGLE_CLIENT_SECRET),
    redirectUri: env.GOOGLE_REDIRECT_URI ?? 'https://promptseen.online/api/auth/callback/google',
    status: 'contract-ready',
    note: 'OAuth callback endpoint is deployed as a backend contract. Production sign-in requires Google OAuth client validation in Google Cloud Console.',
  });
}
