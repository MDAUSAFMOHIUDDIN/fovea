import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass, Sparkles } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found — FOVEA',
  description: 'The requested view or optical collection does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FAF9F6] px-4 py-20 text-[#0C162C]">
      <div className="max-w-xl mx-auto text-center space-y-8">
        {/* Subtle Atelier Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] text-xs font-semibold uppercase tracking-[0.24em]">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Optical Index · 404</span>
        </div>

        {/* Minimal Optical Geometry graphic */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#0C162C]/10 animate-ping opacity-25" />
          <div className="w-24 h-24 rounded-full border border-[#0C162C]/20 bg-white shadow-md flex items-center justify-center">
            <span className="font-editorial text-4xl font-light text-[#0C162C]">
              404
            </span>
          </div>
        </div>

        {/* Editorial Heading & Subtext */}
        <div className="space-y-3">
          <h1 className="font-editorial text-4xl sm:text-6xl font-semibold text-[#0C162C] tracking-tight leading-tight">
            That View Doesn&apos;t Exist.
          </h1>
          <p className="text-base sm:text-lg text-[#0C162C]/70 font-light leading-relaxed max-w-md mx-auto">
            The page or optical monograph you are seeking is unavailable or has moved to our main collection.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto min-h-[48px] px-8 bg-[#0C162C] text-[#FAF9F6] hover:bg-[#1A365D] rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto min-h-[48px] px-8 bg-white border border-[#0C162C]/15 text-[#0C162C] hover:bg-[#F5F3EF] rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Compass className="w-4 h-4 text-[#0D5C63]" />
            <span>Explore Eyewear</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
