import {
  AboutSectionPage,
  getAboutSectionMetadata,
} from "../about-section-page";

export const metadata = getAboutSectionMetadata("greeting");

export default function GreetingPage() {
  return <AboutSectionPage section="greeting" />;
}
