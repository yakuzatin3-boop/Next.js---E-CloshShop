import { CategoryGrid } from '@/components/home/category-grid'
import { EditorialBanner } from '@/components/home/editorial-banner'
import { FeatureStrip } from '@/components/home/feature-strip'
import { Hero } from '@/components/home/hero'
import { InstagramShowcase } from '@/components/home/instagram-showcase'
import { ProductRail } from '@/components/home/product-rail'
import { Testimonials } from '@/components/home/testimonials'
import {
  getBestSellers,
  getFeatured,
  getNewArrivals,
  getOnSale,
} from '@/lib/products'

export default function HomePage() {
  const [newArrivals, bestSellers, onSale, featured] = [
    getNewArrivals(),
    getBestSellers(),
    getOnSale(),
    getFeatured(),
  ]

  return (
    <>
      <Hero />
      <FeatureStrip />
      <ProductRail
        eyebrow="Just landed"
        title="New arrivals"
        products={newArrivals}
        viewAllHref="/shop?filter=new"
        viewAllLabel="Shop new in"
      />
      <CategoryGrid />
      <ProductRail
        eyebrow="Customer favourites"
        title="Bestsellers"
        products={bestSellers}
        viewAllHref="/shop"
        viewAllLabel="Shop bestsellers"
      />
      {onSale.length > 0 && (
        <ProductRail
          eyebrow="Limited time"
          title="The sale edit"
          products={onSale}
          viewAllHref="/shop?filter=sale"
          viewAllLabel="Shop the sale"
        />
      )}
      <EditorialBanner
        eyebrow="Sustainable by default"
        title="Made to be worn, washed and reworn"
        description="Natural fibres, honest construction and small-batch production. We design for the long run so you buy less and wear better."
        image={featured[0]?.images[0]?.src ?? ''}
        ctaLabel="Read our story"
        ctaHref="/account"
        align="left"
      />
      <Testimonials />
      <ProductRail
        eyebrow="Curated for you"
        title="The edit"
        products={featured}
        viewAllHref="/shop"
        viewAllLabel="Browse the full shop"
      />
      <InstagramShowcase />
    </>
  )
}