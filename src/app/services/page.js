import CTA from "@/components/home/CTA";
import Hero from "@/components/layout/Hero";
import Intro from "@/components/layout/Intro";
import Categories from "@/components/services/Categories";
import services from "@/content/services";
import { siteConfig } from "@/config/site";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata = {
  title: {
    absolute: `Services | ${siteConfig.name}`,
  },
  description:
    "Advanced security and technology solutions for homes and businesses. CCTV systems, alarm systems, access control, and smart automation. Professional installation across the UK.",
  keywords: [
    "security services",
    "CCTV installation",
    "alarm systems",
    "access control",
    "smart automation",
    "home security",
    "commercial security",
    "security solutions",
  ],
  openGraph: {
    title: `Services | ${siteConfig.name}`,
    description:
      "Advanced Security & Technology Solutions for Homes and Businesses. Integrated security and smart technology systems designed to protect, control, and enhance properties.",
    url: `${siteConfig.baseUrl}/services`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Services | ${siteConfig.name}`,
    description:
      "CCTV, alarms, access control and smart automation services for homes and businesses across the UK.",
  },
  alternates: {
    canonical: `${siteConfig.baseUrl}/services`,
  },
};

export default function ServicesPage() {
  return (
    <main>
      <AnimatedSection>
        <Hero title={services.hero.title} subtitle={services.hero.subtitle} />
      </AnimatedSection>
      <AnimatedSection>
        <Intro description={services.intro.description} />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <Categories />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <CTA className="py-[6rem]" />
      </AnimatedSection>
    </main>
  );
}
