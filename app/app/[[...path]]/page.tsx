import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Sign in', robots: { index: false, follow: false } };

type Props = {
  params: Promise<{ path?: string[] }>;
  searchParams?: Promise<{ next?: string; plan?: string }>;
};

function safeNext(value?: string) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/generate';
  return value;
}

export default async function AppRoute({ params, searchParams }: Props) {
  const { path = [] } = await params;
  const query = searchParams ? await searchParams : {};
  const route = path[0] || 'sign-in';

  if (route === 'sign-in' || route === 'register') {
    const next = safeNext(query.next);
    const plan = query.plan || 'free';
    redirect(`/api/auth/free/start?plan=${encodeURIComponent(plan)}&next=${encodeURIComponent(next)}`);
  }

  return (
    <main className="container legal">
      <Link className="badge" href="/">← Back to PromptSeen Online</Link>
      <h1 style={{ marginTop: 28 }}>App route not found</h1>
      <p className="lede">This app route is not active yet. Continue to the working generator or pricing flow.</p>
      <div className="hero-actions"><Link className="btn btn-primary" href="/api/auth/free/start?next=/generate">Generate</Link><Link className="btn btn-secondary" href="/pricing">Pricing</Link></div>
    </main>
  );
}
