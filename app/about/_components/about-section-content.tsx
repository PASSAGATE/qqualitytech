import type { AboutSectionSlug } from "../about-sections";
import { DirectionsSection } from "./directions-section";
import { GreetingSection } from "./greeting-section";
import { OrganizationSection } from "./organization-section";
import { OverviewSection } from "./overview-section";
import { PhilosophySection } from "./philosophy-section";

export function AboutSectionContent({
  section,
}: {
  section: AboutSectionSlug;
}) {
  switch (section) {
    case "greeting":
      return <GreetingSection />;
    case "overview":
      return <OverviewSection />;
    case "philosophy":
      return <PhilosophySection />;
    case "organization":
      return <OrganizationSection />;
    case "directions":
      return <DirectionsSection />;
  }
}
