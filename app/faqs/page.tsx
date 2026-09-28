'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  MessageSquare,
  Search,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
  Package,
  Glasses,
  CreditCard,
  Truck,
  RotateCcw,
  Heart,
  Wrench,
} from 'lucide-react';
import {
  FOVEA_FAQS,
  FAQ_CATEGORIES,
  FAQCategory,
  FAQItemDetailed,
} from '@/lib/faq-data';
import { useFovea } from '@/lib/context';

export default function FAQsPage() {
  const { openWhatsAppWithInquiry } = useFovea();
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Manage open accordion state
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-prod-01': true,
    'faq-trial-01': true,
  });

  // Filter FAQs based on active category and live search query
  const filteredFaqs = FOVEA_FAQS.filter((faq) => {
    const matchCategory =
      activeCategory === 'All' || faq.category === activeCategory;

    const query = searchQuery.trim().toLowerCase();
    const matchQuery =
      !query ||
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      (faq.tags && faq.tags.some((t) => t.toLowerCase().includes(query)));

    return matchCategory && matchQuery;
  });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    filteredFaqs.forEach((faq) => {
      allOpen[faq.id] = true;
    });
    setOpenIds(allOpen);
  };

  const collapseAll = () => {
    setOpenIds({});
  };

  // Category Icon Helper
  const getCategoryIcon = (cat: FAQCategory) => {
    switch (cat) {
      case 'Products':
        return <Glasses className="w-3.5 h-3.5" />;
      case 'Home Trial':
        return <Package className="w-3.5 h-3.5" />;
      case 'Orders':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'Payments':
        return <CreditCard className="w-3.5 h-3.5" />;
      case 'Delivery':
        return <Truck className="w-3.5 h-3.5" />;
      case 'Returns & Warranty':
        return <RotateCcw className="w-3.5 h-3.5" />;
      case 'Product Care':
        return <Wrench className="w-3.5 h-3.5" />;
      case 'Account & Wishlist':
        return <Heart className="w-3.5 h-3.5" />;
      default:
        return <HelpCircle className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-[#FAF9F6] min-h-screen text-[#0C162C]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. HERO HEADER */}
        <section className="border-b border-[#0C162C]/10 pb-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] text-xs font-semibold uppercase tracking-[0.2em]"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FOVEA CLIENT CARE & TRANSPARENCY</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-semibold text-[#0C162C] leading-tight"
          >
            Questions, Answered.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base sm:text-lg text-[#0C162C]/75 leading-relaxed max-w-2xl font-light"
          >
            Explore detailed guidance on our complimentary 4-frame Home Trial suite, Carl Zeiss
            precision optics, prescription verification, order delivery, and lifetime atelier servicing.
          </motion.p>
        </section>

        {/* 2. SEARCH & LIVE FILTER BAR */}
        <section className="space-y-6">
          {/* Live Search Field */}
          <div className="relative max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. Home Trial, Zeiss lenses, warranty, sizing, prescription)..."
              className="w-full pl-11 pr-24 py-3.5 sm:py-4 min-h-[50px] bg-white rounded-2xl border border-[#0C162C]/12 text-sm text-[#0C162C] placeholder-[#0C162C]/40 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#0D5C63] focus:border-[#0D5C63] transition-all"
            />
            <Search className="w-5 h-5 text-[#0C162C]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#0C162C]/60 hover:text-[#0C162C] px-2 py-1 rounded bg-[#FAF9F6]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs (Horizontally scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1">
            {FAQ_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              const count =
                cat === 'All'
                  ? FOVEA_FAQS.length
                  : FOVEA_FAQS.filter((f) => f.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`min-h-[44px] px-4 rounded-xl text-xs font-medium tracking-wide transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 active:scale-95 ${
                    isSelected
                      ? 'bg-[#0C162C] text-[#FAF9F6] shadow-sm'
                      : 'bg-white text-[#0C162C]/75 hover:text-[#0C162C] hover:bg-[#F5F3EF] border border-[#0C162C]/8'
                  }`}
                >
                  <span className={isSelected ? 'text-[#C5A880]' : 'text-[#0D5C63]'}>
                    {getCategoryIcon(cat)}
                  </span>
                  <span>{cat}</span>
                  <span className="text-[10px] opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Results Summary and Quick Expand/Collapse */}
          <div className="flex items-center justify-between text-xs text-[#0C162C]/60 pt-1">
            <span>
              Showing {filteredFaqs.length}{' '}
              {filteredFaqs.length === 1 ? 'answer' : 'answers'}
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={expandAll}
                className="hover:text-[#0C162C] transition-colors"
              >
                Expand All
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={collapseAll}
                className="hover:text-[#0C162C] transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>
        </section>

        {/* 3. ACCORDION ROWS */}
        <section className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="py-16 text-center space-y-4 bg-white rounded-3xl border border-[#0C162C]/8 p-8">
              <HelpCircle className="w-10 h-10 text-[#0C162C]/30 mx-auto" />
              <h3 className="font-editorial text-2xl font-semibold text-[#0C162C]">
                No Frequently Asked Inquiries Match Your Search
              </h3>
              <p className="text-xs sm:text-sm text-[#0C162C]/70 max-w-md mx-auto font-light leading-relaxed">
                Could not find what you are looking for? Our optical concierge is available directly
                on WhatsApp to assist with custom frame measurements and prescription verification.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#0C162C]/15 text-[#0C162C] text-xs font-semibold uppercase tracking-wider hover:bg-[#F5F3EF]"
                >
                  Reset Filters
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openWhatsAppWithInquiry(
                      `Hi Fovea, I searched for "${searchQuery}" in your FAQs and would like direct assistance.`
                    )
                  }
                  className="px-6 py-2.5 rounded-xl bg-[#0D5C63] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0A474D] flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat With Fovea</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = !!openIds[faq.id];

                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.02 }}
                    className={`bg-white rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'border-[#0D5C63]/30 shadow-md ring-1 ring-[#0D5C63]/10'
                        : 'border-[#0C162C]/8 hover:border-[#0C162C]/15 shadow-2xs'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-5 sm:p-7 text-left flex items-start justify-between gap-4 select-none group min-h-[58px]"
                      aria-expanded={isOpen}
                    >
                      <div className="space-y-1.5 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-widest text-[#0D5C63] font-bold bg-[#0D5C63]/10 px-2 py-0.5 rounded-md">
                            {faq.category}
                          </span>
                        </div>

                        <h2 className="font-editorial text-lg sm:text-2xl font-semibold text-[#0C162C] group-hover:text-[#0D5C63] transition-colors leading-snug">
                          {faq.question}
                        </h2>
                      </div>

                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 mt-0.5 ${
                          isOpen
                            ? 'bg-[#0D5C63] text-white rotate-180 shadow-xs'
                            : 'bg-[#F5F3EF] text-[#0C162C]/70 group-hover:bg-[#ECE8DF]'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm text-[#0C162C]/80 leading-relaxed font-light border-t border-[#0C162C]/6 pt-4 space-y-3">
                            <p>{faq.answer}</p>

                            {faq.tags && (
                              <div className="flex flex-wrap items-center gap-1.5 pt-2 text-[10px] text-[#0C162C]/50">
                                <span>Related topics:</span>
                                {faq.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="bg-[#FAF9F6] px-2 py-0.5 rounded text-[#0C162C]/70 border border-[#0C162C]/5"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* 4. STILL NEED HELP? SECTION */}
        <section className="p-8 sm:p-12 bg-white rounded-3xl sm:rounded-4xl border border-[#0C162C]/10 shadow-lg text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT OPTICAL ASSISTANCE</span>
          </div>

          <h3 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C] leading-tight">
            Still Need Help?
          </h3>

          <p className="text-sm sm:text-base text-[#0C162C]/75 font-light max-w-xl mx-auto leading-relaxed">
            Our master opticians and optical stylists are available to review your prescription,
            provide facial proportion advice, or coordinate your Home Trial delivery.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                openWhatsAppWithInquiry(
                  'Hi Fovea, I need help with eyewear.'
                )
              }
              className="w-full sm:w-auto min-h-[50px] px-8 bg-[#0D5C63] text-white font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#0A474D] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Fovea</span>
            </button>

            <Link
              href="/contact"
              className="w-full sm:w-auto min-h-[50px] px-8 bg-[#0C162C] text-[#FAF9F6] font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#1A365D] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#0C162C]/60 border-t border-[#0C162C]/8">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#0D5C63]" />
              <span>+91 96188 90557</span>
            </span>
            <span className="text-[#0C162C]/30">·</span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#0D5C63]" />
              <span>concierge@fovea.com</span>
            </span>
            <span className="text-[#0C162C]/30">·</span>
            <span>Hyderabad, Telangana – 500028</span>
          </div>
        </section>
      </div>
    </div>
  );
}
