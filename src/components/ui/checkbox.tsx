import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

export const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Checkbox({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          'h-4 w-4 shrink-0 cursor-pointer rounded border-stone-300 text-accent-600 accent-accent-600 focus:ring-2 focus:ring-accent-600 focus:ring-offset-0 dark:border-stone-600',
          className,
        )}
        {...props}
      />
    )
  },
)