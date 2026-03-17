import { Suspense } from "react";
import Hero from "@/components/layout/Hero";
import portfolio from "@/content/portfolio";
import PortfolioProjects from "@/components/projects/Projects";
import ProjectsLoading from "@/components/projects/ProjectsLoading";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: {
    absolute: `Our Work | ${siteConfig.name}`,
  },
  description:
    "View our portfolio of security and technology installations. Real projects showcasing CCTV, alarm systems, access control, and smart automation solutions.",
  keywords: [
    "security installation portfolio",
    "CCTV projects UK",
    "alarm system installations",
    "access control projects",
    "smart automation examples",
    "security projects UK",
    "completed installations",
  ],
  openGraph: {
    title: `Our Work | ${siteConfig.name}`,
    description:
      "Real Projects. Proven Results. View our portfolio of security and technology installations across the UK.",
    url: `${siteConfig.baseUrl}/projects`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Our Work | ${siteConfig.name}`,
    description:
      "Explore real CCTV, alarm, access control and smart automation installations across the UK.",
  },
  alternates: {
    canonical: `${siteConfig.baseUrl}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <main>
      <Hero title={portfolio.hero.title} subtitle={portfolio.hero.subtitle} />
      <Suspense fallback={<ProjectsLoading />}>
        <PortfolioProjects />
      </Suspense>
    </main>
  );
}

