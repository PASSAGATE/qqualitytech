import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { businessSections } from "./business-section-data";
import type { BusinessSectionSlug } from "./business-section-data";
import {
  BusinessFocusSection,
  BusinessHeroSection,
  BusinessOverviewSection,
  BusinessProcessDeliverablesSection,
} from "./business-section-sections";

export { getBusinessSectionMetadata } from "./business-section-data";
export type { BusinessSectionSlug } from "./business-section-data";

export function BusinessSectionPage({
  section,
}: {
  section: BusinessSectionSlug;
}) {
  const business = businessSections[section];

  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref={business.href} />

      <main>
        <BusinessHeroSection business={business} />
        <BusinessOverviewSection business={business} />
        <BusinessProcessDeliverablesSection business={business} />
        <BusinessFocusSection business={business} />
      </main>

      <SiteFooter />
    </div>
  );
}
