import { Suspense } from "react";
import CustomQuote from "@/components/customQuote/CustomQuote";
import CustomQuoteLoading from "@/components/customQuote/CustomQuoteLoading";
import FormIntroHero from "@/components/layout/FormIntroHero";
import contact from "@/content/contact.json";
import { siteConfig } from "@/config/site";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata = {
  title: {
    absolute: `Request a Custom Quote | ${siteConfig.name}`,
  },
  description:
    "Request a tailored quote for CCTV, alarm systems, access control, and smart automation. Professional installation across the UK.",
  keywords: [
    "request quote",
    "custom quote",
    "security consultation",
    "CCTV quote",
    "security installation quote",
  ],
  openGraph: {
    title: `Request a Custom Quote | ${siteConfig.name}`,
    description:
      "Tell us about your requirements and get a tailored quote for your security and technology needs across the UK.",
    url: `${siteConfig.baseUrl}/custom-quote`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Request a Custom Quote | ${siteConfig.name}`,
    description:
      "Tell us about your requirements and get a tailored quote for your security and technology needs across the UK.",
  },
  alternates: {
    canonical: `${siteConfig.baseUrl}/custom-quote`,
  },
};

export default function CustomQuotePage() {
  return (
    <main>
      <AnimatedSection>
        <FormIntroHero
          title={contact.quoteRequest.intro}
          imageSrc="/quote-hero.svg"
        />
      </AnimatedSection>
      <AnimatedSection>
        <Suspense fallback={<CustomQuoteLoading />}>
          <CustomQuote />
        </Suspense>
      </AnimatedSection>
    </main>
  );
}
