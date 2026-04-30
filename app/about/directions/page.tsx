import {
  AboutSectionPage,
  getAboutSectionMetadata,
} from "../about-section-page";

export const metadata = getAboutSectionMetadata("directions");

export default function DirectionsPage() {
  return <AboutSectionPage section="directions" />;
}
