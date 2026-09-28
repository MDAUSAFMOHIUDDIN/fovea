'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Sparkles, Plus, Check, Eye, ChevronRight } from 'lucide-react';
import { Product } from '@/lib/data';
import { useFovea } from '@/lib/context';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  onQuickView?: (product: Product) => void;
  compact?: boolean;
}

export default function ProductCard({
  product,
  priority = false,
  onQuickView,
  compact = false,
}: ProductCardProps) {
  const { isInWishlist, toggleWishlist, addToCart, isInHomeTrial, toggleHomeTrialFrame } = useFovea();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileAngleActive, setMobileAngleActive] = useState(false);
  const [imgError, setImgError] = useState(false);

  const currentColor = product.colors[selectedColorIdx] || product.colors[0];
  const inWishlist = isInWishlist(product.id);
  const inHomeTrial = isInHomeTrial(product.id);

  // Active image: desktop hover or mobile angle toggle
  const showSecondary = (isHovered || mobileAngleActive) && Boolean(product.hoverImage);
  const activeImage = showSecondary ? product.hoverImage : product.image;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white rounded-3xl border border-[#0C162C]/8 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-[#0C162C]/20 hover:-translate-y-1"
    >
      {/* Visual Canvas Container with realistic photography */}
      <div className="relative aspect-4/3 w-full bg-[#F5F3EF] overflow-hidden">
        {/* Top Badges */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.badge && (
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#0D5C63] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs">
              {product.badge}
            </span>
          )}
          {product.isNewArrival && (
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white bg-[#0C162C] px-2.5 py-1 rounded-full shadow-xs">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button (Enlarged 44px touch target on mobile) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 sm:top-3 right-2.5 sm:right-3 z-10 w-11 h-11 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${
            inWishlist
              ? 'bg-[#0C162C] text-[#FAF9F6] shadow-md scale-105'
              : 'bg-white/90 text-[#0C162C]/70 hover:text-[#0C162C] hover:bg-white shadow-xs backdrop-blur-xs'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className="w-4 h-4 sm:w-3.5 sm:h-3.5" strokeWidth={1.8} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Realistic Eyewear Studio Image with Hover Scale */}
        <Link href={`/products/${product.slug}`} className="block w-full h-full relative cursor-pointer">
          <Image
            src={imgError ? 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85' : activeImage}
            alt={`${product.name} luxury handcrafted eyewear`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="object-cover transition-all duration-700 ease-out group-hover:scale-106"
          />

          {/* Depth vignette gradient on base */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Quick View Button for Desktop (Slide up on hover) */}
        {onQuickView && (
          <div className="hidden sm:flex absolute bottom-3 left-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0 gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="flex-1 min-h-[38px] px-3 bg-white/95 hover:bg-white text-[#0C162C] text-[11px] font-semibold uppercase tracking-wider rounded-xl backdrop-blur-md shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-[#0D5C63]" />
              <span>Quick View</span>
            </button>
          </div>
        )}

        {/* Mobile Angle Toggle / Quick View Pill */}
        <div className="sm:hidden absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-auto">
          {product.hoverImage && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileAngleActive(!mobileAngleActive);
              }}
              className="text-[10px] font-medium bg-black/60 text-white backdrop-blur-xs px-2.5 py-1 rounded-full"
            >
              {mobileAngleActive ? 'Front View' : 'Alternate Angle'}
            </button>
          )}

          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="text-[10px] font-semibold bg-white/95 text-[#0C162C] shadow-xs px-2.5 py-1 rounded-full flex items-center gap-1"
            >
              <Eye className="w-3 h-3 text-[#0D5C63]" />
              <span>Quick View</span>
            </button>
          )}
        </div>
      </div>

      {/* Content & Metadata */}
      <div className={`p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4 bg-white ${compact ? 'p-3 sm:p-4' : ''}`}>
        <div className="space-y-1">
          {/* Category & Series Bar */}
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-wider text-[#0C162C]/60 font-medium">
            <span className="text-[#0D5C63] font-semibold truncate max-w-[140px]">{product.series}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>

          {/* Product Name */}
          <Link
            href={`/products/${product.slug}`}
            className="font-editorial text-xl sm:text-2xl font-semibold text-[#0C162C] hover:text-[#0D5C63] transition-colors block leading-tight line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Optical Dimensions & Price */}
          <div className="flex items-center justify-between text-xs text-[#0C162C]/75 pt-0.5">
            <span className="font-mono text-[11px] text-[#0C162C]/60">
              {product.dimensions}
            </span>
            <span className="font-editorial text-lg sm:text-xl font-semibold tabular-nums text-[#0C162C]">
              ${product.price}
            </span>
          </div>
        </div>

        {/* Color Palette Swatches */}
        <div className="flex items-center justify-between pt-2 border-t border-[#0C162C]/8">
          <div className="flex items-center gap-1" aria-label="Available frame colors">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColorIdx(idx)}
                className="w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center rounded-full transition-transform active:scale-95"
                title={color.name}
                aria-label={`Select color ${color.name}`}
              >
                <span
                  className={`w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full border transition-all ${
                    selectedColorIdx === idx
                      ? 'ring-2 ring-[#0C162C] ring-offset-2 scale-110'
                      : 'border-[#0C162C]/20 hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              </button>
            ))}
          </div>

          <span className="text-[10px] sm:text-[11px] text-[#0C162C]/60 truncate max-w-[120px] font-medium text-right">
            {currentColor.name}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => addToCart(product, currentColor.name)}
            className="min-h-[44px] px-2 sm:px-3 bg-[#0C162C] text-[#FAF9F6] hover:bg-[#1A365D] rounded-xl text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Bag</span>
          </button>

          <button
            type="button"
            onClick={() => toggleHomeTrialFrame(product.id)}
            className={`min-h-[44px] px-2 sm:px-3 border rounded-xl text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
              inHomeTrial
                ? 'bg-[#0D5C63]/10 border-[#0D5C63] text-[#0D5C63]'
                : 'border-[#0C162C]/15 text-[#0C162C] hover:bg-[#F5F3EF]'
            }`}
          >
            {inHomeTrial ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>In Trial</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="truncate">Home Trial</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
