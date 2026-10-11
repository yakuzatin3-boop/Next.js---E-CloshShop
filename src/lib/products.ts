import { PRODUCTS, CATEGORIES } from '@/data/products'
import { PRICE_RANGES, SHOP_PAGE_SIZE, type SortId } from '@/lib/constants'
import type { CategorySlug, Product } from '@/types/product'

export interface ProductFilters {
  category?: CategorySlug
  sizes?: string[]
  colors?: string[]
  brands?: string[]
  price?: string[]
  filter?: 'new' | 'sale'
  query?: string
  sort?: SortId
  page?: number
}

export function getAllProducts(): Product[] {
  return PRODUCTS
}

export function getCategories() {
  return CATEGORIES
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug)
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return PRODUCTS.filter((product) => product.category === category)
}

export function getNewArrivals(limit = 8): Product[] {
  return [...PRODUCTS]
    .sort((a, b) => +new Date(b.dateAdded) - +new Date(a.dateAdded))
    .filter((product) => product.isNew)
    .slice(0, limit)
}

export function getBestSellers(limit = 8): Product[] {
  return PRODUCTS.filter((product) => product.isBestseller).slice(0, limit)
}

export function getOnSale(limit?: number): Product[] {
  const sale = PRODUCTS.filter((product) => product.compareAtPrice)
  return typeof limit === 'number' ? sale.slice(0, limit) : sale
}

export function getFeatured(limit = 4): Product[] {
  return [...PRODUCTS]
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, limit)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = PRODUCTS.filter(
    (candidate) =>
      candidate.category === product.category && candidate.slug !== product.slug,
  )
  const fillers = PRODUCTS.filter(
    (candidate) =>
      candidate.category !== product.category &&
      candidate.slug !== product.slug &&
      sameCategory.every((item) => item.slug !== candidate.slug),
  )
  return [...sameCategory, ...fillers].slice(0, limit)
}

export function searchProducts(query: string): Product[] {
  const term = query.trim().toLowerCase()
  if (!term) return []

  return PRODUCTS.filter((product) => {
    const haystack = [
      product.name,
      product.brand,
      product.category,
      product.description,
      ...product.colors.map((color) => color.name),
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(term)
  })
}

function matchesPrice(product: Product, priceIds: string[]): boolean {
  if (!priceIds.length) return true
  return priceIds.some((id) => {
    const range = PRICE_RANGES.find((entry) => entry.id === id)
    if (!range) return false
    return product.price >= range.min && product.price <= range.max
  })
}

function sortProducts(products: Product[], sort: SortId): Product[] {
  const sorted = [...products]
  switch (sort) {
    case 'newest':
      return sorted.sort((a, b) => +new Date(b.dateAdded) - +new Date(a.dateAdded))
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    default:
      return sorted.sort((a, b) => {
        const score = (p: Product) => (p.isBestseller ? 2 : 0) + (p.isNew ? 1 : 0)
        return score(b) - score(a)
      })
  }
}

export function filterProducts(filters: ProductFilters) {
  const {
    category,
    sizes = [],
    colors = [],
    brands = [],
    price = [],
    filter,
    query,
    sort = 'featured',
    page = 1,
  } = filters

  let results = PRODUCTS.filter((product) => {
    if (category && product.category !== category) return false
    if (filter === 'new' && !product.isNew) return false
    if (filter === 'sale' && !product.compareAtPrice) return false
    if (sizes.length && !product.sizes.some((size) => sizes.includes(size))) return false
    if (colors.length && !product.colors.some((color) => colors.includes(color.name)))
      return false
    if (brands.length && !brands.includes(product.brand)) return false
    if (!matchesPrice(product, price)) return false
    if (query) {
      const haystack = `${product.name} ${product.brand} ${product.description}`.toLowerCase()
      if (!haystack.includes(query.trim().toLowerCase())) return false
    }
    return true
  })

  results = sortProducts(results, sort)

  const total = results.length
  const pageCount = Math.max(1, Math.ceil(total / SHOP_PAGE_SIZE))
  const safePage = Math.min(Math.max(1, page), pageCount)
  const start = (safePage - 1) * SHOP_PAGE_SIZE

  return {
    products: results.slice(start, start + SHOP_PAGE_SIZE),
    total,
    page: safePage,
    pageCount,
  }
}

/** Facets for the filter sidebar, derived from the catalogue. */
export function getFilterFacets() {
  const sizes = new Set<string>()
  const colors = new Set<string>()
  const brands = new Set<string>()

  for (const product of PRODUCTS) {
    product.sizes.forEach((size) => sizes.add(size))
    product.colors.forEach((color) => colors.add(color.name))
    brands.add(product.brand)
  }

  return {
    sizes: [...sizes],
    colors: [...colors],
    brands: [...brands],
  }
}