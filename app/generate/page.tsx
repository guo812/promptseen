import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell, SectionHeader } from '@/components/SiteShell';

export const metadata: Metadata = {
  title: 'Generate AI Photo',
  description: 'Sign in, upload a photo, choose a prompt style, and generate AI photos with credits on PromptSeen Online.',
  alternates: { canonical: '/generate' },
};

export default function GeneratePage() {
  const states = [
    ['Logged out', 'Sign in is required before uploading a personal photo or spending credits.'],
    ['Upload photo', 'Use a photo you have permission to process. Avoid sensitive identity documents and private images.'],
    ['Choose prompt', 'Pick a prompt card or paste your own creator-safe prompt.'],
    ['Buy credits', 'Generation uses credits. Browse and copy prompts remain free.'],
  ];
  return (
    <PageShell>
      <section className="section wrap page-hero">
        <SectionHeader as="h1" eyebrow="Generate flow" title="Sign in to generate with credits">
          The design intentionally avoids “Generate Free” promises when login, upload, and credits are part of the real production flow.
        </SectionHeader>
        <div className="generate-shell card">
          <div className="upload-box"><span>Photo upload area</span><p>Personalized generation will call OpenAI, Gemini, or Ark depending on provider availability.</p></div>
          <div className="state-list">{states.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
          <div className="hero-actions"><Link className="btn btn-primary" href="/app/sign-in">Sign in to Generate</Link><Link className="btn btn-secondary" href="/pricing">Buy credits</Link></div>
        </div>
      </section>
    </PageShell>
  );
}
