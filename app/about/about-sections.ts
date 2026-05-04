export type AboutSectionSlug =
  | "greeting"
  | "overview"
  | "philosophy"
  | "organization"
  | "directions";

type AboutSection = {
  slug: AboutSectionSlug;
  href: `/about/${AboutSectionSlug}`;
  title: string;
  description: string;
};

export const aboutSections = {
  greeting: {
    slug: "greeting",
    href: "/about/greeting",
    title: "인사말 | 큐품질관리기술",
    description:
      "큐품질관리기술의 인사말과 품질관리 서비스에 대한 약속을 소개합니다.",
  },
  overview: {
    slug: "overview",
    href: "/about/overview",
    title: "회사 개요 | 큐품질관리기술",
    description:
      "큐품질관리기술의 회사 개요, 운영 철학, 핵심 서비스와 본사 정보를 소개합니다.",
  },
  philosophy: {
    slug: "philosophy",
    href: "/about/philosophy",
    title: "경영 이념 | 큐품질관리기술",
    description:
      "큐품질관리기술의 미션, 비전, 핵심 가치와 실행 원칙을 소개합니다.",
  },
  organization: {
    slug: "organization",
    href: "/about/organization",
    title: "조직도 | 큐품질관리기술",
    description: "큐품질관리기술의 조직 구조와 문의 라우팅 체계를 소개합니다.",
  },
  directions: {
    slug: "directions",
    href: "/about/directions",
    title: "오시는 길 | 큐품질관리기술",
    description: "큐품질관리기술 본사 위치와 방문 안내 정보를 소개합니다.",
  },
} satisfies Record<AboutSectionSlug, AboutSection>;
