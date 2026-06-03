import Link from 'next/link';
import { categoryLinks, mainRoutes, site } from '@/lib/content';

export function TopNav() {
  return (
    <header className="topbar">
      <nav className="wrap nav" aria-label="Main navigation">
        <Link href="/" className="brand" aria-label="PromptSeen Online home">
          <img src="/assets/logo.svg" alt="PromptSeen Online logo" width="36" height="36" />
          <span>PromptSeen Online</span>
        </Link>
        <div className="navlinks">
          {mainRoutes.slice(1, 5).map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </div>
        <Link className="navcta" href="/generate">Sign in to Generate</Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Link href="/" className="brand">
            <img src="/assets/logo.svg" alt="PromptSeen Online logo" width="34" height="34" />
            <span>PromptSeen Online</span>
          </Link>
          <p>Independent prompt resource for South Asian and Arabic creators. Results may vary by model, input image quality, and prompt choice.</p>
        </div>
        <div>
          <strong>Product</strong>
          {mainRoutes.slice(1).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </div>
        <div>
          <strong>Trending</strong>
          {categoryLinks.slice(0, 6).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </div>
        <div>
          <strong>Legal</strong>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/cookie-policy">Cookie Policy</Link>
          <Link href="/refund-policy">Refund Policy</Link>
          <Link href="/ai-content-policy">AI Content Policy</Link>
          <a href={`mailto:${site.contactEmail}`}>Contact</a>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export function SectionHeader({ eyebrow, title, children, as = 'h2' }: { eyebrow?: string; title: string; children?: React.ReactNode; as?: 'h1' | 'h2' }) {
  const Heading = as;
  return (
    <div className="section-head">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <Heading>{title}</Heading>
      </div>
      {children ? <p>{children}</p> : null}
    </div>
  );
}
