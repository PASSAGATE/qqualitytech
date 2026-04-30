import {
  getQualitySectionMetadata,
  QualitySectionPage,
} from "../quality-section-page";

export const metadata = getQualitySectionMetadata("policy");

export default function QualityPolicyPage() {
  return <QualitySectionPage section="policy" />;
}
