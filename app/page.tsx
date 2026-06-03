import { CategoriesPreview, FAQSection, FinalCTA, HeroSection, PricingPreview, PromptLibraryPreview, WorkflowSection } from '@/components/HomeSections';
import { PageShell } from '@/components/SiteShell';

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <PromptLibraryPreview />
      <WorkflowSection />
      <CategoriesPreview />
      <PricingPreview />
      <FAQSection />
      <FinalCTA />
    </PageShell>
  );
}
