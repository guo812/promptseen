import Link from 'next/link';
import { categories, creditCosts, faqs, pricing, prompts, site, trendingSignals } from '@/lib/content';
import { CopyButton } from '@/components/CopyButton';
import { HomeAdStack } from '@/components/AdUnits';

function Header() {
  return (
    <header className="header">
      <nav className="container nav" aria-label="Main navigation">
        <Link href="/" className="brand"><span className="brand-mark">P</span><span>PromptSeen Online</span></Link>
        <div className="nav-links">
          <a href="#hero">Prompts</a>
          <Link href="/gemini-prompts">Gemini Prompts</Link>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <Link href="/app/sign-in">Sign In</Link>
        </div>
        <Link className="btn btn-primary" href="/app/generate">Generate My AI Photo — Free</Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand"><span className="brand-mark">P</span><span>PromptSeen Online</span></Link>
          <p style={{ lineHeight: 1.7 }}>A dark creator-studio prompt tool for South Asian and Arabic Instagram creators. Not affiliated with any third-party Prompt Seen brand.</p>
        </div>
        <div><strong>Product</strong><a href="#hero">Prompts</a><Link href="/gemini-prompts">Gemini Prompts</Link><Link href="/chatgpt-photo-prompts">ChatGPT Photo Prompts</Link><a href="#pricing">Pricing</a></div>
        <div><strong>Markets</strong><Link href="/india-ai-photo-prompts">India</Link><Link href="/arabic-ai-photo-prompts">Arabic</Link><Link href="/couple-ai-photo-prompts">Couple</Link><Link href="/cinematic-ai-photo-prompts">Cinematic</Link></div>
        <div><strong>Legal</strong><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-of-service">Terms of Service</Link><Link href="/cookie-policy">Cookie Policy</Link><Link href="/refund-policy">Refund Policy</Link><Link href="/ai-content-policy">AI Content Policy</Link><Link href="/contact">Contact</Link></div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section id="hero" className="hero container">
          <div className="hero-grid">
            <div>
              <span className="badge">⚡ South Asia + Arabic creator prompt studio</span>
              <p className="eyebrow" style={{ marginTop: 24 }}>Viral AI Photo Prompt Library</p>
              <h1>Create Viral AI Photos with Ready Prompts</h1>
              <p className="lede">Find, copy, and generate photo prompts for Reels, Shorts, profile photos, festivals, couples, cricket edits, Bollywood posters, Eid looks, Ramadan portraits, and cinematic creator content.</p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/app/generate">Generate My AI Photo — Free</Link>
                <a className="btn btn-secondary" href="#categories">Explore Trending Prompts</a>
              </div>
            </div>
            <div className="card studio">
              <div className="search-box"><input aria-label="Search prompts" placeholder="Search: Eid couple prompt, cricket DP, Gemini portrait…" /><button className="btn btn-cyan" type="button">Search Prompts</button></div>
              <div style={{ height: 18 }} />
              <div className="prompt-grid">
                {prompts.slice(0,3).map((p) => <article className="card prompt-card" key={p.title}><img className="prompt-photo" src={p.image} alt={p.imageAlt} loading="lazy" /><span className="badge">{p.gender} · {p.country}</span><h3>{p.title}</h3><p className="prompt-text">{p.prompt.slice(0, 128)}…</p><CopyButton text={p.prompt} /><Link className="btn btn-cyan" href={`/app/generate?prompt=${encodeURIComponent(p.slug)}`}>Generate</Link></article>)}
              </div>
            </div>
          </div>
        </section>

        <HomeAdStack />

        <section className="section container">
          <div className="section-head"><h2>Stop hunting prompts across comments and random blogs</h2><p>PromptSeen Online turns trend-search intent into a practical tool interface: searchable prompt cards, clear copy actions, local market categories, and a generation workflow above the fold.</p></div>
          <div className="features">
            <div className="card feature"><h3>Search-first</h3><p>Built for users who already know the trend they want and need a ready prompt fast.</p></div>
            <div className="card feature"><h3>Local creator markets</h3><p>India, Nepal, Bangladesh, Pakistan, Sri Lanka, and Arabic-speaking creator demand are surfaced as first-class routes.</p></div>
            <div className="card feature"><h3>No fake official claim</h3><p>The page is positioned as an independent prompt tool and avoids overclaiming proof, scarcity, or affiliation.</p></div>
          </div>
        </section>

        <section className="section container">
          <div className="section-head"><h2>Updated trend signals from Instagram, TikTok, and Pinterest</h2><p>Current prompt clusters are refreshed toward real creator demand. We use safe preview imagery instead of reposting creators’ original social photos without rights.</p></div>
          <div className="features">{trendingSignals.slice(0,3).map((signal, index) => <div className="card feature" key={signal}><h3>Signal {index + 1}</h3><p>{signal}</p></div>)}</div>
        </section>

        <section className="section container">
          <div className="section-head"><h2>Real effect previews by gender and market</h2><p>Preview cards show the intended visual effect, target gender, and country/market so visitors can imagine their own result before generating.</p></div>
          <div className="prompt-grid prompt-grid-wide">
            {prompts.slice(0,6).map((p) => <article className="card prompt-card" key={p.slug}><img className="prompt-photo tall" src={p.image} alt={p.imageAlt} loading="lazy" /><span className="badge">{p.gender} · {p.country}</span><h3>{p.title}</h3><p className="prompt-text">{p.sourceNote}</p><CopyButton text={p.prompt} /><Link className="btn btn-cyan" href={`/app/generate?prompt=${encodeURIComponent(p.slug)}`}>Try this look</Link></article>)}
          </div>
        </section>

        <section className="section container">
          <div className="section-head"><h2>From trend to AI photo in 3 steps</h2><p>A simple creator workflow that works even before the full generator backend is connected.</p></div>
          <div className="steps"><div className="card step"><div className="step-num">1</div><h3>Find a prompt</h3><p>Search by trend, festival, gender, country, creator style, or AI tool.</p></div><div className="card step"><div className="step-num">2</div><h3>Copy or customize</h3><p>Use one-click copy and adapt the prompt for Gemini, ChatGPT, or your image model.</p></div><div className="card step"><div className="step-num">3</div><h3>Generate with credits</h3><p>Upload a photo and generate when the production workflow is enabled.</p></div></div>
        </section>

        <section id="categories" className="section container">
          <div className="section-head"><h2>Explore prompt categories that match your audience</h2><p>Route matrix for SEO pages and creator browsing.</p></div>
          <div className="category-grid">{categories.map(([label, href]) => <Link className="category" href={href} key={href}>{label}</Link>)}</div>
        </section>

        <section className="section container">
          <div className="workflow"><div className="card panel"><h2>Find, copy, or generate from one prompt workflow</h2><p>Browse prompt cards for free, copy prompt text instantly, then move into the AI photo generator when you are ready. Upload and generation are intentionally separated from browsing so the site can launch safely with clear privacy boundaries.</p><Link className="btn btn-primary" href="/app/generate">Open Generator</Link></div><div className="card panel"><h2>Built for creators who move with trends</h2><p>Use prompt packs for cricket fever, Bollywood rain posters, Eid looks, Ramadan portraits, festival DPs, couple edits, cinematic boys edits, and Instagram profile photos.</p><p className="notice">Production payment, upload retention, analytics IDs, and custom domain activation require final owner review before real user launch.</p></div></div>
        </section>

        <section id="pricing" className="section container">
          <div className="section-head"><h2>Browse for free. Generate with credits.</h2><p>Pricing copy is staged as a product-ready draft and must be finalized before payment activation.</p></div>
          <div className="pricing">{pricing.map((p) => <article className="card price" key={p.name}><h3>{p.name}</h3><h2 style={{ fontSize: 46, marginTop: 12 }}>{p.price}</h2><p>{p.desc}</p><ul>{p.items.map((i) => <li key={i}>✓ {i}</li>)}</ul><Link className="btn btn-secondary" href={p.href}>{p.cta}</Link></article>)}</div>
          <div className="card panel" style={{ marginTop: 18 }}><h3>Credit cost guardrail</h3><div className="cost-grid">{creditCosts.map(([name, cost]) => <div key={name}><strong>{name}</strong><span>{cost}</span></div>)}</div></div>
        </section>

        <section id="faq" className="section container">
          <div className="section-head"><h2>Frequently Asked Questions</h2><p>Clear answers for SEO and launch compliance.</p></div>
          <div className="faq-list">{faqs.map(([q,a]) => <details className="card" key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </section>

        <section className="section container"><div className="card cta"><h2>Turn the trend into your next AI photo</h2><p className="lede" style={{ margin: '18px auto' }}>Start with a ready prompt, then generate a creator-ready image when your workflow is ready.</p><div className="hero-actions" style={{ justifyContent: 'center' }}><Link className="btn btn-primary" href="/app/generate">Generate My AI Photo — Free</Link><a className="btn btn-secondary" href="#categories">Explore Trending Prompts</a></div></div></section>
      </main>
      <Footer />
    </>
  );
}
