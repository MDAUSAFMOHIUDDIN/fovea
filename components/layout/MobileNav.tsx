'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Heart, ShoppingBag, MessageSquare, ArrowRight, ShieldCheck, Sparkles, User as UserIcon } from 'lucide-react';
import { useFovea } from '@/lib/context';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string; highlight?: boolean }[];
}

export default function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const pathname = usePathname();
  const {
    wishlist,
    cartCount,
    user,
    setIsSearchOpen,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsHomeTrialModalOpen,
    openWhatsAppWithInquiry,
  } = useFovea();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col bg-[#FAF9F6] text-[#0C162C] overflow-y-auto overscroll-contain pb-safe"
        >
          {/* Mobile Nav Top Bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#0C162C]/10">
            <Link
              href="/"
              onClick={onClose}
              className="flex flex-col"
              aria-label="FOVEA Homepage"
            >
              <span className="font-editorial text-2xl font-semibold tracking-[0.2em] text-[#0C162C] uppercase">
                FOVEA
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#0C162C]/60 uppercase -mt-0.5">
                Optics & Atelier
              </span>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#0C162C] hover:bg-[#0C162C]/5 rounded-full transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" strokeWidth={1.8} />
            </button>
          </div>

          {/* Quick Access Bar inside Mobile Menu */}
          <div className="grid grid-cols-5 gap-1.5 px-4 py-3 border-b border-[#0C162C]/8 bg-[#F5F3EF]">
            <button
              type="button"
              onClick={() => {
                onClose();
                setIsSearchOpen(true);
              }}
              className="flex flex-col items-center justify-center py-2 min-h-[48px] rounded-lg hover:bg-white/80 active:bg-white transition-colors"
            >
              <Search className="w-5 h-5 text-[#0C162C]/80" strokeWidth={1.75} />
              <span className="text-[10px] font-medium tracking-tight mt-1 text-[#0C162C]/80">Search</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                setIsWishlistOpen(true);
              }}
              className="relative flex flex-col items-center justify-center py-2 min-h-[48px] rounded-lg hover:bg-white/80 active:bg-white transition-colors"
            >
              <Heart className="w-5 h-5 text-[#0C162C]/80" strokeWidth={1.75} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-2 w-4 h-4 bg-[#0C162C] text-white text-[9px] font-medium flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
              <span className="text-[10px] font-medium tracking-tight mt-1 text-[#0C162C]/80">Wishlist</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                setIsCartOpen(true);
              }}
              className="relative flex flex-col items-center justify-center py-2 min-h-[48px] rounded-lg hover:bg-white/80 active:bg-white transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-[#0C162C]/80" strokeWidth={1.75} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-2 w-4 h-4 bg-[#0D5C63] text-white text-[9px] font-medium flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
              <span className="text-[10px] font-medium tracking-tight mt-1 text-[#0C162C]/80">Bag</span>
            </button>

            <Link
              href={user ? '/account' : '/login'}
              onClick={onClose}
              className="relative flex flex-col items-center justify-center py-2 min-h-[48px] rounded-lg hover:bg-white/80 active:bg-white transition-colors"
            >
              <UserIcon className="w-5 h-5 text-[#0C162C]/80" strokeWidth={1.75} />
              {user && (
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-[#0D5C63] rounded-full" />
              )}
              <span className="text-[10px] font-medium tracking-tight mt-1 text-[#0C162C]/80">
                {user ? 'Account' : 'Sign In'}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => {
                onClose();
                openWhatsAppWithInquiry('Hello Fovea Concierge, I am browsing your mobile collection and would like personal styling guidance.');
              }}
              className="flex flex-col items-center justify-center py-2 min-h-[48px] rounded-lg hover:bg-white/80 active:bg-white transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-[#0D5C63]" strokeWidth={1.8} />
              <span className="text-[10px] font-medium tracking-tight mt-1 text-[#0D5C63]">WhatsApp</span>
            </button>
          </div>

          {/* Primary Mobile Navigation Links */}
          <nav className="flex-1 px-6 py-6 space-y-1">
            {links.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center justify-between py-3.5 min-h-[50px] border-b border-[#0C162C]/5 text-lg font-editorial tracking-wide transition-colors ${
                      link.highlight
                        ? 'text-[#0D5C63] font-semibold'
                        : isActive
                        ? 'text-[#0C162C] font-semibold'
                        : 'text-[#0C162C]/85 hover:text-[#0C162C]'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl">{link.label}</span>
                    <div className="flex items-center gap-2">
                      {link.highlight && (
                        <span className="text-[10px] uppercase tracking-widest text-[#0D5C63] font-sans font-medium px-2 py-0.5 bg-[#0D5C63]/10 rounded">
                          Complimentary
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 text-[#0C162C]/40" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}

            {/* Additional Secondary Links */}
            <div className="pt-4 grid grid-cols-2 gap-3 text-xs tracking-wider uppercase text-[#0C162C]/70">
              <Link href={user ? '/account' : '/login'} onClick={onClose} className="py-2.5 min-h-[44px] flex items-center font-semibold text-[#0D5C63]">
                {user ? 'My Client Account' : 'Sign In / Account'}
              </Link>
              <Link href="/wishlist" onClick={onClose} className="py-2.5 min-h-[44px] flex items-center hover:text-[#0C162C]">
                Saved Wishlist ({wishlist.length})
              </Link>
              <Link href="/offers" onClick={onClose} className="py-2.5 min-h-[44px] flex items-center hover:text-[#0C162C]">
                Exclusive Privileges
              </Link>
              <Link href="/blogs" onClick={onClose} className="py-2.5 min-h-[44px] flex items-center hover:text-[#0C162C]">
                Atelier Journal
              </Link>
              <Link href="/faqs" onClick={onClose} className="py-2.5 min-h-[44px] flex items-center hover:text-[#0C162C]">
                Client Support & FAQs
              </Link>
              <Link href="/about" onClick={onClose} className="py-2.5 min-h-[44px] flex items-center hover:text-[#0C162C]">
                Heritage & Craft
              </Link>
            </div>
          </nav>

          {/* Prominent Mobile Home Trial Callout */}
          <div className="p-6 bg-[#0C162C] text-[#FAF9F6] m-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.18em] text-[#C5A880] font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Fovea Signature Experience
              </span>
              <span className="text-[10px] text-[#FAF9F6]/60">5 Days At Home</span>
            </div>
            <h4 className="font-editorial text-xl font-medium leading-snug">
              Order Your 4-Frame Home Trial Box
            </h4>
            <p className="text-xs text-[#FAF9F6]/75 leading-relaxed">
              Curate four optical or sun frames delivered directly to your home with complimentary round-trip express courier.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                setIsHomeTrialModalOpen(true);
              }}
              className="w-full min-h-[48px] bg-[#FAF9F6] text-[#0C162C] font-semibold text-xs tracking-wider uppercase rounded-lg hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Begin Home Selection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Footer note */}
          <div className="px-6 py-4 text-center text-xs text-[#0C162C]/50 border-t border-[#0C162C]/8">
            <p>Fovea Optics International · Sabae & Varese Craftsmanship</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
