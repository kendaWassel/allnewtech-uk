import { Suspense } from "react";
import Hero from "@/components/layout/Hero";
import Intro from "@/components/layout/Intro";
import AvailableServices from "@/components/services/AvailableServices";
import AvailableServicesLoading from "@/components/services/AvailableServicesLoading";
import DiscoverSection from "@/components/services/DiscoverSection";
import commercialSolutions from '@/content/commercial-solutions'

export const metadata = {
  title: "Commercial Solutions",
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
    title: "Commercial Solutions | All New Tech UK",
    description:
      "Professional systems built to protect your business and enhance operations. Robust, scalable security and AV solutions for offices, retail, warehouses, and commercial premises.",
    url: "https://allnewtech-uk.com/services/commercial-solutions",
  },
  alternates: {
    canonical: "https://allnewtech-uk.com/services/commercial-solutions",
  },
};

export default function CommercialSolutionsPage() {
  return (
    <main>
      <Hero title={commercialSolutions.hero.title} subtitle={commercialSolutions.hero.subtitle}/>
      <Intro description={commercialSolutions.intro.description}/>
      <Suspense fallback={<AvailableServicesLoading />}>
        <AvailableServices propertyType="commercial" />
      </Suspense>
      <DiscoverSection propertyType="commercial" />
    </main>
  );
}

