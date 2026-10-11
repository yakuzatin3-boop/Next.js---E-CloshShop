import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ProductGallery } from '@/components/product/product-gallery'
import { ProductRail } from '@/components/home/product-rail'
import { ProductInfo } from '@/components/product/product-info'
import { Container } from '@/components/ui/container'
import { getProductBySlug, getRelatedProducts } from '@/lib/products'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Product not found' }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — ${product.brand}`,
      description: product.description,
      images: [{ url: product.images[0]?.src ?? '', alt: product.name }],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product)

  return (
    <Container className="mt-6 lg:mt-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-stone-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-stone-900 dark:hover:text-white">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/shop/${product.category}`}
              className="hover:text-stone-900 dark:hover:text-white"
            >
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-stone-700 dark:text-stone-300">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>

      {related.length > 0 && (
        <div className="mt-8">
          <ProductRail
            eyebrow="Complete the look"
            title="You may also like"
            products={related}
            viewAllHref={`/shop/${product.category}`}
            viewAllLabel={`Shop ${product.category}`}
          />
        </div>
      )}
    </Container>
  )
}