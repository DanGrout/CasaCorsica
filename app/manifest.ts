import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const repoPath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Casa Corsica Guest Guidebook',
    short_name: 'Casa Corsica',
    description: 'Your digital welcome book for Casa Corsica, Shelley Point.',
    start_url: `${repoPath}/`,
    scope: `${repoPath}/`,
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f8f5ef',
    theme_color: '#f8f5ef',
    icons: [
      { src: `${repoPath}/icon-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: `${repoPath}/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: `${repoPath}/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
