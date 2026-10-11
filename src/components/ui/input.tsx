import type { InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef, useId } from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  leading?: ReactNode
  trailing?: ReactNode
}

export const inputStyles =
  'h-11 w-full rounded-xl border border-stone-300 bg-white px-3.5 text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:border-stone-900 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-60 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-stone-400'

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leading, trailing, id, className, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const describedBy = hint || error ? `${inputId}-help` : undefined

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leading && (
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-stone-400">
            {leading}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            inputStyles,
            leading && 'pl-10',
            trailing && 'pr-10',
            error && 'border-red-500 focus:border-red-500 dark:border-red-500',
            className,
          )}
          {...props}
        />
        {trailing && (
          <span className="absolute top-1/2 right-3 -translate-y-1/2 text-stone-400">
            {trailing}
          </span>
        )}
      </div>
      {(hint || error) && (
        <p
          id={describedBy}
          className={cn(
            'mt-1.5 text-xs',
            error ? 'text-red-600 dark:text-red-400' : 'text-stone-500',
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  )
})