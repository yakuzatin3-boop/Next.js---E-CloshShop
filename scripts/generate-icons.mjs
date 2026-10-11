import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public', 'icons')

const BG = '#c95a34'
const FG = '#ffffff'

const sizes = [
  { file: 'icon-192', size: 192 },
  { file: 'icon-512', size: 512 },
  { file: 'maskable-icon-512', size: 512, maskable: true },
]

const svg = ({ size, maskable = false }) => {
  const pad = maskable ? Math.round(size * 0.2) : 0
  const x = pad
  const y = pad
  const w = size - pad * 2
  const h = size - pad * 2

  const cx = size / 2
  const textY = size / 2 + h * 0.13
  const fontPx = h * 0.62

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.24}" fill="${BG}"/>
  <text x="${cx}" y="${textY}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="${fontPx}" font-weight="600" fill="${FG}">E.</text>
  <rect x="${cx - w * 0.16}" y="${y + h * 0.78}" width="${w * 0.32}" height="${h * 0.035}" rx="2" fill="${FG}"/>
</svg>`
}

await mkdir(outDir, { recursive: true })

for (const { file, size, maskable } of sizes) {
  await sharp(Buffer.from(svg({ size, maskable })), { density: 384 })
    .png()
    .toFile(path.join(outDir, `${file}.png`))
  console.log(`generated public/icons/${file}.png (${size}x${size})`)
}

await sharp(Buffer.from(svg({ size: 512 })), { density: 384 })
  .resize(180, 180)
  .png()
  .toFile(path.join(root, 'public', 'apple-touch-icon.png'))
console.log('generated public/apple-touch-icon.png (180x180)')

await sharp(Buffer.from(svg({ size: 512 })), { density: 384 })
  .resize(256, 256)
  .png()
  .toFile(path.join(root, 'public', 'icon.png'))
console.log('generated public/icon.png (256x256)')

console.log('done')