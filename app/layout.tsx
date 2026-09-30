import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from '@/lib/context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import SearchModal from '@/components/modals/SearchModal';
import CartDrawer from '@/components/modals/CartDrawer';
import WishlistDrawer from '@/components/modals/WishlistDrawer';
import WhatsAppModal from '@/components/modals/WhatsAppModal';
import HomeTrialModal from '@/components/modals/HomeTrialModal';
import HomeTrialFloatingIndicator from '@/components/layout/HomeTrialFloatingIndicator';
import PWAInstallPrompt from '@/components/pwa/PWAInstallPrompt';
import FoveaChatbot from '@/components/chat/FoveaChatbot';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FAF9F6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'FOVEA — Handcrafted Luxury Eyewear & Optics',
  description:
    'Architectural eyewear, bespoke optical frames, and complimentary home trial. Experience modern optical precision crafted from Japanese titanium and Italian Mazzucchelli acetate.',
  keywords: [
    'luxury eyewear',
    'titanium glasses',
    'optical frames',
    'prescription glasses',
    'home trial eyewear',
    'Fovea eyewear',
  ],
  authors: [{ name: 'FOVEA Atelier' }],
  metadataBase: new URL('https://fovea.com'),
  manifest: '/manifest.webmanifest',
  applicationName: 'FOVEA',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'FOVEA',
  },
  icons: {
    icon: [{ url: '/icon.jpeg', type: 'image/jpeg' }],
    shortcut: '/icon.jpeg',
    apple: '/icon.jpeg',
  },
  openGraph: {
    title: 'FOVEA — Handcrafted Luxury Eyewear & Optics',
    description:
      'Architectural eyewear, bespoke optical frames, and complimentary home trial. Experience modern optical precision.',
    type: 'website',
    url: 'https://fovea.com',
    siteName: 'FOVEA',
    locale: 'en_US',
    images: [
      {
        url: '/fovea-logo.jpeg',
        width: 728,
        height: 368,
        alt: 'FOVEA Virtual Eye Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FOVEA — Handcrafted Luxury Eyewear & Optics',
    description:
      'Architectural eyewear, bespoke optical frames, and complimentary home trial.',
    images: ['/fovea-logo.jpeg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#FAF9F6] text-[#0C162C] font-sans antialiased selection:bg-[#0C162C] selection:text-[#FAF9F6]"
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pb-16 lg:pb-0">{children}</main>
            <Footer />
            <MobileBottomBar />
            
            {/* Global interactive drawers & modals */}
            <SearchModal />
            <CartDrawer />
            <WishlistDrawer />
            <WhatsAppModal />
            <HomeTrialModal />
            <HomeTrialFloatingIndicator />
            <PWAInstallPrompt />
            <FoveaChatbot />
          </div>
        </Providers>
      </body>
    </html>
  );
}
