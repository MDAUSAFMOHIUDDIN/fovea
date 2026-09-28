import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] bg-[#FAF9F6] flex flex-col items-center justify-center p-6 space-y-4">
      {/* Subtle, refined atelier brand loader */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-[#0C162C]/10 border-t-[#0D5C63] animate-spin" />
        <span className="font-editorial text-sm font-semibold text-[#0C162C]">F</span>
      </div>
      <p className="text-[11px] uppercase tracking-[0.2em] text-[#0C162C]/50 font-medium">
        Loading Atelier...
      </p>
    </div>
  );
}
