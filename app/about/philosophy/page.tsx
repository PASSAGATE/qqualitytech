import {
  AboutSectionPage,
  getAboutSectionMetadata,
} from "../about-section-page";

export const metadata = getAboutSectionMetadata("philosophy");

export default function PhilosophyPage() {
  return <AboutSectionPage section="philosophy" />;
}
