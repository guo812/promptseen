import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, legalPages, prompts, site } from '@/lib/content';
import { CopyButton } from '@/components/CopyButton';

const categoryMap = Object.fromEntries(categories.map(([label, href]) => [href.slice(1), label]));
type LegalSlug = keyof typeof legalPages;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...categories.map(([, href]) => ({ slug: href.slice(1) })), ...Object.keys(legalPages).map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const label = categoryMap[slug];
  const legal = legalPages[slug as LegalSlug];
  if (legal) return { title: legal.title, description: `${legal.title} for PromptSeen Online.`, alternates: { canonical: `/${slug}` } };
  if (!label) return {};
  return {
    title: `${label} for Viral Creator Photos`,
    description: `Browse copy-ready ${label.toLowerCase()} for Reels, Shorts, profile photos, Gemini, ChatGPT, and creator edits.`,
    alternates: { canonical: `/${slug}` },
    openGraph: { title: `${label} | PromptSeen Online`, url: `${site.domain}/${slug}` },
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const legal = legalPages[slug as LegalSlug];
  if (legal) {
    return (
      <main className="container legal">
        <Link className="badge" href="/">← Back to PromptSeen Online</Link>
        <h1 style={{ marginTop: 28 }}>{legal.title}</h1>
        <p className="notice">Draft legal content for launch readiness. Final production review is required before accepting payments, uploads, or real user data.</p>
        {legal.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </main>
    );
  }
  const label = categoryMap[slug];
  if (!label) notFound();
  return (
    <main>
      <section className="container legal">
        <Link className="badge" href="/">← PromptSeen Online</Link>
        <p className="eyebrow" style={{ marginTop: 28 }}>Prompt category</p>
        <h1>{label}</h1>
        <p className="lede">Copy-ready prompt ideas for creators who want fast, visual, trend-driven AI photo edits. Use these drafts in Gemini, ChatGPT image tools, or your preferred AI image workflow.</p>
        <div className="prompt-grid" style={{ marginTop: 32 }}>
          {prompts.map((p) => (
            <article className="card prompt-card" key={p.title}>
              <div className="prompt-thumb" />
              <span className="badge">{p.market}</span>
              <h3>{p.title}</h3>
              <p className="prompt-text">{p.prompt}</p>
              <CopyButton text={p.prompt} />
              <Link className="btn btn-cyan" href="/app/generate">Generate</Link>
            </article>
          ))}
        </div>
        <p className="notice" style={{ marginTop: 32 }}>This category page is indexable. Generator placeholder routes under /app are intentionally excluded from robots and sitemap until production auth/payment/upload flows are ready.</p>
      </section>
    </main>
  );
}
