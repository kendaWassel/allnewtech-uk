import ChooseUs from "@/components/aboutUs/ChooseUs";
import Mission from "@/components/aboutUs/Mission";
import WhoWeAre from "@/components/aboutUs/WhoWeAre";
import CTA from "@/components/home/CTA";

export const metadata = {
  title: "About Us",
  description:
    "Learn about All New Tech, a trusted UK-based security and technology solutions provider. Experienced technicians delivering high-quality CCTV, alarm, access control, and smart automation systems.",
  keywords: [
    "about all new tech",
    "security company",
    "CCTV installers",
    "alarm system experts",
    "smart automation",
    "security professionals",
  ],
  openGraph: {
    title: "About Us | All New Tech - UK Security & Technology Solutions",
    description:
      "With years of industry experience, All New Tech has become a trusted partner for individuals and businesses seeking modern security systems and smart automation installation.",
    url: "https://allnewtech-uk.com/about",
  },
  alternates: {
    canonical: "https://allnewtech-uk.com/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      <Mission />
      <WhoWeAre />
      <ChooseUs />
      <CTA className="py-[6rem]"/>
    </main>
  );
}

