import type { Metadata } from 'next';
import { PageShell } from '@/components/SiteShell';
import { legalPages } from '@/lib/content';

const page = legalPages['privacy-policy'];
export const metadata: Metadata = { title: page.title, description: `${page.title} for PromptSeen Online.`, alternates: { canonical: '/privacy-policy' } };

export default function LegalPage() {
  return (
    <PageShell>
      <section className="section wrap legal-page">
        <p className="eyebrow">Updated {page.updated}</p>
        <h1>{page.title}</h1>
        {page.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
    </PageShell>
  );
}
