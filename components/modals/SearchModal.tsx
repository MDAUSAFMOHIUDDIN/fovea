'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useFovea } from '@/lib/context';
import { PRODUCTS } from '@/lib/data';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useFovea();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return PRODUCTS.slice(0, 4);
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.frameShape.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.series.toLowerCase().includes(q)
    );
  }, [query]);

  const quickFilters = ['Titanium', 'Panto', 'Mazzucchelli', 'Sunglasses', 'Optical', 'Ultralight'];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-[#0C162C]/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[#FAF9F6] border border-[#0C162C]/10 rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-6 py-4.5 border-b border-[#0C162C]/10 bg-white">
              <Search className="w-5 h-5 text-[#0C162C]/40 mr-3" strokeWidth={1.8} />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search optical frames, Japanese titanium, frame shapes..."
                className="w-full text-base sm:text-lg bg-transparent text-[#0C162C] placeholder:text-[#0C162C]/40 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="w-11 h-11 flex items-center justify-center text-[#0C162C]/60 hover:text-[#0C162C] rounded-full hover:bg-[#0C162C]/5 transition-colors shrink-0"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="px-6 py-3 bg-[#F5F3EF] border-b border-[#0C162C]/8 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] uppercase tracking-wider text-[#0C162C]/50 font-medium whitespace-nowrap">
                Quick:
              </span>
              {quickFilters.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 text-xs bg-white text-[#0C162C]/80 hover:text-[#0C162C] rounded-lg border border-[#0C162C]/10 transition-colors whitespace-nowrap font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Results Grid */}
            <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#0C162C]/60 font-medium">
                  {query.trim() ? `Search Results (${filteredProducts.length})` : 'Curated Highlights'}
                </span>
                <Link
                  href="/products"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-xs text-[#0D5C63] font-medium hover:underline flex items-center gap-1"
                >
                  View full catalogue <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-[#0C162C]/60 space-y-2">
                  <p className="text-sm">No eyewear matching &quot;{query}&quot;</p>
                  <p className="text-xs">Try searching by material like &quot;Titanium&quot; or shape like &quot;Panto&quot;.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="group flex items-center gap-4 p-3.5 bg-white hover:bg-[#F5F3EF] rounded-2xl border border-[#0C162C]/8 transition-all hover:border-[#0C162C]/20 shadow-xs"
                    >
                      <div className="relative w-20 h-20 bg-[#F5F3EF] rounded-xl overflow-hidden shrink-0 border border-[#0C162C]/5">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="100px"
                          referrerPolicy="no-referrer"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-[#0D5C63] font-semibold block truncate">
                          {product.series}
                        </span>
                        <h4 className="font-editorial text-lg font-semibold text-[#0C162C] group-hover:text-[#0D5C63] transition-colors truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-[#0C162C]/65">
                          <span className="font-editorial text-base font-semibold text-[#0C162C] tabular-nums">
                            ${product.price}
                          </span>
                          <span>·</span>
                          <span className="truncate">{product.frameShape}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer Callout */}
            <div className="px-6 py-4 bg-[#FAF9F6] border-t border-[#0C162C]/10 flex items-center justify-between text-xs text-[#0C162C]/70">
              <span className="flex items-center gap-1.5 font-medium text-[#0D5C63]">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                All optical frames are Home Trial eligible
              </span>
              <span className="hidden sm:inline text-[#0C162C]/40">Press ESC to dismiss</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
