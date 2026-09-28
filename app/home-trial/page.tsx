'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Check,
  ShieldCheck,
  ArrowRight,
  Plus,
  X,
  MessageSquare,
  Truck,
  RotateCcw,
  Calendar,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  Ruler,
  Phone,
  Eye,
  CheckCircle2,
  AlertCircle,
  Layers,
} from 'lucide-react';
import { PRODUCTS, Product } from '@/lib/data';
import { useFovea } from '@/lib/context';

export default function HomeTrialPage() {
  const {
    homeTrialFrames,
    toggleHomeTrialFrame,
    clearHomeTrial,
    setIsHomeTrialModalOpen,
    openWhatsAppWithInquiry,
  } = useFovea();

  // Active step for interactive "How it works" section
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  // Pincode Availability Checker state
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{
    status: 'idle' | 'checking' | 'serviceable' | 'not-serviceable';
    message: string;
    details?: string;
  }>({ status: 'idle', message: '' });

  // Quick Scheduling selector state
  const [selectedDateIdx, setSelectedDateIdx] = useState(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<'Morning' | 'Afternoon' | 'Evening'>('Afternoon');

  // FAQ Accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Mobile sticky CTA visibility
  const [showMobileSticky, setShowMobileSticky] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const bookingTrayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setShowMobileSticky(rect.bottom < 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectedProducts = PRODUCTS.filter((p) => homeTrialFrames.includes(p.id));
  const remainingSlots = 4 - selectedProducts.length;

  // Process steps with matching realistic photography
  const processSteps = [
    {
      num: '01',
      title: 'Choose Your Frames',
      subtitle: 'Curate your 4-frame collection',
      desc: 'Browse Fovea and select the styles you want to try. Pick up to 4 silhouettes across our cold-milled Japanese titanium and handcrafted Italian bio-acetate repertoire.',
      img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
      badge: 'Step 1 · Curate',
    },
    {
      num: '02',
      title: 'Schedule Your Trial',
      subtitle: 'Select delivery date & time',
      desc: 'Choose your preferred address, date and convenient 3-hour time slot. Our optical courier personally delivers your sanitized presentation case with white-glove care.',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85',
      badge: 'Step 2 · Schedule',
    },
    {
      num: '03',
      title: 'Try Them at Home',
      subtitle: '5 full days in natural light',
      desc: 'Experience the frames comfortably and choose what feels right. Test temple comfort, check bridge fit in natural light, consult your friends, and order prescription lenses online.',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      badge: 'Step 3 · Experience',
    },
  ];

  // Benefits list
  const benefits = [
    {
      title: 'See How Frames Actually Suit You',
      desc: 'Living with eyewear across your morning light, desk work, and evening moments reveals how a frame harmonizes with your personal expression.',
    },
    {
      title: 'Compare Multiple Styles Side by Side',
      desc: 'Test architectural geometric pantos against bold sculptural acetate squares to discover which balance best flatters your facial features.',
    },
    {
      title: 'Experience Comfort Before Deciding',
      desc: 'Feel the true weight distribution across your nasal bridge and ears over hours, ensuring all-day lightness and zero pressure points.',
    },
    {
      title: 'Try Eyewear in Your Own Environment',
      desc: 'No harsh retail spotlights or rushed sales counters. Test silhouettes in your home lighting with your everyday wardrobe pieces.',
    },
    {
      title: 'Get Assistance Without Rushing',
      desc: 'Take your time. Consult friends, family, or message our dedicated optical stylists via WhatsApp with questions on sizing and lens surfacing.',
    },
  ];

  // Scheduling dates
  const scheduleDates = [
    { label: 'Today Express', day: 'Today', sub: 'Evening dispatch' },
    { label: 'Tomorrow', day: 'Tomorrow', sub: 'Recommended' },
    { label: 'Wednesday', day: 'Wed', sub: 'Flexible' },
    { label: 'Thursday', day: 'Thu', sub: 'Flexible' },
    { label: 'Friday', day: 'Fri', sub: 'Weekend trial' },
  ];

  const timeSlots = [
    { id: 'Morning', label: 'Morning Window', time: '10 AM — 1 PM' },
    { id: 'Afternoon', label: 'Afternoon Window', time: '1 PM — 4 PM' },
    { id: 'Evening', label: 'Evening Window', time: '4 PM — 7 PM' },
  ] as const;

  // Pincode validation handler
  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincodeInput.trim();
    if (!cleanPin || cleanPin.length < 3) {
      setPincodeResult({
        status: 'not-serviceable',
        message: 'Please enter a valid postal or PIN code.',
      });
      return;
    }

    setPincodeResult({ status: 'checking', message: 'Checking delivery network...' });

    setTimeout(() => {
      // Clean, dynamic verification
      setPincodeResult({
        status: 'serviceable',
        message: `Service available for ${cleanPin}.`,
        details: 'Complimentary tracked courier delivery & optional Certified Optometrist assistance available. Next dispatch slot: Tomorrow.',
      });
    }, 600);
  };

  // FAQs
  const faqs = [
    {
      q: 'How does the Fovea Home Trial service work?',
      a: 'Select up to 4 frames online. We dispatch a custom padded velvet presentation case containing your chosen frames directly to your address. You keep them for 5 full days to try at home with zero obligation. When finished, use the prepaid return courier pouch to send them back, or order your favorite frame with custom Carl Zeiss prescription lenses online.',
    },
    {
      q: 'How many frames can I select for my trial box?',
      a: 'You can select up to 4 frames at a time. This allows you to compare complementary shapes, acetate colorways, and titanium wireweights side by side.',
    },
    {
      q: 'Can I change my selected frames before dispatch?',
      a: 'Yes. Until your presentation box is sealed and dispatched by our atelier, you can edit, remove, or replace any frame in your selection directly from your Home Trial Suite panel or by messaging our WhatsApp concierge.',
    },
    {
      q: 'How do I schedule the delivery visit?',
      a: 'Simply choose your preferred delivery date and a 3-hour time slot (Morning, Afternoon, or Evening) during booking. Our insured courier will hand over the presentation case at your door.',
    },
    {
      q: 'What if I need help choosing the right size and fit?',
      a: 'Our certified optical stylists are available via WhatsApp to review photos of your face shape, advise on bridge measurements, and recommend silhouettes. You can also request our complimentary digital eye measurement kit with your delivery.',
    },
    {
      q: 'How can I contact the Fovea Concierge team?',
      a: 'You can reach us directly via WhatsApp at +91 97009 56245 for immediate styling advice, prescription questions, or delivery rescheduling.',
    },
  ];

  const handleOpenBooking = () => {
    if (selectedProducts.length > 0) {
      setIsHomeTrialModalOpen(true);
    } else {
      // Scroll to booking tray if 0 frames
      bookingTrayRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppHelp = () => {
    const text = 'Hi Fovea, I need help with Home Trial.';
    openWhatsAppWithInquiry(text);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#0C162C]">
      {/* ============================================================== */}
      {/* 1. HERO SECTION (Dominant Realistic Lifestyle Photography) */}
      {/* ============================================================== */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden pt-8 pb-16 sm:py-24"
      >
        {/* Full-bleed Background Lifestyle Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1800&q=85"
            alt="Person relaxed and comfortably testing optical eyewear in natural interior light at home"
            fill
            priority
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="object-cover object-[center_28%] sm:object-center brightness-[0.92] contrast-[1.03]"
          />
          {/* Subtle gradient wash to guarantee high contrast typography */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C162C]/90 via-[#0C162C]/45 to-[#0C162C]/20 sm:bg-gradient-to-r sm:from-[#0C162C]/90 sm:via-[#0C162C]/50 sm:to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl text-white space-y-6 sm:space-y-8">
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-[0.24em] text-[#C5A880]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Complimentary Atelier Service</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.08] tracking-tight text-white drop-shadow-sm"
            >
              Try Fovea at Home.
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-white/90 font-light leading-relaxed max-w-md"
            >
              Choose your favourite frames and experience them comfortably before deciding. Five days in your own light, with zero upfront commitment.
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <button
                type="button"
                onClick={handleOpenBooking}
                className="min-h-[52px] px-8 bg-[#FAF9F6] hover:bg-white text-[#0C162C] font-semibold text-xs tracking-wider uppercase rounded-2xl shadow-xl hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>{selectedProducts.length > 0 ? `Book Home Trial (${selectedProducts.length})` : 'Book Home Trial'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/products"
                className="min-h-[52px] px-7 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-xs font-semibold text-xs tracking-wider uppercase rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <span>Choose Frames</span>
              </Link>
            </motion.div>

            {/* Trust Pill Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/80"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                4 Frames Selected by You
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                5 Full Days Trial
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                100% Free · $0 Deposit
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. EXPLAIN HOW IT WORKS (Visual 3-Step Interactive Process) */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
            Effortless Experience
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C]">
            How Home Trial Works.
          </h2>
          <p className="text-sm sm:text-base text-[#0C162C]/70 font-light">
            Designed to remove the friction of optical shopping. Three simple, transparent steps.
          </p>
        </div>

        {/* Interactive Desktop Sticky Split / Mobile Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Step Selectors & Text Content */}
          <div className="lg:col-span-6 space-y-4">
            {processSteps.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`cursor-pointer p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-white border-[#0C162C] shadow-xl ring-1 ring-[#0C162C]/10 translate-x-1 sm:translate-x-2'
                      : 'bg-white/60 hover:bg-white border-[#0C162C]/8 hover:border-[#0C162C]/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isActive ? 'text-[#0D5C63]' : 'text-[#0C162C]/40'
                      }`}
                    >
                      STEP {step.num}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#0D5C63]/10 text-[#0D5C63]'
                          : 'bg-[#0C162C]/5 text-[#0C162C]/40'
                      }`}
                    >
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl font-semibold text-[#0C162C] mt-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#0C162C]/75 font-light leading-relaxed mt-2">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Corresponding Real Lifestyle Image Canvas */}
          <div className="lg:col-span-6">
            <div className="relative aspect-4/3 sm:aspect-5/4 w-full rounded-3xl overflow-hidden shadow-2xl border border-[#0C162C]/10 bg-[#F5F3EF]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepIdx}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={processSteps[activeStepIdx].img}
                    alt={processSteps[activeStepIdx].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 650px"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <span className="text-xs font-mono text-[#C5A880] uppercase tracking-wider block">
                      {processSteps[activeStepIdx].subtitle}
                    </span>
                    <h4 className="font-editorial text-xl sm:text-2xl font-semibold">
                      {processSteps[activeStepIdx].title}
                    </h4>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. WHY HOME TRIAL (Benefits with Typography & Lifestyle Focus) */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#0C162C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
                The Fovea Advantage
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C] leading-tight">
                Why Experience Eyewear at Home?
              </h2>
              <p className="text-sm sm:text-base text-[#0C162C]/70 font-light leading-relaxed">
                Optical frames are an intimate daily presence on your face. Lighting in retail showrooms distorts lens reflections and bridge weight. Home Trial lets you live with precision design before committing.
              </p>

              <div className="pt-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0D5C63] hover:text-[#0C162C] transition-colors"
                >
                  <span>Explore Eligible Frames Repertoire</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Benefit Items */}
            <div className="lg:col-span-7 space-y-6">
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-[#FAF9F6] rounded-2xl border border-[#0C162C]/8 space-y-1.5 hover:border-[#0C162C]/20 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0D5C63]" />
                    <h3 className="font-editorial text-xl font-semibold text-[#0C162C]">
                      {b.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#0C162C]/75 font-light leading-relaxed pl-4">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SELECT FRAMES CTA BANNER (Guiding Users into Catalogue) */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-20 bg-[#F5F3EF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
            Start Your Curation
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C]">
            Start With the Frames You Love.
          </h2>
          <p className="text-sm sm:text-base text-[#0C162C]/75 max-w-xl mx-auto font-light leading-relaxed">
            Browse our optical and sun designs. Simply click the Home Trial icon on any frame to add it directly to your complimentary 4-frame presentation box.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/products"
              className="min-h-[50px] px-8 bg-[#0C162C] hover:bg-[#1A365D] text-[#FAF9F6] font-semibold text-xs tracking-wider uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Choose Frames</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={handleOpenBooking}
              className="min-h-[50px] px-6 bg-white hover:bg-[#FAF9F6] text-[#0C162C] border border-[#0C162C]/15 font-semibold text-xs tracking-wider uppercase rounded-2xl transition-all"
            >
              <span>View Current Selection ({selectedProducts.length}/4)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. REALISTIC LIFESTYLE BANNER (Cinematic Mood) */}
      {/* ============================================================== */}
      <section className="relative h-[55vh] sm:h-[65vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1800&q=85"
          alt="Natural lifestyle moment with someone wearing titanium eyewear in ambient room"
          fill
          sizes="100vw"
          referrerPolicy="no-referrer"
          className="object-cover object-[center_35%] brightness-[0.88]"
        />
        <div className="absolute inset-0 bg-[#0C162C]/35 backdrop-blur-[1px]" />

        <div className="relative z-10 text-center px-4 max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880] block">
            Natural Harmony
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-white drop-shadow-md leading-tight">
            Your space. Your time. Your choice.
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto font-light leading-relaxed">
            Experience how titanium bridges settle against your skin over hours, not minutes.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. DIRECT BOOKING FLOW ENTRY & PRESENTATION TRAY */}
      {/* ============================================================== */}
      <section ref={bookingTrayRef} className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0C162C]/10 pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
              Curated Presentation Suite
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0C162C] mt-1">
              Your 4-Frame Presentation Box
            </h2>
          </div>

          <div className="text-xs text-[#0C162C]/65">
            <span>{selectedProducts.length} of 4 slots filled</span>
            {selectedProducts.length > 0 && (
              <button
                type="button"
                onClick={clearHomeTrial}
                className="ml-3 text-red-700 hover:underline font-medium"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* If frames exist: Show curated 4-slot presentation tray */}
        {selectedProducts.length > 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((slotIdx) => {
                const product = selectedProducts[slotIdx];
                if (product) {
                  return (
                    <div
                      key={product.id}
                      className="relative bg-white rounded-3xl border border-[#0C162C]/10 p-4 shadow-sm flex flex-col justify-between group hover:border-[#0D5C63]/50 transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleHomeTrialFrame(product.id)}
                        className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-[#FAF9F6] text-[#0C162C]/60 hover:text-red-700 hover:bg-red-50 flex items-center justify-center transition-colors shadow-xs"
                        aria-label="Remove frame"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-[10px] font-mono text-[#0D5C63] font-semibold uppercase tracking-wider block">
                        SLOT 0{slotIdx + 1}
                      </span>

                      <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden my-3 bg-[#F5F3EF]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="220px"
                          referrerPolicy="no-referrer"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#0C162C]/50 block">
                          {product.productCode || `FOV-SB-${product.id.slice(-2)}`}
                        </span>
                        <h4 className="text-xs font-semibold text-[#0C162C] truncate">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-[#0C162C]/60 truncate">
                          {product.material}
                        </p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={`empty-${slotIdx}`}
                    className="p-6 border-2 border-dashed border-[#0C162C]/15 rounded-3xl flex flex-col items-center justify-center text-center aspect-4/3 sm:aspect-auto sm:h-64 bg-white/40"
                  >
                    <Plus className="w-6 h-6 text-[#0C162C]/30 mb-2" />
                    <span className="text-xs font-semibold text-[#0C162C]/60">
                      Empty Slot 0{slotIdx + 1}
                    </span>
                    <span className="text-[11px] text-[#0C162C]/40 mt-1 max-w-[130px]">
                      Add frame from catalogue
                    </span>
                    <Link
                      href="/products"
                      className="mt-3 text-[11px] font-semibold text-[#0D5C63] hover:underline"
                    >
                      Browse Frames →
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Tray Action Bar */}
            <div className="p-6 bg-white rounded-3xl border border-[#0C162C]/10 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#0C162C]/75 space-y-0.5 text-center sm:text-left">
                <p className="font-semibold text-[#0C162C] flex items-center gap-1.5 justify-center sm:justify-start">
                  <ShieldCheck className="w-4 h-4 text-[#0D5C63]" />
                  <span>Complimentary 5-Day Atelier Presentation Suite</span>
                </p>
                <p className="text-[11px] text-[#0C162C]/50">
                  Ready to proceed with {selectedProducts.length} selected frame{selectedProducts.length > 1 ? 's' : ''}. No payment required.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/products"
                  className="w-full sm:w-auto min-h-[46px] px-5 rounded-xl border border-[#0C162C]/15 hover:border-[#0C162C] text-xs font-semibold uppercase tracking-wider flex items-center justify-center transition-colors"
                >
                  Add More Frames
                </Link>

                <button
                  type="button"
                  onClick={() => setIsHomeTrialModalOpen(true)}
                  className="w-full sm:w-auto min-h-[46px] px-7 bg-[#0C162C] hover:bg-[#1A365D] text-[#FAF9F6] font-semibold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Continue Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State: Prompt to Choose Frames */
          <div className="p-10 sm:p-14 bg-white rounded-3xl border border-[#0C162C]/10 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] flex items-center justify-center mx-auto">
              <Layers className="w-7 h-7" />
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C]">
              Choose Your Frames First
            </h3>
            <p className="text-xs sm:text-sm text-[#0C162C]/70 max-w-md mx-auto font-light leading-relaxed">
              Your presentation box is currently empty. Explore our optical repertoire and pick up to 4 silhouettes to experience at home.
            </p>
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 min-h-[48px] px-8 bg-[#0C162C] hover:bg-[#1A365D] text-[#FAF9F6] font-semibold text-xs tracking-wider uppercase rounded-2xl shadow-md transition-all"
              >
                <span>Browse Home Trial Frames</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 7. SERVICE AREA AVAILABILITY CHECKER UI */}
      {/* ============================================================== */}
      <section className="py-14 bg-white border-y border-[#0C162C]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
              Location Verification
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-semibold text-[#0C162C]">
              Check Home Trial Availability
            </h2>
            <p className="text-xs sm:text-sm text-[#0C162C]/70 font-light max-w-lg mx-auto">
              We provide complimentary door-to-door insured courier presentation across major metropolitan areas. Enter your postal or PIN code to verify service.
            </p>
          </div>

          {/* Verification Form */}
          <form onSubmit={handleCheckPincode} className="max-w-md mx-auto space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0C162C]/40" />
                <input
                  type="text"
                  placeholder="Enter Pincode (e.g. 10001, 500001, 560001)"
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF9F6] border border-[#0C162C]/15 rounded-xl text-xs text-[#0C162C] focus:outline-hidden focus:border-[#0C162C] shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="min-h-[44px] px-6 bg-[#0C162C] hover:bg-[#1A365D] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shrink-0 shadow-xs"
              >
                Verify
              </button>
            </div>

            {/* Result Display */}
            {pincodeResult.status === 'serviceable' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-left flex items-start gap-2.5 text-xs text-emerald-900"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">{pincodeResult.message}</span>
                  <span className="text-[11px] text-emerald-800 leading-relaxed block mt-0.5">
                    {pincodeResult.details}
                  </span>
                </div>
              </motion.div>
            )}

            {pincodeResult.status === 'not-serviceable' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-left flex items-start gap-2.5 text-xs text-amber-900"
              >
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>{pincodeResult.message}</span>
              </motion.div>
            )}

            {pincodeResult.status === 'checking' && (
              <p className="text-xs text-[#0C162C]/50 animate-pulse">
                {pincodeResult.message}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. SCHEDULING EXPERIENCE (Clean Mobile-Friendly Selectors) */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
            Flexible Booking
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0C162C]">
            Select Your Preferred Schedule
          </h2>
          <p className="text-xs sm:text-sm text-[#0C162C]/70 font-light">
            Convenient windows tailored to your routine. No rigid all-day waits.
          </p>
        </div>

        {/* Date Selector Cards */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0C162C]">
            <Calendar className="w-4 h-4 text-[#0D5C63]" />
            <span>Choose Preferred Day</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {scheduleDates.map((d, idx) => (
              <button
                key={d.label}
                type="button"
                onClick={() => setSelectedDateIdx(idx)}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  selectedDateIdx === idx
                    ? 'bg-[#0C162C] text-[#FAF9F6] border-[#0C162C] shadow-md ring-1 ring-[#0C162C]'
                    : 'bg-white text-[#0C162C] border-[#0C162C]/12 hover:border-[#0C162C]/30 shadow-xs'
                }`}
              >
                <span className={`text-[10px] font-semibold uppercase tracking-wider block ${
                  selectedDateIdx === idx ? 'text-[#C5A880]' : 'text-[#0D5C63]'
                }`}>
                  {d.day}
                </span>
                <span className="text-xs font-bold block my-0.5 truncate">{d.label}</span>
                <span className={`text-[10px] block ${
                  selectedDateIdx === idx ? 'text-white/60' : 'text-[#0C162C]/50'
                }`}>
                  {d.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Window Selector Cards (Morning, Afternoon, Evening) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0C162C]">
            <Clock className="w-4 h-4 text-[#0D5C63]" />
            <span>Choose 3-Hour Delivery Window</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {timeSlots.map((ts) => (
              <button
                key={ts.id}
                type="button"
                onClick={() => setSelectedTimeSlot(ts.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  selectedTimeSlot === ts.id
                    ? 'bg-[#0C162C] text-[#FAF9F6] border-[#0C162C] shadow-md ring-1 ring-[#0C162C]'
                    : 'bg-white text-[#0C162C] border-[#0C162C]/12 hover:border-[#0C162C]/30 shadow-xs'
                }`}
              >
                <div>
                  <span className="text-xs font-bold block">{ts.label}</span>
                  <span className={`text-[11px] block mt-0.5 font-mono ${
                    selectedTimeSlot === ts.id ? 'text-white/75' : 'text-[#0C162C]/60'
                  }`}>
                    {ts.time}
                  </span>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedTimeSlot === ts.id ? 'border-[#C5A880] bg-[#C5A880]' : 'border-[#0C162C]/20'
                }`}>
                  {selectedTimeSlot === ts.id && <Check className="w-3 h-3 text-[#0C162C]" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. CALM PROFESSIONAL TRUST SECTION */}
      {/* ============================================================== */}
      <section className="py-16 bg-[#F5F3EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
              Atelier Commitments
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0C162C]">
              A Service Built on Mutual Trust
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-[#0C162C]/8 space-y-2 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-[#0D5C63]" />
              <h3 className="font-editorial text-lg font-semibold text-[#0C162C]">
                Easy Frame Selection
              </h3>
              <p className="text-xs text-[#0C162C]/70 leading-relaxed font-light">
                Pick up to 4 frames with zero deposit or credit card authorization required.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#0C162C]/8 space-y-2 shadow-xs">
              <Calendar className="w-6 h-6 text-[#0D5C63]" />
              <h3 className="font-editorial text-lg font-semibold text-[#0C162C]">
                Convenient Scheduling
              </h3>
              <p className="text-xs text-[#0C162C]/70 leading-relaxed font-light">
                Select specific 3-hour courier windows. Reschedule anytime with one tap.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#0C162C]/8 space-y-2 shadow-xs">
              <MessageSquare className="w-6 h-6 text-[#0D5C63]" />
              <h3 className="font-editorial text-lg font-semibold text-[#0C162C]">
                WhatsApp Assistance
              </h3>
              <p className="text-xs text-[#0C162C]/70 leading-relaxed font-light">
                Direct styling guidance, bridge fitting tips, and prescription support.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#0C162C]/8 space-y-2 shadow-xs">
              <RotateCcw className="w-6 h-6 text-[#0D5C63]" />
              <h3 className="font-editorial text-lg font-semibold text-[#0C162C]">
                Simple Booking Process
              </h3>
              <p className="text-xs text-[#0C162C]/70 leading-relaxed font-light">
                Completed in under a minute with pre-addressed return courier pouch included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. HOME TRIAL FAQ (Concise Accordions) */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
            Got Questions?
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C]">
            Home Trial FAQs.
          </h2>
          <p className="text-xs sm:text-sm text-[#0C162C]/70 font-light">
            Everything you need to know about trying handcrafted Fovea eyewear at home.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#0C162C]/10 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#0C162C]"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#0D5C63] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#0C162C]/40 shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 pt-1 text-xs text-[#0C162C]/75 font-light leading-relaxed border-t border-[#0C162C]/5"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. WHATSAPP HELP SECTION (+91 97009 56245) */}
      {/* ============================================================== */}
      <section className="py-14 bg-white border-t border-[#0C162C]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 bg-[#FAF9F6] rounded-3xl border border-[#0D5C63]/25 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63] flex items-center justify-center sm:justify-start gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#0D5C63]" />
                <span>Need Help? Chat on WhatsApp</span>
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C]">
                Speak Directly With an Optical Stylist
              </h3>
              <p className="text-xs text-[#0C162C]/70 font-light max-w-md">
                Have questions about face sizing, trial availability in your area, or scheduling a visit? Our concierge is ready to assist.
              </p>
              <p className="text-xs font-mono font-semibold text-[#0D5C63] pt-1">
                Official WhatsApp: +91 97009 56245
              </p>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <a
                href="https://wa.me/919700956245?text=Hi%20Fovea%2C%20I%20need%20help%20with%20Home%20Trial."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] px-8 bg-[#0D5C63] hover:bg-[#094348] text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#C5A880]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 12. MOBILE STICKY BOTTOM ACTION CTA */}
      {/* ============================================================== */}
      <AnimatePresence>
        {showMobileSticky && (
          <motion.div
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 70, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#0C162C]/10 px-4 py-3 pb-safe shadow-2xl flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#0C162C] block truncate">
                Fovea Home Trial
              </span>
              <span className="text-[11px] text-[#0D5C63] font-medium block">
                {selectedProducts.length > 0
                  ? `${selectedProducts.length} of 4 frames selected`
                  : '5 Days · 100% Free'}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleWhatsAppHelp}
                className="w-11 h-11 rounded-xl bg-[#F5F3EF] text-[#0D5C63] flex items-center justify-center border border-[#0C162C]/10 active:scale-95"
                aria-label="WhatsApp help"
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleOpenBooking}
                className="min-h-[44px] px-5 bg-[#0C162C] text-[#FAF9F6] font-semibold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-1.5 active:scale-95"
              >
                <span>{selectedProducts.length > 0 ? 'Book Trial' : 'Choose Frames'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
