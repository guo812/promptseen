import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell, SectionHeader } from '@/components/SiteShell';
import { getEnv } from '@/lib/backend';
import { getSessionFromCookies, userIdFromSession } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Account',
  description: 'PromptSeen Online account dashboard states for credits, favorites, generation history, and billing.',
  alternates: { canonical: '/account' },
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const session = await getSessionFromCookies();
  const entitlement = session && getEnv().DB ? await getEnv().DB!.prepare('SELECT plan, credits_remaining FROM entitlements WHERE user_id = ?1').bind(userIdFromSession(session)).first<{ plan: string; credits_remaining: number }>() : null;
  const plan = entitlement?.plan || session?.plan || 'free';
  const credits = entitlement?.credits_remaining ?? (session ? 1 : 0);
  const cards = [
    ['Credits', session ? `${credits} active credit${credits === 1 ? '' : 's'} on your account.` : 'Sign in to see your credits.'],
    ['Plan', session ? `${plan.replace(/^./, (letter) => letter.toUpperCase())} plan is active.` : 'No active plan while signed out.'],
    ['Generation history', session ? 'Completed image generations will appear here as they are created.' : 'Sign in to see your generation history.'],
    ['Billing', session ? 'Your Stripe payment status and credit purchases will appear here after checkout.' : 'Sign in before purchasing credits.'],
  ];
  return (
    <PageShell>
      <section className="section wrap page-hero">
        <SectionHeader as="h1" eyebrow="Account dashboard" title="Credits, saved prompts, history, and billing states">
          {session ? `Signed in as ${session.email}. Your account state is read from the secure session cookie.` : 'Sign in with Google to view your real account state.'}
        </SectionHeader>
        <div className="dashboard-grid">{cards.map(([title, body]) => <article className="card dashboard-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
        <div className="hero-actions">
          {session ? <><Link className="btn btn-primary" href="/generate">Generate an image</Link><form action="/api/auth/logout" method="post"><button className="btn btn-secondary" type="submit">Sign out</button></form></> : <Link className="btn btn-primary" href="/api/auth/free/start?next=/account">Sign in</Link>}
          <Link className="btn btn-secondary" href="/pricing">View plans</Link>
        </div>
      </section>
    </PageShell>
  );
}
