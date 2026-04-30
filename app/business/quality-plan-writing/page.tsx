import {
  BusinessSectionPage,
  getBusinessSectionMetadata,
} from "../business-section-page";

export const metadata = getBusinessSectionMetadata("quality-plan-writing");

export default function QualityPlanWritingPage() {
  return <BusinessSectionPage section="quality-plan-writing" />;
}
