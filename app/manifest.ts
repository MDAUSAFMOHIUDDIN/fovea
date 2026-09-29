import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FOVEA — Virtual Eye Store',
    short_name: 'FOVEA',
    description:
      'Discover premium eyewear, save favourites, arrange home trials, and place orders with Fovea.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#07121f',
    theme_color: '#07121f',
    categories: ['shopping', 'lifestyle'],
    icons: [
      {
        src: '/icons/fovea-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/fovea-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/fovea-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
