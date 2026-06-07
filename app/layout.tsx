import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { site } from '@/lib/content';

const homeTitle = 'Prompt Seen Online - Viral AI Photo Editing Prompts for Gemini & ChatGPT';

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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
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
  const clarityId = site.clarityId;
  const gaId = site.gaId;
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        {children}
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
        {clarityId ? (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,'clarity','script','${clarityId}');`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
