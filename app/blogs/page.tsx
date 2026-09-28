'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Clock,
  Calendar,
  Search,
  BookOpen,
  Filter,
  Sparkles,
  ChevronRight,
  Share2,
  Check,
  Glasses,
  Compass,
} from 'lucide-react';
import {
  JOURNAL_ARTICLES,
  JOURNAL_CATEGORIES,
  JournalCategory,
  JournalArticle,
} from '@/lib/journal-data';
import { useFovea } from '@/lib/context';

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<JournalCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { setIsHomeTrialModalOpen, openWhatsAppWithInquiry } = useFovea();

  // Featured article is the primary flagship cover piece (e.g. the first article or one tagged as flagship)
  const featuredArticle = JOURNAL_ARTICLES[0];

  // Articles filtered by category and search
  const filteredArticles = useMemo(() => {
    return JOURNAL_ARTICLES.filter((article) => {
      // Category match
      const categoryMatch =
        selectedCategory === 'All' || article.category === selectedCategory;

      // Query match
      const query = searchQuery.trim().toLowerCase();
      const searchMatch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.subtitle.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.author.name.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query));

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  // When 'All' and no search, we exclude the featured article from the main grid so it feels like a magazine cover + grid
  const gridArticles = useMemo(() => {
    if (selectedCategory === 'All' && !searchQuery.trim()) {
      return filteredArticles.slice(1);
    }
    return filteredArticles;
  }, [filteredArticles, selectedCategory, searchQuery]);

  const handleShare = async (e: React.MouseEvent, article: JournalArticle) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}/blogs/${article.slug}`;
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedId(article.id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#0C162C]">
      {/* 1. JOURNAL HERO SECTION */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-20 border-b border-[#0C162C]/8 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0D5C63]/5 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] text-xs font-semibold uppercase tracking-[0.2em]"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>FOVEA JOURNAL · EDITORIAL DISPATCHES</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#0C162C] leading-[1.08]"
              >
                Stories Behind the Frames.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-base sm:text-xl text-[#0C162C]/75 font-light leading-relaxed max-w-xl"
              >
                Essays on Japanese cold-milled metallurgy, Italian bio-acetate curing, optical clarity,
                and the nuanced art of personal frame discovery.
              </motion.p>
            </div>

            {/* Quick stats or mini dispatch note */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-6 text-xs uppercase tracking-wider text-[#0C162C]/60 border-t sm:border-t-0 sm:border-l border-[#0C162C]/10 pt-4 sm:pt-0 sm:pl-8"
            >
              <div>
                <span className="block font-editorial text-2xl font-semibold text-[#0C162C]">
                  {JOURNAL_ARTICLES.length}
                </span>
                <span className="text-[10px] tracking-widest text-[#0D5C63] font-bold">
                  Curated Monographs
                </span>
              </div>
              <div className="w-px h-8 bg-[#0C162C]/10" />
              <div>
                <span className="block font-editorial text-2xl font-semibold text-[#0C162C]">
                  Sabae & Varese
                </span>
                <span className="text-[10px] tracking-widest text-[#0D5C63] font-bold">
                  Atelier Origins
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED ARTICLE SECTION (When viewing 'All' with no active search) */}
      {selectedCategory === 'All' && !searchQuery.trim() && (
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#0D5C63] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0D5C63] animate-pulse" />
              Flagship Cover Story
            </span>
            <span className="text-xs text-[#0C162C]/50 uppercase tracking-widest">
              Volume IV · Issue 08
            </span>
          </div>

          <div className="group relative bg-white rounded-3xl sm:rounded-4xl border border-[#0C162C]/8 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Cover Photographic Canvas */}
              <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[460px] lg:min-h-[540px] overflow-hidden bg-[#ECE8DF]">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  referrerPolicy="no-referrer"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C162C]/80 via-[#0C162C]/20 to-transparent lg:hidden" />

                {/* Mobile overlay headline for instant editorial punch */}
                <div className="absolute bottom-6 left-6 right-6 lg:hidden text-white space-y-2">
                  <span className="px-3 py-1 rounded-full bg-[#0D5C63] text-white text-[10px] font-bold uppercase tracking-widest">
                    {featuredArticle.category}
                  </span>
                  <h3 className="font-editorial text-2xl font-semibold leading-tight text-white drop-shadow-md">
                    {featuredArticle.title}
                  </h3>
                </div>

                <div className="hidden lg:block absolute top-6 left-6">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0D5C63] text-[11px] font-bold uppercase tracking-widest shadow-sm">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>

              {/* Editorial Cover Details & Takeaways */}
              <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-[#0C162C]/60 uppercase tracking-wider">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#0D5C63]" />
                      {featuredArticle.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#0D5C63]" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="hidden lg:block font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0C162C] group-hover:text-[#0D5C63] transition-colors leading-[1.12]">
                    <Link href={`/blogs/${featuredArticle.slug}`}>
                      {featuredArticle.title}
                    </Link>
                  </h2>

                  <p className="text-sm sm:text-base text-[#0C162C]/75 font-light leading-relaxed">
                    {featuredArticle.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[#0C162C]/60 leading-relaxed font-light line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>

                  {/* Pull quote sneak peek */}
                  {featuredArticle.pullQuote && (
                    <div className="p-4 rounded-2xl bg-[#F5F3EF] border-l-2 border-[#0D5C63] space-y-1">
                      <p className="font-editorial text-sm sm:text-base italic text-[#0C162C]/90">
                        &ldquo;{featuredArticle.pullQuote.text}&rdquo;
                      </p>
                      <span className="text-[11px] uppercase tracking-wider text-[#0C162C]/50 block">
                        — {featuredArticle.pullQuote.attribution}
                      </span>
                    </div>
                  )}
                </div>

                {/* Author attribution & CTA button */}
                <div className="pt-6 border-t border-[#0C162C]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#0C162C]/10 shrink-0">
                      <Image
                        src={featuredArticle.author.avatar}
                        alt={featuredArticle.author.name}
                        fill
                        sizes="40px"
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-[#0C162C]">
                        {featuredArticle.author.name}
                      </span>
                      <span className="block text-[10px] text-[#0C162C]/60">
                        {featuredArticle.author.role}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/blogs/${featuredArticle.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[46px] rounded-xl bg-[#0C162C] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#1A365D] transition-colors shadow-sm group-hover:translate-x-0.5"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. CATEGORY FILTERS & EDITORIAL SEARCH BAR */}
      <section className="sticky top-[65px] z-30 bg-[#FAF9F6]/95 backdrop-blur-md border-y border-[#0C162C]/10 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category pills - horizontally scrollable on mobile */}
            <div className="w-full md:w-auto overflow-x-auto no-scrollbar flex items-center gap-2 pb-1 md:pb-0">
              {JOURNAL_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 min-h-[44px] rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 ${
                      isSelected
                        ? 'bg-[#0C162C] text-[#FAF9F6] shadow-sm'
                        : 'bg-white text-[#0C162C]/75 hover:text-[#0C162C] hover:bg-[#F5F3EF] border border-[#0C162C]/8'
                    }`}
                  >
                    <span>{cat}</span>
                    {cat === 'All' ? (
                      <span className="text-[10px] opacity-60">({JOURNAL_ARTICLES.length})</span>
                    ) : (
                      <span className="text-[10px] opacity-60">
                        (
                        {
                          JOURNAL_ARTICLES.filter((a) => a.category === cat)
                            .length
                        }
                        )
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search Input Box */}
            <div className="w-full md:w-72 relative">
              <input
                type="text"
                placeholder="Search essays, materials, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 min-h-[44px] bg-white rounded-full border border-[#0C162C]/12 text-xs text-[#0C162C] placeholder-[#0C162C]/40 focus:outline-none focus:ring-1 focus:ring-[#0D5C63] focus:border-[#0D5C63] transition-all"
              />
              <Search className="w-4 h-4 text-[#0C162C]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#0C162C]/50 hover:text-[#0C162C]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. ARTICLE GRID SECTION */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#0C162C]/8">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C]">
              {selectedCategory === 'All' ? 'All Dispatches & Guides' : `${selectedCategory} Articles`}
            </h2>
            <p className="text-xs text-[#0C162C]/60 mt-1 font-light">
              Showing {gridArticles.length} {gridArticles.length === 1 ? 'monograph' : 'monographs'}
            </p>
          </div>

          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs uppercase tracking-wider text-[#0D5C63] font-semibold hover:underline"
            >
              Reset to All
            </button>
          )}
        </div>

        {/* Empty state when query produces 0 matches */}
        {gridArticles.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-[#0C162C]/8 p-8 max-w-md mx-auto">
            <BookOpen className="w-10 h-10 text-[#0C162C]/30 mx-auto" />
            <h3 className="font-editorial text-2xl font-semibold text-[#0C162C]">
              No Monographs Match Your Query
            </h3>
            <p className="text-xs text-[#0C162C]/65 font-light">
              Try adjusting your search terms or explore all categories to discover our optical essays.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-xl bg-[#0C162C] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#1A365D] transition-colors"
            >
              View All Articles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {gridArticles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-white rounded-3xl border border-[#0C162C]/8 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
              >
                <div>
                  {/* Article photographic banner */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-[#ECE8DF]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      referrerPolicy="no-referrer"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[10px] uppercase tracking-widest text-[#0D5C63] font-bold bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-xs">
                        {article.category}
                      </span>
                    </div>

                    {/* Quick share button */}
                    <button
                      type="button"
                      onClick={(e) => handleShare(e, article)}
                      aria-label="Share article link"
                      className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-[#0C162C] flex items-center justify-center shadow-xs hover:bg-white active:scale-95 transition-all"
                    >
                      {copiedId === article.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5 text-[#0C162C]/70" />
                      )}
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#0C162C]/50">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-[#0D5C63]" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#0D5C63]" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-editorial text-2xl sm:text-2xl font-semibold text-[#0C162C] group-hover:text-[#0D5C63] transition-colors leading-snug line-clamp-2">
                      <Link href={`/blogs/${article.slug}`}>{article.title}</Link>
                    </h3>

                    <p className="text-xs text-[#0C162C]/65 italic font-light line-clamp-2">
                      {article.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-[#0C162C]/75 leading-relaxed font-light line-clamp-3 pt-1">
                      {article.excerpt}
                    </p>

                    {/* Tags pill list */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-[#0C162C]/60 bg-[#F5F3EF] px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer with Author attribution & Read CTA */}
                <div className="p-6 pt-0 border-t border-[#0C162C]/5 flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#0C162C]/10 shrink-0">
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        fill
                        sizes="28px"
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[11px] font-medium text-[#0C162C]/80 line-clamp-1">
                      {article.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/blogs/${article.slug}`}
                    className="text-xs uppercase tracking-wider font-semibold text-[#0C162C] group-hover:text-[#0D5C63] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* 5. EDITORIAL NEWSLETTER / MONOGRAPH SUITE SIGNUP */}
      <section className="py-16 sm:py-20 bg-[#F5F3EF] border-t border-[#0C162C]/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl sm:rounded-4xl p-8 sm:p-14 border border-[#0C162C]/8 shadow-lg text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE FOVEA MONOGRAPH DISPATCH</span>
            </div>

            <h3 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0C162C] max-w-2xl mx-auto leading-tight">
              Optical Acuity, Delivered Quietly to Your Inbox.
            </h3>

            <p className="text-sm sm:text-base text-[#0C162C]/75 font-light max-w-xl mx-auto leading-relaxed">
              We publish quarterly monographs on optical engineering, face proportion guides, and
              private previews of limited Sabae titanium editions. Never spam; only pure craft.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to Fovea Dispatches.');
              }}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3 min-h-[48px] rounded-xl border border-[#0C162C]/15 text-xs text-[#0C162C] focus:outline-none focus:ring-1 focus:ring-[#0D5C63]"
              />
              <button
                type="submit"
                className="px-6 py-3 min-h-[48px] rounded-xl bg-[#0C162C] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#1A365D] transition-colors whitespace-nowrap shadow-sm"
              >
                Join Readers
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 6. HOME TRIAL CONCIERGE CALLOUT */}
      <section className="py-16 sm:py-20 border-t border-[#0C162C]/8 bg-[#0C162C] text-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold flex items-center gap-2">
                <Glasses className="w-4 h-4" />
                <span>EXPERIENCE THE FRAMES MENTIONED HERE</span>
              </span>
              <h3 className="font-editorial text-3xl sm:text-5xl font-medium leading-tight">
                Try Any 4 Frames at Home for 5 Days.
              </h3>
              <p className="text-sm sm:text-base text-[#FAF9F6]/80 font-light max-w-2xl leading-relaxed">
                Reading about Japanese titanium is only the beginning. Experience how these frames
                feel on your nasal bridge in your home’s natural lighting with our complimentary
                Home Trial box.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <button
                type="button"
                onClick={() => setIsHomeTrialModalOpen(true)}
                className="w-full sm:w-auto min-h-[50px] px-8 bg-[#FAF9F6] text-[#0C162C] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Curate 4 Frames</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() =>
                  openWhatsAppWithInquiry(
                    'Hello Fovea Concierge, I was reading your Journal articles and would love personalized frame advice.'
                  )
                }
                className="w-full sm:w-auto min-h-[50px] px-8 bg-transparent border border-white/20 text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <span>WhatsApp Stylist</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
