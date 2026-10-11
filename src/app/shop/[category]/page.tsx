import type { Metadata } from 'next'
import { Suspense } from 'react'

import { ShopContent } from '@/components/shop/shop-content'
import { ProductGridSkeleton } from '@/components/ui/skeleton'
import { CATEGORIES } from '@/data/products'
import type { CategorySlug } from '@/types/product'

interface CategoryPageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<{ filter?: string; sort?: string }>
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const slug = CATEGORIES.some((item) => item.slug === category)
    ? (category as CategorySlug)
    : undefined
  const current = slug ? CATEGORIES.find((item) => item.slug === slug) : undefined
  if (!current) return { title: 'Category not found' }

  return {
    title: `${current.name} clothing`,
    description: current.description,
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const [{ category }, { filter, sort }] = await Promise.all([params, searchParams])

  if (!CATEGORIES.some((item) => item.slug === category)) {
    return (
      <div className="pt-24 pb-32 text-center text-stone-500">Category not found.</div>
    )
  }

  const slug = category as CategorySlug
  const current = CATEGORIES.find((item) => item.slug === slug)!
  const supportsAnchor = (value: string | undefined): value is 'new' | 'sale' =>
    value === 'new' || value === 'sale'

  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 lg:px-8">
          <ProductGridSkeleton count={8} />
        </div>
      }
    >
      <ShopContent
        category={slug}
        initialSort={sort as 'featured' | undefined}
        initialFilter={supportsAnchor(filter) ? filter : undefined}
        title={current.name}
        description={current.description}
      />
    </Suspense>
  )
}