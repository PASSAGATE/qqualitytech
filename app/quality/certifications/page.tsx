import {
  getQualitySectionMetadata,
  QualitySectionPage,
} from "../quality-section-page";

export const metadata = getQualitySectionMetadata("certifications");

export default function QualityCertificationsPage() {
  return <QualitySectionPage section="certifications" />;
}
