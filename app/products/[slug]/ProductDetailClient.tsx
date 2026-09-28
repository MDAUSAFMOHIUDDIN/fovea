'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Sparkles,
  Heart,
  ShieldCheck,
  Check,
  MessageSquare,
  Truck,
  RotateCcw,
  Eye,
  Plus,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Ruler,
  HelpCircle,
  X,
  Share2,
} from 'lucide-react';
import { Product } from '@/lib/data';
import { useFovea } from '@/lib/context';
import ProductCard from '@/components/common/ProductCard';

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const {
    isInWishlist,
    toggleWishlist,
    addToCart,
    isInHomeTrial,
    toggleHomeTrialFrame,
    homeTrialFrames,
    setIsHomeTrialModalOpen,
    openWhatsAppWithInquiry,
  } = useFovea();

  // Multi-angle realistic photo gallery
  const galleryImages = [
    { label: 'Front Studio', src: product.image, angle: 'Frontal Perspective' },
    { label: '45° Angle', src: product.hoverImage, angle: 'Three-Quarter View' },
    { label: 'Profile Temple', src: product.sideImage || product.hoverImage, angle: 'Lateral Profile' },
    { label: 'Folded Frame', src: product.foldedImage || product.image, angle: 'Folded Storage' },
    { label: 'Hinge & Macro', src: product.detailImage, angle: 'Macro Bevel Detail' },
    { label: 'Campaign Model', src: product.modelImage, angle: 'Editorial Fitting' },
  ];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedLens, setSelectedLens] = useState<
    'Plano Demonstration' | 'Prescription Single-Vision' | 'Prescription Progressive'
  >('Plano Demonstration');

  // Interactive feedback toast
  const [trialToast, setTrialToast] = useState<string | null>(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Mobile touch swipe handling
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // Mobile sticky bottom action bar scroll observer
  const [showStickyBar, setShowStickyBar] = useState(false);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroSectionRef.current) {
        const rect = heroSectionRef.current.getBoundingClientRect();
        // Show sticky bar when user scrolls past 60% of product top section
        setShowStickyBar(rect.bottom < 150);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diff = touchStartXRef.current - touchEndXRef.current;
      if (diff > 45) {
        // Swiped left -> next
        setActivePhotoIdx((prev) => (prev + 1) % galleryImages.length);
      } else if (diff < -45) {
        // Swiped right -> prev
        setActivePhotoIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const currentColor = product.colors[selectedColorIdx] || product.colors[0];
  const inWishlist = isInWishlist(product.id);
  const inHomeTrial = isInHomeTrial(product.id);

  // Lens cost adjustment
  const lensCost =
    selectedLens === 'Prescription Single-Vision'
      ? 120
      : selectedLens === 'Prescription Progressive'
      ? 240
      : 0;
  const totalPrice = product.price + lensCost;

  const handleToggleHomeTrial = () => {
    const result = toggleHomeTrialFrame(product.id);
    if (!inHomeTrial) {
      if (result) {
        setTrialToast(`"${product.name}" added to Home Trial Suite (${homeTrialFrames.length + 1}/4)`);
        setTimeout(() => setTrialToast(null), 4000);
      } else {
        setTrialToast('Trial suite full (Max 4 frames). Tap to review or replace.');
        setTimeout(() => setTrialToast(null), 4000);
      }
    } else {
      setTrialToast(`Removed from Home Trial`);
      setTimeout(() => setTrialToast(null), 3000);
    }
  };

  const handleWhatsAppConsultation = () => {
    const code = product.productCode || `FOV-SB-${product.id.slice(-2)}`;
    const productUrl = `https://fovea.com/products/${product.slug}`;
    const text = `Hello Fovea Concierge! I am looking at ${product.name} (${code}) in ${currentColor.name} ($${totalPrice}) on ${productUrl}. Could an optical stylist advise on face shape compatibility and lens options?`;
    openWhatsAppWithInquiry(text);
  };

  return (
    <div className="py-6 sm:py-12 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumbs & Share */}
        <div className="flex items-center justify-between">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#0C162C]/60 hover:text-[#0C162C] font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Optical Repertoire</span>
          </Link>

          <div className="flex items-center gap-4 text-xs text-[#0C162C]/60">
            <span className="hidden sm:inline font-mono">
              {product.productCode || `REF. FOV-${product.id.toUpperCase().slice(-3)}`}
            </span>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  navigator.clipboard.writeText(window.location.href);
                  setTrialToast('Frame link copied to clipboard');
                  setTimeout(() => setTrialToast(null), 2500);
                }
              }}
              className="hover:text-[#0C162C] transition-colors flex items-center gap-1.5"
              aria-label="Share frame"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert Toast */}
        <AnimatePresence>
          {trialToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 bg-[#0C162C] text-[#FAF9F6] text-xs font-semibold rounded-full shadow-2xl flex items-center gap-3 border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>{trialToast}</span>
              <button
                type="button"
                onClick={() => setIsHomeTrialModalOpen(true)}
                className="underline text-[#C5A880] hover:text-white transition-colors"
              >
                View Suite →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Contiguous Purchase Module & Gallery Grid */}
        <div ref={heroSectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ============================================================== */}
          {/* LEFT: PHOTOREALISTIC MULTI-ANGLE GALLERY */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Primary Product Studio Canvas */}
            <div
              className="relative aspect-4/3 w-full bg-[#F5F3EF] rounded-3xl overflow-hidden shadow-lg border border-[#0C162C]/10 group touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={galleryImages[activePhotoIdx].src}
                alt={`${product.name} - ${galleryImages[activePhotoIdx].label}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 750px"
                referrerPolicy="no-referrer"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Angle / View Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[11px] font-semibold text-[#0C162C] bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full shadow-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D5C63]" />
                  <span>{galleryImages[activePhotoIdx].label}</span>
                </span>
              </div>

              {/* Action Buttons: Wishlist & Zoom */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsZoomOpen(true)}
                  className="min-w-[42px] min-h-[42px] rounded-full bg-white/90 text-[#0C162C]/70 hover:text-[#0C162C] hover:bg-white shadow-xs flex items-center justify-center transition-all"
                  aria-label="Inspect high resolution photo"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`min-w-[42px] min-h-[42px] rounded-full flex items-center justify-center transition-all shadow-xs ${
                    inWishlist
                      ? 'bg-[#0C162C] text-[#FAF9F6] shadow-md scale-105'
                      : 'bg-white/90 text-[#0C162C]/70 hover:text-[#0C162C] hover:bg-white'
                  }`}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className="w-4 h-4" fill={inWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Mobile Swipe Chevrons */}
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs text-[#0C162C] flex items-center justify-center shadow-md hover:bg-white transition-all sm:opacity-0 group-hover:opacity-100"
                aria-label="Previous angle"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setActivePhotoIdx((prev) => (prev + 1) % galleryImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs text-[#0C162C] flex items-center justify-center shadow-md hover:bg-white transition-all sm:opacity-0 group-hover:opacity-100"
                aria-label="Next angle"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Mobile Progress Dots */}
              <div className="absolute bottom-4 left-0 right-0 z-10 flex items-center justify-center gap-1.5">
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActivePhotoIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activePhotoIdx === i ? 'w-6 bg-[#0C162C]' : 'w-1.5 bg-[#0C162C]/30'
                    }`}
                    aria-label={`View photo ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Row: Front, 45°, Profile, Folded, Macro, Model */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`relative aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all group ${
                    activePhotoIdx === idx
                      ? 'border-[#0C162C] ring-2 ring-[#0C162C]/20 shadow-md scale-102'
                      : 'border-[#0C162C]/10 opacity-70 hover:opacity-100 hover:border-[#0C162C]/30'
                  }`}
                  aria-label={`Select ${img.label}`}
                >
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    sizes="120px"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-xs text-[8px] sm:text-[9px] text-white text-center py-0.5 font-medium truncate">
                    {img.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Desktop Detailed Frame Dimensions Diagram & Size Visualizer */}
            <div className="bg-white rounded-3xl border border-[#0C162C]/10 p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#0D5C63]" />
                  <h3 className="font-editorial text-xl font-semibold text-[#0C162C]">
                    Optical Geometric Measurements
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-xs text-[#0D5C63] font-semibold hover:underline flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Size & Fitting Guide</span>
                </button>
              </div>

              {/* 5 Measurements Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <div className="p-3 bg-[#F5F3EF] rounded-xl text-center">
                  <span className="text-[10px] uppercase tracking-wider text-[#0C162C]/50 block">
                    Lens Width
                  </span>
                  <span className="font-mono text-base font-bold text-[#0C162C] mt-0.5 block">
                    {product.lensWidth} mm
                  </span>
                </div>

                <div className="p-3 bg-[#F5F3EF] rounded-xl text-center">
                  <span className="text-[10px] uppercase tracking-wider text-[#0C162C]/50 block">
                    Bridge Width
                  </span>
                  <span className="font-mono text-base font-bold text-[#0C162C] mt-0.5 block">
                    {product.bridgeWidth} mm
                  </span>
                </div>

                <div className="p-3 bg-[#F5F3EF] rounded-xl text-center">
                  <span className="text-[10px] uppercase tracking-wider text-[#0C162C]/50 block">
                    Temple Length
                  </span>
                  <span className="font-mono text-base font-bold text-[#0C162C] mt-0.5 block">
                    {product.templeLength} mm
                  </span>
                </div>

                <div className="p-3 bg-[#F5F3EF] rounded-xl text-center">
                  <span className="text-[10px] uppercase tracking-wider text-[#0C162C]/50 block">
                    Frame Width
                  </span>
                  <span className="font-mono text-base font-bold text-[#0C162C] mt-0.5 block">
                    {product.frameWidth || 138} mm
                  </span>
                </div>

                <div className="p-3 bg-[#F5F3EF] rounded-xl text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#0C162C]/50 block">
                    Lens Height
                  </span>
                  <span className="font-mono text-base font-bold text-[#0C162C] mt-0.5 block">
                    {product.lensHeight || 43} mm
                  </span>
                </div>
              </div>

              {/* Expandable Size Guide */}
              {showSizeGuide && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#0C162C]/8 text-xs text-[#0C162C]/80 space-y-2"
                >
                  <p className="font-semibold text-[#0C162C]">How to Measure Your Eyewear Fit:</p>
                  <p className="text-[11px] leading-relaxed">
                    Check the inside of your current favorite glasses. You will see numbers like <b>{product.lensWidth}-{product.bridgeWidth}-{product.templeLength}</b> printed on the inner temple. If your measurements are within 2mm, this frame will provide a natural, tailored balance without slipping.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Atelier Craftsmanship & Metallurgy Notes */}
            <div className="p-6 sm:p-8 bg-[#F5F3EF] rounded-3xl border border-[#0C162C]/8 space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#0D5C63] font-semibold">
                <span>Atelier Sabae & Varese</span>
                <span>·</span>
                <span>Materials & Craftsmanship</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C]">
                Metallurgy & Optical Geometry
              </h3>
              <p className="text-xs sm:text-sm text-[#0C162C]/80 leading-relaxed font-light">
                {product.editorialStory}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#0C162C]/75">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D5C63] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT: CONTIGUOUS PURCHASE MODULE (STICKY ON DESKTOP) */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-3xl border border-[#0C162C]/10 p-6 sm:p-8 shadow-xl space-y-6">
              {/* Product Header Information */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#0D5C63]">
                    {product.series}
                  </span>
                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1.5 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    In Atelier Stock
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0C162C]">
                    {product.name}
                  </h1>
                </div>

                <div className="flex items-center justify-between text-xs text-[#0C162C]/60 pt-0.5">
                  <span className="font-mono font-medium">
                    {product.productCode || `FOV-SB-${product.id.slice(-2)}`}
                  </span>
                  <span>{product.gender} · {product.category}</span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="font-editorial text-3xl sm:text-4xl font-semibold tabular-nums text-[#0C162C]">
                    ${totalPrice}
                  </span>
                  {lensCost > 0 ? (
                    <span className="text-xs text-[#0C162C]/60">
                      (Includes ${lensCost} Carl Zeiss Optic Surfacing)
                    </span>
                  ) : (
                    <span className="text-xs text-[#0C162C]/60">
                      (Includes presentation velvet case)
                    </span>
                  )}
                </div>
              </div>

              {/* Color Swatch Selection */}
              <div className="space-y-2.5 pt-3 border-t border-[#0C162C]/8">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0C162C]">Selected Finish:</span>
                  <span className="text-[#0D5C63] font-medium">{currentColor.name}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`min-h-[44px] px-3.5 py-2 rounded-xl border flex items-center gap-2.5 text-xs transition-all ${
                        selectedColorIdx === idx
                          ? 'border-[#0C162C] bg-[#FAF9F6] shadow-sm ring-1 ring-[#0C162C]'
                          : 'border-[#0C162C]/15 hover:border-[#0C162C]/40 bg-white'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-xs"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="font-medium text-[#0C162C] truncate max-w-[120px]">
                        {color.name}
                      </span>
                      {selectedColorIdx === idx && (
                        <Check className="w-3.5 h-3.5 text-[#0C162C]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Essential Frame Information Chips (Mobile First Priority) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-[#0C162C]/8">
                <div className="p-2.5 bg-[#F5F3EF] rounded-xl text-center">
                  <span className="text-[10px] uppercase tracking-wider text-[#0C162C]/50 block">Shape</span>
                  <span className="text-xs font-semibold text-[#0C162C] block truncate">{product.frameShape}</span>
                </div>

                <div className="p-2.5 bg-[#F5F3EF] rounded-xl text-center">
                  <span className="text-[10px] uppercase tracking-wider text-[#0C162C]/50 block">Weight</span>
                  <span className="text-xs font-semibold text-[#0C162C] block font-mono">{product.weight}</span>
                </div>

                <div className="p-2.5 bg-[#F5F3EF] rounded-xl text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#0C162C]/50 block">Fit Ratio</span>
                  <span className="text-xs font-semibold text-[#0C162C] block font-mono">{product.dimensions}</span>
                </div>
              </div>

              {/* ============================================================== */}
              {/* PRIMARY ACTION: HOME TRIAL CTA (PRIMARY CONVERSION) */}
              {/* ============================================================== */}
              <div className="space-y-3 pt-2 border-t border-[#0C162C]/8">
                <button
                  type="button"
                  onClick={handleToggleHomeTrial}
                  className={`w-full min-h-[54px] rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98] ${
                    inHomeTrial
                      ? 'bg-[#0D5C63] text-white hover:bg-[#094348]'
                      : 'bg-[#0C162C] text-[#FAF9F6] hover:bg-[#1A365D]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  <span>
                    {inHomeTrial
                      ? `✓ In Home Trial Suite (${homeTrialFrames.length}/4) · Open Suite`
                      : 'Try This Frame at Home (100% Free)'}
                  </span>
                </button>

                <p className="text-[11px] text-[#0C162C]/65 text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0D5C63]" />
                  <span>5-Day In-Home Trial · $0 Deposit · Prepaid Return Pouch</span>
                </p>

                {/* Direct WhatsApp Concierge Styling Enquiry */}
                <button
                  type="button"
                  onClick={handleWhatsAppConsultation}
                  className="w-full min-h-[46px] bg-[#F5F3EF] hover:bg-[#EAE6DF] rounded-2xl text-[#0C162C] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors border border-[#0C162C]/8"
                >
                  <MessageSquare className="w-4 h-4 text-[#0D5C63]" />
                  <span>Ask Optical Concierge on WhatsApp</span>
                </button>
              </div>

              {/* Optical Lens Surfacing Options */}
              <div className="space-y-2 pt-3 border-t border-[#0C162C]/8">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0C162C]">Optical Lens Surfacing:</span>
                  <span className="text-[#0C162C]/60 text-[11px]">Optional prescription fitting</span>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedLens('Plano Demonstration')}
                    className={`w-full p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${
                      selectedLens === 'Plano Demonstration'
                        ? 'border-[#0C162C] bg-[#FAF9F6] shadow-xs ring-1 ring-[#0C162C]'
                        : 'border-[#0C162C]/15 hover:border-[#0C162C]/30'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-[#0C162C] block">
                        Plano Demonstration Lenses
                      </span>
                      <span className="text-[10px] text-[#0C162C]/60">
                        Clear anti-reflective demo optics (for styling or non-prescription)
                      </span>
                    </div>
                    <span className="font-semibold text-[#0C162C] shrink-0 text-xs">Included</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedLens('Prescription Single-Vision')}
                    className={`w-full p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${
                      selectedLens === 'Prescription Single-Vision'
                        ? 'border-[#0C162C] bg-[#FAF9F6] shadow-xs ring-1 ring-[#0C162C]'
                        : 'border-[#0C162C]/15 hover:border-[#0C162C]/30'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-[#0C162C] block">
                        Carl Zeiss Single-Vision
                      </span>
                      <span className="text-[10px] text-[#0C162C]/60">
                        High-index 1.60 with DuraVision Platinum anti-reflective coating
                      </span>
                    </div>
                    <span className="font-semibold text-[#0D5C63] shrink-0 text-xs">+$120</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedLens('Prescription Progressive')}
                    className={`w-full p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${
                      selectedLens === 'Prescription Progressive'
                        ? 'border-[#0C162C] bg-[#FAF9F6] shadow-xs ring-1 ring-[#0C162C]'
                        : 'border-[#0C162C]/15 hover:border-[#0C162C]/30'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-[#0C162C] block">
                        Carl Zeiss Progressive Multifocal
                      </span>
                      <span className="text-[10px] text-[#0C162C]/60">
                        Digital freeform optical corridor for seamless distance & reading
                      </span>
                    </div>
                    <span className="font-semibold text-[#0D5C63] shrink-0 text-xs">+$240</span>
                  </button>
                </div>
              </div>

              {/* Add to Shopping Bag Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => addToCart(product, currentColor.name, selectedLens)}
                  className="w-full min-h-[50px] bg-white border border-[#0C162C]/20 hover:border-[#0C162C] text-[#0C162C] hover:bg-[#FAF9F6] font-semibold text-xs tracking-wider uppercase rounded-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Shopping Bag · ${totalPrice}</span>
                </button>
              </div>

              {/* Concierge & Guarantees */}
              <div className="pt-4 border-t border-[#0C162C]/8 space-y-2.5 text-xs text-[#0C162C]/70">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#0D5C63] shrink-0" />
                  <span>Complimentary worldwide insured courier dispatch</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-[#0D5C63] shrink-0" />
                  <span>30-day effortless return & 2-year atelier craftsmanship warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RELATED REPERTOIRE (Curated Recommendations) */}
        {/* ============================================================== */}
        <div className="pt-12 border-t border-[#0C162C]/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
                Atelier Curation
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C]">
                Complementary Silhouettes
              </h3>
            </div>
            <Link
              href="/products"
              className="text-xs uppercase tracking-wider font-semibold text-[#0C162C] hover:text-[#0D5C63] transition-colors"
            >
              View Full Repertoire →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE STICKY BOTTOM ACTIONS BAR */}
      {/* ============================================================== */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#0C162C]/10 px-4 py-3 pb-safe shadow-2xl flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-[#F5F3EF] shrink-0 border border-[#0C162C]/5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="48px"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-[#0C162C] block truncate">
                  {product.name}
                </span>
                <span className="text-xs font-bold text-[#0D5C63] block font-mono">
                  ${totalPrice}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleWhatsAppConsultation}
                className="w-11 h-11 rounded-xl bg-[#F5F3EF] text-[#0D5C63] flex items-center justify-center border border-[#0C162C]/10 active:scale-95"
                aria-label="Ask WhatsApp Concierge"
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleToggleHomeTrial}
                className={`min-h-[44px] px-4.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md active:scale-95 ${
                  inHomeTrial
                    ? 'bg-[#0D5C63] text-white'
                    : 'bg-[#0C162C] text-[#FAF9F6]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{inHomeTrial ? 'In Trial' : 'Try at Home'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* HIGH RESOLUTION ZOOM INSPECT MODAL */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isZoomOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl aspect-4/3 rounded-3xl overflow-hidden bg-black"
            >
              <Image
                src={galleryImages[activePhotoIdx].src}
                alt={`${product.name} - Magnified View`}
                fill
                priority
                sizes="100vw"
                referrerPolicy="no-referrer"
                className="object-contain"
              />

              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center transition-colors"
                aria-label="Close zoom"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-6 z-10 text-white/90 text-xs bg-black/50 backdrop-blur-xs px-4 py-2 rounded-full font-mono">
                {product.name} · {galleryImages[activePhotoIdx].angle}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
