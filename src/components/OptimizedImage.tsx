'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  objectPosition?: string;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  quality?: number;
}

/**
 * Optimized Image Component with next/image best practices
 * Handles responsive sizing, lazy loading, and blur placeholders
 */
export default function OptimizedImage({
  src,
  alt,
  width = 640,
  height = 480,
  priority = false,
  className = '',
  containerClassName = '',
  objectFit = 'cover',
  objectPosition = 'center',
  sizes,
  placeholder = 'blur',
  blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2UwZTdmZiIvPjwvc3ZnPg==',
  quality = 85
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Default responsive sizes
  const defaultSizes =
    sizes ||
    '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw';

  return (
    <div
      className={`relative overflow-hidden bg-gray-100 ${containerClassName}`}
      style={{
        aspectRatio: `${width} / ${height}`
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        loading={priority ? 'eager' : 'lazy'}
        sizes={defaultSizes}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        placeholder={placeholder === 'blur' ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        className={`w-full h-full transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        style={{
          objectFit,
          objectPosition
        }}
      />

      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">No se pudo cargar la imagen</span>
        </div>
      )}
    </div>
  );
}
