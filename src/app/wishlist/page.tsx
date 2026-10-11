'use client'

import Link from 'next/link'

import { ProductGrid } from '@/components/product/product-grid'
import { SectionHeading } from '@/components/ui/container'
import { buttonStyles } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { getAllProducts } from '@/lib/products'
import { useWishlistStore } from '@/store/wishlist-store'

export default function WishlistPage() {
  const slugs = useWishlistStore((state) => state.slugs)
  const clear = useWishlistStore((state) => state.clear)

  const products = getAllProducts().filter((product) => slugs.includes(product.slug))

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Saved for later"
          title="Your wishlist"
          description={
            products.length
              ? `${products.length} ${products.length === 1 ? 'piece' : 'pieces'} saved.`
              : undefined
          }
        />
        {products.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clear}>
            Clear all
          </Button>
        )}
      </div>

      <div className="mt-10">
        <ProductGrid
          products={products}
          priorityCount={4}
          emptyTitle="Nothing saved yet"
          emptyDescription="Tap the heart on any product to keep it here for later."
          emptyAction={
            <Link href="/shop" className={buttonStyles({ variant: 'secondary' })}>
              Browse the shop
            </Link>
          }
        />
      </div>
    </div>
  )
}