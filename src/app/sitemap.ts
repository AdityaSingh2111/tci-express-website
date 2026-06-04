import type { MetadataRoute } from 'next';
import { seoConfig } from '@/data/seo';
import { servicesData } from '@/data/services';
import { industriesData } from '@/data/industries';
import { citiesData } from '@/data/cities';
import { blogData } from '@/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = seoConfig.siteUrl;

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/locations',
    '/gallery',
    '/faq',
    '/quote',
    '/track',
    '/services',
    '/industries',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const serviceRoutes = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const industryRoutes = industriesData.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const locationRoutes = citiesData.map((city) => ({
    url: `${baseUrl}/locations/${city.code.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogRoutes = (blogData || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...locationRoutes,
    ...blogRoutes,
  ];
}
