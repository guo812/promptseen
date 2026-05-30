import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, creditCosts, legalPages, prompts, site, trendingSignals } from '@/lib/content';
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
  if (slug === 'new-instagram-trend-prompt-for-girl') {
    return {
      title: 'New Instagram Trend Prompt for Girl | Copy Viral AI Photo Prompts',
      description: 'Copy the latest Instagram trend prompts for girls: flash filter, Korean baseball, lofi dusk, AI collage, makeup analysis, hairstyle analysis, and color analysis.',
      alternates: { canonical: `/${slug}` },
      openGraph: { title: 'New Instagram Trend Prompt for Girl', url: `${site.domain}/${slug}` },
    };
  }
  return {
    title: `${label} for Viral Creator Photos`,
    description: `Browse copy-ready ${label.toLowerCase()} for Reels, Shorts, profile photos, Gemini, ChatGPT, and creator edits.`,
    alternates: { canonical: `/${slug}` },
    openGraph: { title: `${label} | PromptSeen Online`, url: `${site.domain}/${slug}` },
  };
}

function NewGirlTrendPage() {
  const girlPrompts = prompts.filter((p) => p.gender === 'Girl');
  return (
    <main>
      <section className="container legal landing-wide">
        <Link className="badge" href="/">← PromptSeen Online</Link>
        <p className="eyebrow" style={{ marginTop: 28 }}>Instagram AI photo trend</p>
        <h1>New Instagram Trend Prompt for Girl</h1>
        <p className="lede">Copy trending girl AI photo prompts for Instagram, TikTok, and Pinterest: flash-filter portraits, Korean baseball jerseys, lofi dusk aesthetics, AI collages, makeup analysis, hairstyle analysis, and color analysis boards.</p>
        <div className="hero-actions"><Link className="btn btn-primary" href="/app/generate">Generate with AI Image</Link><a className="btn btn-secondary" href="#prompts">Copy prompts</a></div>
      </section>

      <section className="section container">
        <div className="section-head"><h2>What is trending now?</h2><p>These signals are based on current searchable social prompt clusters. We do not republish creators’ original Instagram photos without permission.</p></div>
        <div className="features">{trendingSignals.slice(0,3).map((signal, index) => <div className="card feature" key={signal}><h3>Trend signal {index + 1}</h3><p>{signal}</p></div>)}</div>
      </section>

      <section id="prompts" className="section container">
        <div className="section-head"><h2>Copy-paste girl prompts with real effect previews</h2><p>Each card names the intended gender and country/market so visitors know whether the look fits them.</p></div>
        <div className="prompt-grid prompt-grid-wide">
          {girlPrompts.map((p) => (
            <article className="card prompt-card" key={p.slug}>
              <img className="prompt-photo tall" src={p.image} alt={p.imageAlt} loading="lazy" />
              <span className="badge">{p.gender} · {p.country}</span>
              <h3>{p.title}</h3>
              <p className="prompt-text"><strong>{p.platform}</strong><br />{p.prompt}</p>
              <p className="prompt-text">{p.sourceNote}</p>
              <CopyButton text={p.prompt} />
              <Link className="btn btn-cyan" href={`/app/generate?prompt=${encodeURIComponent(p.slug)}`}>Generate this style</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="workflow">
          <div className="card panel"><h2>How to use this prompt</h2><p>Upload a clear selfie, choose one of the three AI buttons in the generator, paste or auto-load the prompt, then generate. Use GPT Image 2 for high-quality realistic edits, Gemini for fast face-preserving social edits, and Jimeng for lower-cost standard generations when the key is configured.</p></div>
          <div className="card panel"><h2>Credit cost logic</h2><div className="cost-grid">{creditCosts.map(([name, cost]) => <div key={name}><strong>{name}</strong><span>{cost}</span></div>)}</div></div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: 'What is the New Instagram Trend Prompt for Girl?', acceptedAnswer: { '@type': 'Answer', text: 'It is a set of copy-ready AI photo prompts for girl-focused Instagram trends such as flash filter, Korean baseball, lofi dusk, AI collage, makeup analysis, hairstyle analysis, and color analysis.' } },
        { '@type': 'Question', name: 'Which AI model should I use?', acceptedAnswer: { '@type': 'Answer', text: 'Use GPT Image 2 for premium realism, Gemini for fast face-preserving edits, and Jimeng for lower-cost standard generations when available.' } },
      ] }) }} />
    </main>
  );
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
  if (slug === 'new-instagram-trend-prompt-for-girl') return <NewGirlTrendPage />;
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
              <img className="prompt-photo" src={p.image} alt={p.imageAlt} loading="lazy" />
              <span className="badge">{p.gender} · {p.country}</span>
              <h3>{p.title}</h3>
              <p className="prompt-text">{p.prompt}</p>
              <CopyButton text={p.prompt} />
              <Link className="btn btn-cyan" href={`/app/generate?prompt=${encodeURIComponent(p.slug)}`}>Generate</Link>
            </article>
          ))}
        </div>
        <p className="notice" style={{ marginTop: 32 }}>This category page is indexable. Generator placeholder routes under /app are intentionally excluded from robots and sitemap until production auth/payment/upload flows are ready.</p>
      </section>
    </main>
  );
}
