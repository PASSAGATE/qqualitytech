import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { qualitySections } from "./quality-section-data";
import type { QualitySectionSlug } from "./quality-section-data";
import {
  QualityHero,
  QualitySectionContent,
} from "./quality-section-sections";

export { getQualitySectionMetadata } from "./quality-section-data";
export type { QualitySectionSlug } from "./quality-section-data";

export function QualitySectionPage({
  section,
}: {
  section: QualitySectionSlug;
}) {
  const { href } = qualitySections[section];

  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref={href} />
      <main>
        <QualityHero section={section} />
        <QualitySectionContent section={section} />
      </main>
      <SiteFooter />
    </div>
  );
}
