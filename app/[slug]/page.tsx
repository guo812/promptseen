import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PromptCard } from '@/components/PromptCard';
import { PageShell, SectionHeader } from '@/components/SiteShell';
import { categoryLinks, extraLegalPages, prompts, site } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return [
    ...categoryLinks.map(([, href]) => ({ slug: href.replace('/', '') })),
    ...Object.keys(extraLegalPages).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const legal = extraLegalPages[slug as keyof typeof extraLegalPages];
  if (legal) return { title: legal.title, description: `${legal.title} for PromptSeen Online.`, alternates: { canonical: `/${slug}` } };
  const category = categoryLinks.find(([, href]) => href === `/${slug}`);
  if (!category) return {};
  const [label] = category;
  return {
    title: label,
    description: `${label} from PromptSeen Online: ready-to-copy AI photo prompts for creators.`,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const legal = extraLegalPages[slug as keyof typeof extraLegalPages];
  if (legal) {
    return (
      <PageShell>
        <section className="section wrap legal-page">
          <p className="eyebrow">Updated {legal.updated}</p>
          <h1>{legal.title}</h1>
          {legal.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
      </PageShell>
    );
  }

  const category = categoryLinks.find(([, href]) => href === `/${slug}`);
  if (!category) notFound();
  const [label] = category;

  return (
    <PageShell>
      <section className="section wrap page-hero">
        <SectionHeader eyebrow="Category" title={label} as="h1">
          Ready-to-copy prompt ideas for this category. PromptSeen Online is an independent resource and results may vary by model.
        </SectionHeader>
        <div className="prompts-grid page-grid">{prompts.slice(0, 6).map((prompt) => <PromptCard key={prompt.title} prompt={prompt} />)}</div>
        <div className="center-actions"><Link className="btn btn-primary" href="/generate">Sign in to Generate</Link><Link className="btn btn-secondary" href="/prompts">Browse all prompts</Link></div>
      </section>
    </PageShell>
  );
}
