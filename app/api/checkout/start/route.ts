import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const paidPlans = new Set(['starter', 'pro', 'creator']);

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const plan = url.searchParams.get('plan') || 'starter';
  if (!paidPlans.has(plan)) return NextResponse.redirect(new URL('/pricing?checkout=unknown_plan', url.origin));

  const res = await fetch(new URL('/api/checkout', url.origin), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      cookie: request.headers.get('cookie') || '',
    },
    body: JSON.stringify({ plan }),
  });
  const data = await res.json().catch(() => ({})) as { ok?: boolean; checkoutUrl?: string; signInUrl?: string; error?: string };

  if (res.status === 401 && data.signInUrl) return NextResponse.redirect(new URL(data.signInUrl, url.origin));
  if (data.ok && data.checkoutUrl) return NextResponse.redirect(data.checkoutUrl);

  const failure = new URL('/pricing', url.origin);
  failure.searchParams.set('checkout', 'setup_required');
  failure.searchParams.set('plan', plan);
  if (data.error) failure.searchParams.set('error', data.error);
  return NextResponse.redirect(failure);
}
