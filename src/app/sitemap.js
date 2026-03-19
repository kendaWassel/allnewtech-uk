import { siteConfig } from '@/config/site';

export default function sitemap() {
  const routes = [
    '',
    '/about',
    '/contact-us',
    '/projects',
    '/latest-news',
    '/services',
    '/services/home-solutions',
    '/services/commercial-solutions',
    '/custom-quote',
    '/site-visit',
  ];

  return routes.map((route) => ({
    url: `${siteConfig.baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}