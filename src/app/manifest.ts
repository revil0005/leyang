import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '乐养E居 - 专业居家养老',
    short_name: '乐养E居',
    description: '专业养老护理，就在您身边。一站式居家养老服务平台。',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDFAF6',
    theme_color: '#E8721C',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
