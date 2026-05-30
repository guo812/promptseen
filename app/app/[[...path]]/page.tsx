import Link from 'next/link';
import { pricing, prompts } from '@/lib/content';
import { GeneratorClient } from '@/components/GeneratorClient';
import { CheckoutButton } from '@/components/CheckoutButton';

export const metadata = { title: 'AI Photo Generator', robots: { index: false, follow: false } };

type Props = { params?: Promise<{ path?: string[] }>; searchParams?: Promise<{ prompt?: string }> };

function SubscribePage({ planId }: { planId: string }) {
  const plan = pricing.find((p) => p.href.endsWith(`/${planId}`));
  return (
    <main className="container legal landing-wide">
      <Link className="badge" href="/">← Back to PromptSeen Online</Link>
      <p className="eyebrow" style={{ marginTop: 28 }}>Checkout</p>
      <h1>{plan ? `Subscribe to ${plan.name}` : 'Subscribe to PromptSeen'}</h1>
      <p className="lede">PayPal checkout is wired through the backend. Credits are designed to avoid API-cost losses: Starter 300 credits, Pro 1,000 credits, Creator 2,500 credits.</p>
      {plan ? <div className="card panel"><h2>{plan.name} — {plan.price}</h2><ul>{plan.items.map((item) => <li key={item}>✓ {item}</li>)}</ul><CheckoutButton planId={planId} /></div> : <p className="notice">Unknown plan.</p>}
    </main>
  );
}

function SignInPage() {
  return (
    <main className="container legal landing-wide">
      <Link className="badge" href="/">← Back to PromptSeen Online</Link>
      <p className="eyebrow" style={{ marginTop: 28 }}>Sign in</p>
      <h1>PromptSeen account</h1>
      <p className="lede">Google OAuth configuration status is available through the backend. The next production step is validating the Google OAuth app and callback URL in Google Cloud Console.</p>
      <a className="btn btn-primary" href="/api/auth/google/status">Check Google OAuth status</a>
    </main>
  );
}

export default async function AppPlaceholder({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const path = resolvedParams?.path ?? [];
  if (path[0] === 'subscribe' && path[1]) return <SubscribePage planId={path[1]} />;
  if (path[0] === 'sign-in' || path[0] === 'signup') return <SignInPage />;

  const query = await searchParams;
  return (
    <main className="container legal landing-wide">
      <Link className="badge" href="/">← Back to PromptSeen Online</Link>
      <p className="eyebrow" style={{ marginTop: 28 }}>PromptSeen AI image workspace</p>
      <h1>Generate AI photos from viral prompts</h1>
      <p className="lede">Choose one of three provider buttons: 即梦 AI Image, GPT Image 2, or Gemini Image. The UI and backend contract are in place; real calls depend on configured provider keys and ENABLE_REAL_AI.</p>
      <GeneratorClient prompts={prompts} initialSlug={query?.prompt} />
    </main>
  );
}
