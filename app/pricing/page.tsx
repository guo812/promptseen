import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell, SectionHeader } from '@/components/SiteShell';
import { pricing } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'PromptSeen Online pricing draft: browse prompts for free and use credits for AI photo generation workflows.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <PageShell>
      <section className="section wrap page-hero">
        <SectionHeader as="h1" eyebrow="Pricing" title="Browse for free. Generate with credits.">
          Transparent pricing copy for production review. No unlimited-generation or guaranteed-result claims.
        </SectionHeader>
        <div className="pricing-grid">{pricing.map((plan) => <article className="card price-card" key={plan.name}><span className="chip lime">{plan.name}</span><h3>{plan.price}</h3><p>{plan.desc}</p><ul>{plan.items.map((item) => <li key={item}>✓ {item}</li>)}</ul><Link className="btn btn-primary" href={plan.href}>{plan.cta}</Link></article>)}</div>
        <p className="notice">Payment is intended for PayPal production checkout. Final checkout smoke test is required before marking paid flows DONE.</p>
      </section>
    </PageShell>
  );
}
