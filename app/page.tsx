import { HomeAboutSection } from "./_components/home-about-section";
import { HomeCasesSection } from "./_components/home-cases-section";
import { HomeContactSection } from "./_components/home-contact-section";
import { HomeFeaturedEquipmentSection } from "./_components/home-featured-equipment-section";
import { HomeHeroSection } from "./_components/home-hero-section";
import { HomeInsightsFaqSection } from "./_components/home-insights-faq-section";
import { HomeServicesSection } from "./_components/home-services-section";
import { fetchFeaturedEquipment } from "./equipment/repository";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export default async function Home() {
  const featuredEquipment = await fetchFeaturedEquipment(4);

  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="" />

      <main>
        <HomeHeroSection />
        <HomeServicesSection />
        <HomeAboutSection />
        <HomeFeaturedEquipmentSection featuredEquipment={featuredEquipment} />
        <HomeCasesSection />
        <HomeInsightsFaqSection />
        <HomeContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
