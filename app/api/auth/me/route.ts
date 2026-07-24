import { NextRequest } from 'next/server';
import { json } from '@/lib/backend';
import { verifySessionCookie, userIdFromSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const session = await verifySessionCookie(request.cookies.get('promptseen_session')?.value);
  if (!session) return json({ ok: true, signedIn: false, user: null });
  return json({
    ok: true,
    signedIn: true,
    user: {
      id: userIdFromSession(session),
      email: session.email,
      name: session.name || session.email,
      picture: session.picture,
      provider: session.provider || 'google',
      plan: session.plan || request.cookies.get('promptseen_plan')?.value || 'free',
    },
  });
}
