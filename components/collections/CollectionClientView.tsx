'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Sparkles, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { Collection, Product, COLLECTIONS } from '@/lib/data';
import ProductCard from '@/components/common/ProductCard';
import QuickViewModal from '@/components/modals/QuickViewModal';

interface CollectionClientViewProps {
  collection: Collection;
  products: Product[];
}

export default function CollectionClientView({
  collection,
  products,
}: CollectionClientViewProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const relatedCollections = COLLECTIONS.filter((c) => c.slug !== collection.slug).slice(0, 2);

  return (
    <div className="py-8 sm:py-16 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#0C162C]/60 hover:text-[#0C162C] font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Collections</span>
          </Link>
        </div>

        {/* Collection Hero with Cinematic Editorial Photography */}
        <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl border border-white/60 bg-[#0C162C] text-white">
          <div className="relative aspect-16/9 sm:aspect-21/9 w-full min-h-[380px]">
            <Image
              src={collection.coverImage}
              alt={collection.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              referrerPolicy="no-referrer"
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C162C] via-black/40 to-transparent" />

            <div className="absolute bottom-8 left-6 sm:left-10 right-6 sm:right-10 max-w-3xl space-y-3 z-10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-semibold text-[#C5A880]">
                <span>{collection.subtitle}</span>
                <span>·</span>
                <span>{products.length} Silhouettes</span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white">
                {collection.title}
              </h1>

              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-2xl">
                {collection.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-white/70">
                <span className="flex items-center gap-1.5 font-medium text-[#C5A880]">
                  <Sparkles className="w-4 h-4" />
                  Home Trial Eligible
                </span>
                <span>·</span>
                <span>Material: {collection.materialHighlight}</span>
                <span>·</span>
                <span>Tone: {collection.aesthetic}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Collection Specific Products Grid */}
        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between border-b border-[#0C162C]/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#0C162C]/70 font-semibold block">
                Silhouettes in {collection.title}
              </span>
              <span className="text-xs text-[#0C162C]/50">
                Showing {products.length} models crafted for this series
              </span>
            </div>
            <Link
              href="/products"
              className="text-xs font-semibold text-[#0D5C63] hover:text-[#0C162C] uppercase tracking-wider flex items-center gap-1"
            >
              <span>View All Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>

        {/* Home Trial Reassurance for this Series */}
        <div className="bg-[#F5F3EF] rounded-3xl p-8 sm:p-10 border border-[#0C162C]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#0D5C63]">
              Private Fitting at Home
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C]">
              Sample any 4 frames from {collection.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#0C162C]/70 font-light">
              Delivered in our bespoke presentation case. Try them with your daily wardrobe over 5
              days. Return via prepaid courier with zero fees.
            </p>
          </div>

          <Link
            href="/home-trial"
            className="min-h-[46px] px-6 bg-[#0C162C] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#1A365D] transition-colors whitespace-nowrap inline-flex items-center justify-center gap-2 shadow-sm self-start sm:self-center"
          >
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <span>Order Home Trial Box</span>
          </Link>
        </div>

        {/* Related Collections Section */}
        <div className="pt-8 space-y-6">
          <div className="border-b border-[#0C162C]/10 pb-4">
            <h3 className="font-editorial text-2xl font-semibold text-[#0C162C]">
              Discover Other Fovea Series
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedCollections.map((rel) => (
              <Link
                key={rel.id}
                href={`/collections/${rel.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-16/9 bg-[#0C162C] block shadow-md"
              >
                <Image
                  src={rel.coverImage}
                  alt={rel.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  referrerPolicy="no-referrer"
                  className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                    {rel.subtitle}
                  </span>
                  <h4 className="font-editorial text-xl font-semibold leading-tight">
                    {rel.title}
                  </h4>
                  <div className="pt-2 flex items-center gap-1.5 text-xs text-white/80 group-hover:text-white font-medium">
                    <span>Explore Series</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
