import { CATEGORIES } from '@/data/products'
import type { CategorySlug } from '@/types/product'

export interface NavColumn {
  title: string
  href: string
  links: { label: string; href: string }[]
}

/** Columns shown in the desktop mega menu, keyed to catalogue data. */
export const MEGA_MENU: NavColumn[] = [
  {
    title: 'Women',
    href: `/shop/women`,
    links: [
      { label: 'Dresses', href: '/shop/women' },
      { label: 'Knitwear', href: '/shop/women' },
      { label: 'Tailoring', href: '/shop/women' },
      { label: 'Trousers', href: '/shop/women' },
    ],
  },
  {
    title: 'Men',
    href: `/shop/men`,
    links: [
      { label: 'Shirts', href: '/shop/men' },
      { label: 'Outerwear', href: '/shop/men' },
      { label: 'Knitwear', href: '/shop/men' },
      { label: 'Trousers', href: '/shop/men' },
    ],
  },
  {
    title: 'Kids',
    href: `/shop/kids`,
    links: [
      { label: 'Sneakers', href: '/shop/kids' },
      { label: 'Hoodies', href: '/shop/kids' },
      { label: 'Joggers', href: '/shop/kids' },
      { label: 'Essentials', href: '/shop/kids' },
    ],
  },
  {
    title: 'Shoes',
    href: `/shop/shoes`,
    links: [
      { label: 'Sneakers', href: '/shop/shoes' },
      { label: 'Trail', href: '/shop/shoes' },
      { label: 'Court', href: '/shop/shoes' },
      { label: 'Slides', href: '/shop/shoes' },
    ],
  },
  {
    title: 'Accessories',
    href: `/shop/accessories`,
    links: [
      { label: 'Bags', href: '/shop/accessories' },
      { label: 'Belts', href: '/shop/accessories' },
      { label: 'Scarves', href: '/shop/accessories' },
      { label: 'Carry', href: '/shop/accessories' },
    ],
  },
]

export const PROMO_LINK = { label: 'Shop the Sale', href: '/shop?filter=sale' }

export interface FeatureItem {
  icon: 'truck' | 'returns' | 'support' | 'secure'
  title: string
  description: string
}

export const FEATURES: FeatureItem[] = [
  {
    icon: 'truck',
    title: 'Free shipping over $75',
    description: 'Free standard delivery on all US orders over $75.',
  },
  {
    icon: 'returns',
    title: 'Easy 30-day returns',
    description: 'Changed your mind? Send it back, no questions asked.',
  },
  {
    icon: 'support',
    title: 'Real human support',
    description: 'Style and fit advice from 7am to 7pm, seven days a week.',
  },
  {
    icon: 'secure',
    title: 'Secure checkout',
    description: 'Encrypted payments with your choice of every major method.',
  },
]

export interface Testimonial {
  quote: string
  name: string
  location: string
  rating: number
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'The linen dress fits like it was made for me. The quality is genuinely better than pieces twice the price.',
    name: 'Mara J.',
    location: 'Portland, OR',
    rating: 5,
  },
  {
    quote:
      'Shipping was fast and the oversized overshirt is now my uniform. Already ordered a second colourway.',
    name: 'Devon R.',
    location: 'Austin, TX',
    rating: 5,
  },
  {
    quote:
      'These are the first sneakers I’ve bought online that I didn’t have to send back for sizing. Spot on.',
    name: 'Priya S.',
    location: 'Brooklyn, NY',
    rating: 4,
  },
  {
    quote:
      'Customer support talked me through sizes for a gift and got it exactly right. Rare to get that level of care.',
    name: 'Tom H.',
    location: 'Chicago, IL',
    rating: 5,
  },
]

export interface InstagramPost {
  image: string
  alt: string
  likes: number
}

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    image: CATEGORIES.find((c) => c.slug === 'women')?.image ?? '',
    alt: 'Street style look in the Linen Wrap Midi Dress',
    likes: 1824,
  },
  {
    image: CATEGORIES.find((c) => c.slug === 'men')?.image ?? '',
    alt: 'Workwear layers for early autumn',
    likes: 2310,
  },
  {
    image: CATEGORIES.find((c) => c.slug === 'shoes')?.image ?? '',
    alt: 'New season retro runners on the pavement',
    likes: 1507,
  },
  {
    image: CATEGORIES.find((c) => c.slug === 'accessories')?.image ?? '',
    alt: 'The Weekend tote, packed for a trip',
    likes: 984,
  },
  {
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    alt: 'Studio still life in clay and stone tones',
    likes: 1276,
  },
  {
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80',
    alt: 'White leather court sneakers at golden hour',
    likes: 2103,
  },
]

export const FOOTER_COLUMNS: NavColumn[] = [
  {
    title: 'Shop',
    href: '/shop',
    links: CATEGORIES.map((category: { slug: CategorySlug; name: string }) => ({
      label: category.name,
      href: `/shop/${category.slug}`,
    })),
  },
  {
    title: 'Help',
    href: '/account',
    links: [
      { label: 'Delivery', href: '/checkout' },
      { label: 'Returns', href: '/account' },
      { label: 'Size guide', href: '/account' },
      { label: 'Contact us', href: '/account' },
    ],
  },
  {
    title: 'Company',
    href: '/account',
    links: [
      { label: 'Our story', href: '/account' },
      { label: 'Sustainability', href: '/account' },
      { label: 'Careers', href: '/account' },
      { label: 'Press', href: '/account' },
    ],
  },
]

export const PAYMENT_METHODS = ['visa', 'mastercard', 'amex', 'paypal', 'applepay'] as const