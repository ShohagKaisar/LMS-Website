'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  reviewCount?: number
  className?: string
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  reviewCount,
  className,
}: StarRatingProps) {
  const sizeClass = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }[size]

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              sizeClass,
              'transition-colors',
              i < Math.floor(rating)
                ? 'fill-amber-400 text-amber-400'
                : i < rating
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'text-muted-foreground/30'
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-foreground">{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className="text-sm text-muted-foreground">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  )
}
