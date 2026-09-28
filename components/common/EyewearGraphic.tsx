'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface EyewearGraphicProps {
  silhouette?: 'round-panto' | 'architectural-square' | 'aviator-wire' | 'crown-panto' | 'geometric-hex' | 'cat-eye-sculpt';
  primaryColor?: string;
  accentColor?: string;
  className?: string;
  animate?: boolean;
  src?: string;
}

// High-resolution realistic photography map corresponding to silhouettes
const SILHOUETTE_PHOTOGRAPHY: Record<string, string> = {
  'round-panto': 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85',
  'architectural-square': 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=85',
  'aviator-wire': 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85',
  'crown-panto': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
  'geometric-hex': 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85',
  'cat-eye-sculpt': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85',
};

export default function EyewearGraphic({
  silhouette = 'round-panto',
  className = 'w-full h-full',
  src,
}: EyewearGraphicProps) {
  const [hasError, setHasError] = useState(false);
  const photoUrl = src || SILHOUETTE_PHOTOGRAPHY[silhouette] || SILHOUETTE_PHOTOGRAPHY['round-panto'];

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl select-none ${className}`}>
      <div className="relative w-full h-full min-h-[140px] aspect-4/3">
        <Image
          src={hasError ? 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85' : photoUrl}
          alt="High-resolution handcrafted luxury eyewear"
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        {/* Soft studio vignette shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
      </div>
    </div>
  );
}
