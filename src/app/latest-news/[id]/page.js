import { Suspense } from "react";
import LatestNewsBlog from "@/components/latestNewsBlog/LatestNewsBlog";
import LatestNewsBlogLoading from "@/components/latestNewsBlog/LatestNewsBlogLoading";
import CTA from "@/components/services/ServicesCTA";
import { apiConfig, fetchFromAPI } from "@/config/api";
import { siteConfig } from "@/config/site";

export async function generateMetadata({ params }) {
  const { id } = await params;
  let title = "Latest News";
  let description =
    "Read the latest news and updates from All New Tech on security and technology solutions.";

  try {
    const data = await fetchFromAPI(`${apiConfig.endpoints.latestNews}/${id}`, {
      next: { revalidate: 60 },
    });
    if (data?.success && data?.data) {
      title = data.data.title || title;
      const content = data.data.content || "";
      description =
        content.length > 160 ? `${content.slice(0, 157)}...` : content || description;
    }
  } catch {
  }

  return {
    title: {
      absolute: `${title} | ${siteConfig.name}`,
    },
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.baseUrl}/latest-news/${id}`,
      siteName: siteConfig.name,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    alternates: {
      canonical: `${siteConfig.baseUrl}/latest-news/${id}`,
    },
  };
}

export default async function LatestNewsBlogPage({ params }) {
  const { id } = await params;
  return (
    <main>
      <Suspense fallback={<LatestNewsBlogLoading />}>
        <LatestNewsBlog newsId={id} />
      </Suspense>
      <CTA className="lg:!mx-[6rem] lg:!w-[50%] !mt-0 !mb-[7rem]" />
    </main>
  );
}
