import type { MetadataRoute } from 'next'

import { CATEGORIES } from '@/data/products'
import { SITE } from '@/lib/constants'
import { getAllProducts } from '@/lib/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/shop`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE.url}/search`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE.url}/cart`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE.url}/wishlist`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE.url}/account`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${SITE.url}/shop/${category.slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: `${SITE.url}/product/${product.slug}`,
    lastModified: product.dateAdded,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}