import { NextRequest } from 'next/server';
import { getEnv, json } from '@/lib/backend';
import { verifySessionCookie, userIdFromSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const session = await verifySessionCookie(request.cookies.get('promptseen_session')?.value);
  if (!session) return json({ ok: true, signedIn: false, user: null });
  const env = getEnv();
  const userId = userIdFromSession(session);
  const entitlement = env.DB ? await env.DB.prepare('SELECT plan, credits_remaining FROM entitlements WHERE user_id = ?1').bind(userId).first<{ plan: string; credits_remaining: number }>() : null;
  return json({
    ok: true,
    signedIn: true,
    user: {
      id: userId,
      email: session.email,
      name: session.name || session.email,
      picture: session.picture,
      provider: session.provider || 'google',
      plan: entitlement?.plan || session.plan || 'free',
      creditsRemaining: entitlement?.credits_remaining ?? 1,
    },
  });
}
