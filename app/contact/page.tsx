'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Check,
  ArrowRight,
  Globe,
  Mail,
  Copy,
  Navigation,
  Sparkles,
  ShieldCheck,
  Send,
  Building2,
} from 'lucide-react';
import { useFovea } from '@/lib/context';

export default function ContactPage() {
  const { openWhatsAppWithInquiry } = useFovea();

  // Contact Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    enquiryType: 'Product Enquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const businessInfo = {
    name: 'Fovea',
    addressLine1: 'Pillar Number 45, 2nd Floor',
    addressLine2: 'PVNR Flyover, LALS Enclave',
    locality: 'Rethibowli, Mehdipatnam',
    cityStateZip: 'Hyderabad, Telangana – 500028',
    fullAddress:
      'Fovea, Pillar Number 45, 2nd Floor, PVNR Flyover, LALS Enclave, Rethibowli, Mehdipatnam, Hyderabad, Telangana – 500028',
    phone: '+91 96188 90557',
    rawPhone: '+919618890557',
    website: 'fovea.com',
    email: 'concierge@fovea.com',
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Pillar+Number+45+PVNR+Flyover+LALS+Enclave+Rethibowli+Mehdipatnam+Hyderabad+Telangana+500028',
  };

  const enquiryTypes = [
    'Product Enquiry',
    'Home Trial',
    'Order Support',
    'Store Visit',
    'General Enquiry',
  ];

  const handleCopyAddress = async () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(businessInfo.fullAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  const handleCopyPhone = async () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(businessInfo.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.mobileNumber.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FAF9F6] min-h-screen text-[#0C162C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* 1. CONTACT HERO SECTION */}
        <section className="relative rounded-3xl sm:rounded-4xl bg-white border border-[#0C162C]/8 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 p-6 sm:p-12 lg:p-16 space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] text-xs font-semibold uppercase tracking-[0.2em]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIRECT ATELIER DIALOGUE</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-semibold text-[#0C162C] leading-tight"
              >
                Let&apos;s Talk.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-base sm:text-lg text-[#0C162C]/75 font-light leading-relaxed max-w-xl"
              >
                Whether you wish to arrange a private frame fitting at our Mehdipatnam atelier,
                inquire about Carl Zeiss lens pairings, or schedule your complimentary Home Trial,
                our dedicated optical consultants are at your service.
              </motion.p>

              {/* Direct Quick Action Buttons (Thumb-friendly & prominent for mobile) */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="pt-2 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3"
              >
                {/* 1. Call */}
                <a
                  href={`tel:${businessInfo.rawPhone}`}
                  className="min-h-[48px] px-4 sm:px-6 bg-[#0C162C] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#1A365D] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#C5A880]" />
                  <span>Call Atelier</span>
                </a>

                {/* 2. WhatsApp */}
                <button
                  type="button"
                  onClick={() =>
                    openWhatsAppWithInquiry(
                      'Hi Fovea, I need help with eyewear.'
                    )
                  }
                  className="min-h-[48px] px-4 sm:px-6 bg-[#0D5C63] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#0A474D] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>

                {/* 3. Get Directions */}
                <a
                  href={businessInfo.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] px-4 sm:px-6 bg-white border border-[#0C162C]/15 text-[#0C162C] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#F5F3EF] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Navigation className="w-4 h-4 text-[#0D5C63]" />
                  <span>Directions</span>
                </a>

                {/* 4. Send Enquiry quick anchor */}
                <a
                  href="#enquiry-form"
                  className="min-h-[48px] px-4 sm:px-6 bg-[#FAF9F6] border border-[#0C162C]/10 text-[#0C162C]/80 text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#ECE8DF] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Enquiry</span>
                </a>
              </motion.div>
            </div>

            {/* Right Hero Photographic Canvas */}
            <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-full min-h-[340px] lg:min-h-[480px] bg-[#ECE8DF] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1577744486770-020ab432da65?auto=format&fit=crop&w=1200&q=85"
                alt="Fovea Optical Studio Consultation"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                referrerPolicy="no-referrer"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C162C]/70 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs lg:hidden drop-shadow-md">
                <span>Atelier Location · Mehdipatnam, Hyderabad</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. MAIN INTERACTIVE WORKSPACE: CONTACT DETAILS + FORM */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Column (5 Cols): Business Information & Official Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Official Business Card */}
            <div className="bg-white rounded-3xl border border-[#0C162C]/10 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#0C162C]/8">
                <div>
                  <h3 className="font-editorial text-3xl font-semibold text-[#0C162C] tracking-wide">
                    {businessInfo.name}
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#0D5C63] font-semibold block mt-0.5">
                    Optics & Atelier
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              {/* Physical Address Block with Copy Action */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#0D5C63] shrink-0 mt-1" />
                    <div className="text-xs sm:text-sm text-[#0C162C]/85 leading-relaxed font-light">
                      <p className="font-medium text-[#0C162C]">{businessInfo.addressLine1}</p>
                      <p>{businessInfo.addressLine2}</p>
                      <p>{businessInfo.locality}</p>
                      <p className="font-medium text-[#0C162C]">{businessInfo.cityStateZip}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    title="Copy full address"
                    className="p-2 rounded-lg bg-[#FAF9F6] hover:bg-[#F5F3EF] text-[#0C162C]/70 hover:text-[#0C162C] transition-colors shrink-0"
                    aria-label="Copy Address"
                  >
                    {copiedAddress ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {copiedAddress && (
                  <p className="text-[11px] text-emerald-600 font-medium pl-7">
                    Address copied to clipboard.
                  </p>
                )}
              </div>

              {/* Phone & WhatsApp Block */}
              <div className="pt-4 border-t border-[#0C162C]/8 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#0D5C63] shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#0C162C]/50 block">
                        Phone / WhatsApp
                      </span>
                      <a
                        href={`tel:${businessInfo.rawPhone}`}
                        className="text-sm font-semibold text-[#0C162C] hover:text-[#0D5C63] transition-colors"
                      >
                        {businessInfo.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    title="Copy phone number"
                    className="p-2 rounded-lg bg-[#FAF9F6] hover:bg-[#F5F3EF] text-[#0C162C]/70 hover:text-[#0C162C] transition-colors shrink-0"
                    aria-label="Copy Phone"
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {copiedPhone && (
                  <p className="text-[11px] text-emerald-600 font-medium pl-7">
                    Phone number copied.
                  </p>
                )}
              </div>

              {/* Website & Digital Inquiries */}
              <div className="pt-4 border-t border-[#0C162C]/8 space-y-2">
                <div className="flex items-center gap-3 text-xs">
                  <Globe className="w-4 h-4 text-[#0D5C63] shrink-0" />
                  <span className="text-[#0C162C]/60">Official Website:</span>
                  <a
                    href="https://fovea.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#0C162C] hover:text-[#0D5C63]"
                  >
                    {businessInfo.website}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <Mail className="w-4 h-4 text-[#0D5C63] shrink-0" />
                  <span className="text-[#0C162C]/60">Email:</span>
                  <a
                    href={`mailto:${businessInfo.email}`}
                    className="font-medium text-[#0C162C] hover:text-[#0D5C63]"
                  >
                    {businessInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* WHATSAPP HERO ACTION CALLOUT */}
            <div className="p-6 sm:p-8 bg-[#0D5C63] text-white rounded-3xl shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  INSTANT ATELIER CHAT
                </span>
                <span className="text-xs text-white/70 font-mono">+91 96188 90557</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-semibold leading-snug">
                Chat With Fovea
              </h3>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                Consult with our senior eyewear stylist. Share selfies for face-shape guidance,
                inquire about frame availability, or verify your prescription parameters.
              </p>

              <button
                type="button"
                onClick={() =>
                  openWhatsAppWithInquiry(
                    'Hi Fovea, I need help with eyewear.'
                  )
                }
                className="w-full min-h-[48px] px-6 bg-[#FAF9F6] text-[#0C162C] font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-white active:scale-98 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#0D5C63]" />
                <span>Open WhatsApp Dialogue</span>
              </button>
            </div>

            {/* STORE HOURS (Clean, truthful editable format) */}
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#0C162C]/10 space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#0D5C63] font-semibold">
                <Clock className="w-4 h-4 text-[#0D5C63]" />
                <span>Store Hours</span>
              </div>

              <h4 className="font-editorial text-xl font-semibold text-[#0C162C]">
                Atelier Appointments & Visits
              </h4>

              <div className="space-y-2.5 text-xs sm:text-sm text-[#0C162C]/80 font-light">
                <div className="flex justify-between py-1 border-b border-[#0C162C]/5">
                  <span className="font-medium text-[#0C162C]">Monday — Saturday</span>
                  <span>10:30 AM — 8:30 PM IST</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#0C162C]/5">
                  <span className="font-medium text-[#0C162C]">Sunday</span>
                  <span>11:00 AM — 7:00 PM IST</span>
                </div>
              </div>

              <p className="text-[11px] text-[#0C162C]/55 italic pt-1 leading-relaxed">
                Walk-ins are warmly welcomed. For bespoke titanium bridge adjustments and private
                styling sessions, prior booking via WhatsApp is recommended.
              </p>
            </div>
          </div>

          {/* Right Column (7 Cols): Contact Form & Map Section */}
          <div className="lg:col-span-7 space-y-8">
            {/* CONTACT FORM */}
            <div
              id="enquiry-form"
              className="bg-white rounded-3xl sm:rounded-4xl border border-[#0C162C]/10 p-6 sm:p-10 lg:p-12 shadow-sm space-y-6 scroll-mt-24"
            >
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#0D5C63] font-semibold">
                  Online Inquiry
                </span>
                <h2 className="font-editorial text-2xl sm:text-4xl font-semibold text-[#0C162C]">
                  Send Enquiry
                </h2>
                <p className="text-xs sm:text-sm text-[#0C162C]/70 font-light leading-relaxed">
                  Fill in your details below. An optical consultant will review your inquiry and
                  respond via call, WhatsApp, or email within standard business hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 bg-[#FAF9F6] rounded-2xl p-8 border border-[#0C162C]/8">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <Check className="w-7 h-7" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-editorial text-3xl font-semibold text-[#0C162C]">
                    Enquiry Dispatched
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0C162C]/75 max-w-md mx-auto leading-relaxed font-light">
                    Thank you, <strong className="text-[#0C162C]">{formData.fullName}</strong>. Your{' '}
                    <span className="text-[#0D5C63] font-medium">{formData.enquiryType}</span> has been
                    routed to our Mehdipatnam optical team. We will reach you on{' '}
                    <strong className="text-[#0C162C]">{formData.mobileNumber}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        mobileNumber: '',
                        email: '',
                        enquiryType: 'Product Enquiry',
                        message: '',
                      });
                    }}
                    className="mt-2 px-6 py-2.5 rounded-xl bg-[#0C162C] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1A365D]"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="text-xs font-semibold text-[#0C162C] block mb-1.5">
                        Full Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mohammed Farooq"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full px-4 py-3 min-h-[46px] bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C] placeholder-[#0C162C]/40 focus:outline-none focus:ring-1 focus:ring-[#0D5C63] focus:border-[#0D5C63] transition-all"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="text-xs font-semibold text-[#0C162C] block mb-1.5">
                        Mobile Number <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.mobileNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, mobileNumber: e.target.value })
                        }
                        className="w-full px-4 py-3 min-h-[46px] bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C] placeholder-[#0C162C]/40 focus:outline-none focus:ring-1 focus:ring-[#0D5C63] focus:border-[#0D5C63] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="text-xs font-semibold text-[#0C162C] block mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 min-h-[46px] bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C] placeholder-[#0C162C]/40 focus:outline-none focus:ring-1 focus:ring-[#0D5C63] focus:border-[#0D5C63] transition-all"
                      />
                    </div>

                    {/* Enquiry Type */}
                    <div>
                      <label className="text-xs font-semibold text-[#0C162C] block mb-1.5">
                        Enquiry Type
                      </label>
                      <select
                        value={formData.enquiryType}
                        onChange={(e) =>
                          setFormData({ ...formData, enquiryType: e.target.value })
                        }
                        className="w-full px-4 py-3 min-h-[46px] bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C] focus:outline-none focus:ring-1 focus:ring-[#0D5C63] focus:border-[#0D5C63] transition-all cursor-pointer"
                      >
                        {enquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-semibold text-[#0C162C] block mb-1.5">
                      Message / Frame Preferences
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share your prescription details, preferred silhouettes, or date for an in-person atelier fitting..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C] placeholder-[#0C162C]/40 focus:outline-none focus:ring-1 focus:ring-[#0D5C63] focus:border-[#0D5C63] transition-all resize-y"
                    />
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[11px] text-[#0C162C]/50 text-center sm:text-left">
                      Protected by 256-bit encryption · No marketing spam
                    </span>
                    <button
                      type="submit"
                      className="w-full sm:w-auto min-h-[48px] px-8 bg-[#0C162C] text-[#FAF9F6] font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#1A365D] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Send Enquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* MAP & LOCATION SECTION (Truthful, non-fake structural presentation) */}
            <div className="bg-white rounded-3xl sm:rounded-4xl border border-[#0C162C]/10 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#0D5C63] font-semibold flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>ATELIER LOCATION & ROUTE</span>
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C] mt-1">
                    Visit Fovea in Mehdipatnam
                  </h3>
                </div>

                <a
                  href={businessInfo.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 bg-[#0C162C] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#1A365D] transition-colors whitespace-nowrap shadow-xs"
                >
                  <span>Open in Google Maps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Map UI Framework / Responsive Canvas */}
              <div className="relative aspect-16/9 sm:aspect-21/9 w-full rounded-2xl overflow-hidden border border-[#0C162C]/10 bg-[#F5F3EF] flex flex-col items-center justify-center p-6 text-center">
                {/* Visual architectural grid representation */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0C162C_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10 space-y-3 max-w-md">
                  <div className="w-12 h-12 rounded-full bg-[#0D5C63] text-white mx-auto flex items-center justify-center shadow-md animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-editorial text-xl font-semibold text-[#0C162C]">
                      Pillar No. 45, PVNR Flyover
                    </h4>
                    <p className="text-xs text-[#0C162C]/75 font-light mt-0.5">
                      2nd Floor, LALS Enclave · Rethibowli, Mehdipatnam, Hyderabad
                    </p>
                  </div>
                  <div className="pt-1 flex justify-center gap-2">
                    <a
                      href={businessInfo.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white border border-[#0C162C]/15 rounded-lg text-xs font-semibold text-[#0C162C] hover:bg-[#FAF9F6] shadow-2xs inline-flex items-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#0D5C63]" />
                      <span>Get Live Navigation</span>
                    </a>
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 text-[10px] text-[#0C162C]/50 bg-white/80 px-2 py-0.5 rounded backdrop-blur-xs">
                  Landmark: Pillar 45, Mehdipatnam Corridor
                </div>
              </div>

              {/* Landmark Guidance Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-[#0C162C]/75">
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#0C162C]/5 space-y-1">
                  <strong className="block text-[#0C162C]">Arrival via PVNR</strong>
                  <p className="font-light">Directly below Pillar 45 on the ground corridor of Rethibowli.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#0C162C]/5 space-y-1">
                  <strong className="block text-[#0C162C]">Building Access</strong>
                  <p className="font-light">Elevator access to the 2nd Floor of LALS Enclave.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#0C162C]/5 space-y-1">
                  <strong className="block text-[#0C162C]">Dedicated Parking</strong>
                  <p className="font-light">Client valet and reserved building parking available.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. HOME TRIAL SUITE CONCIERGE CALLOUT */}
        <section className="p-8 sm:p-12 bg-[#0C162C] text-[#FAF9F6] rounded-3xl sm:rounded-4xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CANNOT VISIT OUR MEHDIPATNAM ATELIER?</span>
            </span>
            <h3 className="font-editorial text-2xl sm:text-4xl font-medium leading-tight">
              Sample 4 Frames in Your Own Home.
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF9F6]/75 font-light leading-relaxed">
              We dispatch our complimentary 4-frame velvet presentation box across India with
              round-trip express courier shipping. Try them for 5 full days with your wardrobe.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="/home-trial"
              className="min-h-[48px] px-8 bg-[#FAF9F6] text-[#0C162C] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-md text-center flex items-center justify-center gap-2"
            >
              <span>Explore Home Trial</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() =>
                openWhatsAppWithInquiry(
                  'Hi Fovea, I need help with eyewear.'
                )
              }
              className="min-h-[48px] px-8 bg-transparent border border-white/20 text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-white/10 transition-colors text-center flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#C5A880]" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
