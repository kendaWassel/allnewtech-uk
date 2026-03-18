import { Suspense } from "react";
import Hero from "@/components/layout/Hero";
import Intro from "@/components/layout/Intro";
import AvailableServices from "@/components/services/AvailableServices";
import AvailableServicesLoading from "@/components/services/AvailableServicesLoading";
import DiscoverSection from "@/components/services/DiscoverSection";
import commercialSolutions from "@/content/commercial-solutions";
import { siteConfig } from "@/config/site";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata = {
  title: {
    absolute: `Commercial Solutions | ${siteConfig.name}`,
  },
  description:
    "Professional commercial security systems for offices, retail, warehouses, and industrial sites. CCTV, alarms, access control, and AV solutions for businesses.",
  keywords: [
    "commercial security",
    "business CCTV systems",
    "commercial alarm systems",
    "office access control",
    "commercial AV solutions",
    "warehouse security",
    "retail security systems",
    "industrial security",
  ],
  openGraph: {
    title: `Commercial Solutions | ${siteConfig.name}`,
    description:
      "Professional systems built to protect your business and enhance operations. Robust, scalable security and AV solutions for offices, retail, warehouses, and commercial premises.",
    url: `${siteConfig.baseUrl}/services/commercial-solutions`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Commercial Solutions | ${siteConfig.name}`,
    description:
      "Commercial security and AV solutions including CCTV, alarms and access control for businesses across the UK.",
  },
  alternates: {
    canonical: `${siteConfig.baseUrl}/services/commercial-solutions`,
  },
};

export default function CommercialSolutionsPage() {
  return (
    <main>
      <AnimatedSection>
        <Hero
          title={commercialSolutions.hero.title}
          subtitle={commercialSolutions.hero.subtitle}
        />
      </AnimatedSection>
      <AnimatedSection>
        <Intro description={commercialSolutions.intro.description} />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <Suspense fallback={<AvailableServicesLoading />}>
          <AvailableServices propertyType="commercial" />
        </Suspense>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <DiscoverSection propertyType="commercial" />
      </AnimatedSection>
    </main>
  );
}
