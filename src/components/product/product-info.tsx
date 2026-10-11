'use client'

import { Heart, Ruler, Truck, ChevronDown, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Rating } from '@/components/ui/rating'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import { QuantityStepper } from '@/components/ui/quantity-stepper'
import { useCartStore } from '@/store/cart-store'
import { useUIStore } from '@/store/ui-store'
import { useWishlistStore } from '@/store/wishlist-store'
import { useRecentlyViewed } from '@/hooks/use-recently-viewed'
import { formatDiscount } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Product } from '@/types/product'

const SIZE_CHART = [
  { size: 'XS', chest: '32–34', waist: '24–26', hip: '34–36' },
  { size: 'S', chest: '34–36', waist: '26–28', hip: '36–38' },
  { size: 'M', chest: '36–38', waist: '28–31', hip: '38–41' },
  { size: 'L', chest: '38–41', waist: '31–34', hip: '41–43' },
  { size: 'XL', chest: '41–44', waist: '34–37', hip: '43–46' },
]

export function ProductInfo({ product }: { product: Product }) {
  const router = useRouter()
  const addItem = useCartStore((state) => state.addItem)
  const openCart = useUIStore((state) => state.openCart)
  const pushToast = useUIStore((state) => state.pushToast)
  const wished = useWishlistStore((state) => state.slugs.includes(product.slug))
  const toggleWishlist = useWishlistStore((state) => state.toggle)
  const { record } = useRecentlyViewed()

  const [color, setColor] = useState(product.colors[0]?.name ?? '')
  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)] ?? '')
  const [quantity, setQuantity] = useState(1)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

  useEffect(() => {
    record(product.slug)
  }, [product.slug, record])

  const discount = formatDiscount(product.price, product.compareAtPrice)

  const addToBag = () => {
    addItem(
      {
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        image: product.images[0]?.src ?? '',
        size,
        color,
      },
      quantity,
    )
    pushToast({ title: 'Added to bag', description: product.name, variant: 'success' })
    openCart()
  }

  const buyNow = () => {
    addItem(
      {
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        image: product.images[0]?.src ?? '',
        size,
        color,
      },
      quantity,
    )
    router.push('/checkout')
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-[0.18em] text-stone-500 uppercase">
          {product.brand}
        </p>
        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-pressed={wished}
          className="flex items-center gap-1.5 rounded-full px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-red-600 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-red-400"
        >
          <Heart
            className={cn('h-4 w-4', wished && 'fill-red-500 text-red-500')}
            aria-hidden="true"
          />
          {wished ? 'Saved' : 'Save'}
        </button>
      </div>

      <h1 className="mt-2 font-display text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
        {product.name}
      </h1>

      <div className="mt-3 flex items-center gap-3">
        <Rating value={product.rating} count={product.reviewCount} size="md" />
        <span className="text-sm text-stone-500">
          {product.reviewCount} reviews
        </span>
      </div>

      <div className="mt-5 flex items-baseline gap-3">
        <span
          className={cn(
            'text-2xl font-semibold tabular-nums',
            discount && 'text-accent-700 dark:text-accent-400',
          )}
        >
          ${product.price.toFixed(2)}
        </span>
        {product.compareAtPrice && (
          <>
            <span className="text-lg text-stone-400 line-through tabular-nums">
              ${product.compareAtPrice.toFixed(2)}
            </span>
            <Badge tone="sale">{discount}</Badge>
          </>
        )}
      </div>

      <p className="mt-5 text-sm leading-7 text-stone-600 dark:text-stone-400">
        {product.description}
      </p>

      <div className="mt-7 space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Colour</span>
            <span className="text-sm text-stone-500">{color}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {product.colors.map((item) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Select colour ${item.name}`}
                aria-pressed={color === item.name}
                onClick={() => setColor(item.name)}
                className={cn(
                  'h-9 w-9 rounded-full border-2 transition-transform',
                  color === item.name
                    ? 'border-stone-900 scale-110 dark:border-white'
                    : 'border-stone-300 dark:border-stone-700',
                )}
                style={{ backgroundColor: item.hex }}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Size</span>
            <button
              type="button"
              onClick={() => setSizeGuideOpen(true)}
              className="flex items-center gap-1 text-sm text-stone-500 underline underline-offset-2 hover:text-stone-900 dark:hover:text-white"
            >
              <Ruler className="h-3.5 w-3.5" aria-hidden="true" />
              Size guide
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={size === item}
                onClick={() => setSize(item)}
                className={cn(
                  'h-11 min-w-12 rounded-xl border px-3 text-sm font-medium transition-colors',
                  size === item
                    ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                    : 'border-stone-300 hover:border-stone-900 dark:border-stone-700 dark:hover:border-stone-400',
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <span className="text-sm text-stone-500">
            {product.sku}
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Button variant="secondary" size="lg" onClick={addToBag}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add to bag
        </Button>
        <Button variant="primary" size="lg" onClick={buyNow}>
          Buy now
        </Button>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-stone-50 px-4 py-3 text-xs text-stone-600 dark:bg-stone-900 dark:text-stone-400">
        <Truck className="h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
        Free shipping on orders over $75 · 30-day easy returns
      </div>

      <div className="mt-8 divide-y divide-stone-200 dark:divide-stone-800">
        {[
          { title: 'Details', content: product.details },
          { title: 'Care', content: product.care },
        ].map((section) => (
          <Accordion key={section.title} title={section.title}>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-stone-600 dark:text-stone-400">
              {section.content.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Accordion>
        ))}
      </div>

      <Modal
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        title="Size guide"
        description="Measurements in inches. If between sizes, we recommend sizing up."
        footer={
          <>
            <Button variant="outline" onClick={() => setSizeGuideOpen(false)}>
              Close
            </Button>
          </>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-left dark:border-stone-800">
                <th className="py-2 pr-4 font-medium">Size</th>
                <th className="py-2 pr-4 font-medium">Chest</th>
                <th className="py-2 pr-4 font-medium">Waist</th>
                <th className="py-2 font-medium">Hip</th>
              </tr>
            </thead>
            <tbody className="text-stone-600 dark:text-stone-400">
              {SIZE_CHART.map((row) => (
                <tr key={row.size} className="border-b border-stone-100 dark:border-stone-900">
                  <td className="py-2 pr-4 font-medium text-stone-900 dark:text-stone-100">
                    {row.size}
                  </td>
                  <td className="py-2 pr-4">{row.chest}</td>
                  <td className="py-2 pr-4">{row.waist}</td>
                  <td className="py-2">{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  )
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown
          className="h-4 w-4 text-stone-500 transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  )
}