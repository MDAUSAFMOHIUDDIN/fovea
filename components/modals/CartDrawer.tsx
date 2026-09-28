'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useFovea } from '@/lib/context';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart, cartTotal, setIsHomeTrialModalOpen } =
    useFovea();

  const freeShippingThreshold = 300;
  const isEligibleForFreeShipping = cartTotal >= freeShippingThreshold;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#0C162C]/40 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FAF9F6] border-l border-[#0C162C]/10 flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#0C162C]/10 bg-white">
                <div>
                  <h3 className="font-editorial text-2xl font-semibold text-[#0C162C]">
                    Your Shopping Bag
                  </h3>
                  <span className="text-xs text-[#0C162C]/60">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} in your curation
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#0C162C] hover:bg-[#0C162C]/5 rounded-full transition-colors"
                  aria-label="Close bag drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Courier Shipping Bar */}
              <div className="px-6 py-3 bg-[#F5F3EF] border-b border-[#0C162C]/8 flex items-center justify-between text-xs text-[#0C162C]">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#0D5C63]" />
                  <span>
                    {isEligibleForFreeShipping
                      ? 'Complimentary insured worldwide courier unlocked'
                      : `Add $${freeShippingThreshold - cartTotal} more for free worldwide courier`}
                  </span>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#F5F3EF] flex items-center justify-center text-[#0C162C]/40">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h4 className="font-editorial text-xl font-medium text-[#0C162C]">
                      Your bag is empty
                    </h4>
                    <p className="text-xs text-[#0C162C]/60 max-w-xs leading-relaxed font-light">
                      Explore our handcrafted Japanese titanium and Italian acetate silhouettes.
                    </p>
                    <Link
                      href="/products"
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-3 text-xs uppercase tracking-wider font-semibold bg-[#0C162C] text-[#FAF9F6] rounded-xl hover:bg-[#1A365D] transition-colors"
                    >
                      Browse Catalogue
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.colorName}`}
                      className="flex gap-4 p-4 bg-white rounded-2xl border border-[#0C162C]/8 shadow-xs"
                    >
                      <div className="relative w-24 h-24 bg-[#F5F3EF] rounded-xl overflow-hidden shrink-0 border border-[#0C162C]/5">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="120px"
                          referrerPolicy="no-referrer"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-semibold text-[#0C162C] truncate">
                              {item.product.name}
                            </h4>
                            <span className="font-editorial text-base font-semibold text-[#0C162C] tabular-nums">
                              ${item.product.price * item.quantity}
                            </span>
                          </div>
                          <p className="text-xs text-[#0C162C]/60 mt-0.5">{item.colorName}</p>
                          <p className="text-[11px] text-[#0D5C63] font-medium mt-0.5">{item.lensType}</p>
                        </div>

                        {/* Quantity Stepper & Remove */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-[#0C162C]/15 rounded-lg bg-[#FAF9F6] overflow-hidden">
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQuantity(item.product.id, item.colorName, item.quantity - 1)
                              }
                              className="w-9 h-9 flex items-center justify-center text-sm font-medium text-[#0C162C] hover:bg-[#0C162C]/5 active:bg-[#0C162C]/10 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-semibold tabular-nums text-[#0C162C]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQuantity(item.product.id, item.colorName, item.quantity + 1)
                              }
                              className="w-9 h-9 flex items-center justify-center text-sm font-medium text-[#0C162C] hover:bg-[#0C162C]/5 active:bg-[#0C162C]/10 transition-colors"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id, item.colorName)}
                            className="w-9 h-9 flex items-center justify-center text-[#0C162C]/40 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary */}
              {cart.length > 0 && (
                <div className="p-6 pb-safe sm:pb-6 bg-white border-t border-[#0C162C]/10 space-y-4">
                  <div className="space-y-1.5 text-xs text-[#0C162C]/75">
                    <div className="flex items-center justify-between">
                      <span>Subtotal</span>
                      <span className="font-editorial text-lg font-semibold tabular-nums text-[#0C162C]">
                        ${cartTotal}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[#0D5C63] font-medium">
                      <span>Insured Express Courier</span>
                      <span>Complimentary</span>
                    </div>
                    <div className="flex items-center justify-between text-[#0C162C]/60 text-[11px]">
                      <span>Duties & Taxes</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      alert('Checkout process initiated with encrypted 256-bit security.');
                    }}
                    className="w-full min-h-[50px] bg-[#0C162C] text-[#FAF9F6] font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-[#1A365D] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Home Trial alternative CTA */}
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCartOpen(false);
                        setIsHomeTrialModalOpen(true);
                      }}
                      className="text-xs text-[#0D5C63] font-medium hover:underline"
                    >
                      Prefer to try before buying? Book a 4-frame Home Trial →
                    </button>
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
