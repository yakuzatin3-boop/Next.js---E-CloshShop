import { PackageSearch } from 'lucide-react'

import { ProductCard } from '@/components/product/product-card'
import { EmptyState } from '@/components/ui/empty-state'
import { cn } from '@/lib/utils'
import type { Product } from '@/types/product'

interface ProductGridProps {
  products: Product[]
  className?: string
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: React.ReactNode
  priorityCount?: number
}

export function ProductGrid({
  products,
  className,
  emptyTitle = 'No products found',
  emptyDescription = 'Try adjusting your filters or search for something else.',
  emptyAction,
  priorityCount = 0,
}: ProductGridProps) {
  if (!products.length) {
    return (
      <EmptyState
        icon={PackageSearch}
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    )
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6',
        className,
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.slug}
          product={product}
          priority={index < priorityCount}
        />
      ))}
    </div>
  )
}