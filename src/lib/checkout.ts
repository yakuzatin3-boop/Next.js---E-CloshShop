import { SHIPPING, TAX_RATE } from '@/lib/constants'

export const PROMO_CODES: Record<string, { rate: number; label: string }> = {
  WELCOME10: { rate: 0.1, label: '10% off your first order' },
  SAVE20: { rate: 0.2, label: '20% off everything' },
}

export interface OrderTotals {
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
}

export function computeOrderTotals(
  subtotal: number,
  options: { shippingMethodId?: string; promoCode?: string | null } = {},
): OrderTotals {
  const promo = options.promoCode ? PROMO_CODES[options.promoCode.toUpperCase()] : undefined
  const discount = promo ? subtotal * promo.rate : 0
  const discounted = Math.max(0, subtotal - discount)

  const method = SHIPPING.methods.find((item) => item.id === options.shippingMethodId)
  const baseShipping = method ? method.price : SHIPPING.standard
  const shipping = discounted >= SHIPPING.freeThreshold || discounted === 0 ? 0 : baseShipping

  const tax = discounted * TAX_RATE
  const total = discounted + shipping + tax

  return {
    subtotal: round(subtotal),
    discount: round(discount),
    shipping: round(shipping),
    tax: round(tax),
    total: round(total),
  }
}

const round = (value: number) => Math.round(value * 100) / 100