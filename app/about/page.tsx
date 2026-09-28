'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Phone,
  MessageSquare,
  Navigation,
  Check,
  Eye,
  ShieldCheck,
  Clock,
  Layers,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { useFovea } from '@/lib/context';

export default function AboutPage() {
  const { openWhatsAppWithInquiry, setIsHomeTrialModalOpen } = useFovea();

  // Interactive craft detail switcher ("Look Closer")
  const [activeCraftIdx, setActiveCraftIdx] = useState(0);

  const craftDetails = [
    {
      id: 'materials',
      title: 'Aged Bio-Acetate & Titanium',
      label: 'Material Density',
      desc: 'Cotton-derived Italian cellulose acetate aged for months to prevent structural warping, complemented by Japanese aerospace beta-titanium that retains flexible spring memory.',
      image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85',
      spec: 'Grade-A Sabae Titanium · 8mm Cured Bio-Acetate',
    },
    {
      id: 'hinges',
      title: 'Frictionless Screwless Hinges',
      label: 'Kinematic Precision',
      desc: 'Engineered tension joints designed without traditional screws that loosen over time. Tested through tens of thousands of continuous open-close cycles with zero play.',
      image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=1200&q=85',
      spec: 'Screwless Tension Lock · Monobloc Milled',
    },
    {
      id: 'bridge',
      title: 'Ergonomic Bridge & Nosepads',
      label: 'Anatomical Balance',
      desc: 'Medical-grade hypoallergenic silicone pads contoured to redistribute downward gravity across the nasal slope, eliminating slippage and red pressure indentations.',
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85',
      spec: 'Universal Asian & Western Bridge Geometry',
    },
    {
      id: 'finish',
      title: '72-Hour Tumble & Hand Burnish',
      label: 'Surface Polish',
      desc: 'Every bevel undergoes continuous 72-hour rotary tumbling inside Italian beechwood chips followed by manual jeweler rouge buffing for deep tactile lustre.',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=85',
      spec: 'Micro-Chamfered 45° Browline Finish',
    },
  ];

  // Journey steps for "The Fovea Experience"
  const journeySteps = [
    {
      phase: '01',
      title: 'Discover',
      action: 'Curated Repertoire',
      desc: 'Explore balanced silhouettes categorized by geometric shapes, cold-milled materials, and calibrated facial proportions.',
      img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
    },
    {
      phase: '02',
      title: 'Compare',
      action: 'Side-by-Side Clarity',
      desc: 'Examine exact bridge widths, lens heights, and temple dimensions alongside multi-angle studio photography.',
      img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
    },
    {
      phase: '03',
      title: 'Try',
      action: 'At Home In Real Light',
      desc: 'Experience your top four candidate frames delivered to your home for five days with zero upfront deposit.',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    },
    {
      phase: '04',
      title: 'Decide',
      action: 'Wear With Certainty',
      desc: 'Choose the frame that feels naturally aligned with your personality and fit prescription optics with lasting peace of mind.',
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
    },
  ];

  // Gallery teaser images
  const galleryStrip = [
    {
      src: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=85',
      title: 'Titanium Architecture',
    },
    {
      src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=85',
      title: 'Editorial Fitting',
    },
    {
      src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=85',
      title: 'Mineral Glass Optics',
    },
    {
      src: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
      title: 'Atelier Presentation',
    },
    {
      src: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=85',
      title: 'Aviator Geometry',
    },
  ];

  const handleWhatsAppVisit = () => {
    openWhatsAppWithInquiry(
      'Hello Fovea! I am interested in visiting the Hyderabad atelier at Pillar 45, Rethibowli to explore frames in person.'
    );
  };

  const handleScrollToStory = () => {
    const el = document.getElementById('brand-intro');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF9F6] text-[#0C162C] min-h-screen">
      {/* ============================================================== */}
      {/* 1. ABOUT HERO (Dominant High-Fashion / Real Human Campaign) */}
      {/* ============================================================== */}
      <section className="relative min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden pt-10 pb-16 sm:py-24">
        {/* Full-bleed realistic lifestyle photography canvas */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1800&q=85"
            alt="Confident person wearing handcrafted Fovea optical frames in warm natural light"
            fill
            priority
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="object-cover object-[center_28%] sm:object-center brightness-[0.92] contrast-[1.02]"
          />
          {/* Subtle contrast gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C162C]/90 via-[#0C162C]/40 to-[#0C162C]/15 sm:bg-gradient-to-r sm:from-[#0C162C]/90 sm:via-[#0C162C]/45 sm:to-transparent" />
        </div>

        {/* Hero Narrative */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl text-white space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-[0.24em] text-[#C5A880]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>ABOUT FOVEA</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.08] tracking-tight text-white drop-shadow-sm"
            >
              More Than What You See.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-white/90 font-light leading-relaxed max-w-md"
            >
              Fovea brings together eyewear, comfort, personal style and a better way to discover the frame that feels right.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-4 pt-2"
            >
              <button
                type="button"
                onClick={handleScrollToStory}
                className="min-h-[50px] px-8 bg-[#FAF9F6] hover:bg-white text-[#0C162C] font-semibold text-xs tracking-wider uppercase rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-102 active:scale-98"
              >
                <span>Explore Fovea</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/products"
                className="text-xs uppercase tracking-wider font-semibold text-white/90 hover:text-white underline underline-offset-4 transition-colors"
              >
                View Catalogue
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. BRAND INTRODUCTION (Large Typography + Close-Up Eyewear) */}
      {/* ============================================================== */}
      <section id="brand-intro" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Close-Up Photographic Canvas */}
          <div className="lg:col-span-6 relative aspect-4/3 sm:aspect-5/4 rounded-3xl overflow-hidden shadow-2xl border border-[#0C162C]/10 bg-[#F5F3EF]">
            <Image
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85"
              alt="Close-up of person wearing refined Fovea optical frames"
              fill
              sizes="(max-width: 1024px) 100vw, 650px"
              referrerPolicy="no-referrer"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880] block">
                The Human Dimension
              </span>
              <p className="font-editorial text-xl sm:text-2xl font-medium">
                Eyewear should harmonize with your face, not overpower it.
              </p>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
              Human-Centered Design
            </span>

            <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C] leading-tight">
              Eyewear Made Personal.
            </h2>

            <p className="text-base sm:text-lg text-[#0C162C]/80 font-light leading-relaxed">
              Eyewear is the single object you wear on the center of your face every hour of the day. Yet most optical retail is rushed, transactional, and overwhelmed by superficial logos.
            </p>

            <p className="text-sm text-[#0C162C]/70 font-light leading-relaxed">
              Fovea was built around a quiet belief: that discovering the right frame should be thoughtful, unhurried, and crafted around what works for your style, your comfort, your everyday life, and your personality.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#0C162C]/10 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#0C162C]/8 text-center shadow-xs">
                <span className="text-[10px] uppercase text-[#0C162C]/50 block">Focus 01</span>
                <span className="font-semibold text-[#0C162C] block mt-0.5">Your Style</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#0C162C]/8 text-center shadow-xs">
                <span className="text-[10px] uppercase text-[#0C162C]/50 block">Focus 02</span>
                <span className="font-semibold text-[#0C162C] block mt-0.5">Your Comfort</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#0C162C]/8 text-center shadow-xs">
                <span className="text-[10px] uppercase text-[#0C162C]/50 block">Focus 03</span>
                <span className="font-semibold text-[#0C162C] block mt-0.5">Everyday Life</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#0C162C]/8 text-center shadow-xs">
                <span className="text-[10px] uppercase text-[#0C162C]/50 block">Focus 04</span>
                <span className="font-semibold text-[#0C162C] block mt-0.5">Personality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. THE FOVEA PHILOSOPHY (Clarity. Comfort. Character.) */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-28 bg-white border-y border-[#0C162C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
              The Core Philosophy
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#0C162C]">
              Clarity. Comfort. Character.
            </h2>
            <p className="text-sm sm:text-base text-[#0C162C]/70 font-light">
              Three interconnected guiding principles behind every silhouette we curate and every customer consultation.
            </p>
          </div>

          {/* 3 Split Editorial Compositions */}
          <div className="space-y-12 sm:space-y-16">
            {/* Pillar 1: Clarity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className="lg:col-span-6 relative aspect-16/10 sm:aspect-5/3 rounded-3xl overflow-hidden shadow-xl border border-[#0C162C]/10 bg-[#F5F3EF]">
                <Image
                  src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85"
                  alt="Minimalist titanium optical frame on travertine"
                  fill
                  sizes="(max-width: 1024px) 100vw, 650px"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#0D5C63] bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full shadow-xs">
                    01 · Optical Vision
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <span className="font-mono text-xs font-bold text-[#0D5C63]">PRINCIPLE ONE</span>
                <h3 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0C162C]">
                  Clarity
                </h3>
                <p className="text-sm sm:text-base text-[#0C162C]/80 font-light leading-relaxed">
                  Focused on helping people find eyewear that works naturally for everyday vision and lifestyle. We partner with Carl Zeiss to surface lenses that eliminate peripheral distortion, glare, and digital eye strain.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C63]">
                  <Check className="w-4 h-4" />
                  <span>Precision digital optical surfacing & zero-distortion corridors</span>
                </div>
              </div>
            </div>

            {/* Pillar 2: Comfort */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className="lg:col-span-6 lg:order-2 relative aspect-16/10 sm:aspect-5/3 rounded-3xl overflow-hidden shadow-xl border border-[#0C162C]/10 bg-[#F5F3EF]">
                <Image
                  src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85"
                  alt="Ultralight beta titanium eyewear resting on natural stone"
                  fill
                  sizes="(max-width: 1024px) 100vw, 650px"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#0D5C63] bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full shadow-xs">
                    02 · Ergonomics
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 lg:order-1 space-y-4">
                <span className="font-mono text-xs font-bold text-[#C5A880]">PRINCIPLE TWO</span>
                <h3 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0C162C]">
                  Comfort
                </h3>
                <p className="text-sm sm:text-base text-[#0C162C]/80 font-light leading-relaxed">
                  Frames should feel as good as they look. An optical instrument that pinches the bridge or weighs heavily behind the ears by midday fails its fundamental duty. We engineer balance from 7.6 to 24 grams.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C63]">
                  <Check className="w-4 h-4" />
                  <span>Weightless Japanese beta-titanium and ergonomic bridge geometry</span>
                </div>
              </div>
            </div>

            {/* Pillar 3: Character */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className="lg:col-span-6 relative aspect-16/10 sm:aspect-5/3 rounded-3xl overflow-hidden shadow-xl border border-[#0C162C]/10 bg-[#F5F3EF]">
                <Image
                  src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=1200&q=85"
                  alt="Portrait of person expressing quiet distinction with sculptural sunglasses"
                  fill
                  sizes="(max-width: 1024px) 100vw, 650px"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#0D5C63] bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full shadow-xs">
                    03 · Individuality
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <span className="font-mono text-xs font-bold text-[#0C162C]">PRINCIPLE THREE</span>
                <h3 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0C162C]">
                  Character
                </h3>
                <p className="text-sm sm:text-base text-[#0C162C]/80 font-light leading-relaxed">
                  Eyewear should complement personality rather than hide it. From understated minimalist wireframes to sculptural hand-beveled tortoiseshell acetate, each frame is chosen to elevate who you already are.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C63]">
                  <Check className="w-4 h-4" />
                  <span>Curated silhouettes reflecting genuine expression and distinction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. REAL PRODUCT CRAFTSMANSHIP ("Look Closer") */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0C162C]/10 pb-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
              Tactile Precision
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C]">
              Look Closer.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#0C162C]/70 font-light max-w-md">
            The difference between disposable eyewear and an enduring optical instrument lives in the fractions of a millimeter you only appreciate up close.
          </p>
        </div>

        {/* Interactive Craft Detail Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Detail Selector Cards */}
          <div className="lg:col-span-5 space-y-3">
            {craftDetails.map((craft, idx) => {
              const isSelected = activeCraftIdx === idx;
              return (
                <button
                  key={craft.id}
                  type="button"
                  onClick={() => setActiveCraftIdx(idx)}
                  className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-white border-[#0C162C] shadow-lg ring-1 ring-[#0C162C]/10 translate-x-1 sm:translate-x-2'
                      : 'bg-white/60 hover:bg-white border-[#0C162C]/8 hover:border-[#0C162C]/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                      isSelected ? 'text-[#0D5C63]' : 'text-[#0C162C]/40'
                    }`}>
                      {craft.label}
                    </span>
                    <span className="text-xs text-[#0C162C]/40">0{idx + 1}</span>
                  </div>

                  <h3 className="font-editorial text-lg sm:text-xl font-semibold text-[#0C162C] mt-1">
                    {craft.title}
                  </h3>

                  <p className="text-xs text-[#0C162C]/70 font-light leading-relaxed mt-1">
                    {craft.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* High-Resolution Macro Image Display */}
          <div className="lg:col-span-7">
            <div className="relative aspect-4/3 sm:aspect-16/10 w-full rounded-3xl overflow-hidden shadow-2xl border border-[#0C162C]/10 bg-[#F5F3EF]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCraftIdx}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={craftDetails[activeCraftIdx].image}
                    alt={craftDetails[activeCraftIdx].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 750px"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider block">
                        Atelier Macro Spec
                      </span>
                      <p className="font-editorial text-xl font-medium">
                        {craftDetails[activeCraftIdx].spec}
                      </p>
                    </div>
                    <span className="text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-full font-mono shrink-0">
                      0.05mm tolerance
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. THE FOVEA EXPERIENCE (Customer Journey) */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-28 bg-[#F5F3EF] border-y border-[#0C162C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
              The Customer Journey
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C]">
              Discover → Compare → Try → Decide
            </h2>
            <p className="text-sm sm:text-base text-[#0C162C]/70 font-light leading-relaxed">
              Every touchpoint is designed to put you completely in control. No high-pressure retail sales. Just calm, confident exploration.
            </p>
          </div>

          {/* 4-Step Visual Journey Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeySteps.map((step) => (
              <div
                key={step.phase}
                className="bg-white rounded-3xl border border-[#0C162C]/8 p-5 shadow-xs flex flex-col justify-between group hover:shadow-lg transition-all"
              >
                <div>
                  <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#FAF9F6] mb-4">
                    <Image
                      src={step.img}
                      alt={step.title}
                      fill
                      sizes="300px"
                      referrerPolicy="no-referrer"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0C162C]/80 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 rounded-full">
                      STEP {step.phase}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#0D5C63] font-semibold block">
                    {step.action}
                  </span>
                  <h3 className="font-editorial text-2xl font-semibold text-[#0C162C] mt-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#0C162C]/70 font-light leading-relaxed mt-2">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#0C162C]/5 mt-4 flex items-center text-xs font-semibold text-[#0D5C63]">
                  <span>Fovea Standard</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. HOME TRIAL BRAND MOMENT (Full-Width Cinematic Integration) */}
      {/* ============================================================== */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1800&q=85"
          alt="Natural lifestyle moment with someone trying eyewear comfortably at home"
          fill
          sizes="100vw"
          referrerPolicy="no-referrer"
          className="object-cover object-[center_30%] brightness-[0.88]"
        />
        <div className="absolute inset-0 bg-[#0C162C]/40 backdrop-blur-[1px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880] block">
            The Signature Service
          </span>

          <h2 className="font-editorial text-4xl sm:text-6xl font-semibold leading-tight drop-shadow-md">
            Eyewear, On Your Terms.
          </h2>

          <p className="text-sm sm:text-base text-white/90 font-light max-w-lg mx-auto leading-relaxed">
            Explore your favourites, schedule your trial and experience the frames comfortably at home. Five days in your own mirror, with zero purchase obligation.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/home-trial"
              className="min-h-[50px] px-8 bg-[#FAF9F6] hover:bg-white text-[#0C162C] font-semibold text-xs tracking-wider uppercase rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Discover Home Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => setIsHomeTrialModalOpen(true)}
              className="min-h-[50px] px-6 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-xs font-semibold text-xs tracking-wider uppercase rounded-2xl transition-all"
            >
              <span>Book Trial Suite</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. VISUAL BRAND STATEMENT (Oversized Typography Campaign Moment) */}
      {/* ============================================================== */}
      <section className="py-24 sm:py-36 bg-[#FAF9F6] text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#0D5C63] block">
            The Fovea Conviction
          </span>

          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-semibold text-[#0C162C] leading-[1.12] tracking-tight">
            See Better. Choose Better. Feel Like Yourself.
          </h2>

          <p className="text-xs sm:text-sm text-[#0C162C]/60 font-light max-w-md mx-auto leading-relaxed">
            Designed for those who appreciate understated luxury, enduring comfort, and personal expression.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. STORE / PHYSICAL PRESENCE (Hyderabad Atelier Details) */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-28 bg-white border-y border-[#0C162C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Store Information Card */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
                  Physical Atelier
                </span>
                <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C]">
                  Visit the Fovea Atelier
                </h2>
                <p className="text-xs sm:text-sm text-[#0C162C]/70 font-light leading-relaxed">
                  While our Home Trial service travels to your residence, you are warmly invited to visit our physical space in Hyderabad for bespoke fittings and personal consultations.
                </p>
              </div>

              {/* Exact Physical Address Card */}
              <div className="p-6 sm:p-8 bg-[#FAF9F6] rounded-3xl border border-[#0C162C]/10 space-y-4 shadow-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#0D5C63] shrink-0 mt-1" />
                  <div className="space-y-1">
                    <h3 className="font-editorial text-xl font-semibold text-[#0C162C]">
                      Fovea Optical Atelier
                    </h3>
                    <p className="text-xs text-[#0C162C]/80 leading-relaxed font-light">
                      Pillar Number 45, 2nd Floor<br />
                      PVNR Flyover, LALS Enclave<br />
                      Rethibowli, Mehdipatnam<br />
                      Hyderabad, Telangana – 500028
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#0C162C]/8 flex items-center justify-between text-xs text-[#0C162C]/75">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#0D5C63]" />
                    <span>Monday – Sunday: 10:30 AM – 9:00 PM</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#0D5C63] font-semibold">
                  <Phone className="w-4 h-4" />
                  <span>+91 97009 56245</span>
                </div>
              </div>

              {/* Action Buttons: Directions, Call, WhatsApp */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://maps.google.com/?q=Pillar+45+PVNR+Flyover+LALS+Enclave+Rethibowli+Mehdipatnam+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] px-5 bg-[#0C162C] hover:bg-[#1A365D] text-[#FAF9F6] font-semibold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 shadow-sm"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>

                <a
                  href="tel:+919700956245"
                  className="min-h-[46px] px-5 bg-white hover:bg-[#FAF9F6] text-[#0C162C] border border-[#0C162C]/15 font-semibold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#0D5C63]" />
                  <span>Call Fovea</span>
                </a>

                <button
                  type="button"
                  onClick={handleWhatsAppVisit}
                  className="min-h-[46px] px-5 bg-[#0D5C63] hover:bg-[#094348] text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-[#C5A880]" />
                  <span>WhatsApp Fovea</span>
                </button>
              </div>
            </div>

            {/* Elegant Map Preview & Interior Architecture Canvas */}
            <div className="lg:col-span-6 relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-[#0C162C]/10 bg-[#0C162C] text-white p-6 sm:p-8 flex flex-col justify-between">
              {/* Architectural Grid Background */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FAF9F6_1px,transparent_1px)] [background-size:20px_20px]" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
                  Atelier Coordinates
                </span>
                <span className="text-xs font-mono text-white/60">
                  17.3916° N, 78.4358° E
                </span>
              </div>

              {/* Stylized Pin Marker Card */}
              <div className="relative z-10 text-center py-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#0D5C63] text-white flex items-center justify-center mx-auto shadow-lg ring-4 ring-white/10">
                  <MapPin className="w-6 h-6 text-[#C5A880]" />
                </div>
                <h3 className="font-editorial text-2xl font-semibold">
                  Pillar 45, Rethibowli
                </h3>
                <p className="text-xs text-white/70 max-w-xs mx-auto font-light">
                  PVNR Express Way · LALS Enclave 2nd Floor · Central Hyderabad
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/80">
                <span>Free client parking available</span>
                <a
                  href="https://maps.google.com/?q=Pillar+45+PVNR+Flyover+LALS+Enclave+Rethibowli+Mehdipatnam+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C5A880] hover:underline font-semibold"
                >
                  Open in Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. REALISTIC STORE / LIFESTYLE GALLERY STRIP */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0C162C]/10 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
              Visual Monograph
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0C162C]">
              Atelier Moments & Repertoire
            </h2>
          </div>

          <Link
            href="/gallery"
            className="text-xs font-semibold uppercase tracking-wider text-[#0D5C63] hover:text-[#0C162C] transition-colors flex items-center gap-1.5"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5-Image Horizontal Editorial Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {galleryStrip.map((item, idx) => (
            <div
              key={idx}
              className={`relative aspect-4/5 rounded-2xl overflow-hidden shadow-xs border border-[#0C162C]/8 bg-[#F5F3EF] group ${
                idx === 4 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="300px"
                referrerPolicy="no-referrer"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-mono uppercase tracking-wider block">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. FINAL CONVERSION CTA */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-28 bg-[#F5F3EF] border-t border-[#0C162C]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
            Begin Your Discovery
          </span>

          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#0C162C]">
            Find the Frame That Feels Like You.
          </h2>

          <p className="text-sm sm:text-base text-[#0C162C]/75 font-light max-w-lg mx-auto leading-relaxed">
            Browse our full optical collection or request four silhouettes delivered to your home for five days of unhurried living.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/products"
              className="min-h-[50px] px-8 bg-[#0C162C] hover:bg-[#1A365D] text-[#FAF9F6] font-semibold text-xs tracking-wider uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-102 active:scale-98"
            >
              <span>Explore Eyewear</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/home-trial"
              className="min-h-[50px] px-8 bg-white hover:bg-[#FAF9F6] text-[#0C162C] border border-[#0C162C]/15 font-semibold text-xs tracking-wider uppercase rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>Try at Home</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
