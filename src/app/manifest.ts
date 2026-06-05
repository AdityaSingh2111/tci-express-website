import type { MetadataRoute } from 'next';
import { companyConfig } from '@/config/company';
import { seoConfig } from '@/config/seo';

/**
 * manifest.ts — PWA Web App Manifest
 *
 * Automatically served at /manifest.json by Next.js.
 *
 * To update PWA icons:
 *   Replace public/icons/icon-192x192.png
 *   Replace public/icons/icon-512x512.png
 * No code changes required.
 *
 * To update theme color, edit themeColor below.
 */

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             companyConfig.brandName,
    short_name:       'TCI Express',
    description:      'Premium packers & movers across India. Track shipments, get quotes, and book relocations.',
    start_url:        '/',
    display:          'standalone',
    background_color: '#FFFFFF',
    theme_color:      '#0052CC',  // brand-blue
    orientation:      'portrait-primary',
    scope:            '/',
    lang:             'en-IN',
    categories:       ['logistics', 'business', 'productivity'],
    icons: [
      {
        src:     '/icons/icon-192x192.png',
        sizes:   '192x192',
        type:    'image/png',
        purpose: 'any',
      },
      {
        src:     '/icons/icon-512x512.png',
        sizes:   '512x512',
        type:    'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [],
    related_applications: [],
    prefer_related_applications: false,
  };
}
