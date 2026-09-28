'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, MessageSquare, Menu, ShoppingBag, User as UserIcon } from 'lucide-react';
import { useFovea } from '@/lib/context';
import MobileNav from './MobileNav';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Automatically reset mobile menu during render if path changes
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

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

  // Transparent on top of home page, solid white/ivory on other pages or upon scroll
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: 'Products', href: '/products' },
    { label: 'Home Trial', href: '/home-trial', highlight: true },
    { label: 'Journal', href: '/blogs' },
    { label: 'About', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled || !isHomePage
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#0C162C]/8 py-3.5 shadow-xs'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Brand Wordmark */}
            <div className="flex items-center gap-3">
              <NextLink
                href="/"
                className="group flex flex-col focus:outline-hidden"
                aria-label="FOVEA Luxury Eyewear Homepage"
              >
                <span className="font-editorial text-2xl sm:text-3xl font-semibold tracking-[0.22em] text-[#0C162C] group-hover:text-[#0D5C63] transition-colors uppercase">
                  FOVEA
                </span>
                <span className="text-[9px] tracking-[0.32em] text-[#0C162C]/60 uppercase hidden sm:block -mt-1 font-sans">
                  Optics & Atelier
                </span>
              </NextLink>
            </div>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <NextLink
                    key={link.href}
                    href={link.href}
                    className={`relative text-xs tracking-[0.14em] uppercase transition-colors py-1 ${
                      link.highlight
                        ? 'text-[#0D5C63] font-semibold'
                        : isActive
                        ? 'text-[#0C162C] font-semibold'
                        : 'text-[#0C162C]/75 hover:text-[#0C162C]'
                    }`}
                  >
                    {link.label}
                    {link.highlight && (
                      <span className="absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#0C162C]" />
                    )}
                  </NextLink>
                );
              })}
            </nav>

            {/* Zone 3: Primary Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="w-11 h-11 flex items-center justify-center text-[#0C162C]/80 hover:text-[#0C162C] hover:bg-[#0C162C]/5 rounded-full transition-colors"
                aria-label="Search collection"
              >
                <Search className="w-[19px] h-[19px]" strokeWidth={1.75} />
              </button>

              {/* Wishlist Trigger */}
              <button
                type="button"
                onClick={() => setIsWishlistOpen(true)}
                className="relative w-11 h-11 flex items-center justify-center text-[#0C162C]/80 hover:text-[#0C162C] hover:bg-[#0C162C]/5 rounded-full transition-colors"
                aria-label={`Wishlist with ${wishlist.length} saved frames`}
              >
                <Heart className="w-[19px] h-[19px]" strokeWidth={1.75} />
                {wishlist.length > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-[#0C162C] text-white text-[10px] font-medium flex items-center justify-center rounded-full leading-none">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative w-11 h-11 flex items-center justify-center text-[#0C162C]/80 hover:text-[#0C162C] hover:bg-[#0C162C]/5 rounded-full transition-colors"
                aria-label={`Shopping bag with ${cartCount} items`}
              >
                <ShoppingBag className="w-[19px] h-[19px]" strokeWidth={1.75} />
                {cartCount > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-[#0D5C63] text-white text-[10px] font-medium flex items-center justify-center rounded-full leading-none">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account Link Trigger */}
              <NextLink
                href={user ? '/account' : '/login'}
                className="relative w-11 h-11 flex items-center justify-center text-[#0C162C]/80 hover:text-[#0C162C] hover:bg-[#0C162C]/5 rounded-full transition-colors"
                aria-label={user ? `Account (${user.fullName})` : 'Sign in to Fovea'}
                title={user ? `Account: ${user.fullName}` : 'Sign in to Fovea'}
              >
                <UserIcon className="w-[19px] h-[19px]" strokeWidth={1.75} />
                {user && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#0D5C63] rounded-full" />
                )}
              </NextLink>

              {/* WhatsApp Concierge Trigger (Desktop) */}
              <button
                type="button"
                onClick={() =>
                  openWhatsAppWithInquiry(
                    'Hello Fovea Concierge, I would like to speak with an optical stylist regarding frame sizing and bespoke lenses.'
                  )
                }
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#0C162C]/85 hover:text-[#0C162C] hover:bg-[#0C162C]/5 rounded-lg transition-colors"
                aria-label="Direct WhatsApp Concierge"
              >
                <MessageSquare className="w-4 h-4 text-[#0D5C63]" strokeWidth={1.8} />
                <span className="tracking-wide">WhatsApp</span>
              </button>

              {/* Special Home Trial CTA Button (Desktop) */}
              <button
                type="button"
                onClick={() => setIsHomeTrialModalOpen(true)}
                className="hidden md:inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold tracking-wider uppercase bg-[#0C162C] text-[#FAF9F6] hover:bg-[#1A365D] active:scale-[0.98] transition-all duration-200 rounded-md shadow-xs"
              >
                Try 4 at Home
              </button>

              {/* Mobile Hamburger Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-11 h-11 flex items-center justify-center text-[#0C162C] hover:bg-[#0C162C]/5 rounded-lg transition-colors ml-1 focus:outline-hidden"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Dedicated Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
