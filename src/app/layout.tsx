/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const SITE_URL = 'https://easemeup.pages.dev';

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Ease Me Up | Online Free business management Tool',
  description: 'Pro invoices, client management, and business tools. 100% private, device-based, and beautifully designed.',
  keywords: ['ease me up', 'business management tool', 'free invoice generator', 'client directory', 'expense tracker', 'privacy-first saas', 'pwa business app'],
  authors: [{ name: 'Ease Me Up Team', url: SITE_URL }],
  creator: 'Ease Me Up',
  publisher: 'Open Source',
  metadataBase: new URL(SITE_URL),
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ease Me Up',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Ease Me Up - Online Free Business Management Suite',
    description: 'Protect your privacy while managing your business. Invoices, Projects, Expenses, and Tools—all locally stored.',
    siteName: 'Ease Me Up',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ease Me Up - Online Free business management Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ease Me Up | Online Free business management Tool',
    description: 'The ultimate private SaaS for managing invoices, clients, and professional tools.',
    creator: '@easemeup',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

import { RootLayoutClient } from '../components/navigation/RootLayoutClient';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import { MessageCircle } from 'lucide-react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Ease Me Up',
    'description': 'Online Free business management Tool. Invoices, clients & tools in one place. 100% private.',
    'url': SITE_URL,
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'author': {
      '@type': 'Organization',
      'name': 'Ease Me Up Team',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ease Me Up" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const settings = JSON.parse(localStorage.getItem('easemeup_app_settings') || localStorage.getItem('easybiz_app_settings') || '{}');
                const theme = settings.theme || 'system';
                if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col`}>
        <ThemeProvider>
          <RootLayoutClient>
            {children}
          </RootLayoutClient>
        </ThemeProvider>

        {/* Persistent WhatsApp Floating Action Button */}
        <a
          href="https://wa.me/919987909499"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-4 md:right-8 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center group"
          aria-label="Chat directly on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs md:text-sm px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block shadow-md">
            Custom Requirements? Chat directly!
          </span>
        </a>
      </body>
    </html>
  );
}
