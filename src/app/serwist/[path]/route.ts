import { spawnSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

import { createSerwistRoute } from '@serwist/turbopack'

// A spreadsheet revision so the precached offline fallback is versioned across
// deploys (avoids an outdated cached copy being served).
const revision =
  spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf-8' }).stdout?.trim() ??
  randomUUID()

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } =
  createSerwistRoute({
    additionalPrecacheEntries: [{ url: '/~offline', revision }],
    swSrc: 'src/app/sw.ts',
    // Use the native esbuild binary for faster builds.
    useNativeEsbuild: true,
  })