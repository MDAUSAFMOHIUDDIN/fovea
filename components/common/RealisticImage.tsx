'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface RealisticImageProps {
  src: string;
  hoverSrc?: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'auto';
  className?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain';
}

export default function RealisticImage({
  src,
  hoverSrc,
  alt,
  aspectRatio = 'auto',
  className = '',
  priority = false,
  objectFit = 'cover',
}: RealisticImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'video'
      ? 'aspect-16/9'
      : aspectRatio === 'portrait'
      ? 'aspect-3/4'
      : aspectRatio === 'wide'
      ? 'aspect-4/3'
      : '';

  const activeSrc = isHovered && hoverSrc ? hoverSrc : src;

  return (
    <div
      onMouseEnter={() => hoverSrc && setIsHovered(true)}
      onMouseLeave={() => hoverSrc && setIsHovered(false)}
      className={`relative overflow-hidden ${aspectClass} ${className}`}
    >
      <Image
        src={hasError ? 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85' : activeSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`transition-all duration-700 ease-out ${
          objectFit === 'contain' ? 'object-contain p-4' : 'object-cover'
        } ${isHovered && !hoverSrc ? 'scale-105' : 'scale-100'}`}
      />
    </div>
  );
}
