import { ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { buttonStyles } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { CATEGORIES } from '@/data/products'

export function Hero() {
  const heroImage = CATEGORIES.find((category) => category.slug === 'women')?.image

  return (
    <section className="relative overflow-hidden bg-stone-50 dark:bg-stone-950">
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
            <Sparkles className="h-3.5 w-3.5 text-accent-600" aria-hidden="true" />
            New autumn collection is here
          </span>

          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Wardrobe essentials,{' '}
            <span className="text-accent-600 dark:text-accent-400">made to last.</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-7 text-stone-600 dark:text-stone-400">
            Considered clothing for women, men and kids — soft cottons, honest
            fabrics and pieces you will reach for season after season.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop"
              className={buttonStyles({ variant: 'secondary', size: 'lg' })}
            >
              Shop the collection
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/shop?filter=new"
              className={buttonStyles({ variant: 'outline', size: 'lg' })}
            >
              Explore new in
            </Link>
          </div>

          <dl className="mt-10 grid max-w-sm grid-cols-3 gap-6 border-t border-stone-200 pt-6 dark:border-stone-800">
            {[
              { value: '4.9/5', label: 'From 2k+ reviews' },
              { value: '30 days', label: 'Free returns' },
              { value: '$75+', label: 'Free shipping' },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-lg font-semibold tracking-tight">{stat.value}</dt>
                <dd className="mt-1 text-xs text-stone-500">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-stone-100 shadow-raised sm:aspect-[5/5] dark:bg-stone-900">
            {heroImage && (
              <Image
                src={heroImage}
                alt="Model wearing the new season E-Closh Shop collection"
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-raised backdrop-blur sm:block dark:border-stone-800 dark:bg-stone-900/95">
            <p className="text-xs font-medium text-stone-500">Bestselling now</p>
            <p className="mt-1 text-sm font-semibold">The Linen Wrap Dress</p>
          </div>
        </div>
      </Container>
    </section>
  )
}