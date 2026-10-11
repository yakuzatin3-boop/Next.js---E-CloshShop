import { Suspense } from 'react'

import { ShopContent } from '@/components/shop/shop-content'
import { ProductGridSkeleton } from '@/components/ui/skeleton'
import type { SortId } from '@/lib/constants'
import type { CategorySlug } from '@/types/product'

interface ShopPageProps {
  searchParams: Promise<{
    filter?: string
    sort?: string
    category?: string
  }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
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
        category={params.category as CategorySlug | undefined}
        initialSort={params.sort as SortId | undefined}
        initialFilter={supportsAnchor(params.filter) ? params.filter : undefined}
        title="Shop all"
        description="The full E-Closh Shop catalogue — every category, one place."
      />
    </Suspense>
  )
}