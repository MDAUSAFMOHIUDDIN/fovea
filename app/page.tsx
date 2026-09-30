'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Check,
  ChevronRight,
  ChevronLeft,
  Heart,
  Plus,
  Eye,
  MessageSquare,
  Truck,
  RotateCcw,
  Sparkle,
  X,
  Compass,
} from 'lucide-react';
import { PRODUCTS, COLLECTIONS, Product } from '@/lib/data';
import { useFovea } from '@/lib/context';

export default function HomePage() {
  const {
    isInWishlist,
    toggleWishlist,
    addToCart,
    isInHomeTrial,
    toggleHomeTrialFrame,
    setIsHomeTrialModalOpen,
    openWhatsAppWithInquiry,
  } = useFovea();

  // Quick View Modal state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewColorIdx, setQuickViewColorIdx] = useState(0);

  // Selected frame style filter
  const [selectedShape, setSelectedShape] = useState<string>('all');

  // Categories with high-end realistic imagery
  const categories = [
    {
      title: 'Men',
      subtitle: 'Architectural Silhouettes',
      href: '/products?category=Optical',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
    },
    {
      title: 'Women',
      subtitle: 'Sculpted Bio-Acetate',
      href: '/products?category=Optical',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    },
    {
      title: 'Sunglasses',
      subtitle: 'ZEISS Mineral Glass',
      href: '/products?category=Sunglasses',
      image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85',
    },
    {
      title: 'Eyeglasses',
      subtitle: 'Ultralight Japanese Titanium',
      href: '/products?category=Optical',
      image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85',
    },
  ];

  // Frame Styles data with realistic photography
  const frameStyles = [
    {
      name: 'Round Panto',
      geometry: '48 — 21 mm',
      shape: 'round-panto',
      desc: 'Historic Parisian intellectual balance',
      image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=85',
      href: '/products?category=Optical',
    },
    {
      name: 'Architectural Square',
      geometry: '50 — 20 mm',
      shape: 'architectural-square',
      desc: 'Diamond-beveled 8mm cured acetate',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=85',
      href: '/products?category=Optical',
    },
    {
      name: 'Double-Bridge Aviator',
      geometry: '54 — 18 mm',
      shape: 'aviator-wire',
      desc: 'High-tensile beta-titanium arch',
      image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=85',
      href: '/products?category=Sunglasses',
    },
    {
      name: 'Crown Panto',
      geometry: '47 — 22 mm',
      shape: 'crown-panto',
      desc: '1940s French flat-browline profile',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85',
      href: '/products?category=Optical',
    },
    {
      name: 'Minimal Hexagon',
      geometry: '49 — 20 mm',
      shape: 'geometric-hex',
      desc: '7.6g unbroken ribbon titanium eyewire',
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=85',
      href: '/products?category=Bespoke+Titanium',
    },
    {
      name: 'Sculpted Cat-Eye',
      geometry: '52 — 19 mm',
      shape: 'cat-eye-sculpt',
      desc: 'Dramatic cheekbone lift with gradient sun lenses',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=85',
      href: '/products?category=Sunglasses',
    },
  ];

  // Featured frames (first 4) and New Arrivals (remaining)
  const featuredFrames = PRODUCTS.slice(0, 4);
  const newArrivals = PRODUCTS.slice(2, 6);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
      {/* =========================================================================
          1. HERO SECTION — Powerful Full-Screen Editorial Fashion Campaign
          ========================================================================= */}
      <section className="relative w-full min-h-[92vh] lg:min-h-screen flex items-end justify-start overflow-hidden bg-[#0C162C]">
        {/* Full-bleed video background with seamless loop and mute */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            className="w-full h-full object-cover object-center bg-[#0C162C]"
          >
            <source src="/glasses.mp4" type="video/mp4" />
          </video>

          {/* Editorial film grain & measured contrast scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C162C] via-black/40 to-black/25" />
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/50" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-20 lg:pb-24 pt-32">
          <div className="max-w-3xl space-y-6 sm:space-y-8">
            {/* Subtle Brand Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs uppercase tracking-[0.24em] font-medium shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
              <span>Atelier Collection · Sabae & Varese</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
            >
              <h1 className="font-editorial text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-[1.04] sm:leading-[1.02] drop-shadow-md">
                SEE DIFFERENTLY.
              </h1>
            </motion.div>

            {/* Supporting Line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="text-base sm:text-xl text-white/85 font-light leading-relaxed max-w-xl drop-shadow-xs"
            >
              Premium eyewear designed around clarity, comfort and character. Handcrafted from Japanese aerospace titanium and cured Italian bio-acetate.
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              {/* Primary CTA */}
              <Link
                href="/products"
                className="min-h-[54px] px-8 bg-white text-[#0C162C] font-semibold text-xs tracking-[0.16em] uppercase rounded-full hover:bg-[#FAF9F6] hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Secondary CTA: Home Trial (High Visual Prominence) */}
              <button
                type="button"
                onClick={() => setIsHomeTrialModalOpen(true)}
                className="min-h-[54px] px-8 bg-[#C5A880] text-[#0C162C] font-semibold text-xs tracking-[0.16em] uppercase rounded-full hover:bg-[#D4B890] hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-xl"
              >
                <Sparkles className="w-4 h-4 text-[#0C162C]" />
                <span>Try at Home · Free 5 Days</span>
              </button>
            </motion.div>

            {/* Quick Hero Micro-Trust */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-white/70"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                Complimentary 4-Frame Home Trial
              </span>
              <span className="text-white/30 hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                Free Worldwide Express Courier
              </span>
              <span className="text-white/30 hidden sm:inline">·</span>
              <span>Carl Zeiss Vision Lenses</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. QUICK CATEGORY DISCOVERY (Warm White Tone `#FAF9F6`)
          ========================================================================= */}
      <section className="py-14 sm:py-20 bg-[#FAF9F6] border-b border-[#0C162C]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.24em] font-semibold text-[#0D5C63] block">
                Atelier Catalog
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0C162C]">
                Explore by Category
              </h2>
            </div>
            <Link
              href="/products"
              className="mt-2 sm:mt-0 text-xs uppercase tracking-wider font-semibold text-[#0C162C] hover:text-[#0D5C63] flex items-center gap-1.5 transition-colors"
            >
              <span>View All Eyewear</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Swipeable horizontal grid on mobile, 4-column layout on desktop */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="group relative flex-none w-[75vw] sm:w-auto aspect-3/4 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 snap-center bg-[#ECE8DF]"
              >
                <Image
                  src={cat.image}
                  alt={`${cat.title} collection`}
                  fill
                  sizes="(max-width: 768px) 75vw, 300px"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                {/* Content Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1 z-10">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                    {cat.subtitle}
                  </span>
                  <h3 className="font-editorial text-3xl font-semibold leading-tight">
                    {cat.title}
                  </h3>
                  <div className="pt-2 flex items-center gap-1.5 text-xs text-white/80 group-hover:text-white font-medium uppercase tracking-wider">
                    <span>Discover</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SIGNATURE COLLECTION — Asymmetrical Editorial Layout (Ivory / Soft Cream `#F5F3EF`)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#F5F3EF] border-b border-[#0C162C]/8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Large Lifestyle Model Portrait (Asymmetrical Left) */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-4/5 w-full rounded-3xl overflow-hidden shadow-2xl bg-[#E8E4DC]">
                <Image
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&q=85"
                  alt="Model wearing Fovea Meridian Crown in natural sunlight"
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Subtle Image Tag */}
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block">
                    Campaign Series 03
                  </span>
                  <p className="font-editorial text-2xl font-medium">The Meridian Crown</p>
                </div>
              </div>

              {/* Floating Realistic Product Card Overlay (Top Right of image) */}
              <div className="hidden sm:flex absolute -bottom-8 -right-8 w-60 aspect-4/3 bg-white p-3 rounded-2xl shadow-2xl border border-white/80 items-center justify-center overflow-hidden z-20 group">
                <Image
                  src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=85"
                  alt="Close-up of sculpted Havana acetate frame"
                  fill
                  sizes="300px"
                  referrerPolicy="no-referrer"
                  className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs text-[10px] text-white px-2 py-1 rounded text-center font-medium">
                  Sculpted 8mm Bio-Acetate
                </div>
              </div>
            </div>

            {/* Opposite Side: Asymmetrical Editorial Narrative */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.28em] font-semibold text-[#0D5C63] block">
                  FOVEA COLLECTION
                </span>
                <h2 className="font-editorial text-4xl sm:text-6xl font-semibold text-[#0C162C] leading-[1.08] text-balance">
                  Designed to be noticed.
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[#0C162C]/75 font-light leading-relaxed">
                A confluence of 1940s French architectural proportions and Japanese cold-milled metallurgy.
                Substantial volumes contoured with featherweight precision so they never weigh upon your bridge.
              </p>

              {/* Specs callouts */}
              <div className="grid grid-cols-2 gap-4 py-2 border-y border-[#0C162C]/10 text-xs">
                <div>
                  <span className="font-mono text-base font-bold text-[#0C162C] block">16.5g</span>
                  <span className="text-[#0C162C]/60">Total Frame Weight</span>
                </div>
                <div>
                  <span className="font-mono text-base font-bold text-[#0C162C] block">120 Days</span>
                  <span className="text-[#0C162C]/60">Cellulose Curing</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/collections/the-panto-renaissance"
                  className="min-h-[50px] px-8 bg-[#0C162C] text-[#FAF9F6] font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-[#1A365D] hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Discover the Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsHomeTrialModalOpen(true)}
                  className="min-h-[50px] px-6 bg-white border border-[#0C162C]/15 text-[#0C162C] font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-[#FAF9F6] transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Try In Box</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FEATURED FRAMES — Clean Luxurious Showcase (Pure White `#FFFFFF`)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#0C162C]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.24em] font-semibold text-[#0D5C63] block">
                Atelier Highlights
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C]">
                Frames Worth Looking Twice At
              </h2>
            </div>

            <Link
              href="/products"
              className="mt-4 sm:mt-0 text-xs uppercase tracking-wider font-semibold text-[#0C162C] hover:text-[#0D5C63] flex items-center gap-1.5 transition-colors"
            >
              <span>View Complete Repertoire</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Desktop Grid (4 items) / Mobile Horizontal Peek-Ahead Carousel */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
            {featuredFrames.map((product) => {
              const inWishlist = isInWishlist(product.id);
              const inHomeTrial = isInHomeTrial(product.id);

              return (
                <div
                  key={product.id}
                  className="group relative flex-none w-[78vw] sm:w-auto flex flex-col bg-white rounded-3xl border border-[#0C162C]/8 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 snap-center"
                >
                  {/* Photo Canvas with crossfade on hover */}
                  <div className="relative aspect-4/3 w-full bg-[#F5F3EF] overflow-hidden">
                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#0D5C63] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs">
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className={`absolute top-3 right-3 z-10 w-11 h-11 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${
                        inWishlist
                          ? 'bg-[#0C162C] text-[#FAF9F6] shadow-md scale-105'
                          : 'bg-white/85 text-[#0C162C]/70 hover:text-[#0C162C] hover:bg-white shadow-xs backdrop-blur-xs'
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart className="w-4 h-4 sm:w-3.5 sm:h-3.5" strokeWidth={1.8} fill={inWishlist ? 'currentColor' : 'none'} />
                    </button>

                    {/* Product Photo Link */}
                    <Link href={`/products/${product.slug}`} className="block w-full h-full relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 78vw, 300px"
                        referrerPolicy="no-referrer"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </Link>

                    {/* Quick View Button (Desktop Reveal) */}
                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(product)}
                      className="hidden lg:flex absolute bottom-3 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-sm text-white text-xs font-medium items-center gap-1.5 hover:bg-black"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Metadata */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3 bg-white">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#0C162C]/60 font-medium">
                        <span className="text-[#0D5C63] font-semibold">{product.series}</span>
                        <span>·</span>
                        <span>{product.frameShape}</span>
                      </div>

                      <Link
                        href={`/products/${product.slug}`}
                        className="font-editorial text-2xl font-semibold text-[#0C162C] hover:text-[#0D5C63] transition-colors block leading-tight"
                      >
                        {product.name}
                      </Link>

                      <div className="flex items-center justify-between text-xs text-[#0C162C]/70 pt-0.5">
                        <span className="font-mono text-[11px] text-[#0C162C]/50">{product.dimensions}</span>
                        <span className="font-editorial text-lg font-semibold tabular-nums text-[#0C162C]">
                          ${product.price}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#0C162C]/8">
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="min-h-[44px] px-3 bg-[#0C162C] text-[#FAF9F6] hover:bg-[#1A365D] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 active:scale-95 shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Bag</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleHomeTrialFrame(product.id)}
                        className={`min-h-[44px] px-3 border rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1 active:scale-95 ${
                          inHomeTrial
                            ? 'bg-[#0D5C63]/10 border-[#0D5C63] text-[#0D5C63]'
                            : 'border-[#0C162C]/15 text-[#0C162C] hover:bg-[#FAF9F6]'
                        }`}
                      >
                        {inHomeTrial ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>In Trial</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                            <span>Trial</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. HOME TRIAL — Major Dedicated Experience (Warm Beige / Stone `#EDE8DF`)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#EDE8DF] border-b border-[#0C162C]/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Editorial Photo of someone trying eyewear at home */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-4/5 w-full rounded-3xl overflow-hidden shadow-2xl bg-[#DCD6C9] border border-white/60">
                <Image
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=85"
                  alt="Client trying luxury optical frames comfortably at home in warm natural light"
                  fill
                  sizes="(max-width: 1024px) 100vw, 650px"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block">
                      Natural Lighting
                    </span>
                    <p className="font-editorial text-2xl font-medium">5 Days to Decide</p>
                  </div>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-white">
                    Zero Obligation
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Narrative & 3-Step Flow */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>The Fovea Signature Service</span>
                </div>
                <h2 className="font-editorial text-4xl sm:text-6xl font-semibold text-[#0C162C] leading-[1.08] text-balance">
                  The Store Comes to You.
                </h2>
                <p className="text-base sm:text-lg text-[#0C162C]/75 font-light leading-relaxed">
                  Choose your favourites. Try them comfortably at home. Decide without the rush under your everyday wardrobe and natural lighting.
                </p>
              </div>

              {/* 3-Step Visual Flow */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/80 border border-[#0C162C]/8 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#0C162C] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    01
                  </div>
                  <div>
                    <h4 className="font-editorial text-lg font-semibold text-[#0C162C]">
                      Choose 4 Frames
                    </h4>
                    <p className="text-xs text-[#0C162C]/70 mt-0.5 font-light leading-relaxed">
                      Browse our Japanese titanium and Italian bio-acetate repertoire. Select any four silhouettes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/80 border border-[#0C162C]/8 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#0C162C] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    02
                  </div>
                  <div>
                    <h4 className="font-editorial text-lg font-semibold text-[#0C162C]">
                      Book Your Trial
                    </h4>
                    <p className="text-xs text-[#0C162C]/70 mt-0.5 font-light leading-relaxed">
                      Dispatched in our velvet presentation case via complimentary express courier with zero upfront cost.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/80 border border-[#0C162C]/8 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#0C162C] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    03
                  </div>
                  <div>
                    <h4 className="font-editorial text-lg font-semibold text-[#0C162C]">
                      Try Them at Home
                    </h4>
                    <p className="text-xs text-[#0C162C]/70 mt-0.5 font-light leading-relaxed">
                      Take five full days to wear them with your daily outfits. Send back with prepaid courier label or enter prescription online.
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsHomeTrialModalOpen(true)}
                  className="min-h-[52px] px-8 bg-[#0C162C] text-[#FAF9F6] font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-[#1A365D] hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  <span>Book a Home Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/home-trial"
                  className="text-xs font-semibold uppercase tracking-wider text-[#0C162C] hover:text-[#0D5C63] text-center"
                >
                  Learn Detailed Trial Steps →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SECOND CINEMATIC BANNER — Full-Width Photographic Parallax
          ========================================================================= */}
      <section className="relative w-full min-h-[65vh] sm:min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#1A202C]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=2200&q=85"
            alt="Side profile wearing sophisticated Fovea titanium eyewear in dramatic daylight"
            fill
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="object-cover object-[center_35%]"
          />
          {/* Measured cinematic contrast overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/75" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6 text-white py-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880] block">
            The Fovea Viewpoint
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-tight text-balance">
            Made for Your Point of View.
          </h2>
          <p className="text-sm sm:text-lg text-white/80 font-light max-w-lg mx-auto leading-relaxed">
            Crafted for an intimate fit that disappears against your temple while anchoring your gaze with quiet confidence.
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex min-h-[52px] px-8 bg-white text-[#0C162C] font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-[#FAF9F6] hover:shadow-2xl transition-all shadow-xl items-center gap-2"
            >
              <span>Explore Fovea</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. SHOP BY FRAME STYLE — Interactive Real Frame Geometries (Light Grey `#F7F6F3`)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#F7F6F3] border-b border-[#0C162C]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.24em] font-semibold text-[#0D5C63] block">
                Geometry & Fit
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C]">
                Shop by Frame Style
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#0C162C]/65 max-w-sm mt-2 sm:mt-0 font-light">
              Each shape calibrated to facial proportions, bridge heights, and lens thicknesses.
            </p>
          </div>

          {/* Real Photography Frames Grid (Desktop 3x2, Mobile Horizontal Swipe) */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
            {frameStyles.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group relative flex-none w-[75vw] sm:w-auto bg-white rounded-3xl border border-[#0C162C]/8 overflow-hidden p-6 shadow-xs hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 snap-center flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#0C162C]/50">
                    <span className="font-mono">{item.geometry}</span>
                    <span className="uppercase tracking-widest text-[#0D5C63] font-semibold">Shape 0{idx + 1}</span>
                  </div>

                  {/* Real Frame Photo */}
                  <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#FAF9F6]">
                    <Image
                      src={item.image}
                      alt={`${item.name} frame geometry`}
                      fill
                      sizes="(max-width: 768px) 75vw, 350px"
                      referrerPolicy="no-referrer"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div>
                    <h3 className="font-editorial text-2xl font-semibold text-[#0C162C] group-hover:text-[#0D5C63] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#0C162C]/60 mt-1 font-light">{item.desc}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#0C162C]/5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#0C162C] group-hover:text-[#0D5C63]">
                  <span>Explore Silhouette</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. REAL DETAILS / CRAFT SECTION — Macro High-Contrast Atelier Split (Deep Charcoal `#0C162C`)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#0C162C] text-[#FAF9F6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-[0.28em] font-semibold text-[#C5A880]">
              Optical Engineering
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl font-semibold text-white">
              It&apos;s in the Details.
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
              True luxury in eyewear cannot be faked with gold leaf or superficial branding. It lives in the micron-level tolerance of the hinge, the balance across the nasal cartilage, and the chemical stability of the cellulose.
            </p>
          </div>

          {/* Macro Editorial Photography Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Macro 1: Hinge & Screwless Pivot */}
            <div className="bg-[#141C2E] border border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group">
              <div className="relative aspect-4/3 w-full overflow-hidden bg-black/40">
                <Image
                  src="https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=1200&q=85"
                  alt="Macro shot of titanium eyewear hinge and screw assembly"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-8 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-mono">01 / FRICTIONLESS PIVOT</span>
                <h3 className="font-editorial text-2xl font-semibold text-white">0.05mm Machining</h3>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  Cold-milled titanium barrel hinges rated for 50,000 smooth cycles without loosening or side wobble.
                </p>
              </div>
            </div>

            {/* Macro 2: Cold-Milling In Sabae */}
            <div className="bg-[#141C2E] border border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group">
              <div className="relative aspect-4/3 w-full overflow-hidden bg-black/40">
                <Image
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85"
                  alt="Japanese Sabae cold hydraulic compression machine"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-8 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-mono">02 / AEROSPACE METALLURGY</span>
                <h3 className="font-editorial text-2xl font-semibold text-white">Pure Japanese Titanium</h3>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  Bio-inert, zero nickel, non-oxidizing and resilient against sweat, humidity and seawater corrosion.
                </p>
              </div>
            </div>

            {/* Macro 3: Cured Mazzucchelli Bio-Acetate */}
            <div className="bg-[#141C2E] border border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group">
              <div className="relative aspect-4/3 w-full overflow-hidden bg-black/40">
                <Image
                  src="https://images.unsplash.com/photo-1577744486770-020ab432da65?auto=format&fit=crop&w=1200&q=85"
                  alt="Organic cotton fibers and cured cellulose acetate slabs"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-8 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-mono">03 / TACTILE MASTERY</span>
                <h3 className="font-editorial text-2xl font-semibold text-white">4-Month Cured Acetate</h3>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  Cotton-derived cellulose aged in climate vaults to stabilize molecules, then hand-buffed in beechwood shavings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. NEW ARRIVALS — High-Whitespace Fresh Drop (Pure Warm White `#FAF9F6`)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#0C162C]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.24em] font-semibold text-[#0D5C63] block">
                Autumn Edition
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C]">
                Fresh From the Sabae Atelier
              </h2>
            </div>
            <Link
              href="/products"
              className="mt-2 sm:mt-0 text-xs uppercase tracking-wider font-semibold text-[#0C162C] hover:text-[#0D5C63] flex items-center gap-1.5 transition-colors"
            >
              <span>Explore All Releases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* New Arrivals Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => {
              const inWishlist = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-white rounded-3xl border border-[#0C162C]/8 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
                >
                  <div className="relative aspect-4/3 w-full bg-[#F5F3EF] overflow-hidden">
                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product.id);
                      }}
                      className={`absolute top-4 right-4 z-10 min-w-[38px] min-h-[38px] rounded-full flex items-center justify-center transition-all ${
                        inWishlist
                          ? 'bg-[#0C162C] text-[#FAF9F6] shadow-md'
                          : 'bg-white/80 text-[#0C162C]/70 hover:text-[#0C162C] hover:bg-white shadow-xs'
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart className="w-4 h-4" strokeWidth={1.8} fill={inWishlist ? 'currentColor' : 'none'} />
                    </button>

                    <Link href={`/products/${product.slug}`} className="block w-full h-full relative">
                      <Image
                        src={product.hoverImage || product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        referrerPolicy="no-referrer"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </Link>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3 bg-white">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#0D5C63] font-semibold block">
                        {product.series}
                      </span>
                      <Link
                        href={`/products/${product.slug}`}
                        className="font-editorial text-2xl font-semibold text-[#0C162C] hover:text-[#0D5C63] transition-colors block leading-tight mt-0.5"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-[#0C162C]/60 mt-1 font-light line-clamp-1">
                        {product.shortDesc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#0C162C]/8 flex items-center justify-between">
                      <span className="font-editorial text-xl font-semibold tabular-nums text-[#0C162C]">
                        ${product.price}
                      </span>
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 bg-[#0C162C] text-[#FAF9F6] hover:bg-[#1A365D] rounded-full text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. FOVEA BRAND MOMENT — Emotional Lifestyle Monograph
          ========================================================================= */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#0C162C]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=2200&q=85"
            alt="Warm golden hour atmospheric lifestyle portrait looking toward horizon"
            fill
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-6 text-white py-20">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880] block">
            The Brand Manifesto
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-tight">
            Vision Is Personal.
          </h2>
          <p className="text-base sm:text-xl text-white/85 font-light leading-relaxed max-w-xl mx-auto">
            The world changes depending on how clearly you view it. Every Fovea frame is engineered to sharpen your gaze and accompany your life with effortless dignity.
          </p>
          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex min-h-[50px] px-8 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors items-center gap-2"
            >
              <span>Read the Atelier Story</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. TRUST & CONCIERGE SERVICE STRIP (Minimal Premium Bar `#FAF9F6`)
          ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#FAF9F6] border-t border-[#0C162C]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {/* 1. Home Trial */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs font-semibold text-[#0C162C] block">
                  Complimentary Home Trial
                </strong>
                <span className="text-[11px] text-[#0C162C]/60 block mt-0.5">
                  Try 4 frames for 5 days at home
                </span>
              </div>
            </div>

            {/* 2. Quality */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs font-semibold text-[#0C162C] block">
                  2-Year Atelier Warranty
                </strong>
                <span className="text-[11px] text-[#0C162C]/60 block mt-0.5">
                  Japanese titanium & bio-acetate
                </span>
              </div>
            </div>

            {/* 3. Delivery */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs font-semibold text-[#0C162C] block">
                  Insured Express Delivery
                </strong>
                <span className="text-[11px] text-[#0C162C]/60 block mt-0.5">
                  Complimentary round-trip courier
                </span>
              </div>
            </div>

            {/* 4. WhatsApp Support */}
            <button
              type="button"
              onClick={() =>
                openWhatsAppWithInquiry(
                  'Hello Fovea Concierge, I would like personal optical styling advice.'
                )
              }
              className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-[#F5F3EF] transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] flex items-center justify-center shrink-0 group-hover:bg-[#0D5C63] group-hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs font-semibold text-[#0C162C] block group-hover:text-[#0D5C63] transition-colors">
                  WhatsApp Concierge
                </strong>
                <span className="text-[11px] text-[#0C162C]/60 block mt-0.5">
                  Direct face styling guidance
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          QUICK VIEW MODAL (Interactive Desktop / Mobile Frame Inspector)
          ========================================================================= */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 bg-[#0C162C]/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto border border-[#0C162C]/10"
            >
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#0C162C] shadow-md flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Photo */}
                <div className="relative aspect-4/3 md:aspect-auto h-72 md:h-full bg-[#F5F3EF]">
                  <Image
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="p-8 space-y-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#0D5C63] font-semibold block">
                      {quickViewProduct.series}
                    </span>
                    <h3 className="font-editorial text-3xl font-semibold text-[#0C162C]">
                      {quickViewProduct.name}
                    </h3>
                    <div className="font-editorial text-2xl font-semibold text-[#0C162C] tabular-nums">
                      ${quickViewProduct.price}
                    </div>

                    <p className="text-xs text-[#0C162C]/75 font-light leading-relaxed">
                      {quickViewProduct.editorialStory}
                    </p>

                    <div className="p-3 bg-[#FAF9F6] rounded-xl text-xs text-[#0C162C]/70 space-y-0.5">
                      <p><strong>Dimensions:</strong> {quickViewProduct.dimensions}</p>
                      <p><strong>Material:</strong> {quickViewProduct.material}</p>
                      <p><strong>Weight:</strong> {quickViewProduct.weight}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(quickViewProduct);
                          setQuickViewProduct(null);
                        }}
                        className="min-h-[46px] bg-[#0C162C] text-[#FAF9F6] rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#1A365D] transition-colors"
                      >
                        Add to Bag
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          toggleHomeTrialFrame(quickViewProduct.id);
                          setQuickViewProduct(null);
                        }}
                        className="min-h-[46px] border border-[#0C162C]/20 text-[#0C162C] rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#FAF9F6] transition-colors"
                      >
                        Add to Trial Box
                      </button>
                    </div>

                    <Link
                      href={`/products/${quickViewProduct.slug}`}
                      onClick={() => setQuickViewProduct(null)}
                      className="block text-center text-xs text-[#0D5C63] font-semibold hover:underline"
                    >
                      View Full Product Page & Lens Surfacing →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
