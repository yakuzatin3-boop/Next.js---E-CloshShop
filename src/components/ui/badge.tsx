import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type Tone = 'neutral' | 'accent' | 'sale' | 'new' | 'success' | 'outline'

const TONES: Record<Tone, string> = {
  neutral: 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900',
  accent: 'bg-accent-600 text-white',
  sale: 'bg-red-600 text-white',
  new: 'bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-white',
  success: 'bg-emerald-600 text-white',
  outline:
    'border border-stone-300 text-stone-700 dark:border-stone-700 dark:text-stone-300',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase',
        TONES[tone],
        className,
      )}
      {...props}
    />
  )
}