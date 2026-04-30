import {
  BusinessSectionPage,
  getBusinessSectionMetadata,
} from "../business-section-page";

export const metadata = getBusinessSectionMetadata(
  "construction-material-testing",
);

export default function ConstructionMaterialTestingPage() {
  return <BusinessSectionPage section="construction-material-testing" />;
}
