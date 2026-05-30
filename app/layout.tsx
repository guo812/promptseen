import type { Metadata } from 'next';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { site } from '@/lib/content';

const dm = DM_Sans({ subsets: ['latin'], variable: '--font-dm' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: 'PromptSeen Online: Create Viral AI Photos with Ready Prompts',
    template: '%s | PromptSeen Online',
  },
  description: site.description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'PromptSeen Online',
    description: site.description,
    url: site.domain,
    siteName: 'PromptSeen Online',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'PromptSeen Online', description: site.description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dm.variable} ${space.variable}`}>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HJ16WBEHPL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HJ16WBEHPL');
          `}
        </Script>
      </body>
    </html>
  );
}
