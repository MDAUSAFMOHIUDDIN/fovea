'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Compass, ArrowUpRight } from 'lucide-react';
import { COLLECTIONS, PRODUCTS } from '@/lib/data';

export default function CollectionsPage() {
  return (
    <div className="py-10 sm:py-20 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Page Header */}
        <div className="border-b border-[#0C162C]/10 pb-8 space-y-3">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
            <span>Atelier Compendium</span>
            <span>·</span>
            <span>Handmade Series</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-semibold text-[#0C162C] tracking-tight">
            Curated Eyewear Collections
          </h1>
          <p className="text-base sm:text-lg text-[#0C162C]/70 max-w-2xl leading-relaxed font-light">
            Each Fovea collection is a dedicated metallurgical or bio-acetate study—from cold-milled
            Japanese aerospace titanium to sculptural Italian block bio-acetate.
          </p>
        </div>

        {/* Featured Flagship Collection Banner */}
        {COLLECTIONS[0] && (
          <div className="group relative rounded-3xl sm:rounded-4xl overflow-hidden bg-[#0C162C] text-white shadow-2xl border border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
              {/* Left Editorial Narrative */}
              <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-8 z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold text-[#C5A880]">
                    <span>Atelier Flagship</span>
                    <span>·</span>
                    <span>Sabae Metallurgy</span>
                  </div>

                  <h2 className="font-editorial text-3xl sm:text-5xl font-semibold leading-tight text-white">
                    {COLLECTIONS[0].title}
                  </h2>

                  <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed max-w-lg">
                    {COLLECTIONS[0].description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4 text-xs text-white/70">
                    <span className="flex items-center gap-1.5 font-medium text-[#C5A880]">
                      <Sparkles className="w-4 h-4" />
                      Home Trial Eligible
                    </span>
                    <span>·</span>
                    <span>{COLLECTIONS[0].itemCount} Distinct Silhouettes</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    href={`/collections/${COLLECTIONS[0].slug}`}
                    className="min-h-[48px] px-6 bg-white text-[#0C162C] hover:bg-[#F5F3EF] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-sm"
                  >
                    <span>Explore Series</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/home-trial"
                    className="min-h-[48px] px-6 border border-white/25 hover:border-white text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                  >
                    <span>Sample In Home Trial</span>
                  </Link>
                </div>
              </div>

              {/* Right Cinematic Photography */}
              <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full overflow-hidden bg-[#1A202C]">
                <Image
                  src={COLLECTIONS[0].coverImage}
                  alt={COLLECTIONS[0].title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0C162C] via-transparent to-transparent" />
              </div>
            </div>
          </div>
        )}

        {/* Collections Editorial Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#0C162C]/10 pb-4">
            <span className="text-xs uppercase tracking-widest text-[#0C162C]/70 font-semibold">
              All Atelier Series ({COLLECTIONS.length})
            </span>
            <span className="text-xs text-[#0C162C]/50 font-mono">Lombardy & Fukui Production</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {COLLECTIONS.slice(1).map((col, idx) => {
              const sampleProduct = PRODUCTS.find((p) => p.id === col.featuredProductId) || PRODUCTS[idx];

              return (
                <div
                  key={col.id}
                  className="group bg-white rounded-3xl border border-[#0C162C]/8 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  {/* Visual Header with Real Photography & Hover Depth */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-[#ECE8DF]">
                    <Image
                      src={col.coverImage}
                      alt={`${col.title} collection`}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      referrerPolicy="no-referrer"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                    {/* Top Index & Item Count */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
                      <span className="font-mono text-xs bg-black/60 backdrop-blur-xs px-3 py-1 rounded-full font-semibold">
                        0{idx + 2}
                      </span>
                      <span className="text-xs font-semibold bg-white/95 text-[#0C162C] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {col.itemCount} Designs
                      </span>
                    </div>

                    {/* Subtitle & Title overlay */}
                    <div className="absolute bottom-5 left-6 right-6 text-white z-10">
                      <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block mb-0.5">
                        {col.subtitle}
                      </span>
                      <h2 className="font-editorial text-2xl sm:text-3xl font-semibold leading-tight">
                        {col.title}
                      </h2>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between bg-white">
                    <div className="space-y-4">
                      <p className="text-sm text-[#0C162C]/75 leading-relaxed font-light">
                        {col.description}
                      </p>

                      {/* Technical Focus Strip */}
                      <div className="p-4 bg-[#FAF9F6] rounded-2xl text-xs text-[#0C162C]/80 border border-[#0C162C]/5 space-y-1.5">
                        <p>
                          <strong className="text-[#0C162C]">Material Focus: </strong>
                          <span>{col.materialHighlight}</span>
                        </p>
                        <p className="text-[#0C162C]/65">
                          <strong className="text-[#0C162C]">Aesthetic Tone: </strong>
                          <span>{col.aesthetic}</span>
                        </p>
                      </div>

                      {/* Featured Frame Preview */}
                      {sampleProduct && (
                        <div className="pt-2 flex items-center justify-between text-xs text-[#0C162C]/70">
                          <span>Signature frame:</span>
                          <span className="font-editorial text-sm font-semibold text-[#0C162C]">
                            {sampleProduct.name} (${sampleProduct.price})
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom CTA Bar */}
                    <div className="pt-5 border-t border-[#0C162C]/8 flex items-center justify-between">
                      <Link
                        href={`/collections/${col.slug}`}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#0C162C] group-hover:text-[#0D5C63] transition-colors"
                      >
                        <span>Explore Collection ({col.itemCount} Models)</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>

                      <span className="text-xs text-[#0D5C63] font-medium flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                        Home Trial
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Material & Craftsmanship Comparative Study */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#0C162C]/8 space-y-8 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#0D5C63]">
              Atelier Metallurgy & Polymerics
            </span>
            <h3 className="font-editorial text-3xl font-semibold text-[#0C162C]">
              Understanding Fovea Material Families
            </h3>
            <p className="text-sm text-[#0C162C]/70 font-light leading-relaxed">
              Every silhouette is engineered around the natural mechanics of its base element.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FAF9F6] rounded-2xl border border-[#0C162C]/5 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0D5C63] block">
                Aerospace Titanium
              </span>
              <h4 className="font-editorial text-xl font-semibold text-[#0C162C]">
                Sabae Cold-Milled Pure Titanium
              </h4>
              <p className="text-xs text-[#0C162C]/70 leading-relaxed font-light">
                Weightless balance under 9 grams. Unaffected by sweat, seawater, or atmospheric
                humidity. Completely hypoallergenic and chemically inert.
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#0C162C]/60">
                Avg. Weight: 7.6g – 8.4g
              </div>
            </div>

            <div className="p-6 bg-[#FAF9F6] rounded-2xl border border-[#0C162C]/5 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0D5C63] block">
                Italian Bio-Acetate
              </span>
              <h4 className="font-editorial text-xl font-semibold text-[#0C162C]">
                Mazzucchelli Cured Cellulose
              </h4>
              <p className="text-xs text-[#0C162C]/70 leading-relaxed font-light">
                Cotton flower and beechwood polymers cured for 120 days. Rich tortoiseshell depth,
                soft hand-filed bevels, and warm skin-contact feel.
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#0C162C]/60">
                Avg. Weight: 21g – 26g
              </div>
            </div>

            <div className="p-6 bg-[#FAF9F6] rounded-2xl border border-[#0C162C]/5 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0D5C63] block">
                Optical Glass
              </span>
              <h4 className="font-editorial text-xl font-semibold text-[#0C162C]">
                ZEISS Polarized Mineral Glass
              </h4>
              <p className="text-xs text-[#0C162C]/70 leading-relaxed font-light">
                Absolute zero chromatic distortion. Scratch-resistant dual coating with hydrophobic
                and oleophobic outer shields for crisp coastal viewing.
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#0C162C]/60">
                100% UVA/UVB + AR Shield
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
