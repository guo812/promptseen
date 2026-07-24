import type { Metadata } from 'next';
import { PageShell, SectionHeader } from '@/components/SiteShell';
import { CheckoutButton } from '@/components/CheckoutButton';
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
        <div className="pricing-grid">{pricing.map((plan) => <article className="card price-card" key={plan.name}><span className="chip lime">{plan.name}</span><h3>{plan.price}</h3><p>{plan.desc}</p><ul>{plan.items.map((item) => <li key={item}>✓ {item}</li>)}</ul><CheckoutButton plan={plan.name.toLowerCase()}>{plan.cta}</CheckoutButton></article>)}</div>
        <p className="notice">Payment checkout is server-created through <code>POST /api/checkout</code>. Configure <code>PAYMENT_PROVIDER=stripe</code> or <code>PAYMENT_PROVIDER=creem</code> plus provider secrets before marking paid flows DONE.</p>
      </section>
    </PageShell>
  );
}
