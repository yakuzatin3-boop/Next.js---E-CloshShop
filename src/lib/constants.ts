export const SITE = {
  name: 'E-Closh Shop',
  legalName: 'E-Closh Shop Inc.',
  tagline: 'Wardrobe essentials, made to last.',
  url: 'https://e-closh-shop.vercel.app',
  description:
    'E-Closh Shop is a mobile-first clothing store selling considered wardrobe essentials for women, men and kids — shoes, accessories and activewear included.',
  locale: 'en_US',
  currency: 'USD',
  themeColor: '#c95a34',
  email: 'hello@e-closh-shop.com',
} as const

/** Add-to-cart drawer imagery, checkout and toasts all inherit this scale. */
export const ACCENT = { hex: '#c95a34' }

export const SHIPPING = {
  freeThreshold: 75,
  standard: 6.95,
  express: 14.95,
  methods: [
    {
      id: 'standard',
      label: 'Standard',
      description: '3–5 business days',
      price: 6.95,
    },
    {
      id: 'express',
      label: 'Express',
      description: '1–2 business days',
      price: 14.95,
    },
  ] as const,
}

export const TAX_RATE = 0.08

export const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
] as const

export type SortId = (typeof SORT_OPTIONS)[number]['id']

export const PRICE_RANGES = [
  { id: 'under-40', label: 'Under $40', min: 0, max: 40 },
  { id: '40-80', label: '$40 – $80', min: 40, max: 80 },
  { id: '80-120', label: '$80 – $120', min: 80, max: 120 },
  { id: 'over-120', label: 'Over $120', min: 120, max: Infinity },
] as const

export type PriceRangeId = (typeof PRICE_RANGES)[number]['id']

export const BRANDS = ['Atelier', 'E-Closh', 'Kinfolk', 'Loft & Line', 'Norda']

export const FILTER_COLORS = [
  { name: 'Black', hex: '#111110' },
  { name: 'Charcoal', hex: '#33302e' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Ivory', hex: '#f4efe6' },
  { name: 'Stone', hex: '#d6cdbd' },
  { name: 'Clay', hex: '#c95a34' },
  { name: 'Rose', hex: '#b76e6e' },
  { name: 'Denim', hex: '#43536a' },
  { name: 'Sage', hex: '#a3a58f' },
  { name: 'Moss', hex: '#5a5a41' },
]

export const SHOP_PAGE_SIZE = 8

export const ANNOUNCEMENT = 'Free US shipping on orders over $75 · Code WELCOME10 for 10% off'

export const REVIEWS = [
  {
    name: 'Verified buyer',
    rating: 5,
    title: 'Perfect fit and finish',
    body: 'The fabric feels premium and the sizing guide was spot on. I have already bought a second piece from the same range.',
    date: '2026-09-14',
  },
  {
    name: 'Verified buyer',
    rating: 4,
    title: 'Great quality, runs slightly long',
    body: 'Beautiful construction and the colour is exactly as pictured. I would size down for a closer fit, but happy overall.',
    date: '2026-08-30',
  },
  {
    name: 'Verified buyer',
    rating: 5,
    title: 'Daily staple now',
    body: 'Three washes in and it still looks brand new. This is exactly the kind of piece I will reach for every week.',
    date: '2026-08-02',
  },
]