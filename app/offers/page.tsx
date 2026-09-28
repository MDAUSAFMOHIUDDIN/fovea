'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Eye,
  Gift,
  Clock,
  ChevronRight,
  X,
  Copy,
  CheckCheck,
  Search,
  SlidersHorizontal,
  Layers,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  RotateCcw,
  Glasses,
  Calendar,
  Zap,
} from 'lucide-react';
import { PRODUCTS, Product } from '@/lib/data';
import { useFovea } from '@/lib/context';
import ProductCard from '@/components/common/ProductCard';

interface PrivilegeOffer {
  id: string;
  category: 'trial' | 'lenses' | 'curations' | 'services';
  categoryLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  valueHighlight: string;
  validity: string;
  eligibility: string;
  code?: string;
  image: string;
  ctaText: string;
  ctaActionType: 'link' | 'modal' | 'whatsapp';
  ctaHref?: string;
  includedBenefits: string[];
  termsDetails: {
    summary: string;
    howToRedeem: string[];
    exclusions: string;
    guarantee: string;
  };
}

const PRIVILEGES: PrivilegeOffer[] = [
  {
    id: 'priv-01',
    category: 'trial',
    categoryLabel: 'Home Trial',
    badge: 'Signature Privilege',
    title: 'The 4-Frame Home Trial Suite',
    subtitle: 'Sanctuary fitting in your own personal lighting',
    description:
      'Select any 4 optical or sun silhouettes to experience in your everyday environment for 5 full days. Delivered in a cushioned velvet presentation case with complimentary round-trip courier.',
    valueHighlight: 'Complimentary · $0 Deposit',
    validity: 'Active Year-Round Privilege',
    eligibility: 'Available to all residential addresses across covered metro territories.',
    code: 'FOV-HOME4-SUITE',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85',
    ctaText: 'Reserve 4-Frame Suite',
    ctaActionType: 'link',
    ctaHref: '/home-trial',
    includedBenefits: [
      '4 Handcrafted frames of your choice',
      'Velvet travel case with precision optometric PD millimeter ruler',
      '5 Full days of at-home wear under natural daylight',
      'Pre-paid carbon-neutral courier return label included',
      'Zero deposit or forced purchasing obligation',
    ],
    termsDetails: {
      summary:
        'The Home Trial suite is an unconditional complimentary client privilege. A nominal $1 pre-authorization hold is placed on your card during booking and immediately voided upon confirmation.',
      howToRedeem: [
        'Select up to 4 frames on the catalog by tapping "Try at Home"',
        'Choose your preferred delivery address and scheduled delivery date',
        'Wear and compare your frames for 5 full days with family and friends',
        'Keep what you love online, and hand the sealed presentation box to the scheduled pickup courier',
      ],
      exclusions: 'Maximum of 4 frames per household at one time. Domestic addresses only.',
      guarantee: '100% Free shipping and returns. No automatic charges or hidden subscriptions.',
    },
  },
  {
    id: 'priv-02',
    category: 'lenses',
    categoryLabel: 'Optical & Lenses',
    badge: 'Optical Excellence',
    title: 'Carl Zeiss LotuTec Multi-Coating Included',
    subtitle: 'Crystal optical clarity without lens glare',
    description:
      'Every prescription lens order is automatically upgraded with genuine Carl Zeiss anti-reflective, dust-repellent hydrophobic, and scratch-resistant coating at zero added cost.',
    valueHighlight: 'Included on All Prescriptions ($120 Value)',
    validity: 'Permanent Client Optical Privilege',
    eligibility: 'Applies automatically to all Single-Vision, Digital Relax, and Progressive lens orders.',
    code: 'FOV-ZEISS-VIP',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
    ctaText: 'Configure Optical Lenses',
    ctaActionType: 'link',
    ctaHref: '/products?category=Optical',
    includedBenefits: [
      'Zeiss 9-layer anti-reflective micro-coating',
      'Oleophobic nano-layer that resists facial oils and fingerprints',
      'Hydrophobic lotus-leaf water-beading surface',
      'Full UV400 optical radiation defense on both front and back lens curvature',
    ],
    termsDetails: {
      summary:
        'All optical frames completed in our private optical lab are paired with certified Carl Zeiss lenses featuring authentic micro-laser engraving.',
      howToRedeem: [
        'Select your preferred optical frame silhouette',
        'Choose Single-Vision or Progressive prescription type',
        'Upload your optometric prescription or email it to our concierge',
        'Carl Zeiss LotuTec coating is automatically incorporated during optical laboratory fabrication',
      ],
      exclusions: 'Standard non-prescription demonstration lenses do not require medical coatings.',
      guarantee: '2-Year Carl Zeiss lens coating peeling and delamination warranty.',
    },
  },
  {
    id: 'priv-03',
    category: 'curations',
    categoryLabel: 'Atelier Curations',
    badge: 'Dual Perspective',
    title: 'The Optical & Sunglass Pairing Privilege',
    subtitle: 'Harmonize your indoor vision and outdoor presence',
    description:
      'Curate a complete eyewear wardrobe by pairing any optical frame with a second optical or titanium sunglass. Enjoy a 15% privilege on the second frame and receive a hand-stitched Italian leather dual travel roll.',
    valueHighlight: '15% on 2nd Frame + Leather Dual Roll',
    validity: 'Curated Seasonal Privilege',
    eligibility: 'Valid on orders or Home Trial purchases containing 2 or more complete frames.',
    code: 'FOV-DUO-ATELIER',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
    ctaText: 'Curate 2-Frame Wardrobe',
    ctaActionType: 'link',
    ctaHref: '/collections',
    includedBenefits: [
      '15% Atelier deduction applied to the lower-value frame',
      'Complimentary vegetable-tanned bridle leather dual travel case',
      'Dual optical micro-fiber cleaning cloths with bespoke atelier debossing',
      'Complimentary prescription alignment for both frames',
    ],
    termsDetails: {
      summary:
        'Designed for clients seeking seamless transition from indoor architectural optical wear to outdoor polarized mineral glass defense.',
      howToRedeem: [
        'Add 2 or more frames to your cart or select them from your Home Trial box',
        'Enter code FOV-DUO-ATELIER during checkout, or mention it to your WhatsApp concierge',
        'The 15% privilege will deduct automatically from the second pair, and the dual leather roll will be added to your parcel',
      ],
      exclusions: 'Cannot be combined with clearance archive editions. Maximum 2 curations per client.',
      guarantee: 'Standard 30-day individual satisfaction guarantee applies to both frames.',
    },
  },
  {
    id: 'priv-04',
    category: 'trial',
    categoryLabel: 'Home Trial',
    badge: 'Concierge Optometry',
    title: 'Complimentary In-Home Optometrist Fitting',
    subtitle: 'Clinical optical precision brought to your doorstep',
    description:
      'Prefer in-person fitting guidance? Request a certified Fovea optical specialist to accompany your 4-frame trial box to measure pupillary distance (PD), ocular heights, and fine-tune bridge balance.',
    valueHighlight: 'Complimentary Service · Select Metro Areas',
    validity: 'Active in Metro Zones',
    eligibility: 'Available on request for Home Trial bookings within central metropolitan zones.',
    code: 'FOV-OPTICIAN-CARE',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
    ctaText: 'Request Home Fitting',
    ctaActionType: 'whatsapp',
    includedBenefits: [
      '30-Minute private optical consultation in your living room or office',
      'Digital video-pupillometer measurement for sub-millimeter PD precision',
      'Pantoscopic tilt and temple curvature adjustment using optical heated air',
      'Professional prescription evaluation and lens thickness recommendations',
    ],
    termsDetails: {
      summary:
        'Our licensed dispensing opticians travel directly to your residence with clinical adjustment tools, ensuring your chosen frame rests weightlessly without pinching.',
      howToRedeem: [
        'Book your Home Trial or connect directly with our WhatsApp concierge',
        'Select the "Optician Visit" preference in step 2 of the Home Trial booking',
        'Confirm your 1-hour appointment window',
      ],
      exclusions: 'Restricted to designated metropolitan areas (New York, London, Tokyo, Singapore, Dubai).',
      guarantee: 'Zero pressure. Opticians do not carry sales quotas; consultation is strictly optical advisory.',
    },
  },
  {
    id: 'priv-05',
    category: 'lenses',
    categoryLabel: 'Optical & Lenses',
    badge: 'Screen Ergonomics',
    title: 'Zeiss BlueGuard Digital Defense Upgrade',
    subtitle: 'Circadian-friendly protection without residual yellow tint',
    description:
      'Protect against modern monitor fatigue. Upgrade your daily optical prescription to Carl Zeiss BlueGuard material-integrated blue light defense with 50% privilege on the lens surcharge.',
    valueHighlight: '50% Lens Upgrade Privilege',
    validity: 'Limited Atelier Allocation',
    eligibility: 'Applies to all single-vision prescription and non-prescription computer lenses.',
    code: 'FOV-BLUE-DEFENSE',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=85',
    ctaText: 'Explore Blue-Defense',
    ctaActionType: 'link',
    ctaHref: '/products?category=Optical',
    includedBenefits: [
      'Blocks up to 40% of high-energy visible blue light (400–455nm)',
      'Substantially reduced irritating purple reflections compared to legacy coatings',
      'Up to 50% clearer lens substrate with no distracting sepia-yellow cast',
      'Full ZEISS UVProtect defense up to 400nm',
    ],
    termsDetails: {
      summary:
        'Zeiss BlueGuard integrates the protective filtering directly into the lens monomer rather than relying purely on superficial surface reflections.',
      howToRedeem: [
        'Select any optical frame from our collection',
        'Choose "Digital Relax / Computer Vision" in the lens builder',
        'Enter code FOV-BLUE-DEFENSE or notify your concierge during prescription confirmation',
      ],
      exclusions: 'Not applicable to polarized sunglasses or heavy mineral glass tints.',
      guarantee: 'Includes full 30-day visual comfort and adaptation guarantee.',
    },
  },
  {
    id: 'priv-06',
    category: 'services',
    categoryLabel: 'Client Services',
    badge: 'Lifetime Commitment',
    title: 'Lifetime Ultrasonic Care & Frame Re-Tuning',
    subtitle: 'Permanent maintenance for a lifetime of balance',
    description:
      'Eyewear should endure for generations. Every Fovea frame includes complimentary lifetime ultrasonic cleansing, silicone nosepad refresh, screw tightening, and hand-rouge surface burnishing.',
    valueHighlight: 'Permanent Client Privilege · Always Free',
    validity: 'For the Life of Your Frame',
    eligibility: 'Available to all original owners of authenticated Fovea eyewear.',
    code: 'FOV-LIFETIME-CARE',
    image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=1200&q=85',
    ctaText: 'Contact Atelier Care',
    ctaActionType: 'whatsapp',
    includedBenefits: [
      'Ultrasonic bath cleansing to clear micro-contaminants from hinges and bevels',
      'Replacement of medical-grade silicone nosepads and temple sleeves',
      'Hinge tension recalibration and thread-lock security',
      'Manual jeweler rouge buffing to restore Italian bio-acetate gloss',
    ],
    termsDetails: {
      summary:
        'Simply visit any partner optical showroom or ship your frames to our atelier with pre-paid maintenance routing once per year.',
      howToRedeem: [
        'Initiate a care request via our WhatsApp concierge or concierge@fovea.com',
        'Receive your complimentary return shipping box and protective shipping sleeve',
        'Our master technicians service, tune, and polish your frame within 48 hours',
      ],
      exclusions: 'Does not cover intentional damage, deep vehicle crush, or third-party unauthorized repairs.',
      guarantee: 'All servicing performed exclusively by certified optical craftsmen.',
    },
  },
];

