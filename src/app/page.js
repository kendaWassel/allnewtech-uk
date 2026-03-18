import { Suspense } from "react";
import About from "@/components/home/About";
import AboutLoading from "@/components/home/AboutLoading";
import Brands from "@/components/home/Brands";
import BrandsLoading from "@/components/home/BrandsLoading";
import CTA from "@/components/home/CTA";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import LatestNews from "@/components/home/LatestNews";
import LatestNewsLoading from "@/components/home/LatestNewsLoading";
import Projects from "@/components/home/Projects";
import ProjectsLoading from "@/components/home/ProjectsLoading";
import Testimonials from "@/components/home/Testimonials";
import TestimonialsLoading from "@/components/home/TestimonialsLoading";
import { siteConfig } from "@/config/site";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata = {
  title: {
    absolute: `${siteConfig.name} | CCTV, Alarm & Smart Security Systems`,
  },
  description:
    "All New Tech is a UK-based security and technology solutions provider specialising in CCTV systems, alarm systems, access control, and smart automation for residential and commercial properties.",
  keywords: [
    "CCTV installation",
    "alarm systems",
    "access control",
    "smart automation",
    "home security",
    "commercial security",
    "security systems installation",
    "smart home technology",
  ],
  openGraph: {
    title:
      "Trusted Security & Smart Technology Solutions for Homes and Businesses",
    description:
      "Protecting What Matters Most with Intelligent Surveillance, Smart Automation & Professional Installations",
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | CCTV, Alarm & Smart Security Systems`,
    description:
      "UK-based security and technology solutions provider specialising in CCTV, alarms, access control, and smart automation.",
  },
  alternates: {
    canonical: siteConfig.baseUrl,
  },
};

export default function HomePage() {
  return (
    <main>
      <AnimatedSection>
        <Hero />
      </AnimatedSection>
      <AnimatedSection>
        <Suspense fallback={<AboutLoading />}>
          <About />
        </Suspense>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <HowItWorks />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <CTA className="py-[3rem]" />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <Suspense fallback={<ProjectsLoading />}>
          <Projects />
        </Suspense>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <Suspense fallback={<BrandsLoading />}>
          <Brands />
        </Suspense>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <Suspense fallback={<TestimonialsLoading />}>
          <Testimonials />
        </Suspense>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <Suspense fallback={<LatestNewsLoading />}>
          <LatestNews />
        </Suspense>
      </AnimatedSection>
    </main>
  );
}
