import Link from 'next/link';
import { CopyButton } from '@/components/CopyButton';
import { PromptCard } from '@/components/PromptCard';
import { categoryGroups, faqs, pricing, prompts } from '@/lib/content';
import { SectionHeader } from '@/components/SiteShell';

export function HeroSection() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="badge">Independent prompt board · Gemini · ChatGPT · Creator workflows</span>
          <h1>Viral AI Photo Prompts for Instagram Creators</h1>
          <p className="lead">Find ready-to-copy Prompt Seen style prompts for Reels, profile photos, festivals, couples, cricket edits, Bollywood posters, Eid looks, Ramadan portraits, and local creator content.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/generate">Sign in to Generate</Link>
            <Link className="btn btn-secondary" href="/prompts">Explore Trending Prompts</Link>
          </div>
          <p className="safety-note">Browse and copy prompts for free. AI generation uses login and credits—no unlimited or guaranteed-viral claims.</p>
        </div>
        <div className="hero-board" aria-label="Prompt workflow preview">
          <div className="phone">
            <div className="phone-screen">
              <div className="search-line">Search: Eid couple prompt, cricket DP, Gemini portrait…</div>
              {prompts.slice(0, 2).map((prompt) => (
                <div className="mini-card" key={prompt.title}>
                  <span>{prompt.tag}</span>
                  <strong>{prompt.title}</strong>
                  <p>{prompt.prompt.slice(0, 92)}…</p>
                  <CopyButton text={prompt.prompt} label="Copy" />
                </div>
              ))}
            </div>
          </div>
          <div className="float-card one"><strong>8 prompt packs</strong><span>South Asia + Arabic trends</span></div>
          <div className="float-card two"><strong>Credits-ready</strong><span>Honest sign-in and payment states</span></div>
        </div>
      </div>
    </section>
  );
}

export function PromptLibraryPreview() {
  return (
    <section className="section wrap">
      <SectionHeader eyebrow="Prompt library" title="Trend cards that stay crawlable and copy-ready">
        Prompt cards are structured as real HTML, not screenshots, so users and crawlers can read the titles, categories, and FAQ content.
      </SectionHeader>
      <div className="prompts-grid">
        {prompts.slice(0, 6).map((prompt) => <PromptCard key={prompt.title} prompt={prompt} compact />)}
      </div>
      <div className="center-actions"><Link className="btn btn-primary" href="/prompts">Open full prompt library</Link></div>
    </section>
  );
}

export function WorkflowSection() {
  const steps = [
    ['1', 'Find a trend', 'Search by market, festival, tool, creator style, or image use case.'],
    ['2', 'Copy or adapt', 'Use one-click copy and tune the prompt for Gemini, ChatGPT, Dreamina, or your preferred model.'],
    ['3', 'Generate with credits', 'Sign in, upload your photo, pick a prompt, and generate when credits are available.'],
  ];
  return (
    <section className="section wrap compact-section">
      <SectionHeader eyebrow="Creator workflow" title="From trend to AI photo in three honest steps">
        The UI separates free browsing from personalized generation so users understand when login, upload, and credits are required.
      </SectionHeader>
      <div className="steps-grid">
        {steps.map(([num, title, body]) => <article className="card step-card" key={num}><span>{num}</span><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </section>
  );
}

export function CategoriesPreview() {
  return (
    <section className="section wrap" id="categories">
      <SectionHeader eyebrow="SEO categories" title="Browse by tool, market, creator job, and festival">
        Built from the PRD route matrix for India, Nepal, Bangladesh, Pakistan, Sri Lanka, and Arabic-speaking creator markets.
      </SectionHeader>
      <div className="category-groups">
        {categoryGroups.map((group) => (
          <article className="card category-group" key={group.title}>
            <h3>{group.title}</h3>
            <div>{group.items.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PricingPreview() {
  return (
    <section className="section wrap" id="pricing">
      <SectionHeader eyebrow="Pricing" title="Browse for free. Generate with credits.">
        Plans are presented as transparent draft product tiers; generation is credit-aware, not unlimited.
      </SectionHeader>
      <div className="pricing-grid">
        {pricing.map((plan) => <article className="card price-card" key={plan.name}><span className="chip lime">{plan.name}</span><h3>{plan.price}</h3><p>{plan.desc}</p><ul>{plan.items.map((item) => <li key={item}>✓ {item}</li>)}</ul><Link className="btn btn-secondary" href={plan.href}>{plan.cta}</Link></article>)}
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="section wrap" id="faq">
      <SectionHeader eyebrow="FAQ" title="Clear answers for users and search engines">
        Compliance-safe copy avoids official affiliation, guaranteed results, and unlimited-generation claims.
      </SectionHeader>
      <div className="faq-list">
        {faqs.map(([q, a]) => <details className="card faq-item" key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="section wrap">
      <div className="card final-cta">
        <span className="badge">Ready for real AI workflows</span>
        <h2>Turn a copied prompt into your next creator photo</h2>
        <p>Start with a prompt, then sign in when you want personalized generation with credits.</p>
        <div className="hero-actions center"><Link className="btn btn-primary" href="/generate">Sign in to Generate</Link><Link className="btn btn-secondary" href="/pricing">See pricing</Link></div>
      </div>
    </section>
  );
}
