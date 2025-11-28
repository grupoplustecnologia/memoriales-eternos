'use client';

import Image from 'next/image';
import { useState } from 'react';
import { optimizeImage } from '@/lib/seo';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  objectPosition?: string;
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width = 640,
  height = 480,
  priority = false,
  className = '',
  objectFit = 'cover',
  objectPosition = 'center',
  sizes
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes || optimizeImage(src, alt, priority).sizes}
        onLoadingComplete={() => setIsLoading(false)}
        className={`w-full h-full transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          objectFit,
          objectPosition
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      )}
    </div>
  );
}
