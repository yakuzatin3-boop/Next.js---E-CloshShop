'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  CreditCard,
  Heart,
  LogOut,
  MapPin,
  PackageCheck,
  User,
  Lock,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SectionHeading } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { getProductBySlug } from '@/lib/products'
import { formatCurrency } from '@/lib/format'
import { useWishlistStore } from '@/store/wishlist-store'

const loginSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginValues = z.infer<typeof loginSchema>

const DEMO_ORDERS = [
  {
    number: 'EC-481236',
    date: 'Sep 28, 2026',
    status: 'Delivered' as const,
    items: [
      { slug: 'retro-run-low-sneaker', size: 'US 9', quantity: 1 },
      { slug: 'seamless-legging', size: 'S', quantity: 1 },
    ],
    total: 148,
  },
  {
    number: 'EC-477120',
    date: 'Aug 12, 2026',
    status: 'Processing' as const,
    items: [{ slug: 'weekend-structured-tote', size: 'One size', quantity: 1 }],
    total: 132,
  },
]

const STATUS_TONES = {
  Delivered: 'success' as const,
  Processing: 'neutral' as const,
}

export function AccountContent() {
  const [signedIn, setSignedIn] = useState(false)
  const wishlistCount = useWishlistStore((state) => state.slugs.length)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async () => {
    setSignedIn(true)
  }

  if (!signedIn) {
    return (
      <div className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Welcome back"
          title="Sign in to your account"
          description="Orders, wishlist and details in one place. No account yet? Creating one takes under a minute."
        />
        <div className="mx-auto mt-10 max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4 rounded-2xl border border-stone-200 p-6 dark:border-stone-800"
          >
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />
            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
                <input type="checkbox" className="accent-accent-600" defaultChecked />
                Keep me signed in
              </label>
              <button
                type="button"
                className="text-accent-700 hover:underline dark:text-accent-400"
              >
                Forgot password?
              </button>
            </div>
            <Button type="submit" variant="secondary" size="lg" loading={isSubmitting} className="w-full">
              Sign in
            </Button>
            <p className="pt-2 text-center text-xs text-stone-500">
              Demo storefront — any email and password work.
            </p>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionHeading
          eyebrow="Your account"
          title="Hi, Alex"
          description="Manage your orders, delivery details and saved pieces."
        />
        <Button variant="outline" size="sm" onClick={() => setSignedIn(false)}>
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign out
        </Button>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <StatCard icon={Box} label="Orders" value={DEMO_ORDERS.length} />
        <StatCard icon={Heart} label="Wishlist" value={wishlistCount} />
        <StatCard icon={PackageCheck} label="Delivered" value={1} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.8fr_1fr]">
        <section>
          <h2 className="text-base font-semibold tracking-tight">Order history</h2>
          <div className="mt-4 space-y-4">
            {DEMO_ORDERS.map((order) => (
              <article
                key={order.number}
                className="rounded-2xl border border-stone-200 p-5 dark:border-stone-800"
              >
                <header className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">{order.number}</p>
                    <p className="text-xs text-stone-500">{order.date}</p>
                  </div>
                  <Badge tone={STATUS_TONES[order.status]}>{order.status}</Badge>
                </header>
                <ul className="mt-4 space-y-3">
                  {order.items.map((item) => {
                    const product = getProductBySlug(item.slug)
                    if (!product) return null
                    return (
                      <li key={item.slug} className="flex items-center gap-3">
                        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-900">
                          {product.images[0] && (
                            <Image
                              src={product.images[0].src}
                              alt={product.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-stone-500">
                            {item.size} · Qty {item.quantity}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
                <footer className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-sm dark:border-stone-900">
                  <span className="text-xs text-stone-500">Total</span>
                  <span className="font-semibold tabular-nums">
                    {formatCurrency(order.total)}
                  </span>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-stone-200 p-5 dark:border-stone-800">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <MapPin className="h-4 w-4 text-accent-600" aria-hidden="true" />
              Default address
            </h2>
            <address className="mt-3 text-sm leading-6 text-stone-600 not-italic dark:text-stone-400">
              Alex Morgan
              <br />
              214 Beacon Street
              <br />
              Boston, MA 02116
              <br />
              United States
            </address>
            <button
              type="button"
              className="mt-3 text-sm font-medium text-accent-700 hover:underline dark:text-accent-400"
            >
              Edit
            </button>
          </section>

          <section className="rounded-2xl border border-stone-200 p-5 dark:border-stone-800">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <CreditCard className="h-4 w-4 text-accent-600" aria-hidden="true" />
              Payment methods
            </h2>
            <p className="mt-3 flex items-center gap-3 text-sm text-stone-600 dark:text-stone-400">
              <span className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-2 py-1 text-[10px] font-bold uppercase dark:border-stone-700">
                <Lock className="h-3 w-3" aria-hidden="true" /> Visa
              </span>
              •••• 4242
            </p>
            <button
              type="button"
              className="mt-3 text-sm font-medium text-accent-700 hover:underline dark:text-accent-400"
            >
              Add another
            </button>
          </section>

          <section className="rounded-2xl border border-stone-200 p-5 dark:border-stone-800">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <User className="h-4 w-4 text-accent-600" aria-hidden="true" />
              Preferences
            </h2>
            <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
              Marketing emails: subscribed
              <br />
              New drops + members-only offers.
            </p>
          </section>
        </aside>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Box
  label: string
  value: number | string
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-stone-200 p-5 dark:border-stone-800">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-400">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-2xl font-semibold tabular-nums">{value}</p>
        <p className="text-xs text-stone-500">{label}</p>
      </div>
    </div>
  )
}