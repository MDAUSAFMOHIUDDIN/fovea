'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useFovea } from '@/lib/context';

export default function HomeTrialFloatingIndicator() {
  const pathname = usePathname();
  const { homeTrialFrames, setIsHomeTrialModalOpen } = useFovea();

  // Hide on dedicated home-trial page or single product detail pages (where sticky mobile bar lives) to avoid UI overlap
  if (pathname === '/home-trial' || (pathname.startsWith('/products/') && pathname !== '/products')) {
    return null;
  }

  const count = homeTrialFrames.length;

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-4 sm:right-6 z-40 pointer-events-auto">
      <button
        type="button"
        onClick={() => setIsHomeTrialModalOpen(true)}
        className="group flex items-center gap-2.5 px-4 py-2.5 bg-[#0C162C] text-[#FAF9F6] rounded-full shadow-2xl border border-white/20 hover:bg-[#1A365D] hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label={`View Home Trial selection (${count} frames)`}
      >
        <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-semibold tracking-wide">
            Home Trial
          </span>
          <span className="text-[#C5A880] font-mono font-medium">·</span>
          <span className="font-medium text-[#FAF9F6]/90">
            {count === 0 ? 'Try 4 Free' : `${count} ${count === 1 ? 'Frame' : 'Frames'}`}
          </span>
        </div>

        <span className="w-5 h-5 rounded-full bg-white/15 text-[10px] font-mono font-semibold flex items-center justify-center ml-0.5 group-hover:translate-x-0.5 transition-transform">
          {count}/4
        </span>
      </button>
    </div>
  );
}
