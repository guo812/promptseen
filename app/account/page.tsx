import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell, SectionHeader } from '@/components/SiteShell';

export const metadata: Metadata = {
  title: 'Account',
  description: 'PromptSeen Online account dashboard states for credits, favorites, generation history, and billing.',
  alternates: { canonical: '/account' },
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  const cards = [
    ['Credits', '0 active credits until the user signs in and purchases a plan.'],
    ['Favorites', 'Saved prompt cards will appear here after sign-in.'],
    ['Generation history', 'Completed image generations and provider statuses show here.'],
    ['Billing', 'PayPal checkout references and plan status are shown only to the signed-in user.'],
  ];
  return (
    <PageShell>
      <section className="section wrap page-hero">
        <SectionHeader as="h1" eyebrow="Account dashboard" title="Credits, saved prompts, history, and billing states">
          Logged-out users see a clear sign-in requirement instead of fake dashboard data.
        </SectionHeader>
        <div className="dashboard-grid">{cards.map(([title, body]) => <article className="card dashboard-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
        <div className="hero-actions"><Link className="btn btn-primary" href="/app/sign-in">Sign in</Link><Link className="btn btn-secondary" href="/pricing">View plans</Link></div>
      </section>
    </PageShell>
  );
}
