import {
  BusinessSectionPage,
  getBusinessSectionMetadata,
} from "../business-section-page";

export const metadata = getBusinessSectionMetadata(
  "quality-management-consulting",
);

export default function QualityManagementConsultingPage() {
  return <BusinessSectionPage section="quality-management-consulting" />;
}
