import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ClipboardCheck,
  FileCheck2,
  Gauge,
  ListChecks,
  RefreshCcw,
  SearchCheck,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

export type QualitySectionSlug = "policy" | "certifications";

export type QualitySection = {
  description: string;
  href: `/quality/${QualitySectionSlug}`;
  slug: QualitySectionSlug;
  title: string;
};

export type QualityHighlight = {
  description: string;
  icon: LucideIcon;
  title: string;
};

export const qualitySections = {
  policy: {
    description:
      "큐품질관리기술의 품질 방침과 현장 품질관리 원칙을 소개합니다.",
    href: "/quality/policy",
    slug: "policy",
    title: "품질 방침 | 큐품질관리기술",
  },
  certifications: {
    description:
      "큐품질관리기술의 품질 인증, 기준 관리, 대관감사 대응 체계를 소개합니다.",
    href: "/quality/certifications",
    slug: "certifications",
    title: "품질 인증 | 큐품질관리기술",
  },
} satisfies Record<QualitySectionSlug, QualitySection>;

export const policyPrinciples: QualityHighlight[] = [
  {
    description:
      "프로젝트의 조건과 품질 목표를 명확히 파악하고 신속하게 대응합니다.",
    icon: SearchCheck,
    title: "고객 요구사항의 정확한 이해",
  },
  {
    description:
      "관련 법규, 품질 기준, 절차를 준수하여 현장 품질 신뢰를 확보합니다.",
    icon: ShieldCheck,
    title: "법규와 기준 준수",
  },
  {
    description:
      "현장 점검과 품질검사를 통해 문제를 조기에 발견하고 손실을 예방합니다.",
    icon: TriangleAlert,
    title: "사전 예방 품질",
  },
  {
    description:
      "품질관리 문서와 대관감사 대응 체계를 표준화하여 업무 누락을 줄입니다.",
    icon: FileCheck2,
    title: "문서 및 감사 대응 표준화",
  },
];

export const certificationItems: QualityHighlight[] = [
  {
    description:
      "현장 조건에 맞는 품질관리 계획과 검사 항목을 검토하고 보완합니다.",
    icon: ClipboardCheck,
    title: "품질관리계획서 기준 검토",
  },
  {
    description:
      "자재, 공정, 시공 단계별 시험 및 검사 기준을 체계적으로 관리합니다.",
    icon: ListChecks,
    title: "시험·검사 기준 관리",
  },
  {
    description:
      "필요 서류와 점검 기록을 정리하여 감사 대응의 정확도를 높입니다.",
    icon: Gauge,
    title: "대관감사 대응 체계",
  },
  {
    description:
      "점검 결과와 피드백을 바탕으로 서비스 품질을 지속적으로 개선합니다.",
    icon: RefreshCcw,
    title: "지속 개선 활동",
  },
];

export const qualityHeroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDd2hEPYEu2WZcVDQr9vBj6s8SV9HsPs6Ho25OssPka3jDIDkwu2bT79STfDSS522-ArQZTWrY2oeVTeXz3bfZmD2ZF-VKKRboJgqTkkVlhj3jXkJoTRO61-wjMoaZowMySZPK9ETyyktR85MB6POrfQ4BxhwEz-kuPNUPwRh7ea8P6befp5_7GoyX8xCND1FSto1Su6Ds_LCt8s4S-1qQFHkqAaHu_r5dEC_XLuxsBAJo1wXm_vNaOv0B2wlaOQn_aOrjhKWyrIdpB";

export function getQualitySectionMetadata(
  section: QualitySectionSlug,
): Metadata {
  const { description, title } = qualitySections[section];

  return {
    description,
    title,
  };
}
