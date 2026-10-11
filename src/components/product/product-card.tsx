'use client'

import { Heart, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Price } from '@/components/ui/price'
import { Rating } from '@/components/ui/rating'
import { useCartStore } from '@/store/cart-store'
import { useUIStore } from '@/store/ui-store'
import { useWishlistStore } from '@/store/wishlist-store'
import { formatDiscount } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const openCart = useUIStore((state) => state.openCart)
  const pushToast = useUIStore((state) => state.pushToast)
  const wished = useWishlistStore((state) => state.slugs.includes(product.slug))
  const toggleWishlist = useWishlistStore((state) => state.toggle)

  const discount = formatDiscount(product.price, product.compareAtPrice)
  const primaryImage = product.images[0]
  const secondaryImage = product.images[1] ?? primaryImage

  const quickAdd = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: primaryImage?.src ?? '',
      size: product.sizes[Math.floor(product.sizes.length / 2)] ?? 'One size',
      color: product.colors[0]?.name ?? 'Default',
    })
    pushToast({
      title: 'Added to bag',
      description: product.name,
      variant: 'success',
    })
    openCart()
  }

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-900">
        <Link
          href={`/product/${product.slug}`}
          className="block aspect-[4/5]"
          aria-label={product.name}
        >
          {primaryImage && (
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt || product.name}
              fill
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition duration-500 group-hover:opacity-0"
            />
          )}
          {secondaryImage && (
            <Image
              src={secondaryImage.src}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 transition duration-500 group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <Badge tone="new">New</Badge>}
          {discount && <Badge tone="sale">{discount}</Badge>}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={wished}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-card backdrop-blur transition-colors hover:bg-white dark:bg-stone-900/90 dark:text-stone-200"
        >
          <Heart
            className={cn('h-4 w-4', wished && 'fill-accent-600 text-accent-600')}
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          onClick={quickAdd}
          className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 rounded-full bg-stone-900 py-2.5 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 dark:bg-stone-100 dark:text-stone-900"
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          Quick add
        </button>
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <p className="text-[11px] font-medium tracking-wide text-stone-500 uppercase">
          {product.brand}
        </p>
        <h3 className="mt-1 text-sm font-medium tracking-tight text-stone-900 dark:text-stone-100">
          <Link href={`/product/${product.slug}`} className="hover:text-accent-700 dark:hover:text-accent-400">
            {product.name}
          </Link>
        </h3>
        <div className="mt-1.5">
          <Rating value={product.rating} count={product.reviewCount} />
        </div>
        <Price value={product.price} compareAt={product.compareAtPrice} className="mt-2" />
      </div>
    </article>
  )
}