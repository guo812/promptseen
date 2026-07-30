import type { Metadata } from 'next';
import './globals.css';
import { CookieConsent } from '@/components/CookieConsent';
import { site } from '@/lib/content';

const homeTitle = 'Prompt Seen - Viral AI Photo Editing Prompts';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${site.domain}/#website`,
      name: 'PromptSeen Online',
      alternateName: ['Prompt Seen Online', 'Prompt Seen style prompts'],
      url: site.domain,
      description: site.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${site.domain}/prompts?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${site.domain}/#organization`,
      name: 'PromptSeen Online',
      url: site.domain,
      email: site.contactEmail,
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: homeTitle,
    template: '%s | PromptSeen Online',
  },
  description: site.description,
  alternates: { canonical: '/' },
  verification: site.gscVerification ? { google: site.gscVerification } : undefined,
  openGraph: {
    title: homeTitle,
    description: site.description,
    url: site.domain,
    siteName: 'PromptSeen Online',
    type: 'website',
    images: [{ url: '/assets/og-image.svg', width: 1200, height: 630, alt: 'PromptSeen Online creator prompt board' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle,
    description: site.description,
    images: ['/assets/og-image.svg'],
  },
  icons: {
    icon: '/assets/favicon.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
