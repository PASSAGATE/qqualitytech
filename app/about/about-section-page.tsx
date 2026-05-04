import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { AboutSectionContent } from "./_components/about-section-content";
import { aboutSections, type AboutSectionSlug } from "./about-sections";

export type { AboutSectionSlug } from "./about-sections";

export function getAboutSectionMetadata(section: AboutSectionSlug): Metadata {
  const { title, description } = aboutSections[section];

  return {
    title,
    description,
  };
}

export function AboutSectionPage({ section }: { section: AboutSectionSlug }) {
  const { href } = aboutSections[section];

  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref={href} />
      <main>
        <AboutSectionContent section={section} />
      </main>
      <SiteFooter />
    </div>
  );
}
