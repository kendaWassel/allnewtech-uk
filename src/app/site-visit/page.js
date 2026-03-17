import { Suspense } from 'react';
import FormIntroHero from '@/components/layout/FormIntroHero';
import SiteVisit from '@/components/siteVisit/SiteVisit';
import SiteVisitLoading from '@/components/siteVisit/SiteVisitLoading';
import contact from '@/content/contact.json';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: {
    absolute: `Book a Site Visit | ${siteConfig.name}`,
  },
  description:
    'Book a site visit with All New Tech for a professional assessment and tailored security recommendation.',
  keywords: [
    'book site visit',
    'site survey',
    'security consultation',
    'CCTV site visit',
    'access control assessment',
  ],
  openGraph: {
    title: `Book a Site Visit | ${siteConfig.name}`,
    description:
      'Schedule a site visit for expert recommendations on your security and technology requirements.',
    url: `${siteConfig.baseUrl}/site-visit`,
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Book a Site Visit | ${siteConfig.name}`,
    description:
      'Schedule a site visit for expert recommendations on your security and technology requirements.',
  },
  alternates: {
    canonical: `${siteConfig.baseUrl}/site-visit`,
  },
};

export default function BookSiteVisitPage() {
  return (
    <main>
      <FormIntroHero
        title={contact.siteVisit.intro}
        imageSrc="/site-visit-hero.svg"
        imageAlt="Book a site visit illustration"
      />
      <Suspense fallback={<SiteVisitLoading />}>
        <SiteVisit />
      </Suspense>
    </main>
  );
}
