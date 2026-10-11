import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  action?: React.ReactNode
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'sm:flex-col sm:items-center sm:text-center',
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && (
          <p className="text-xs font-semibold tracking-[0.18em] text-accent-600 uppercase dark:text-accent-400">
            {eyebrow}
          </p>
        )}
        <Heading className="mt-2 font-display text-2xl tracking-tight text-balance sm:text-3xl lg:text-4xl">
          {title}
        </Heading>
        {description && (
          <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}