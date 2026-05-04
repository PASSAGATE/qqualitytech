import type { LucideIcon } from "lucide-react";

export type PromotionDetail = {
  description: string;
  icon: LucideIcon;
  title: string;
};

export type PromotionChannel = {
  activeHref: string;
  body: string;
  ctaClassName: string;
  ctaHref: string;
  ctaLabel: string;
  description: string;
  eyebrow: string;
  guideDescription: string;
  guideItems: readonly string[];
  guideTitle: string;
  highlights: readonly PromotionDetail[];
  icon: LucideIcon;
  label: string;
  title: string;
  videoEmbedUrl?: string;
};
