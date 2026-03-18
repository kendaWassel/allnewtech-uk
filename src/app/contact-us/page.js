import { Suspense } from "react";
import ContactForm from "@/components/contact/ContactForm";
import ContactFormLoading from "@/components/contact/ContactFormLoading";
import CTA from "@/components/home/CTA";
import { siteConfig } from "@/config/site";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata = {
  title: {
    absolute: `Contact Us | ${siteConfig.name}`,
  },
  description:
    "Get in touch with All New Tech for a free site survey or custom quote. Professional security and technology solutions across the UK.",
  keywords: [
    "contact all new tech",
    "book site visit",
    "request quote",
    "security consultation",
    "CCTV quote",
    "free site survey",
    "security installation quote",
  ],
  openGraph: {
    title: `Contact Us | ${siteConfig.name}`,
    description:
      "Book a site visit or request a custom quote for CCTV, alarms, access control, and smart automation across the UK.",
    url: `${siteConfig.baseUrl}/contact-us`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${siteConfig.name}`,
    description:
      "Book a site visit or request a custom quote for CCTV, alarms, access control, and smart automation across the UK.",
  },
  alternates: {
    canonical: `${siteConfig.baseUrl}/contact-us`,
  },
};

export default function ContactPage() {
  return (
    <main>
      <AnimatedSection>
        <Suspense fallback={<ContactFormLoading />}>
          <ContactForm />
        </Suspense>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <CTA className="mb-[6rem]" />
      </AnimatedSection>
    </main>
  );
}
