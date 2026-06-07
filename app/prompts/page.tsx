import type { Metadata } from 'next';
import { PromptFilterGrid } from '@/components/PromptFilterGrid';
import { PageShell, SectionHeader } from '@/components/SiteShell';
import { prompts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Prompt Library',
  description: 'Browse and copy trending Prompt Seen style AI photo prompts for Gemini, ChatGPT, Instagram, festivals, profile photos, and creator edits.',
  alternates: { canonical: '/prompts' },
};

export default function PromptsPage() {
  const filters = ['All', 'Gemini', 'ChatGPT', 'Festival', 'Cinematic', 'Profile', 'South Asia', 'Arabic'];
  return (
    <PageShell>
      <section className="section wrap page-hero">
        <SectionHeader as="h1" eyebrow="Prompt feed" title="Copy-ready prompts for creator photo edits">
          Use filters as a product-ready UI model; all prompt text remains readable HTML for SEO and accessibility.
        </SectionHeader>
        <PromptFilterGrid prompts={prompts} filters={filters} />
      </section>
    </PageShell>
  );
}
