'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ArrowRight, Check, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';
import { useFovea } from '@/lib/context';

export default function Footer() {
  const { openWhatsAppWithInquiry, setIsHomeTrialModalOpen } = useFovea();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Mobile accordion state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    collections: false,
    services: false,
    atelier: false,
    legal: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#FAF9F6] border-t border-[#0C162C]/10 text-[#0C162C] pt-16 pb-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Statement Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#0C162C]/8">
          {/* Brand Manifesto */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              href="/"
              aria-label="FOVEA homepage"
              className="inline-block overflow-hidden rounded-lg bg-[#07121f] shadow-sm ring-1 ring-[#C5A880]/25"
            >
              <Image
                src="/fovea-logo.jpeg"
                alt="FOVEA Virtual Eye Store"
                width={728}
                height={368}
                className="h-[72px] w-[142px] object-cover object-center"
              />
            </Link>
            <p className="text-xs uppercase tracking-[0.24em] text-[#0D5C63] font-semibold">
              The Architecture of Clear Vision
            </p>
            <p className="text-sm text-[#0C162C]/75 leading-relaxed max-w-md">
              Named after the central focal point of the human eye, Fovea engineers architectural eyewear
              using cold-milled Japanese titanium and four-month cured Italian bio-acetate. Designed for enduring
              optical presence and effortless daily wear.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-[#0C162C]/70">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D5C63]" /> Sabae, Japan
              </span>
              <span className="text-[#0C162C]/30">/</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> Varese, Italy
              </span>
              <span className="text-[#0C162C]/30">/</span>
              <span>fovea.com</span>
            </div>
          </div>

          {/* Newsletter & Concierge Action */}
          <div className="lg:col-span-7 bg-[#F5F3EF] p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#0C162C]/60 font-semibold block">
                Atelier Dispatch
              </span>
              <h3 className="font-editorial text-2xl font-medium text-[#0C162C]">
                Receive private release invitations and optical monograph essays.
              </h3>
              <p className="text-xs text-[#0C162C]/70">
                Subscribers receive complimentary priority access to limited Japanese titanium drops and seasonal home trial curation.
              </p>
            </div>

            {subscribed ? (
              <div className="mt-6 p-3.5 bg-[#FAF9F6] border border-[#0D5C63]/30 rounded-xl flex items-center gap-2 text-xs text-[#0D5C63] font-medium">
                <Check className="w-4 h-4 text-[#0D5C63]" />
                <span>Thank you. Your address has been added to our private register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 bg-white border border-[#0C162C]/15 rounded-xl text-xs text-[#0C162C] placeholder:text-[#0C162C]/40 focus:outline-hidden focus:border-[#0C162C]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 min-h-[44px] bg-[#0C162C] text-[#FAF9F6] hover:bg-[#1A365D] text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns (Desktop Grid / Mobile Accordions) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-14 border-b border-[#0C162C]/8">
          {/* Column 1: Collections */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('collections')}
              className="w-full flex items-center justify-between text-left lg:pointer-events-none py-2"
            >
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0C162C]">
                Curated Collections
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-[#0C162C]/60 lg:hidden transition-transform duration-200 ${
                  openSections.collections ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`space-y-2.5 pt-3 text-sm text-[#0C162C]/75 ${
                openSections.collections ? 'block' : 'hidden lg:block'
              }`}
            >
              <p><Link href="/collections/architectural-titanium" className="hover:text-[#0C162C] transition-colors">Architectural Titanium</Link></p>
              <p><Link href="/collections/acetate-sculptures" className="hover:text-[#0C162C] transition-colors">Mazzucchelli Bio-Acetate</Link></p>
              <p><Link href="/collections/the-panto-renaissance" className="hover:text-[#0C162C] transition-colors">The Panto Renaissance</Link></p>
              <p><Link href="/collections/bespoke-minimalist-wires" className="hover:text-[#0C162C] transition-colors">Minimalist Titanium Wires</Link></p>
              <p><Link href="/products?category=Sunglasses" className="hover:text-[#0C162C] transition-colors">ZEISS Sun Protection</Link></p>
            </div>
          </div>

          {/* Column 2: Client Services */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('services')}
              className="w-full flex items-center justify-between text-left lg:pointer-events-none py-2"
            >
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0C162C]">
                Services & Privileges
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-[#0C162C]/60 lg:hidden transition-transform duration-200 ${
                  openSections.services ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`space-y-2.5 pt-3 text-sm text-[#0C162C]/75 ${
                openSections.services ? 'block' : 'hidden lg:block'
              }`}
            >
              <p>
                <button
                  type="button"
                  onClick={() => setIsHomeTrialModalOpen(true)}
                  className="hover:text-[#0C162C] transition-colors text-left flex items-center gap-1.5 font-medium text-[#0D5C63]"
                >
                  <span>Complimentary Home Trial Suite</span>
                </button>
              </p>
              <p><Link href="/offers" className="hover:text-[#0C162C] transition-colors">Seasonal Optical Privileges</Link></p>
              <p><Link href="/wishlist" className="hover:text-[#0C162C] transition-colors">Saved Wishlist</Link></p>
              <p><Link href="/account" className="hover:text-[#0C162C] transition-colors">My Client Account</Link></p>
              <p><Link href="/faqs" className="hover:text-[#0C162C] transition-colors">Prescription Guidance & PD</Link></p>
              <p><Link href="/about#craftsmanship" className="hover:text-[#0C162C] transition-colors">Ultrasonic Care & Servicing</Link></p>
              <p><Link href="/faqs" className="hover:text-[#0C162C] transition-colors">Shipping & 30-Day Returns</Link></p>
            </div>
          </div>

          {/* Column 3: The Atelier */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('atelier')}
              className="w-full flex items-center justify-between text-left lg:pointer-events-none py-2"
            >
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0C162C]">
                The Atelier
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-[#0C162C]/60 lg:hidden transition-transform duration-200 ${
                  openSections.atelier ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`space-y-2.5 pt-3 text-sm text-[#0C162C]/75 ${
                openSections.atelier ? 'block' : 'hidden lg:block'
              }`}
            >
              <p><Link href="/about" className="hover:text-[#0C162C] transition-colors">Philosophy & Materials</Link></p>
              <p><Link href="/gallery" className="hover:text-[#0C162C] transition-colors">Campaign Lookbook</Link></p>
              <p><Link href="/blogs" className="hover:text-[#0C162C] transition-colors">Optical Journal</Link></p>
              <p><Link href="/about#sustainability" className="hover:text-[#0C162C] transition-colors">Ethical Material Sourcing</Link></p>
              <p><Link href="/contact" className="hover:text-[#0C162C] transition-colors">Partner Opticians Network</Link></p>
            </div>
          </div>

          {/* Column 4: Private Concierge */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('legal')}
              className="w-full flex items-center justify-between text-left lg:pointer-events-none py-2"
            >
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0C162C]">
                Private Concierge
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-[#0C162C]/60 lg:hidden transition-transform duration-200 ${
                  openSections.legal ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`space-y-3 pt-3 text-sm text-[#0C162C]/75 ${
                openSections.legal ? 'block' : 'hidden lg:block'
              }`}
            >
              <button
                type="button"
                onClick={() =>
                  openWhatsAppWithInquiry(
                    'Hello Fovea Concierge, I would like to schedule an optical consultation.'
                  )
                }
                className="w-full py-2.5 px-3.5 bg-[#FAF9F6] border border-[#0C162C]/15 rounded-lg flex items-center gap-2 text-xs font-medium text-[#0C162C] hover:bg-[#F5F3EF] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#0D5C63]" />
                <span>Chat via Encrypted WhatsApp</span>
              </button>
              <p className="text-xs text-[#0C162C]/65 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>concierge@fovea.com</span>
              </p>
              <p className="text-xs text-[#0C162C]/65 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <a href="tel:+919700956245" className="hover:text-[#0D5C63] transition-colors">+91 97009 56245</a>
              </p>
              <p className="text-xs text-[#0C162C]/50 pt-1">
                Mon — Sat · 10:30 AM — 8:30 PM IST · Sun 11 AM — 7 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0C162C]/50">
          <p>© {new Date().getFullYear()} FOVEA Optical Group Inc. All rights reserved. Official domain: fovea.com</p>
          <div className="flex items-center gap-6">
            <Link href="/faqs" className="hover:text-[#0C162C] transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/faqs" className="hover:text-[#0C162C] transition-colors">Terms of Atelier</Link>
            <span>·</span>
            <Link href="/faqs" className="hover:text-[#0C162C] transition-colors">Optical Disclaimers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
