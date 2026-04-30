import {
  AboutSectionPage,
  getAboutSectionMetadata,
} from "../about-section-page";

export const metadata = getAboutSectionMetadata("organization");

export default function OrganizationPage() {
  return <AboutSectionPage section="organization" />;
}
