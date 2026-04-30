import {
  AboutSectionPage,
  getAboutSectionMetadata,
} from "../about-section-page";

export const metadata = getAboutSectionMetadata("overview");

export default function OverviewPage() {
  return <AboutSectionPage section="overview" />;
}