export default function OffersPage() {
  const { openWhatsAppWithInquiry, setIsHomeTrialModalOpen } = useFovea();

  // Filter state
  const [activeCategory, setActiveCategory] = useState<'all' | 'trial' | 'lenses' | 'curations' | 'services'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modal state for full terms & privilege details
  const [selectedPrivilege, setSelectedPrivilege] = useState<PrivilegeOffer | null>(null);

  // Product promotion section category filter
  const [productFilter, setProductFilter] = useState<'All' | 'Optical' | 'Sunglasses'>('All');

  // Copy code handler
  const handleCopyCode = (code: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 3000);
    }
  };

  // Filtered privileges
  const filteredPrivileges = useMemo(() => {
    return PRIVILEGES.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.code && item.code.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Featured products for the privilege promotion section
  const eligibleProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (productFilter === 'All') return true;
      return p.category === productFilter;
    }).slice(0, 4);
  }, [productFilter]);

  // Handle CTA action
  const handlePrivilegeAction = (privilege: PrivilegeOffer) => {
    if (privilege.ctaActionType === 'whatsapp') {
      openWhatsAppWithInquiry(
        `Hello Fovea Concierge, I would like to inquire about the privilege: "${privilege.title}" (Code: ${privilege.code || 'N/A'}).`
      );
    } else if (privilege.ctaActionType === 'modal') {
      setSelectedPrivilege(privilege);
    }
  };

  return (
    <div className="bg-[#FAF9F6] text-[#0C162C] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 border-b border-[#0C162C]/8 overflow-hidden bg-gradient-to-b from-[#F5F2EB] to-[#FAF9F6]">
        {/* Subtle Ambient Grain & Geometry */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0C162C_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Refined Typography & Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 sm:space-y-8"
            >
              {/* Small Label */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#0C162C]/10 backdrop-blur-xs text-[#0D5C63] text-xs font-semibold tracking-[0.2em] uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0D5C63]" />
                <span>FOVEA OFFERS · ATELIER PRIVILEGES</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-3">
                <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-semibold text-[#0C162C] leading-[1.08] tracking-tight">
                  More Value.
                  <br />
                  <span className="italic font-normal text-[#0D5C63]">Same Perspective.</span>
                </h1>
                <p className="text-base sm:text-xl text-[#0C162C]/75 font-light leading-relaxed max-w-xl">
                  We believe true luxury eyewear should have transparent pricing with no artificial seasonal markups.
                  Discover our permanent client privileges, Carl Zeiss lens coating upgrades, and zero-deposit home trial suites.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="#privileges"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#0C162C] text-[#FAF9F6] text-xs uppercase tracking-[0.16em] font-semibold rounded-2xl hover:bg-[#1A365D] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>View Current Offers</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsHomeTrialModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-[#0C162C] border border-[#0C162C]/15 text-xs uppercase tracking-[0.16em] font-semibold rounded-2xl hover:bg-[#F0EDE5] transition-all duration-300 shadow-xs hover:border-[#0C162C]/30"
                >
                  <Glasses className="w-4 h-4 text-[#0D5C63]" />
                  <span>Book Home Trial</span>
                </button>
              </div>

              {/* Highlights Ribbon */}
              <div className="pt-6 border-t border-[#0C162C]/8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0C162C]">
                    <ShieldCheck className="w-4 h-4 text-[#0D5C63]" />
                    <span>0 Deposit Trial</span>
                  </div>
                  <p className="text-[11px] text-[#0C162C]/60">5 Days in your sanctuary</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0C162C]">
                    <Sparkles className="w-4 h-4 text-[#0D5C63]" />
                    <span>Carl Zeiss Inclusions</span>
                  </div>
                  <p className="text-[11px] text-[#0C162C]/60">LotuTec coating at $0 fee</p>
                </div>

                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0C162C]">
                    <RotateCcw className="w-4 h-4 text-[#0D5C63]" />
                    <span>Lifetime Tune-ups</span>
                  </div>
                  <p className="text-[11px] text-[#0C162C]/60">Ultrasonic care forever</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: High-End Realistic Editorial Photography */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Visual: Confident Person Wearing Refined Eyewear in Natural Sunlight */}
                <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-[#E8E4DA]">
                  <Image
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1400&q=85"
                    alt="Fovea client wearing handcrafted architectural eyewear in soft daylight"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 40vw"
                    referrerPolicy="no-referrer"
                    className="object-cover object-center filter saturate-[0.95]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C162C]/50 via-transparent to-transparent" />

                  {/* Editorial Tag Floating on Image */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg text-[#0C162C]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="uppercase tracking-[0.16em] font-semibold text-[#0D5C63]">
                        Atelier Philosophy
                      </span>
                      <span className="text-[11px] text-[#0C162C]/60">Tokyo · Belluno</span>
                    </div>
                    <p className="text-xs text-[#0C162C]/80 font-light leading-snug">
                      No deceptive countdown timers or inflated retail markups. Every frame reflects genuine material craftsmanship.
                    </p>
                  </div>
                </div>

                {/* Floating Privilege Accent Pill */}
                <div className="absolute -top-4 -right-4 sm:-right-6 bg-white rounded-2xl p-3 sm:p-4 border border-[#0C162C]/8 shadow-xl hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0D5C63]/10 flex items-center justify-center text-[#0D5C63]">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#0D5C63] font-semibold">
                      Signature Privilege
                    </p>
                    <p className="text-xs font-semibold text-[#0C162C]">4-Frame Home Trial Suite</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THE FOVEA VALUE STANDARDS (Anti-Discount Slop Credibility) */}
      <section className="py-12 bg-white border-b border-[#0C162C]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#0C162C]/10 flex items-center justify-center text-[#0D5C63] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-[#0C162C]">Honest Workshop Pricing</h4>
                <p className="text-xs text-[#0C162C]/65 leading-relaxed font-light">
                  Milled directly from Sabae and northern Italy without luxury middleman markups.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#0C162C]/10 flex items-center justify-center text-[#0D5C63] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-[#0C162C]">Carl Zeiss Partnership</h4>
                <p className="text-xs text-[#0C162C]/65 leading-relaxed font-light">
                  Hydrophobic LotuTec multi-coating standard with every optical prescription.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#0C162C]/10 flex items-center justify-center text-[#0D5C63] shrink-0">
                <Glasses className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-[#0C162C]">Zero-Deposit Home Trial</h4>
                <p className="text-xs text-[#0C162C]/65 leading-relaxed font-light">
                  Wear 4 frames for 5 days in total comfort before choosing your silhouette.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#0C162C]/10 flex items-center justify-center text-[#0D5C63] shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-[#0C162C]">Lifetime Care Commitment</h4>
                <p className="text-xs text-[#0C162C]/65 leading-relaxed font-light">
                  Complimentary ultrasonic cleans, pad swaps, and hinge re-tightening anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACTIVE OFFERS & PRIVILEGES SECTION (Interactive Filter + Cards) */}
      <section id="privileges" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0C162C]/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
              <span>Current Privileges</span>
              <span>·</span>
              <span>Transparent Terms</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C]">
              Atelier Privileges & Services
            </h2>
            <p className="text-sm sm:text-base text-[#0C162C]/70 leading-relaxed font-light">
              Explore active complimentary perks designed to make discovering, fitting, and wearing Fovea eyewear completely effortless.
            </p>
          </div>

          {/* Search bar inside header for instant privilege discovery */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#0C162C]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search privileges or codes..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#0C162C]/12 rounded-xl text-xs placeholder:text-[#0C162C]/40 focus:outline-none focus:border-[#0D5C63] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0C162C]/40 hover:text-[#0C162C]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1">
          {[
            { id: 'all', label: 'All Privileges', count: PRIVILEGES.length },
            {
              id: 'trial',
              label: 'Home Trial',
              count: PRIVILEGES.filter((p) => p.category === 'trial').length,
            },
            {
              id: 'lenses',
              label: 'Optical & Lenses',
              count: PRIVILEGES.filter((p) => p.category === 'lenses').length,
            },
            {
              id: 'curations',
              label: 'Atelier Curations',
              count: PRIVILEGES.filter((p) => p.category === 'curations').length,
            },
            {
              id: 'services',
              label: 'Client Services',
              count: PRIVILEGES.filter((p) => p.category === 'services').length,
            },
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                className={`relative px-4 py-2.5 min-h-[44px] rounded-full text-xs font-semibold tracking-wider transition-all duration-300 shrink-0 flex items-center gap-2 active:scale-95 ${
                  isActive
                    ? 'bg-[#0C162C] text-[#FAF9F6] shadow-sm'
                    : 'bg-white text-[#0C162C]/70 border border-[#0C162C]/10 hover:border-[#0C162C]/25 hover:text-[#0C162C]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#FAF9F6] text-[#0C162C]/60'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 10. EMPTY STATE (When filters yield no results) */}
        {filteredPrivileges.length === 0 && (
          <div className="bg-white rounded-3xl border border-[#0C162C]/10 p-12 text-center space-y-5 max-w-xl mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF9F6] border border-[#0C162C]/10 mx-auto flex items-center justify-center text-[#0D5C63]">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-editorial text-2xl font-semibold text-[#0C162C]">
                No Privileges Match Your Search
              </h3>
              <p className="text-xs sm:text-sm text-[#0C162C]/70 leading-relaxed font-light">
                All our signature optical privileges—including the 4-frame Home Trial and Zeiss LotuTec coating—remain active year-round without artificial promotion windows.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0C162C] text-[#FAF9F6] text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-[#1A365D] transition-colors"
            >
              <span>Reset Filters & Explore All</span>
            </button>
          </div>
        )}

        {/* 3. PREMIUM OFFER CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrivileges.map((offer, idx) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group bg-white rounded-3xl border border-[#0C162C]/8 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#0C162C]/20 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative aspect-16/10 w-full bg-[#EAE6DF] overflow-hidden">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    referrerPolicy="no-referrer"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

                  {/* Top Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#0D5C63] bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-xs">
                      {offer.badge}
                    </span>
                  </div>

                  {/* Bottom Highlight Label on Image */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-center justify-between text-white">
                    <span className="text-xs font-semibold tracking-wide drop-shadow-xs">
                      {offer.valueHighlight}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-white/80 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
                      {offer.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  {/* Title & Subtitle */}
                  <div className="space-y-1.5">
                    <h3 className="font-editorial text-2xl font-semibold text-[#0C162C] group-hover:text-[#0D5C63] transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-[#0D5C63] font-medium tracking-wide">
                      {offer.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#0C162C]/70 leading-relaxed font-light">
                    {offer.description}
                  </p>

                  {/* Key Benefits Checklist */}
                  <div className="pt-2 space-y-2">
                    {offer.includedBenefits.slice(0, 3).map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-[#0C162C]/80">
                        <Check className="w-3.5 h-3.5 text-[#0D5C63] shrink-0 mt-0.5" />
                        <span className="leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Code Snippet with 1-Tap Copy */}
                  {offer.code && (
                    <div className="pt-2">
                      <div className="p-2.5 bg-[#FAF9F6] border border-[#0C162C]/8 rounded-xl flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-[10px] uppercase tracking-wider text-[#0C162C]/50 block font-semibold">
                            Privilege Reference Code
                          </span>
                          <span className="font-mono text-xs font-semibold text-[#0C162C]">
                            {offer.code}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => handleCopyCode(offer.code!, e)}
                          title="Copy privilege code"
                          className="px-2.5 py-1.5 rounded-lg bg-white border border-[#0C162C]/10 text-xs font-medium text-[#0C162C] hover:bg-[#0C162C] hover:text-white transition-colors flex items-center gap-1.5 shadow-2xs"
                        >
                          {copiedCode === offer.code ? (
                            <>
                              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-[11px] text-emerald-600 font-semibold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[11px]">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Eligibility & Validity Meta */}
                  <div className="pt-2 border-t border-[#0C162C]/6 text-[11px] text-[#0C162C]/65 space-y-1">
                    <p>
                      <strong className="text-[#0C162C] font-semibold">Eligibility: </strong>
                      <span>{offer.eligibility}</span>
                    </p>
                    <p>
                      <strong className="text-[#0C162C] font-semibold">Status: </strong>
                      <span className="text-[#0D5C63] font-medium">{offer.validity}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer CTAs */}
              <div className="p-6 sm:p-7 pt-0 border-t border-[#0C162C]/6 mt-4 flex flex-col gap-2.5">
                {offer.ctaActionType === 'link' && offer.ctaHref ? (
                  <Link
                    href={offer.ctaHref}
                    className="w-full min-h-[46px] bg-[#0C162C] text-[#FAF9F6] font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#1A365D] transition-all duration-300 flex items-center justify-center gap-2 shadow-xs hover:shadow-md"
                  >
                    <span>{offer.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => handlePrivilegeAction(offer)}
                    className="w-full min-h-[46px] bg-[#0C162C] text-[#FAF9F6] font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#1A365D] transition-all duration-300 flex items-center justify-center gap-2 shadow-xs hover:shadow-md"
                  >
                    <span>{offer.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {/* View Full Terms & Details Trigger */}
                <button
                  type="button"
                  onClick={() => setSelectedPrivilege(offer)}
                  className="w-full py-2 text-center text-xs font-medium text-[#0C162C]/60 hover:text-[#0D5C63] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Privilege Terms & Details</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. CINEMATIC FEATURED OFFER BANNER */}
      <section className="py-12 sm:py-20 bg-[#0C162C] text-white relative overflow-hidden">
        {/* Cinematic Backdrop with Realistic Lifestyle Photography */}
        <div className="absolute inset-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1800&q=85"
            alt="Fovea lifestyle campaign banner"
            fill
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="object-cover object-center filter grayscale"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C162C] via-[#0C162C]/90 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#A88960] text-xs font-semibold tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE SIGNATURE ATELIER SERVICE</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.12]">
              A Better Way to Discover Your Next Frame.
            </h2>

            <p className="text-sm sm:text-lg text-white/80 font-light leading-relaxed">
              Why rush optical decisions inside bright fluorescent retail stores? With our complimentary Home Trial suite,
              experience 4 curated frames where life actually unfolds—at your morning desk, in natural sunlight, and in comfort.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setIsHomeTrialModalOpen(true)}
                className="px-8 py-4 bg-[#FAF9F6] text-[#0C162C] text-xs uppercase tracking-[0.16em] font-semibold rounded-2xl hover:bg-white transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
              >
                <span>Reserve 4-Frame Home Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() =>
                  openWhatsAppWithInquiry(
                    'Hello Fovea Concierge, I would like to learn more about the 4-frame Home Trial service and ask about frame dimensions.'
                  )
                }
                className="px-8 py-4 bg-transparent text-white border border-white/20 text-xs uppercase tracking-[0.16em] font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#A88960]" />
                <span>Consult Optical Concierge</span>
              </button>
            </div>

            {/* Micro Guarantees */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#A88960]" />
                $0 Deposit Hold
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#A88960]" />
                5 Full Days Trial
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#A88960]" />
                Pre-paid Courier Return
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRODUCT PROMOTION SECTION (Real products tied to privileges) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0C162C]/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
              <span>Curated Selection</span>
              <span>·</span>
              <span>Signature Inclusions</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C]">
              Frames Eligible for Atelier Privileges
            </h2>
            <p className="text-sm sm:text-base text-[#0C162C]/70 leading-relaxed font-light">
              Every handcrafted frame below qualifies for our complimentary 4-frame Home Trial suite, Carl Zeiss hydrophobic multi-coatings, and bespoke velvet travel casing.
            </p>
          </div>

          {/* Product Category Filter */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-[#0C162C]/10 shadow-2xs">
            {(['All', 'Optical', 'Sunglasses'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setProductFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-colors ${
                  productFilter === cat
                    ? 'bg-[#0C162C] text-[#FAF9F6]'
                    : 'text-[#0C162C]/60 hover:text-[#0C162C]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid using existing Fovea ProductCard system */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {eligibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center pt-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-[#0C162C]/15 text-[#0C162C] text-xs uppercase tracking-[0.16em] font-semibold rounded-2xl hover:bg-[#FAF9F6] hover:border-[#0C162C]/30 transition-all shadow-xs"
          >
            <span>Explore Entire 24-Piece Catalog</span>
            <ChevronRight className="w-4 h-4 text-[#0D5C63]" />
          </Link>
        </div>
      </section>

      {/* 7. HOME TRIAL SIGNATURE PRIVILEGE SPOTLIGHT */}
      <section className="py-16 sm:py-24 bg-[#F5F2EB] border-t border-b border-[#0C162C]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: How Home Trial Works */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
                  COMPLIMENTARY CONCIERGE SERVICE
                </span>
                <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C]">
                  How the 4-Frame Home Trial Privilege Works
                </h2>
                <p className="text-sm sm:text-base text-[#0C162C]/70 font-light leading-relaxed">
                  We eliminated the guesswork from optical discovery. Select your preferred silhouettes and test them seamlessly in 4 simple steps.
                </p>
              </div>

              {/* 4 Interactive Process Steps */}
              <div className="space-y-5">
                {[
                  {
                    step: '01',
                    title: 'Select 4 Silhouettes',
                    desc: 'Browse our optical and sunglasses catalog and tap "Try at Home" to assemble your private presentation suite.',
                  },
                  {
                    step: '02',
                    title: 'Delivered in Velvet Box',
                    desc: 'Receive your curated box containing all 4 frames, precision optometric PD calibration ruler, and return packaging.',
                  },
                  {
                    step: '03',
                    title: 'Wear for 5 Full Days',
                    desc: 'Examine each frame in front of your home mirrors, test screen comfort, and consult with family and colleagues.',
                  },
                  {
                    step: '04',
                    title: 'Keep What You Love, Return the Rest',
                    desc: 'Complete your order online with your prescription. Hand the pre-sealed return box to our scheduled courier—100% pre-paid.',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-[#0C162C]/8 flex items-start gap-4 shadow-2xs hover:shadow-md transition-shadow"
                  >
                    <span className="font-editorial text-2xl font-bold text-[#0D5C63] shrink-0">
                      {item.step}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-[#0C162C]">{item.title}</h4>
                      <p className="text-xs text-[#0C162C]/70 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/home-trial"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#0C162C] text-[#FAF9F6] text-xs uppercase tracking-[0.16em] font-semibold rounded-2xl hover:bg-[#1A365D] transition-all shadow-md"
                >
                  <span>Experience The Home Trial Page</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: High-Res Realistic Lifestyle & Presentation Suite Photography */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-4/3 sm:aspect-5/4 rounded-3xl overflow-hidden shadow-2xl border border-white/70 bg-[#E5E1D5]">
                <Image
                  src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1400&q=85"
                  alt="Fovea Home Trial suite presentation box with optical frames"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between text-[#0C162C]">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#0D5C63] block">
                      Client Privilege
                    </span>
                    <span className="text-xs font-semibold text-[#0C162C]">
                      Zero Purchase Obligation
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#0D5C63] bg-[#0D5C63]/10 px-3 py-1 rounded-full">
                    Pre-paid Courier
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS & TRANSPARENT TERMS */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>TRANSPARENCY & CLARITY</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C]">
            Questions on Privileges & Ordering
          </h2>
          <p className="text-xs sm:text-sm text-[#0C162C]/70 leading-relaxed font-light">
            We avoid ambiguous fine print. Here is everything you need to know about our atelier standards and privileges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: 'Are there any hidden shipping fees or return costs for the Home Trial?',
              a: 'No. The 4-frame Home Trial is 100% complimentary. We provide a pre-paid carbon-neutral courier label inside the box. If you decide not to purchase any frame, simply return the box with zero charge.',
            },
            {
              q: 'How does the Carl Zeiss LotuTec coating privilege work?',
              a: 'Carl Zeiss LotuTec 9-layer hydrophobic and anti-reflective coating is automatically integrated into every optical prescription lens crafted in our lab ($120 standard optical industry value included at $0).',
            },
            {
              q: 'Can I redeem multiple privileges on a single order?',
              a: 'Yes! The 4-Frame Home Trial privilege and Carl Zeiss lens coating upgrade automatically stack with any multi-pair curation privilege code (such as FOV-DUO-ATELIER).',
            },
            {
              q: 'What if I need custom progressive or high-index optical prescriptions?',
              a: 'We support single-vision, office relax, and Carl Zeiss Progressive individual multifocals up to 1.74 ultra-thin high-index materials. Our optometric concierge will review your prescription before edging.',
            },
            {
              q: 'How do I submit my prescription and pupillary distance (PD)?',
              a: 'You can upload a photo of your doctor’s prescription during checkout, email concierge@fovea.com, or send it via our encrypted WhatsApp concierge line. Our team will verify lens heights and calibration.',
            },
            {
              q: 'What is covered under the Lifetime Maintenance Privilege?',
              a: 'Every genuine Fovea frame includes lifetime ultrasonic deep cleans, silicone nosepad replacement, screw tensioning, and hand-rouge acetate burnishing at zero charge forever.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#0C162C]/8 space-y-2 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <h4 className="text-sm font-semibold text-[#0C162C] leading-snug">{item.q}</h4>
              <p className="text-xs text-[#0C162C]/70 leading-relaxed font-light">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FINAL REFINED CONCIERGE CTA */}
      <section className="py-16 sm:py-24 bg-white border-t border-[#0C162C]/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
          <div className="w-16 h-16 rounded-3xl bg-[#FAF9F6] border border-[#0C162C]/10 mx-auto flex items-center justify-center text-[#0D5C63] shadow-sm">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
              DIRECT ATELIER ASSISTANCE
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl font-semibold text-[#0C162C]">
              Experience Fovea With Complete Confidence.
            </h2>
            <p className="text-sm sm:text-base text-[#0C162C]/70 max-w-xl mx-auto leading-relaxed font-light">
              Whether reserving a 4-frame Home Trial box, inquiring about bridge measurements, or configuring Zeiss lenses, our licensed optical stylists are at your disposal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => setIsHomeTrialModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-[#0C162C] text-[#FAF9F6] text-xs uppercase tracking-[0.16em] font-semibold rounded-2xl hover:bg-[#1A365D] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Book Complimentary Home Trial</span>
            </button>

            <button
              type="button"
              onClick={() =>
                openWhatsAppWithInquiry(
                  'Hello Fovea Optical Concierge, I would like to consult with an eyewear specialist about frame shapes and active atelier privileges.'
                )
              }
              className="w-full sm:w-auto px-8 py-4 bg-[#FAF9F6] text-[#0C162C] border border-[#0C162C]/15 text-xs uppercase tracking-[0.16em] font-semibold rounded-2xl hover:bg-white hover:border-[#0C162C]/30 transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-[#0D5C63]" />
              <span>Chat with Optical Concierge</span>
            </button>
          </div>

          <p className="text-[11px] text-[#0C162C]/50 pt-2">
            7 Days a Week · 9:00 AM – 9:00 PM EST · Dedicated Optical Specialists
          </p>
        </div>
      </section>

      {/* 11. PRIVILEGE DETAILS & TERMS MODAL */}
      <AnimatePresence>
        {selectedPrivilege && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#0C162C]/10 overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-7 border-b border-[#0C162C]/8 flex items-start justify-between gap-4 bg-[#FAF9F6]">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#0D5C63] bg-white px-2.5 py-0.5 rounded-full border border-[#0C162C]/8">
                      {selectedPrivilege.badge}
                    </span>
                    <span className="text-xs text-[#0C162C]/60">·</span>
                    <span className="text-xs font-semibold text-[#0C162C]">
                      {selectedPrivilege.valueHighlight}
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C]">
                    {selectedPrivilege.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPrivilege(null)}
                  className="w-9 h-9 rounded-full bg-white border border-[#0C162C]/10 flex items-center justify-center text-[#0C162C]/60 hover:text-[#0C162C] hover:bg-[#FAF9F6] transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content Scrollable Area */}
              <div className="p-6 sm:p-7 overflow-y-auto space-y-6 text-[#0C162C]">
                {/* Summary */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#0D5C63]">
                    Privilege Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-[#0C162C]/75 leading-relaxed font-light">
                    {selectedPrivilege.termsDetails.summary}
                  </p>
                </div>

                {/* What's Included */}
                <div className="space-y-2.5">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#0D5C63]">
                    What’s Included
                  </h4>
                  <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#0C162C]/6 space-y-2">
                    {selectedPrivilege.includedBenefits.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#0C162C]/85">
                        <Check className="w-3.5 h-3.5 text-[#0D5C63] shrink-0 mt-0.5" />
                        <span className="leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How to Redeem Steps */}
                <div className="space-y-2.5">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#0D5C63]">
                    How to Redeem
                  </h4>
                  <div className="space-y-2">
                    {selectedPrivilege.termsDetails.howToRedeem.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs text-[#0C162C]/80">
                        <span className="w-5 h-5 rounded-full bg-[#0C162C] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reference Code Box */}
                {selectedPrivilege.code && (
                  <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#0C162C]/8 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#0C162C]/50 block font-semibold">
                        Code for Checkout or Concierge
                      </span>
                      <span className="font-mono text-sm font-semibold text-[#0C162C]">
                        {selectedPrivilege.code}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(selectedPrivilege.code!)}
                      className="px-3.5 py-1.5 rounded-xl bg-white border border-[#0C162C]/10 text-xs font-medium text-[#0C162C] hover:bg-[#0C162C] hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      {copiedCode === selectedPrivilege.code ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Exclusions & Guarantee */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#0C162C]/70">
                  <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#0C162C]/5">
                    <strong className="text-[#0C162C] block mb-1">Eligibility Criteria</strong>
                    <span>{selectedPrivilege.termsDetails.exclusions}</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#0C162C]/5">
                    <strong className="text-[#0C162C] block mb-1">Our Guarantee</strong>
                    <span>{selectedPrivilege.termsDetails.guarantee}</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-6 border-t border-[#0C162C]/8 bg-[#FAF9F6] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-[#0C162C]/60 text-center sm:text-left">
                  Need custom assistance? Our optical concierge is available daily.
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {selectedPrivilege.ctaHref ? (
                    <Link
                      href={selectedPrivilege.ctaHref}
                      onClick={() => setSelectedPrivilege(null)}
                      className="w-full sm:w-auto px-6 py-3 bg-[#0C162C] text-[#FAF9F6] text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-[#1A365D] transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <span>{selectedPrivilege.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        handlePrivilegeAction(selectedPrivilege);
                        setSelectedPrivilege(null);
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-[#0C162C] text-[#FAF9F6] text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-[#1A365D] transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <span>{selectedPrivilege.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
