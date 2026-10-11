import { SITE } from '@/lib/constants'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: SITE.currency,
  minimumFractionDigits: 2,
})

const compactFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
})

export function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

export function formatCompact(value: number) {
  return compactFormatter.format(value)
}

export function formatDate(value: string | Date) {
  return dateFormatter.format(new Date(value))
}

/** Strips to cents so totals never drift through floating point math. */
export function toCents(value: number) {
  return Math.round(value * 100)
}

export function fromCents(value: number) {
  return Math.round(value) / 100
}

export function formatDiscount(price: number, compareAt?: number) {
  if (!compareAt || compareAt <= price) return null
  return `${Math.round(((compareAt - price) / compareAt) * 100)}% off`
}