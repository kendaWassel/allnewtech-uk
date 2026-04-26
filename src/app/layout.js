import { Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import Link from 'next/link';
import Image from 'next/image';
import "./globals.css";
const montserrat = Montserrat({
  weight: ['400','700'],
});

export const metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: "All New Tech - UK Security & Smart Technology Solutions",
    template: "%s | All New Tech",
  },
  description:
    "Trusted UK-based security and technology solutions provider. Professional CCTV systems, alarm systems, access control, and smart automation for homes and businesses.",
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
  authors: [{ name: "All New Tech" }],
  creator: "All New Tech",
  publisher: "All New Tech",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.baseUrl,
    siteName: "All New Tech",
    title: "All New Tech - UK Security & Smart Technology Solutions",
    description:
      "Trusted UK-based security and technology solutions provider. Professional CCTV, alarm systems, access control, and smart automation.",

  },
  twitter: {
    card: "summary_large_image",
    title: "All New Tech - UK Security & Smart Technology Solutions",
    description:
      "Trusted UK-based security and technology solutions provider. Professional CCTV, alarm systems, access control, and smart automation.",
  },
  alternates: {
    canonical: siteConfig.baseUrl,
  },
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en-GB">
      <body className={`${montserrat.className}`}>
        <Header />
        {children}
        <Footer />
        <Link
          href="/contact-us"
          className="fixed bottom-[2rem] right-[2rem] z-[9999] bg-white hover:bg-[var(--white)] hover:bg-[var(--primary-blue-second)] transition-colors duration-300 w-[3.5rem] h-[3.5rem] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          aria-label="Contact Us"
        >
          <Image
            src="/icons/contact-float.svg"
            alt="Contact Us"
            width={24}
            height={24}
          />
        </Link>
      </body>
    </html>
  );
}
