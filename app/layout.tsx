import type { Metadata } from 'next';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
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
      <body>{children}</body>
    </html>
  );
}
