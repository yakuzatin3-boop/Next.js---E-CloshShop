import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'

interface PriceProps {
  value: number
  compareAt?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZES = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-2xl',
}

export function Price({ value, compareAt, size = 'md', className }: PriceProps) {
  const discounted = compareAt && compareAt > value

  return (
    <p className={cn('flex items-baseline gap-2', className)}>
      <span
        className={cn(
          'font-semibold tabular-nums',
          SIZES[size],
          discounted && 'text-accent-700 dark:text-accent-400',
        )}
      >
        {formatCurrency(value)}
      </span>
      {discounted && (
        <span className="text-sm text-stone-400 line-through tabular-nums">
          {formatCurrency(compareAt)}
        </span>
      )}
    </p>
  )
}