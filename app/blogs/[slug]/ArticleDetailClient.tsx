'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Glasses,
  Check,
  Heart,
  Eye,
} from 'lucide-react';
import { JournalArticle } from '@/lib/journal-data';
import { Product } from '@/lib/data';
import { useFovea } from '@/lib/context';

interface ArticleDetailClientProps {
  article: JournalArticle;
  relatedArticles: JournalArticle[];
  relatedFrames: Product[];
}

export default function ArticleDetailClient({
  article,
  relatedArticles,
  relatedFrames,
}: ArticleDetailClientProps) {
  const [copied, setCopied] = useState(false);
  const {
    isInWishlist,
    toggleWishlist,
    isInHomeTrial,
    toggleHomeTrialFrame,
    setIsHomeTrialModalOpen,
    openWhatsAppWithInquiry,
  } = useFovea();

  const handleShare = async () => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  return (
    <article className="py-10 sm:py-16 bg-[#FAF9F6] min-h-screen text-[#0C162C]">
      {/* 1. TOP BREADCRUMB & BACK NAVIGATION */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex items-center justify-between">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#0C162C]/70 hover:text-[#0D5C63] font-semibold transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Optical Journal</span>
          </Link>

          {/* Share Action */}
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#0C162C]/10 text-xs font-medium text-[#0C162C]/80 hover:bg-white transition-all shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#0C162C]/60" />
                <span>Share Monograph</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. ARTICLE HEADER SECTION */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-[#0D5C63] font-semibold">
          <span className="px-3 py-1 rounded-full bg-[#0D5C63]/10 font-bold">
            {article.category}
          </span>
          <span className="text-[#0C162C]/30">·</span>
          <span className="flex items-center gap-1 text-[#0C162C]/60 normal-case font-normal">
            <Calendar className="w-3.5 h-3.5 text-[#0D5C63]" /> {article.date}
          </span>
          <span className="text-[#0C162C]/30">·</span>
          <span className="flex items-center gap-1 text-[#0C162C]/60 normal-case font-normal">
            <Clock className="w-3.5 h-3.5 text-[#0D5C63]" /> {article.readTime}
          </span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#0C162C] leading-[1.12]">
          {article.title}
        </h1>

        <p className="text-lg sm:text-2xl text-[#0C162C]/75 italic font-light leading-relaxed">
          {article.subtitle}
        </p>

        {/* Real Author Card Banner */}
        <div className="flex items-center gap-4 pt-4 pb-2 border-y border-[#0C162C]/8">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#0C162C]/10 shrink-0">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              sizes="48px"
              referrerPolicy="no-referrer"
              className="object-cover"
            />
          </div>
          <div>
            <span className="block text-sm font-semibold text-[#0C162C]">
              {article.author.name}
            </span>
            <span className="block text-xs text-[#0C162C]/60">
              {article.author.role}
            </span>
          </div>
        </div>
      </header>

      {/* 3. HERO EDITORIAL PHOTOGRAPH */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12">
        <div className="relative aspect-16/9 w-full rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl border border-white/60 bg-[#ECE8DF]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1100px"
            referrerPolicy="no-referrer"
            className="object-cover"
          />
        </div>
        <p className="text-[11px] text-[#0C162C]/50 mt-3 text-center italic">
          Photography captured inside the atelier and optical workshops of Fovea.
        </p>
      </div>

      {/* 4. KEY TAKEAWAYS CALLOUT BOX */}
      {article.keyTakeaways && article.keyTakeaways.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-10">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#0C162C]/8 shadow-sm space-y-4">
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#0D5C63] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Essential Insights in This Monograph
            </span>
            <ul className="space-y-2.5">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#0C162C]/80 leading-relaxed font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D5C63] mt-2 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 5. MAIN ARTICLE BODY CONTENT */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        {article.content.map((section, sIdx) => (
          <section key={sIdx} className="space-y-4">
            {section.heading && (
              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C] pt-2">
                {section.heading}
              </h2>
            )}

            <div className="space-y-4 text-base sm:text-lg text-[#0C162C]/80 font-light leading-relaxed">
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {section.callout && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#F5F3EF] border-l-4 border-[#0D5C63] my-6">
                <p className="text-xs sm:text-sm font-medium text-[#0C162C]/90 leading-relaxed">
                  {section.callout}
                </p>
              </div>
            )}
          </section>
        ))}

        {/* 6. EDITORIAL PULL QUOTE */}
        {article.pullQuote && (
          <div className="my-10 py-8 px-6 sm:px-10 border-y border-[#0C162C]/10 text-center space-y-3 bg-[#F5F3EF]/60 rounded-3xl">
            <span className="font-editorial text-5xl text-[#0D5C63] leading-none select-none block">
              &ldquo;
            </span>
            <blockquote className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#0C162C] italic font-medium leading-snug">
              {article.pullQuote.text}
            </blockquote>
            <cite className="block text-xs uppercase tracking-widest text-[#0C162C]/60 not-italic pt-2">
              — {article.pullQuote.attribution}
            </cite>
          </div>
        )}

        {/* 7. SECONDARY PHOTOGRAPHY (INLINE ESSAY ASSET) */}
        {article.secondaryImage && (
          <div className="my-8 space-y-2">
            <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden shadow-lg border border-white/60 bg-[#ECE8DF]">
              <Image
                src={article.secondaryImage}
                alt={`${article.title} craftsmanship detail`}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </div>
            <p className="text-[11px] text-[#0C162C]/50 text-center italic">
              Macro detail study of structural hinges and material finishing.
            </p>
          </div>
        )}

        {/* 8. AUTHOR FULL BIO BLOCK */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#0C162C]/8 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#0C162C]/10 shrink-0">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              sizes="64px"
              referrerPolicy="no-referrer"
              className="object-cover"
            />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <h3 className="font-editorial text-xl font-semibold text-[#0C162C]">
                {article.author.name}
              </h3>
              <span className="text-xs text-[#0D5C63] font-medium">
                {article.author.role}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#0C162C]/70 leading-relaxed font-light">
              {article.author.bio}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="pt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#0C162C]/50 mr-2">Topics:</span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white border border-[#0C162C]/8 text-xs text-[#0C162C]/80 rounded-full font-light"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 9. FEATURED PRODUCTS TIED TO THIS MONOGRAPH */}
      {relatedFrames.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 pt-12 border-t border-[#0C162C]/8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#0D5C63] flex items-center gap-2">
                <Glasses className="w-3.5 h-3.5" />
                Featured Optical Instruments
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C] mt-1">
                Silhouettes Highlighted in This Article
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs uppercase tracking-wider text-[#0C162C] font-semibold hover:text-[#0D5C63] flex items-center gap-1"
            >
              <span>View Full Archive</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedFrames.map((product) => {
              const inWish = isInWishlist(product.id);
              const inTrial = isInHomeTrial(product.id);

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl border border-[#0C162C]/8 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Frame image */}
                    <div className="relative aspect-4/3 w-full bg-[#F5F3EF] overflow-hidden p-6 flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 350px"
                        referrerPolicy="no-referrer"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.id)}
                        aria-label="Wishlist frame"
                        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#0C162C] shadow-xs hover:bg-white"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            inWish
                              ? 'fill-[#0D5C63] text-[#0D5C63]'
                              : 'text-[#0C162C]/70'
                          }`}
                        />
                      </button>

                      {product.badge && (
                        <div className="absolute bottom-4 left-4 z-10">
                          <span className="text-[10px] uppercase tracking-widest text-[#0D5C63] font-bold bg-white/95 px-2.5 py-1 rounded-full shadow-2xs">
                            {product.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#0C162C]/60">
                        <span>{product.materialType}</span>
                        <span className="font-semibold text-[#0C162C]">${product.price}</span>
                      </div>
                      <h3 className="font-editorial text-xl font-semibold text-[#0C162C] group-hover:text-[#0D5C63] transition-colors">
                        <Link href={`/products/${product.slug}`}>{product.name}</Link>
                      </h3>
                      <p className="text-xs text-[#0C162C]/70 line-clamp-2 font-light">
                        {product.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-[#0C162C]/5 flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => toggleHomeTrialFrame(product.id)}
                      className={`flex-1 py-2.5 min-h-[42px] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                        inTrial
                          ? 'bg-[#0D5C63] text-white shadow-xs'
                          : 'bg-[#F5F3EF] hover:bg-[#ECE8DF] text-[#0C162C]'
                      }`}
                    >
                      {inTrial ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Home Trial</span>
                        </>
                      ) : (
                        <>
                          <Glasses className="w-3.5 h-3.5" />
                          <span>Try at Home</span>
                        </>
                      )}
                    </button>
                    <Link
                      href={`/products/${product.slug}`}
                      className="px-3.5 py-2.5 min-h-[42px] rounded-xl border border-[#0C162C]/10 text-xs font-semibold text-[#0C162C] hover:bg-[#F5F3EF] flex items-center justify-center"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 10. COMPLIMENTARY HOME TRIAL CALLOUT BOX */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="p-8 sm:p-12 bg-[#0C162C] text-[#FAF9F6] rounded-3xl sm:rounded-4xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-lg text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE 4-FRAME COMPLIMENTARY HOME TRIAL</span>
            </span>
            <h3 className="font-editorial text-2xl sm:text-4xl font-medium leading-tight">
              Order Your Curated Velvet Presentation Suite.
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF9F6]/75 font-light leading-relaxed">
              Select any 4 silhouettes. Take 5 full days to experience them in your natural
              lighting. Includes complimentary express round-trip courier shipping.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsHomeTrialModalOpen(true)}
              className="min-h-[48px] px-8 bg-[#FAF9F6] text-[#0C162C] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-md text-center"
            >
              Curate 4 Frames
            </button>
            <button
              type="button"
              onClick={() =>
                openWhatsAppWithInquiry(
                  `Hello Fovea Concierge, I was reading "${article.title}" and would like optical advice.`
                )
              }
              className="min-h-[48px] px-8 bg-transparent border border-white/20 text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-white/10 transition-colors text-center"
            >
              Ask Stylist on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* 11. RELATED MONOGRAPHS SECTION */}
      {relatedArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 pt-12 border-t border-[#0C162C]/8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#0D5C63]">
                Continued Reading
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C] mt-1">
                More Optical Monographs
              </h2>
            </div>
            <Link
              href="/blogs"
              className="text-xs uppercase tracking-wider text-[#0C162C] font-semibold hover:text-[#0D5C63] flex items-center gap-1"
            >
              <span>All Articles</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedArticles.map((rel) => (
              <article
                key={rel.id}
                className="group bg-white rounded-3xl border border-[#0C162C]/8 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-[#ECE8DF]">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 350px"
                      referrerPolicy="no-referrer"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[9px] uppercase tracking-widest text-[#0D5C63] font-bold bg-white/95 px-2.5 py-1 rounded-full shadow-2xs">
                        {rel.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#0C162C]/50">
                      <span>{rel.date}</span>
                      <span>{rel.readTime}</span>
                    </div>
                    <h3 className="font-editorial text-xl font-semibold text-[#0C162C] group-hover:text-[#0D5C63] transition-colors leading-snug line-clamp-2">
                      <Link href={`/blogs/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                    <p className="text-xs text-[#0C162C]/70 line-clamp-2 font-light">
                      {rel.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#0C162C]/5 flex justify-end">
                  <Link
                    href={`/blogs/${rel.slug}`}
                    className="text-xs uppercase tracking-wider font-semibold text-[#0C162C] group-hover:text-[#0D5C63] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
