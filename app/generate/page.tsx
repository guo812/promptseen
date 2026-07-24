import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageShell, SectionHeader } from '@/components/SiteShell';
import { GenerateWorkflow } from '@/components/GenerateWorkflow';

type GeneratePageProps = {
  searchParams: Promise<{ prompt?: string; title?: string }>;
};

export async function generateMetadata({ searchParams }: GeneratePageProps): Promise<Metadata> {
  const params = await searchParams;
  const isPersonalizedGeneratorState = Boolean(params.prompt || params.title);

  return {
    title: 'Generate AI Photo',
    description: 'Sign in, upload a selfie, choose a Prompt Seen style prompt, and use one free generation before buying credits.',
    alternates: { canonical: '/generate' },
    // Prompt text and user-selected titles create an unlimited set of tool states,
    // not distinct search landing pages. Keep the clean generator URL indexable.
    robots: isPersonalizedGeneratorState ? { index: false, follow: true } : undefined,
  };
}

export default function GeneratePage() {
  return (
    <PageShell>
      <section className="section wrap page-hero">
        <SectionHeader as="h1" eyebrow="Generate flow" title="Generate one free AI photo after sign-in">
          Browse and copy prompts for free. Sign in to upload your own selfie, claim 1 free generation, then continue with paid credits.
        </SectionHeader>
        <Suspense fallback={<div className="generate-shell card"><p className="notice">Loading generator…</p></div>}>
          <GenerateWorkflow />
        </Suspense>
      </section>
    </PageShell>
  );
}
