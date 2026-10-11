'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, CheckCircle2, Lock } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

import { CartLine } from '@/components/cart/cart-line'
import { FreeShippingBar } from '@/components/cart/free-shipping-bar'
import { Button, buttonStyles } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { computeOrderTotals } from '@/lib/checkout'
import { formatCurrency } from '@/lib/format'
import { SHIPPING } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { selectCartSubtotal, useCartStore } from '@/store/cart-store'
import { useUIStore } from '@/store/ui-store'

const contactSchema = z.object({
  email: z.email('Enter a valid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(3, 'Zip is required'),
  country: z.string().min(1, 'Country is required'),
  shippingMethod: z.enum(['standard', 'express']),
})

const paymentSchema = z.object({
  cardName: z.string().min(1, 'Name on card is required'),
  cardNumber: z
    .string()
    .min(16, 'Card number must be 16 digits')
    .regex(/^[\d\s-]+$/, 'Card number must be numeric'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/YY format'),
  cvc: z.string().regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
})

type ContactValues = z.infer<typeof contactSchema>
type PaymentValues = z.infer<typeof paymentSchema>

const STEPS = ['Contact & shipping', 'Payment', 'Review'] as const

const STATES = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']

export function CheckoutContent() {
  const items = useCartStore((state) => state.items)
  const subtotal = useCartStore(selectCartSubtotal)
  const clearCart = useCartStore((state) => state.clear)
  const pushToast = useUIStore((state) => state.pushToast)

  const [step, setStep] = useState(0)
  const [placedOrder, setPlacedOrder] = useState<{
    number: string
    email: string
  } | null>(null)
  const [promoCode, setPromoCode] = useState<string | null>(null)
  const [promoInput, setPromoInput] = useState('')
  const [placing, setPlacing] = useState(false)

  const contactForm = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { shippingMethod: 'standard', country: 'United States' },
  })
  const paymentForm = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
  })

  const shippingMethod =
    useWatch({ control: contactForm.control, name: 'shippingMethod' }) ?? 'standard'

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (code === 'WELCOME10' || code === 'SAVE20') setPromoCode(code)
    else pushToast({ title: 'Invalid code', variant: 'error' })
  }

  const totals = computeOrderTotals(subtotal, {
    shippingMethodId: shippingMethod,
    promoCode,
  })

  const goNext = async () => {
    if (step === 0) {
      const valid = await contactForm.trigger()
      if (valid) setStep(1)
    } else if (step === 1) {
      const valid = await paymentForm.trigger()
      if (valid) setStep(2)
    }
  }

  const placeOrder = async () => {
    setPlacing(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    const number = `EC-${Math.floor(100000 + Math.random() * 900000)}`
    const email = contactForm.getValues('email')
    setPlacedOrder({ number, email })
    clearCart()
    setPromoCode(null)
    setPlacing(false)
  }

  if (placedOrder) {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-display text-3xl tracking-tight">Order confirmed</h1>
        <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
          Thanks for shopping with E-Closh Shop. Your order{' '}
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            {placedOrder.number}
          </span>{' '}
          is on its way. A confirmation email is on its way to{' '}
          <span className="font-medium">{placedOrder.email}</span>.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/shop">Continue shopping</LinkButton>
          <LinkButton href="/account" variant="outline">
            View your account
          </LinkButton>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl tracking-tight">Your bag is empty</h1>
        <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
          Add a few pieces before heading to checkout.
        </p>
        <LinkButton href="/shop" className="mt-8">
          Browse the shop
        </LinkButton>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl tracking-tight">Checkout</h1>

      <ol className="mt-8 flex items-center gap-2">
        {STEPS.map((label, index) => (
          <li key={label} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => index < step && setStep(index)}
              className={cn(
                'flex items-center gap-2 text-sm font-medium',
                index === step
                  ? 'text-stone-900 dark:text-stone-100'
                  : index < step
                    ? 'text-accent-700 dark:text-accent-400'
                    : 'text-stone-400',
              )}
            >
              <span
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full border text-xs',
                  index === step
                    ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                    : index < step
                      ? 'border-accent-600 bg-accent-600 text-white'
                      : 'border-stone-300 dark:border-stone-700',
                )}
              >
                {index < step ? <CheckCircle2 className="h-3.5 w-3.5" /> : index + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>
            {index < STEPS.length - 1 && (
              <span className="mx-1 h-px w-8 bg-stone-300 dark:bg-stone-700" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <section>
          {step === 0 && (
            <form
              className="space-y-8"
              onSubmit={(event) => {
                event.preventDefault()
                goNext()
              }}
            >
              <fieldset>
                <legend className="mb-4 text-base font-semibold">Contact</legend>
                <div className="grid gap-4">
                  <Input
                    label="Email address"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    error={contactForm.formState.errors.email?.message}
                    {...contactForm.register('email')}
                  />
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-4 text-base font-semibold">Shipping address</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="First name"
                    autoComplete="given-name"
                    error={contactForm.formState.errors.firstName?.message}
                    {...contactForm.register('firstName')}
                  />
                  <Input
                    label="Last name"
                    autoComplete="family-name"
                    error={contactForm.formState.errors.lastName?.message}
                    {...contactForm.register('lastName')}
                  />
                  <div className="sm:col-span-2">
                    <Input
                      label="Street address"
                      autoComplete="street-address"
                      error={contactForm.formState.errors.address?.message}
                      {...contactForm.register('address')}
                    />
                  </div>
                  <Input
                    label="City"
                    autoComplete="address-level2"
                    error={contactForm.formState.errors.city?.message}
                    {...contactForm.register('city')}
                  />
                  <Select
                    label="State"
                    error={contactForm.formState.errors.state?.message}
                    {...contactForm.register('state')}
                  >
                    <option value="">Select a state</option>
                    {STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Select>
                  <Input
                    label="ZIP code"
                    autoComplete="postal-code"
                    error={contactForm.formState.errors.zip?.message}
                    {...contactForm.register('zip')}
                  />
                  <Input
                    label="Country"
                    autoComplete="country-name"
                    error={contactForm.formState.errors.country?.message}
                    {...contactForm.register('country')}
                  />
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-4 text-base font-semibold">Delivery</legend>
                <div className="space-y-3">
                  {SHIPPING.methods.map((method) => (
                    <Controller
                      key={method.id}
                      control={contactForm.control}
                      name="shippingMethod"
                      render={({ field }) => (
                        <label
                          className={cn(
                            'flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 transition-colors',
                            field.value === method.id
                              ? 'border-stone-900 bg-stone-50 dark:border-stone-100 dark:bg-stone-900'
                              : 'border-stone-200 hover:border-stone-400 dark:border-stone-800',
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <input
                              type="radio"
                              className="accent-accent-600"
                              checked={field.value === method.id}
                              onChange={() => field.onChange(method.id)}
                            />
                            <span>
                              <span className="block text-sm font-medium">{method.label}</span>
                              <span className="block text-xs text-stone-500">
                                {method.description}
                              </span>
                            </span>
                          </span>
                          <span className="text-sm font-medium tabular-nums">
                            {formatCurrency(method.price)}
                          </span>
                        </label>
                      )}
                    />
                  ))}
                </div>
              </fieldset>

              <Button type="submit" variant="secondary" size="lg" className="w-full sm:w-auto">
                Continue to payment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
          )}

          {step === 1 && (
            <form
              className="space-y-8"
              onSubmit={(event) => {
                event.preventDefault()
                goNext()
              }}
            >
              <div className="flex items-center gap-2 rounded-2xl bg-stone-50 px-4 py-3 text-xs text-stone-600 dark:bg-stone-900 dark:text-stone-400">
                <Lock className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                Payments are encrypted. This is a demo storefront — no real charge is made.
              </div>

              <fieldset>
                <legend className="mb-4 text-base font-semibold">Payment</legend>
                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Name on card"
                      autoComplete="cc-name"
                      error={paymentForm.formState.errors.cardName?.message}
                      {...paymentForm.register('cardName')}
                    />
                    <Input
                      label="Card number"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="4242 4242 4242 4242"
                      error={paymentForm.formState.errors.cardNumber?.message}
                      {...paymentForm.register('cardNumber')}
                    />
                    <Input
                      label="Expiry (MM/YY)"
                      inputMode="numeric"
                      placeholder="08/29"
                      error={paymentForm.formState.errors.expiry?.message}
                      {...paymentForm.register('expiry')}
                    />
                    <Input
                      label="CVC"
                      type="password"
                      autoComplete="cc-csc"
                      placeholder="123"
                      error={paymentForm.formState.errors.cvc?.message}
                      {...paymentForm.register('cvc')}
                    />
                  </div>
                </div>
              </fieldset>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="button" variant="ghost" onClick={() => setStep(0)}>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back
                </Button>
                <Button type="submit" variant="secondary" size="lg" className="sm:ml-auto">
                  Review order
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <dl className="space-y-3 rounded-2xl border border-stone-200 p-5 text-sm dark:border-stone-800">
                <SummaryRow label="Contact" value={contactForm.getValues('email')} />
                <SummaryRow
                  label="Delivers to"
                  value={`${contactForm.getValues('firstName')} ${contactForm.getValues('lastName')}, ${contactForm.getValues('city')}, ${contactForm.getValues('state')} ${contactForm.getValues('zip')}`}
                />
                <SummaryRow
                  label="Delivery"
                  value={
                    SHIPPING.methods.find(
                      (m) => m.id === contactForm.getValues('shippingMethod'),
                    )?.label ?? 'Standard'
                  }
                />
                <SummaryRow
                  label="Card"
                  value={`•••• ${paymentForm.getValues('cardNumber')?.replace(/\s+/g, '').slice(-4) ?? '—'}`}
                />
              </dl>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="sm:ml-auto"
                  loading={placing}
                  onClick={placeOrder}
                >
                  {placing ? 'Placing order…' : 'Place order'}
                </Button>
              </div>
            </div>
          )}
        </section>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-stone-200 p-5 sm:p-6 dark:border-stone-800">
            <FreeShippingBar subtotal={subtotal} className="mb-6" />
            <ul className="divide-y divide-stone-200 dark:divide-stone-800">
              {items.map((item) => (
                <li key={item.id} className="py-4 first:pt-0 last:pb-0">
                  <CartLine item={item} compact />
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <Input
                placeholder="Promo code"
                value={promoInput}
                onChange={(event) => setPromoInput(event.target.value)}
              />
              <Button variant="outline" size="sm" className="mt-2" onClick={applyPromo} disabled={Boolean(promoCode)}>
                {promoCode ? `Applied (${promoCode})` : 'Apply code'}
              </Button>
            </div>

            <div className="mt-5 space-y-3 border-t border-stone-200 pt-5 text-sm dark:border-stone-800">
              <SummaryRow label="Subtotal" value={formatCurrency(totals.subtotal)} />
              {totals.discount > 0 && (
                <SummaryRow
                  label="Discount"
                  value={`−${formatCurrency(totals.discount)}`}
                  className="text-emerald-600"
                />
              )}
              <SummaryRow
                label="Shipping"
                value={totals.shipping === 0 ? 'Free' : formatCurrency(totals.shipping)}
              />
              <SummaryRow label="Tax" value={formatCurrency(totals.tax)} />
              <div className="flex items-center justify-between pt-3 text-base font-semibold">
                <span>Total</span>
                <span className="tabular-nums">{formatCurrency(totals.total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function SummaryRow({
  label,
  value,
  className,
}: {
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <span className="text-stone-500 dark:text-stone-400">{label}</span>
      <span className="text-right font-medium tabular-nums">{value}</span>
    </div>
  )
}

function LinkButton({
  href,
  children,
  variant = 'primary',
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'outline'
  className?: string
}) {
  return (
    <Link
      href={href}
      className={buttonStyles({ variant, size: 'lg' }) + ` ${className ?? ''}`}
    >
      {children}
    </Link>
  )
}