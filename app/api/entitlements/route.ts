import { getEnv, json } from '@/lib/backend';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const env = getEnv();
  const userId = new URL(request.url).searchParams.get('userId') ?? 'anonymous';

  if (!env.DB) {
    return json({
      userId,
      plan: 'free',
      creditsRemaining: 3,
      source: 'fallback',
    });
  }

  const row = await env.DB.prepare(
    `SELECT user_id, plan, credits_remaining, valid_until
     FROM entitlements WHERE user_id = ?1`,
  ).bind(userId).first<{ user_id: string; plan: string; credits_remaining: number; valid_until: string | null }>();

  return json(row ? {
    userId: row.user_id,
    plan: row.plan,
    creditsRemaining: row.credits_remaining,
    validUntil: row.valid_until,
    source: 'd1',
  } : {
    userId,
    plan: 'free',
    creditsRemaining: 3,
    source: 'default-free',
  });
}
