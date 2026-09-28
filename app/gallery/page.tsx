'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquare,
  Compass,
  MapPin,
  Camera,
  Layers,
} from 'lucide-react';
import { useFovea } from '@/lib/context';

type GalleryCategory = 'all' | 'campaign' | 'eyewear' | 'lifestyle' | 'details' | 'store';

interface GalleryItem {
  id: string;
  title: string;
  category: 'campaign' | 'eyewear' | 'lifestyle' | 'details' | 'store';
  src: string;
  aspect: 'tall' | 'wide' | 'square' | 'standard';
  caption: string;
  subtitle: string;
  linkSlug?: string;
}

export default function GalleryPage() {
  const { openWhatsAppWithInquiry, setIsHomeTrialModalOpen } = useFovea();

  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);

  // Gallery items curated with verified realistic photography
  const ALL_GALLERY_ITEMS: GalleryItem[] = useMemo(() => [
    {
      id: 'gal-01',
      title: 'The Kyoto Panto at Dawn',
      category: 'campaign',
      src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=85',
      aspect: 'tall',
      subtitle: 'Architectural Titanium',
      caption: 'Cold-milled Japanese titanium contouring the orbital facial line with featherweight balance.',
      linkSlug: 'kyoto-titanium-panto',
    },
    {
      id: 'gal-02',
      title: 'Diamond-Beveled Acetate Brow',
      category: 'eyewear',
      src: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1600&q=85',
      aspect: 'wide',
      subtitle: 'Mazzucchelli Bio-Acetate',
      caption: 'Four months of cured cotton bio-acetate cut with chamfered light catchers.',
      linkSlug: 'aethel-acetate-square',
    },
    {
      id: 'gal-03',
      title: 'Frictionless Screwless Joint',
      category: 'details',
      src: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=1600&q=85',
      aspect: 'square',
      subtitle: 'Macro Metallurgy',
      caption: 'Single-piece titanium tension joint engineered without screws that loosen over time.',
      linkSlug: 'kyoto-titanium-panto',
    },
    {
      id: 'gal-04',
      title: 'Subtle Confidence in Natural Light',
      category: 'lifestyle',
      src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=85',
      aspect: 'tall',
      subtitle: 'Everyday Harmonics',
      caption: 'Eyewear that settles comfortably into your morning routine and natural daylight.',
      linkSlug: 'meridian-crown-panto',
    },
    {
      id: 'gal-05',
      title: 'Mineral Glass Pilot Double-Bridge',
      category: 'eyewear',
      src: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1600&q=85',
      aspect: 'wide',
      subtitle: 'Carl Zeiss Polarized Optics',
      caption: 'Suspended tension arch with distortion-free mineral glass sun protection.',
      linkSlug: 'solis-aviator-titanium',
    },
    {
      id: 'gal-06',
      title: 'Sculptural Cat-Eye Silhouette',
      category: 'campaign',
      src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
      aspect: 'tall',
      subtitle: 'The Valse Sculpt',
      caption: 'High-temple lift inspired by European avant-garde cinema and architectural planes.',
      linkSlug: 'valse-cat-eye-acetate',
    },
    {
      id: 'gal-07',
      title: 'Atelier Velvet Presentation Suite',
      category: 'lifestyle',
      src: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1600&q=85',
      aspect: 'wide',
      subtitle: 'Home Trial Curation',
      caption: 'Four handcrafted optical silhouettes delivered in a velvet case for five days of living.',
    },
    {
      id: 'gal-08',
      title: 'Continuous Beta-Titanium Hexagon',
      category: 'details',
      src: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1600&q=85',
      aspect: 'square',
      subtitle: 'Ultralight 7.6g Ribbon',
      caption: 'Constructed from an unbroken Japanese beta-titanium ribbon with zero weld seams.',
      linkSlug: 'aeris-minimal-hex',
    },
    {
      id: 'gal-09',
      title: 'Quiet Presence at Work',
      category: 'lifestyle',
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=85',
      aspect: 'tall',
      subtitle: 'Desk & Architecture',
      caption: 'Zero bridge fatigue and glare-free Zeiss surfacing for extended focus hours.',
      linkSlug: 'milano-rectangle-acetate',
    },
    {
      id: 'gal-10',
      title: 'Amber Havana Tortoise Rim',
      category: 'eyewear',
      src: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1600&q=85',
      aspect: 'wide',
      subtitle: 'The Classic Wayfarer',
      caption: 'Multi-layered cotton acetate tumbled in beechwood chips for three days.',
      linkSlug: 'linear-wayfarer-acetate',
    },
    {
      id: 'gal-11',
      title: 'Refined Feminine Proportions',
      category: 'campaign',
      src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=85',
      aspect: 'tall',
      subtitle: 'The Aurelia Sculpt',
      caption: 'Facet-cut champagne crystal acetate framing the cheekbones with quiet poise.',
      linkSlug: 'aurelia-cat-eye-optical',
    },
    {
      id: 'gal-12',
      title: 'Polarized Anti-Reflective Backing',
      category: 'details',
      src: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1600&q=85',
      aspect: 'square',
      subtitle: 'Sun Lens Chemistry',
      caption: 'Hydrophobic and oleophobic dual coatings repelling sea mist, dust, and fingerprints.',
      linkSlug: 'solis-aviator-titanium',
    },
    {
      id: 'gal-13',
      title: 'Mediterranean Sun Edition',
      category: 'lifestyle',
      src: 'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=1600&q=85',
      aspect: 'wide',
      subtitle: 'Riviera Hybrid Wind-Rims',
      caption: 'Teardrop titanium aviator suspended within sculpted acetate peripheral wind shields.',
      linkSlug: 'riviera-aviator-hybrid',
    },
    {
      id: 'gal-14',
      title: 'Minimalist Wire Geometry',
      category: 'eyewear',
      src: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1600&q=85',
      aspect: 'tall',
      subtitle: 'The Bauhaus Rectangle',
      caption: 'Dessau functional purity distilled to continuous lines and medical-grade skin contact.',
      linkSlug: 'bauhaus-wire-rectangle',
    },
  ], []);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return ALL_GALLERY_ITEMS;
    if (activeCategory === 'store') return []; // Handled in dedicated store section
    return ALL_GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory, ALL_GALLERY_ITEMS]);

  const displayedItems = filteredItems.slice(0, visibleCount);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedPhotoIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhotoIdx(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedPhotoIdx((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedPhotoIdx((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIdx, filteredItems]);

  // Mobile swipe handling in Lightbox
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleLightboxTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleLightboxTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diff = touchStartXRef.current - touchEndXRef.current;
      if (diff > 45 && selectedPhotoIdx !== null) {
        setSelectedPhotoIdx((prev) => (prev! + 1) % filteredItems.length);
      } else if (diff < -45 && selectedPhotoIdx !== null) {
        setSelectedPhotoIdx((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const currentLightboxItem =
    selectedPhotoIdx !== null ? filteredItems[selectedPhotoIdx] : null;

  return (
    <div className="bg-[#FAF9F6] text-[#0C162C] min-h-screen">
      {/* ============================================================== */}
      {/* 1. GALLERY HERO (Visual Introduction) */}
      {/* ============================================================== */}
      <section className="pt-8 sm:pt-14 pb-8 sm:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#0C162C]/10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D5C63]/10 text-xs font-semibold uppercase tracking-[0.24em] text-[#0D5C63]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>FOVEA GALLERY</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-semibold text-[#0C162C] tracking-tight">
              Seen Through Fovea.
            </h1>

            <p className="text-sm sm:text-base text-[#0C162C]/70 font-light max-w-lg leading-relaxed">
              A visual monograph of optical geometry, honest materials, and everyday living in natural light.
            </p>
          </div>

          {/* Minimal Filter Tabs (Pill Controls) */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: 'All Perspectives' },
              { id: 'campaign', label: 'Campaign' },
              { id: 'eyewear', label: 'Eyewear' },
              { id: 'lifestyle', label: 'Lifestyle' },
              { id: 'details', label: 'Details' },
              { id: 'store', label: 'Inside Fovea' },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(tab.id as GalleryCategory);
                    setVisibleCount(10);
                  }}
                  className={`min-h-[38px] px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#0C162C] text-[#FAF9F6] shadow-sm font-semibold'
                      : 'bg-white hover:bg-[#F5F3EF] text-[#0C162C]/70 hover:text-[#0C162C] border border-[#0C162C]/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. EDITORIAL IMAGE GALLERY (Deliberate Art-Directed Rhythm) */}
      {/* ============================================================== */}
      {activeCategory !== 'store' && (
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Asymmetric Editorial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
            {displayedItems.map((item, idx) => {
              // Art-directed column spans for varied editorial cadence
              let colSpan = 'lg:col-span-4';
              let aspectClass = 'aspect-4/5';

              if (item.aspect === 'tall') {
                colSpan = 'lg:col-span-5';
                aspectClass = 'aspect-3/4 sm:aspect-4/5';
              } else if (item.aspect === 'wide') {
                colSpan = 'lg:col-span-7';
                aspectClass = 'aspect-16/10';
              } else if (item.aspect === 'square') {
                colSpan = 'lg:col-span-4';
                aspectClass = 'aspect-square';
              }

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                  onClick={() => setSelectedPhotoIdx(idx)}
                  className={`cursor-pointer group relative ${colSpan} rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl border border-[#0C162C]/10 bg-[#F5F3EF] transition-all duration-500`}
                >
                  <div className={`relative w-full ${aspectClass} overflow-hidden`}>
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      referrerPolicy="no-referrer"
                      className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C162C]/80 via-transparent to-transparent opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Top Angle / Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#0C162C] bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full shadow-xs">
                        {item.subtitle}
                      </span>
                    </div>

                    {/* Inspect Icon Pill */}
                    <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs text-[#0C162C] flex items-center justify-center shadow-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white z-10 translate-y-0 sm:translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-editorial text-lg sm:text-xl font-semibold leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-white/80 font-light truncate mt-0.5">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredItems.length && (
            <div className="pt-6 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="min-h-[48px] px-8 bg-white hover:bg-[#F5F3EF] border border-[#0C162C]/15 text-[#0C162C] font-semibold text-xs uppercase tracking-wider rounded-2xl shadow-xs transition-all hover:scale-102"
              >
                Load More Editorial Perspectives ({filteredItems.length - visibleCount} Remaining)
              </button>
            </div>
          )}
        </section>
      )}

      {/* ============================================================== */}
      {/* 3. FULL-WIDTH VISUAL BREAK ("Find Your Perspective.") */}
      {/* ============================================================== */}
      <section className="relative h-[65vh] sm:h-[80vh] flex items-center justify-center overflow-hidden my-8 sm:my-14">
        <Image
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=85"
          alt="Cinematic portrait of someone wearing Fovea acetate sunglasses in golden evening light"
          fill
          sizes="100vw"
          referrerPolicy="no-referrer"
          className="object-cover object-[center_35%] brightness-[0.86] contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-[#0C162C]/35 backdrop-blur-[1px]" />

        <div className="relative z-10 text-center px-4 max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880] block">
            The Living Repertoire
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-semibold text-white drop-shadow-md leading-tight">
            Find Your Perspective.
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto font-light leading-relaxed">
            Every millimeter is cold-milled and hand-buffed to celebrate natural facial geometry.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. "INSIDE FOVEA" STORE / ENVIRONMENT SECTION */}
      {/* ============================================================== */}
      <section
        id="inside-fovea"
        className={`py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 ${
          activeCategory === 'store' ? 'block' : ''
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0C162C]/10 pb-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
              Physical Presence
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C]">
              Inside Fovea
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#0C162C]/70 font-light max-w-md">
            Our atelier environment at Rethibowli, Hyderabad is designed as a calm optical studio for bespoke fittings and natural light consultations.
          </p>
        </div>

        {/* Realistic Store & Consultation Environment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Eyewear Display Tray */}
          <div className="bg-white rounded-3xl border border-[#0C162C]/10 overflow-hidden shadow-xs space-y-4 p-6">
            <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#F5F3EF]">
              <Image
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85"
                alt="Eyewear display tray in natural light"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#0D5C63] font-semibold block">
                Tray 01 · Presentation Trays
              </span>
              <h3 className="font-editorial text-xl font-semibold text-[#0C162C] mt-1">
                Curated Velvet Trays
              </h3>
              <p className="text-xs text-[#0C162C]/70 font-light leading-relaxed mt-1">
                Individual frames presented on textured linen and velvet surfaces allowing unhurried inspection of temple joints.
              </p>
            </div>
          </div>

          {/* Card 2: Consultation Fitting Space */}
          <div className="bg-white rounded-3xl border border-[#0C162C]/10 overflow-hidden shadow-xs space-y-4 p-6">
            <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#F5F3EF]">
              <Image
                src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=85"
                alt="Optical frame resting on travertine consultation stone"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#0D5C63] font-semibold block">
                Space 02 · Atelier Consultation
              </span>
              <h3 className="font-editorial text-xl font-semibold text-[#0C162C] mt-1">
                Natural Daylight Studio
              </h3>
              <p className="text-xs text-[#0C162C]/70 font-light leading-relaxed mt-1">
                Large ambient north-facing windows providing authentic non-distorted lighting for skin tone and lens tint evaluation.
              </p>
            </div>
          </div>

          {/* Card 3: Atelier Address & Visit Details */}
          <div className="bg-[#0C162C] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
                Visit Details
              </span>
              <h3 className="font-editorial text-2xl font-semibold">
                Hyderabad Atelier
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                Pillar Number 45, 2nd Floor<br />
                PVNR Flyover, LALS Enclave<br />
                Rethibowli, Mehdipatnam<br />
                Hyderabad, Telangana – 500028
              </p>
              <p className="text-xs font-mono text-[#C5A880] pt-1">
                Mon – Sun: 10:30 AM – 9:00 PM
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <a
                href="https://maps.google.com/?q=Pillar+45+PVNR+Flyover+LALS+Enclave+Rethibowli+Mehdipatnam+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>

              <button
                type="button"
                onClick={() =>
                  openWhatsAppWithInquiry(
                    'Hello Fovea! I would like to schedule a personal styling visit at your Hyderabad atelier.'
                  )
                }
                className="text-xs text-white/80 hover:text-white font-medium flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. INTERACTIVE FULLSCREEN LIGHTBOX */}
      {/* ============================================================== */}
      <AnimatePresence>
        {currentLightboxItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
            onTouchStart={handleLightboxTouchStart}
            onTouchMove={handleLightboxTouchMove}
            onTouchEnd={handleLightboxTouchEnd}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl max-h-[92vh] flex flex-col justify-between rounded-3xl overflow-hidden bg-black/40 border border-white/15"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-md border-b border-white/10 text-white z-20 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-semibold text-[#C5A880]">
                    {String(selectedPhotoIdx! + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-white/40">·</span>
                  <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                    {currentLightboxItem.subtitle}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPhotoIdx(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Close viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image Canvas with Side Chevrons */}
              <div className="relative aspect-4/3 sm:aspect-16/10 w-full overflow-hidden flex items-center justify-center bg-black/80">
                <Image
                  src={currentLightboxItem.src}
                  alt={currentLightboxItem.title}
                  fill
                  priority
                  sizes="100vw"
                  referrerPolicy="no-referrer"
                  className="object-contain"
                />

                {/* Left/Right Chevrons */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhotoIdx((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all shadow-md z-10"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhotoIdx((prev) => (prev! + 1) % filteredItems.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all shadow-md z-10"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Lightbox Footer Caption & Actions */}
              <div className="px-6 py-4 bg-black/70 backdrop-blur-md border-t border-white/10 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div className="space-y-0.5">
                  <h4 className="font-editorial text-lg sm:text-xl font-semibold">
                    {currentLightboxItem.title}
                  </h4>
                  <p className="text-xs text-white/70 font-light leading-relaxed max-w-xl">
                    {currentLightboxItem.caption}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {currentLightboxItem.linkSlug && (
                    <Link
                      href={`/products/${currentLightboxItem.linkSlug}`}
                      onClick={() => setSelectedPhotoIdx(null)}
                      className="px-4 py-2 bg-white text-[#0C162C] font-semibold text-xs tracking-wider uppercase rounded-xl transition-all hover:bg-white/90"
                    >
                      View Silhouette →
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      const text = `Hello Fovea! I am viewing "${currentLightboxItem.title}" in your gallery and would like styling information.`;
                      openWhatsAppWithInquiry(text);
                    }}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#C5A880] transition-colors"
                    title="Inquire on WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* 6. FINAL CONVERSION CTA ("Found Your Style?") */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-28 bg-[#F5F3EF] border-t border-[#0C162C]/10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
            Curate Your Own Collection
          </span>

          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#0C162C]">
            Found Your Style?
          </h2>

          <p className="text-sm sm:text-base text-[#0C162C]/75 font-light max-w-md mx-auto leading-relaxed">
            Explore our complete optical and sun designs, or select four frames to try at home with five full days to decide.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/products"
              className="min-h-[50px] px-8 bg-[#0C162C] hover:bg-[#1A365D] text-[#FAF9F6] font-semibold text-xs tracking-wider uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-102 active:scale-98"
            >
              <span>Explore Eyewear</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => setIsHomeTrialModalOpen(true)}
              className="min-h-[50px] px-8 bg-white hover:bg-[#FAF9F6] text-[#0C162C] border border-[#0C162C]/15 font-semibold text-xs tracking-wider uppercase rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>Try at Home (Free)</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
