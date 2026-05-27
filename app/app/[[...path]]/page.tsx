import Link from 'next/link';

export const metadata = { title: 'Generator Preview', robots: { index: false, follow: false } };

export default function AppPlaceholder() {
  return (
    <main className="container legal">
      <Link className="badge" href="/">← Back to PromptSeen Online</Link>
      <h1 style={{ marginTop: 28 }}>Generator workflow coming soon</h1>
      <p className="lede">This placeholder keeps the CTA route functional while avoiding fake upload, payment, or AI generation claims before backend integration.</p>
      <p className="notice">No real photo upload, payment, or user-data processing is active on this placeholder route.</p>
    </main>
  );
}
