'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useFovea } from '@/lib/context';
import { PRODUCTS } from '@/lib/data';

export default function WishlistDrawer() {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    toggleHomeTrialFrame,
    isInHomeTrial,
  } = useFovea();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-[#0C162C]/40 backdrop-blur-xs"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FAF9F6] border-l border-[#0C162C]/10 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#0C162C]/10 bg-white">
                <div>
                  <h3 className="font-editorial text-2xl font-semibold text-[#0C162C]">
                    Saved Curation
                  </h3>
                  <span className="text-xs text-[#0C162C]/60">
                    {savedProducts.length} {savedProducts.length === 1 ? 'frame' : 'frames'} in your wishlist
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsWishlistOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#0C162C] hover:bg-[#0C162C]/5 rounded-full transition-colors"
                  aria-label="Close wishlist drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {savedProducts.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#F5F3EF] flex items-center justify-center text-[#0C162C]/40">
                      <Heart className="w-8 h-8" />
                    </div>
                    <h4 className="font-editorial text-xl font-medium text-[#0C162C]">
                      Your wishlist is empty
                    </h4>
                    <p className="text-xs text-[#0C162C]/60 max-w-xs leading-relaxed font-light">
                      Save your favorite Japanese titanium and Italian acetate silhouettes while exploring.
                    </p>
                    <Link
                      href="/products"
                      onClick={() => setIsWishlistOpen(false)}
                      className="px-6 py-3 text-xs uppercase tracking-wider font-semibold bg-[#0C162C] text-[#FAF9F6] rounded-xl hover:bg-[#1A365D] transition-colors"
                    >
                      Explore Products
                    </Link>
                  </div>
                ) : (
                  savedProducts.map((product) => {
                    const inHomeTrial = isInHomeTrial(product.id);
                    return (
                      <div
                        key={product.id}
                        className="p-4 bg-white rounded-2xl border border-[#0C162C]/8 shadow-xs space-y-3"
                      >
                        <div className="flex gap-4">
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={() => setIsWishlistOpen(false)}
                            className="relative w-24 h-24 bg-[#F5F3EF] rounded-xl overflow-hidden shrink-0 border border-[#0C162C]/5"
                          >
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="120px"
                              referrerPolicy="no-referrer"
                              className="object-cover"
                            />
                          </Link>

                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-[#0D5C63] font-semibold block truncate">
                                {product.series}
                              </span>
                              <Link
                                href={`/products/${product.slug}`}
                                onClick={() => setIsWishlistOpen(false)}
                                className="font-editorial text-lg font-semibold text-[#0C162C] hover:text-[#0D5C63] truncate block"
                              >
                                {product.name}
                              </Link>
                              <div className="flex items-center gap-2 mt-0.5 text-xs text-[#0C162C]/65">
                                <span className="font-editorial text-base font-semibold text-[#0C162C] tabular-nums">
                                  ${product.price}
                                </span>
                                <span>·</span>
                                <span className="truncate">{product.material}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-end pt-1">
                              <button
                                type="button"
                                onClick={() => toggleWishlist(product.id)}
                                className="text-xs text-[#0C162C]/40 hover:text-red-700 flex items-center gap-1 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#0C162C]/5">
                          <button
                            type="button"
                            onClick={() => {
                              addToCart(product);
                            }}
                            className="py-2.5 px-3 min-h-[44px] bg-[#0C162C] text-[#FAF9F6] hover:bg-[#1A365D] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors text-center"
                          >
                            Add to Bag
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleHomeTrialFrame(product.id)}
                            className={`py-2.5 px-3 min-h-[44px] border rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
                              inHomeTrial
                                ? 'bg-[#0D5C63]/10 border-[#0D5C63] text-[#0D5C63]'
                                : 'border-[#0C162C]/20 text-[#0C162C] hover:bg-[#F5F3EF]'
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                            <span>{inHomeTrial ? 'In Home Trial' : 'Add to Trial'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer */}
              {savedProducts.length > 0 && (
                <div className="p-6 pb-safe sm:pb-6 bg-white border-t border-[#0C162C]/10 space-y-2 text-center">
                  <Link
                    href="/home-trial"
                    onClick={() => setIsWishlistOpen(false)}
                    className="w-full py-2.5 px-4 min-h-[44px] bg-[#0C162C] text-[#FAF9F6] rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#1A365D] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Proceed to Home Trial with 4 frames</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center justify-center gap-4 pt-1">
                    <Link
                      href="/wishlist"
                      onClick={() => setIsWishlistOpen(false)}
                      className="inline-flex items-center gap-1 text-[11px] text-[#0D5C63] font-semibold hover:underline"
                    >
                      <span>Full Wishlist Page</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <span className="text-[#0C162C]/30 text-xs">·</span>
                    <Link
                      href="/account"
                      onClick={() => setIsWishlistOpen(false)}
                      className="inline-flex items-center gap-1 text-[11px] text-[#0C162C]/70 hover:text-[#0C162C] font-medium hover:underline"
                    >
                      <span>Customer Account</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
