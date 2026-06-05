import type { MetadataRoute } from 'next';
import { seoConfig } from '@/config/seo';
import { servicesData } from '@/data/services';
import { industriesData } from '@/data/industries';
import { citiesData } from '@/data/cities';
import { blogData } from '@/data/blog';
import { branchesData } from '@/data/branches';
import { careersData } from '@/data/careers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = seoConfig.siteUrl;

  const staticRoutes = [
    { path: '',         priority: 1.0, changeFreq: 'weekly'  as const },
    { path: '/about',   priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/contact', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/locations',priority: 0.8, changeFreq: 'weekly'  as const },
    { path: '/gallery', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/faq',     priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/quote',   priority: 0.9, changeFreq: 'weekly'  as const },
    { path: '/track',   priority: 0.8, changeFreq: 'weekly'  as const },
    { path: '/services',priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/industries', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/blog',    priority: 0.7, changeFreq: 'weekly'  as const },
    { path: '/careers', priority: 0.7, changeFreq: 'weekly'  as const },
    { path: '/terms',   priority: 0.3, changeFreq: 'yearly'  as const },
    { path: '/privacy', priority: 0.3, changeFreq: 'yearly'  as const },
  ].map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
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

  const branchRoutes = branchesData.map((branch) => ({
    url: `${baseUrl}/branches/${branch.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const careerRoutes = careersData.map((job) => ({
    url: `${baseUrl}/careers/${job.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...locationRoutes,
    ...blogRoutes,
    ...branchRoutes,
    ...careerRoutes,
  ];
}
