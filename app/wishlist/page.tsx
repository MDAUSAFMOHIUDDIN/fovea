'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Sparkles,
  ArrowRight,
  Compass,
  MessageSquare,
  Trash2,
  Check,
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react';
import { useFovea } from '@/lib/context';
import { PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/common/ProductCard';

export default function WishlistPage() {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    toggleHomeTrialFrame,
    isInHomeTrial,
    openWhatsAppWithInquiry,
    setIsHomeTrialModalOpen,
  } = useFovea();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#0C162C] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Page Header */}
        <div className="border-b border-[#0C162C]/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] text-xs font-semibold uppercase tracking-[0.2em]">
              <Heart className="w-3.5 h-3.5 fill-[#0D5C63]" />
              <span>SAVED ARCHIVE</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl font-semibold tracking-tight leading-tight">
              Your Wishlist.
            </h1>

            <p className="text-base sm:text-lg text-[#0C162C]/75 font-light leading-relaxed">
              Silhouettes reserved for your personal consideration. Sample up to 4 frames in your complimentary 5-day Home Trial suite.
            </p>
          </div>

          {savedProducts.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsHomeTrialModalOpen(true)}
                className="min-h-[46px] px-6 bg-[#0C162C] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#1A365D] transition-all flex items-center gap-2 shadow-xs active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Book Home Trial</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  openWhatsAppWithInquiry(
                    `Hi Fovea Concierge, I have saved ${savedProducts.length} frames to my wishlist (${savedProducts.map((p) => p.name).join(', ')}) and would like styling advice.`
                  )
                }
                className="min-h-[46px] px-5 bg-white border border-[#0C162C]/15 text-[#0C162C] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#F5F3EF] transition-all flex items-center gap-2 active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#0D5C63]" />
                <span>Consult Stylist</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Section */}
        {savedProducts.length === 0 ? (
          <div className="py-20 sm:py-28 text-center space-y-6 bg-white rounded-3xl border border-[#0C162C]/8 p-8 max-w-2xl mx-auto shadow-xs">
            <div className="w-20 h-20 rounded-full bg-[#FAF9F6] border border-[#0C162C]/8 mx-auto flex items-center justify-center text-[#0C162C]/40">
              <Heart className="w-9 h-9 stroke-1 text-[#0C162C]/50" />
            </div>

            <div className="space-y-2">
              <h2 className="font-editorial text-3xl font-semibold text-[#0C162C]">
                Nothing saved yet.
              </h2>
              <p className="text-sm sm:text-base text-[#0C162C]/65 max-w-md mx-auto font-light leading-relaxed">
                Save your favourite handcrafted Japanese titanium and Italian bio-acetate frames while browsing. They will appear here for easy comparison and Home Trial selection.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 min-h-[48px] px-8 bg-[#0C162C] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#1A365D] transition-all shadow-md active:scale-95"
              >
                <Compass className="w-4 h-4 text-[#C5A880]" />
                <span>Explore Eyewear</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between text-xs text-[#0C162C]/60 font-medium">
              <span>
                Showing {savedProducts.length}{' '}
                {savedProducts.length === 1 ? 'saved frame' : 'saved frames'}
              </span>
              <Link
                href="/account"
                className="text-[#0D5C63] hover:underline font-semibold flex items-center gap-1"
              >
                <span>View full Customer Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {savedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Trial Suite Banner */}
            <div className="bg-[#0C162C] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl mt-12">
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C5A880]">
                  Complimentary Atelier Service
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl font-semibold leading-tight">
                  Sample Your Wishlist at Home.
                </h3>
                <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed">
                  Select up to 4 silhouettes to be delivered to your doorstep in our signature velvet case. Take 5 full days to experience them under natural daylight with zero upfront deposit.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => setIsHomeTrialModalOpen(true)}
                    className="min-h-[46px] px-8 bg-[#C5A880] text-[#0C162C] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#D4B890] transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#0C162C]" />
                    <span>Proceed to Home Trial</span>
                  </button>

                  <Link
                    href="/home-trial"
                    className="min-h-[46px] px-6 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <span>How Trial Works</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
