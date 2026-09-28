'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Search, Heart, Sparkles, MessageSquare } from 'lucide-react';
import { useFovea } from '@/lib/context';

export default function MobileBottomBar() {
  const pathname = usePathname();
  const {
    wishlist,
    setIsSearchOpen,
    setIsWishlistOpen,
    setIsHomeTrialModalOpen,
    openWhatsAppWithInquiry,
  } = useFovea();

  // Active check helper
  const isCollections = pathname.startsWith('/collections') || pathname === '/products';
  const isProductDetail = pathname.startsWith('/products/') && pathname !== '/products';
  const isHomeTrial = pathname === '/home-trial';

  // Suppress bottom bar on product details and dedicated home trial page where contextual action bars have sole priority
  if (isProductDetail || isHomeTrial) {
    return null;
  }

  return (
    <nav
      aria-label="Mobile Bottom Quick Actions"
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#FAF9F6]/95 backdrop-blur-md border-t border-[#0C162C]/10 pb-safe transition-transform duration-300"
    >
      <div className="grid grid-cols-5 items-center h-14 px-2 max-w-md mx-auto">
        {/* 1. Browse / Catalog */}
        <Link
          href="/products"
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 transition-colors ${
            isCollections ? 'text-[#0C162C] font-semibold' : 'text-[#0C162C]/65 hover:text-[#0C162C]'
          }`}
        >
          <Compass className="w-[19px] h-[19px]" strokeWidth={isCollections ? 2.2 : 1.75} />
          <span className="text-[10px] tracking-tight mt-0.5">Explore</span>
        </Link>

        {/* 2. Instant Search */}
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 text-[#0C162C]/65 hover:text-[#0C162C] transition-colors"
          aria-label="Open search"
        >
          <Search className="w-[19px] h-[19px]" strokeWidth={1.75} />
          <span className="text-[10px] tracking-tight mt-0.5">Search</span>
        </button>

        {/* 3. Center Highlight: Home Trial Suite */}
        <button
          type="button"
          onClick={() => setIsHomeTrialModalOpen(true)}
          className="relative -top-2 flex flex-col items-center justify-center"
          aria-label="Try 4 frames at home"
        >
          <div className="w-11 h-11 rounded-full bg-[#0C162C] text-[#FAF9F6] shadow-md flex items-center justify-center border-2 border-[#FAF9F6] hover:bg-[#1A365D] active:scale-95 transition-all">
            <Sparkles className="w-5 h-5 text-[#C5A880]" strokeWidth={1.9} />
          </div>
          <span className="text-[10px] font-semibold text-[#0C162C] tracking-tight mt-0.5">
            Try At Home
          </span>
        </button>

        {/* 4. Wishlist */}
        <button
          type="button"
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 text-[#0C162C]/65 hover:text-[#0C162C] transition-colors"
          aria-label={`Wishlist with ${wishlist.length} saved frames`}
        >
          <Heart className="w-[19px] h-[19px]" strokeWidth={1.75} />
          {wishlist.length > 0 && (
            <span className="absolute top-0.5 right-3 w-4 h-4 bg-[#0C162C] text-white text-[9px] font-medium flex items-center justify-center rounded-full">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px] tracking-tight mt-0.5">Saved</span>
        </button>

        {/* 5. Direct WhatsApp Concierge */}
        <button
          type="button"
          onClick={() =>
            openWhatsAppWithInquiry(
              'Hello Fovea Concierge, I am reviewing optical frames on my phone and have a question regarding face fit.'
            )
          }
          className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 text-[#0D5C63] hover:text-[#0C162C] transition-colors"
          aria-label="Contact WhatsApp Concierge"
        >
          <MessageSquare className="w-[19px] h-[19px]" strokeWidth={1.8} />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">WhatsApp</span>
        </button>
      </div>
    </nav>
  );
}
