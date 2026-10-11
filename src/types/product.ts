export type CategorySlug =
  | 'women'
  | 'men'
  | 'kids'
  | 'shoes'
  | 'accessories'
  | 'activewear'

export interface ProductColor {
  name: string
  hex: string
}

export interface ProductImage {
  src: string
  alt: string
}

export interface Product {
  slug: string
  name: string
  brand: string
  category: CategorySlug
  price: number
  compareAtPrice?: number
  description: string
  details: string[]
  care: string[]
  images: ProductImage[]
  colors: ProductColor[]
  sizes: string[]
  rating: number
  reviewCount: number
  isNew?: boolean
  isSale?: boolean
  isBestseller?: boolean
  dateAdded: string
  sku: string
}

export interface Category {
  slug: CategorySlug
  name: string
  description: string
  image: string
}