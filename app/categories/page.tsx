import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell, SectionHeader } from '@/components/SiteShell';
import { categoryGroups } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Prompt Categories',
  description: 'Explore PromptSeen Online prompt categories by AI tool, South Asian and Arabic markets, creator job, festival, and local trend.',
  alternates: { canonical: '/categories' },
};

export default function CategoriesPage() {
  return (
    <PageShell>
      <section className="section wrap page-hero">
        <SectionHeader as="h1" eyebrow="Categories" title="Find prompts by tool, market, creator job, and festival">
          This page is the SEO category explorer from the design handoff and route contract.
        </SectionHeader>
        <div className="category-groups expanded">
          {categoryGroups.map((group) => <article className="card category-group" key={group.title}><h3>{group.title}</h3><div>{group.items.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div></article>)}
        </div>
      </section>
    </PageShell>
  );
}
