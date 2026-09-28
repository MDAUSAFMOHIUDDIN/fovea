'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  Heart,
  Plus,
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  Ruler,
} from 'lucide-react';
import { Product } from '@/lib/data';
import { useFovea } from '@/lib/context';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

function QuickViewContent({ product, onClose }: { product: Product; onClose: () => void }) {
  const { isInWishlist, toggleWishlist, addToCart, isInHomeTrial, toggleHomeTrialFrame } = useFovea();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const images = [
    { label: 'Studio Profile', url: product.image },
    { label: 'Angle Perspective', url: product.hoverImage },
    { label: 'Editorial Model', url: product.modelImage },
    { label: 'Macro Craftsmanship', url: product.detailImage },
  ].filter((img) => Boolean(img.url));

  const currentColor = product.colors[selectedColorIdx] || product.colors[0];
  const inWishlist = isInWishlist(product.id);
  const inTrial = isInHomeTrial(product.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0C162C]/70 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white rounded-3xl sm:rounded-4xl shadow-2xl border border-[#0C162C]/10 overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0C162C] flex items-center justify-center shadow-md transition-transform hover:scale-105"
          aria-label="Close Quick View"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Gallery */}
        <div className="w-full md:w-1/2 bg-[#F5F3EF] p-5 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#0C162C]/8">
          {/* Main Visual Display */}
          <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-white shadow-xs border border-[#0C162C]/5">
            <Image
              src={images[activeImageIdx]?.url || product.image}
              alt={`${product.name} - ${images[activeImageIdx]?.label}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 500px"
              referrerPolicy="no-referrer"
              className="object-cover transition-all duration-500"
            />

            {/* Badges on Visual */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
              {product.badge && (
                <span className="text-[10px] uppercase tracking-wider font-semibold bg-white/95 text-[#0D5C63] px-2.5 py-1 rounded-full shadow-xs">
                  {product.badge}
                </span>
              )}
              {product.isNewArrival && (
                <span className="text-[10px] uppercase tracking-wider font-semibold bg-[#0C162C] text-white px-2.5 py-1 rounded-full shadow-xs">
                  New Arrival
                </span>
              )}
            </div>

            <div className="absolute bottom-3 right-3 text-[10px] uppercase tracking-wider font-mono bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-full">
              {images[activeImageIdx]?.label}
            </div>
          </div>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-4 gap-2 pt-4">
            {images.map((img, idx) => (
              <button
                key={img.label}
                type="button"
                onClick={() => setActiveImageIdx(idx)}
                className={`relative aspect-4/3 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImageIdx === idx
                    ? 'border-[#0C162C] ring-2 ring-[#0C162C]/20 scale-102 shadow-xs'
                    : 'border-transparent opacity-70 hover:opacity-100 hover:border-[#0C162C]/30'
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.label}
                  fill
                  sizes="120px"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Quick Craftsmanship Footnote */}
          <div className="mt-4 pt-3 border-t border-[#0C162C]/10 flex items-center justify-between text-[11px] text-[#0C162C]/65 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0D5C63]" />
              Handcrafted in {product.materialType === 'Titanium' || product.materialType === 'Beta-Titanium' ? 'Sabae, Japan' : 'Varese, Italy'}
            </span>
            <span className="font-mono text-[#0C162C]/50">{product.weight}</span>
          </div>
        </div>

        {/* Right Column: Spec & Action Drawer */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
          {/* Header Title */}
          <div className="space-y-1.5 pr-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#0D5C63]">
              <span>{product.series}</span>
              <span>·</span>
              <span>{product.category}</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0C162C] leading-tight">
              {product.name}
            </h2>
            <div className="flex items-center justify-between pt-1">
              <span className="text-2xl font-editorial font-semibold text-[#0C162C]">
                ${product.price}
              </span>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  inWishlist
                    ? 'bg-[#0C162C] text-white'
                    : 'bg-[#F5F3EF] text-[#0C162C]/70 hover:text-[#0C162C]'
                }`}
              >
                <Heart className="w-3.5 h-3.5" fill={inWishlist ? 'currentColor' : 'none'} />
                <span>{inWishlist ? 'In Wishlist' : 'Save'}</span>
              </button>
            </div>
          </div>

          <p className="text-sm text-[#0C162C]/75 leading-relaxed font-light">
            {product.shortDesc}
          </p>

          {/* Color Selector */}
          <div className="space-y-2.5 pt-2 border-t border-[#0C162C]/8">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-[#0C162C]/60">
                Frame Finish:
              </span>
              <span className="font-medium text-[#0C162C]">{currentColor.name}</span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((c, idx) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`w-7 h-7 rounded-full border transition-all ${
                    selectedColorIdx === idx
                      ? 'ring-2 ring-[#0C162C] ring-offset-2 scale-110 shadow-xs'
                      : 'border-[#0C162C]/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Precise Dimensions Breakdown */}
          <div className="space-y-2.5 p-4 bg-[#FAF9F6] rounded-2xl border border-[#0C162C]/6">
            <div className="flex items-center justify-between text-xs font-semibold text-[#0C162C]">
              <span className="flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-[#0D5C63]" />
                Optical Architecture & Fit
              </span>
              <span className="font-mono text-[#0C162C]/60">{product.dimensions}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#0C162C]/8 text-center">
              <div className="p-2 bg-white rounded-xl border border-[#0C162C]/4">
                <span className="text-[10px] text-[#0C162C]/50 uppercase tracking-wider block">Lens</span>
                <span className="font-editorial text-sm font-semibold text-[#0C162C]">{product.lensWidth} mm</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-[#0C162C]/4">
                <span className="text-[10px] text-[#0C162C]/50 uppercase tracking-wider block">Bridge</span>
                <span className="font-editorial text-sm font-semibold text-[#0C162C]">{product.bridgeWidth} mm</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-[#0C162C]/4">
                <span className="text-[10px] text-[#0C162C]/50 uppercase tracking-wider block">Temple</span>
                <span className="font-editorial text-sm font-semibold text-[#0C162C]">{product.templeLength} mm</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={() => {
                addToCart(product, currentColor.name);
                onClose();
              }}
              className="w-full min-h-[48px] px-6 bg-[#0C162C] text-[#FAF9F6] hover:bg-[#1A365D] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Shopping Bag — ${product.price}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleHomeTrialFrame(product.id)}
              className={`w-full min-h-[46px] px-6 border rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                inTrial
                  ? 'bg-[#0D5C63]/10 border-[#0D5C63] text-[#0D5C63]'
                  : 'border-[#0C162C]/15 text-[#0C162C] hover:bg-[#F5F3EF]'
              }`}
            >
              {inTrial ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Home Trial Box (4 Frames Max)</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  <span>Sample in 4-Frame Home Trial</span>
                </>
              )}
            </button>

            <div className="pt-2 text-center">
              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs text-[#0C162C]/70 hover:text-[#0C162C] font-semibold underline underline-offset-4 decoration-[#0C162C]/20 hover:decoration-[#0C162C]"
              >
                <span>View Complete Editorial Story & Atelier Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  if (!isOpen || !product) return null;
  return <QuickViewContent key={product.id} product={product} onClose={onClose} />;
}
