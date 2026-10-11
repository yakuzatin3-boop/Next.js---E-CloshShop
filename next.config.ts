import { withSerwist } from '@serwist/turbopack'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Emits .next/standalone with a traced node_modules, so the production image
  // can run `node server.js` without installing anything.
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  images: {
    // Required as of Next 16: whitelist the optimizer output qualities.
    qualities: [25, 50, 75, 100],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    // Connectivity-aware UI + auto retry of navigations/Server Actions when offline.
    useOffline: true,
  },
}

export default withSerwist(nextConfig)