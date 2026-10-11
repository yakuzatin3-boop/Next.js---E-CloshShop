import { Star } from 'lucide-react'

import { cn } from '@/lib/utils'

interface RatingProps {
  value: number
  count?: number
  size?: 'sm' | 'md'
  className?: string
}

export function Rating({ value, count, size = 'sm', className }: RatingProps) {
  const rounded = Math.round(value)
  const starSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`Rated ${value.toFixed(1)} out of 5`}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              starSize,
              index < rounded
                ? 'fill-amber-400 text-amber-400'
                : 'fill-transparent text-stone-300 dark:text-stone-600',
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      {typeof count === 'number' && (
        <span className="text-xs text-stone-500">({count})</span>
      )}
    </div>
  )
}