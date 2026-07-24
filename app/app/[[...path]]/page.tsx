import Link from 'next/link';
import { Suspense } from 'react';
import { SignInPanel } from '@/components/SignInPanel';

export const metadata = { title: 'Sign in', robots: { index: false, follow: false } };

type Props = { params: Promise<{ path?: string[] }> };

export default async function AppRoute({ params }: Props) {
  const { path = [] } = await params;
  const route = path[0] || 'sign-in';

  if (route === 'sign-in' || route === 'register') {
    return (
      <main className="container legal">
        <Link className="badge" href="/">← Back to PromptSeen Online</Link>
        <h1 style={{ marginTop: 28 }}>Sign in to generate</h1>
        <p className="lede">Use Google sign-in to claim the Free plan and one free AI photo generation. Your account state and entitlement are visible after you return.</p>
        <Suspense fallback={<p className="notice">Loading sign-in options…</p>}>
          <SignInPanel />
        </Suspense>
      </main>
    );
  }

  return (
    <main className="container legal">
      <Link className="badge" href="/">← Back to PromptSeen Online</Link>
      <h1 style={{ marginTop: 28 }}>App route not found</h1>
      <p className="lede">This app route is not active yet. Continue to the working generator or pricing flow.</p>
      <div className="hero-actions"><Link className="btn btn-primary" href="/generate">Generate</Link><Link className="btn btn-secondary" href="/pricing">Pricing</Link></div>
    </main>
  );
}
