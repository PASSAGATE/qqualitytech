import {
  BusinessSectionPage,
  getBusinessSectionMetadata,
} from "../business-section-page";

export const metadata = getBusinessSectionMetadata(
  "concrete-crack-segregation-management",
);

export default function ConcreteCrackSegregationManagementPage() {
  return (
    <BusinessSectionPage section="concrete-crack-segregation-management" />
  );
}
