import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ClipboardCheck,
  ClipboardList,
  FilePenLine,
  FileSearch,
  FlaskConical,
  Gauge,
  Hammer,
  HardHat,
  MessageSquareText,
  PenLine,
  Ruler,
  ScanLine,
  ShieldCheck,
  TestTube,
  TriangleAlert,
  Waves,
} from "lucide-react";

export type BusinessSectionSlug =
  | "quality-management-consulting"
  | "quality-plan-writing"
  | "construction-material-testing"
  | "concrete-crack-segregation-management";

export type ServiceScope = {
  description: string;
  icon: LucideIcon;
  title: string;
};

export type BusinessSection = {
  deliverables: readonly string[];
  description: string;
  focusBody: string;
  focusTitle: string;
  heroAlt: string;
  heroImage: string;
  href: `/business/${BusinessSectionSlug}`;
  introBody: string;
  introTitle: string;
  lead: string;
  processSteps: readonly string[];
  scopes: ServiceScope[];
  slug: BusinessSectionSlug;
  title: string;
};

export const businessSections = {
  "quality-management-consulting": {
    deliverables: [
      "현장 품질 점검 체크리스트",
      "품질 리스크 진단 리포트",
      "시험·검사 관리 기준표",
      "대관감사 대응 자료 목록",
      "개선 조치 및 사후관리 가이드",
    ],
    description:
      "큐품질관리기술의 건설 품질 관리 및 컨설팅 서비스 범위, 진행 절차, 산출물을 안내합니다.",
    focusBody:
      "현장 점검, 시험 기준, 문서 관리, 감사 대응이 따로 움직이면 품질 리스크가 커집니다. 큐품질관리기술은 이 흐름을 하나의 관리 체계로 묶어 프로젝트가 흔들리지 않도록 지원합니다.",
    focusTitle:
      "하자 대응보다 중요한 것은 하자가 생기기 전의 품질 체계입니다.",
    heroAlt: "Construction quality inspection equipment",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDd2hEPYEu2WZcVDQr9vBj6s8SV9HsPs6Ho25OssPka3jDIDkwu2bT79STfDSS522-ArQZTWrY2oeVTeXz3bfZmD2ZF-VKKRboJgqTkkVlhj3jXkJoTRO61-wjMoaZowMySZPK9ETyyktR85MB6POrfQ4BxhwEz-kuPNUPwRh7ea8P6befp5_7GoyX8xCND1FSto1Su6Ds_LCt8s4S-1qQFHkqAaHu_r5dEC_XLuxsBAJo1wXm_vNaOv0B2wlaOQn_aOrjhKWyrIdpB",
    href: "/business/quality-management-consulting",
    introBody:
      "품질 관리는 서류만 맞추는 일이 아니라 현장의 흐름을 정확히 읽고, 검사 기준과 개선 조치를 실행 가능한 형태로 만드는 과정입니다. 큐품질관리기술은 현장 조건에 맞는 점검 체계와 문서 대응을 함께 설계합니다.",
    introTitle: "현장의 품질 문제를 사전에 줄이는 실무형 컨설팅",
    lead: "착공부터 준공까지 현장의 품질 리스크를 사전에 점검하고, 문서와 검사 체계를 표준화하여 하자 없는 시공 품질을 지원합니다.",
    processSteps: [
      "현장 현황 및 요구사항 진단",
      "품질관리 기준과 점검 계획 수립",
      "현장 방문 점검 및 리스크 확인",
      "개선 리포트와 실행 가이드 제공",
      "후속 점검 및 문서 관리 지원",
    ],
    scopes: [
      {
        description:
          "현장 품질관리 조직, 검사 기준, 문서 흐름을 점검하여 개선 우선순위를 도출합니다.",
        icon: ClipboardCheck,
        title: "품질관리 체계 진단",
      },
      {
        description:
          "시공 단계별 품질 리스크를 확인하고 자재, 공정, 시험 항목을 현장 조건에 맞게 관리합니다.",
        icon: HardHat,
        title: "현장 중심 품질 점검",
      },
      {
        description:
          "품질관리계획서, 시험성적서, 점검 기록 등 감사 대응에 필요한 자료를 체계화합니다.",
        icon: FileSearch,
        title: "문서 및 대관감사 대응",
      },
      {
        description:
          "반복 하자와 품질 불량 원인을 분석하고 사전 예방 중심의 개선안을 제시합니다.",
        icon: TriangleAlert,
        title: "하자 예방 컨설팅",
      },
    ],
    slug: "quality-management-consulting",
    title: "건설 품질 관리 및 컨설팅 | 큐품질관리기술",
  },
  "quality-plan-writing": {
    deliverables: [
      "현장 맞춤 품질관리계획서",
      "시험 및 검사계획표",
      "자재 승인 및 검수 관리표",
      "공종별 품질관리 체크리스트",
      "감리·발주처 검토 대응 보완안",
    ],
    description:
      "큐품질관리기술의 품질관리계획서 작성 지원 서비스 범위, 절차, 산출물을 안내합니다.",
    focusBody:
      "공사 개요, 품질 목표, 조직, 시험 기준, 검사 절차가 서로 연결되어야 계획서는 실제 현장에서 작동합니다. 큐품질관리기술은 발주처 검토와 현장 실행을 함께 고려해 문서를 설계합니다.",
    focusTitle:
      "품질관리계획서는 제출 문서가 아니라 현장을 움직이는 기준서입니다.",
    heroAlt: "Quality planning documents on a construction desk",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDd2hEPYEu2WZcVDQr9vBj6s8SV9HsPs6Ho25OssPka3jDIDkwu2bT79STfDSS522-ArQZTWrY2oeVTeXz3bfZmD2ZF-VKKRboJgqTkkVlhj3jXkJoTRO61-wjMoaZowMySZPK9ETyyktR85MB6POrfQ4BxhwEz-kuPNUPwRh7ea8P6befp5_7GoyX8xCND1FSto1Su6Ds_LCt8s4S-1qQFHkqAaHu_r5dEC_XLuxsBAJo1wXm_vNaOv0B2wlaOQn_aOrjhKWyrIdpB",
    href: "/business/quality-plan-writing",
    introBody:
      "품질관리계획서는 공사 특성, 적용 기준, 시험 항목, 검사 흐름을 한 문서 안에서 명확히 정리해야 합니다. 큐품질관리기술은 현장 여건과 발주처 요구사항을 반영하여 검토 대응이 가능한 실무형 계획서를 작성합니다.",
    introTitle: "승인과 실행을 함께 고려한 품질관리계획서 작성",
    lead: "공사 규모와 공종에 맞는 품질 목표, 조직, 시험·검사 기준을 정리하여 발주처 검토와 현장 운영에 바로 활용할 수 있는 계획서를 지원합니다.",
    processSteps: [
      "공사 개요 및 계약 요구사항 확인",
      "적용 법규와 품질 기준 검토",
      "시험·검사 항목 및 관리 절차 설계",
      "품질관리계획서 초안 작성",
      "검토 의견 반영 및 최종본 정리",
    ],
    scopes: [
      {
        description:
          "공사 종류, 규모, 발주처 요구사항을 분석해 계획서의 작성 범위와 기준을 확정합니다.",
        icon: FilePenLine,
        title: "계획서 작성 기준 설정",
      },
      {
        description:
          "공종별 시험 항목, 검사 빈도, 기록 방식을 현장 운영에 맞게 구성합니다.",
        icon: ClipboardList,
        title: "시험·검사 계획 수립",
      },
      {
        description:
          "품질관리 조직, 책임자 역할, 보고 체계를 문서와 현장 운영이 일치하도록 정리합니다.",
        icon: PenLine,
        title: "품질관리 조직 및 절차 정리",
      },
      {
        description:
          "감리단과 발주처의 검토 의견에 대응할 수 있도록 보완 자료와 수정본을 지원합니다.",
        icon: MessageSquareText,
        title: "검토 의견 대응",
      },
    ],
    slug: "quality-plan-writing",
    title: "품질관리계획서 작성 | 큐품질관리기술",
  },
  "construction-material-testing": {
    deliverables: [
      "자재별 시험 계획 및 일정표",
      "시료 채취 및 접수 기록",
      "시험 결과 검토 의견서",
      "부적합 자재 관리대장",
      "현장 반입 자재 품질 관리표",
    ],
    description:
      "큐품질관리기술의 건설재료시험 관리 서비스 범위, 진행 절차, 산출물을 안내합니다.",
    focusBody:
      "시험 결과는 단순 수치가 아니라 자재 반입 승인, 공정 진행, 하자 예방을 결정하는 근거입니다. 큐품질관리기술은 시료 채취부터 결과 검토까지 누락 없는 시험 관리 흐름을 제공합니다.",
    focusTitle:
      "좋은 시공 품질은 검증된 자재와 정확한 시험 관리에서 시작됩니다.",
    heroAlt: "Construction material testing laboratory",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDd2hEPYEu2WZcVDQr9vBj6s8SV9HsPs6Ho25OssPka3jDIDkwu2bT79STfDSS522-ArQZTWrY2oeVTeXz3bfZmD2ZF-VKKRboJgqTkkVlhj3jXkJoTRO61-wjMoaZowMySZPK9ETyyktR85MB6POrfQ4BxhwEz-kuPNUPwRh7ea8P6befp5_7GoyX8xCND1FSto1Su6Ds_LCt8s4S-1qQFHkqAaHu_r5dEC_XLuxsBAJo1wXm_vNaOv0B2wlaOQn_aOrjhKWyrIdpB",
    href: "/business/construction-material-testing",
    introBody:
      "건설재료시험은 자재가 설계 기준과 현장 요구 품질을 만족하는지 확인하는 핵심 절차입니다. 큐품질관리기술은 콘크리트, 골재, 철근, 기타 주요 자재의 시험 계획과 기록 관리를 체계화하여 공정 지연과 품질 리스크를 줄입니다.",
    introTitle: "자재 반입부터 시험 결과 검토까지 이어지는 품질 검증",
    lead: "현장에 반입되는 주요 건설재료의 시험 기준과 기록 체계를 관리하여 부적합 자재를 조기에 차단하고 시공 품질의 신뢰도를 높입니다.",
    processSteps: [
      "자재 종류 및 적용 시험 기준 확인",
      "시료 채취 계획과 시험 일정 수립",
      "시험 의뢰 및 결과 자료 취합",
      "기준 적합성 검토와 리스크 판단",
      "부적합 조치 및 추적 관리 지원",
    ],
    scopes: [
      {
        description:
          "공종별 주요 자재와 설계 기준을 확인하여 필요한 시험 항목과 빈도를 정리합니다.",
        icon: TestTube,
        title: "자재별 시험 항목 관리",
      },
      {
        description:
          "시료 채취 위치, 수량, 일정을 관리해 시험 누락과 기록 불일치를 예방합니다.",
        icon: FlaskConical,
        title: "시료 채취 및 의뢰 지원",
      },
      {
        description:
          "시험성적서의 기준값, 결과값, 판정 내용을 검토해 현장 의사결정을 지원합니다.",
        icon: Gauge,
        title: "시험 결과 적합성 검토",
      },
      {
        description:
          "부적합 자재 발생 시 반입 제한, 재시험, 개선 조치 등 후속 관리를 체계화합니다.",
        icon: ShieldCheck,
        title: "부적합 자재 추적 관리",
      },
    ],
    slug: "construction-material-testing",
    title: "건설재료시험 | 큐품질관리기술",
  },
  "concrete-crack-segregation-management": {
    deliverables: [
      "콘크리트 균열 현황 조사표",
      "재료분리 및 타설 품질 점검표",
      "균열 원인 분석 리포트",
      "보수·보강 우선순위 제안서",
      "재발 방지 시공 관리 가이드",
    ],
    description:
      "큐품질관리기술의 콘크리트 균열 및 재료분리 관리 서비스 범위, 절차, 산출물을 안내합니다.",
    focusBody:
      "균열과 재료분리는 발생 이후 보수 비용뿐 아니라 구조 신뢰도와 대관 대응에도 영향을 줍니다. 큐품질관리기술은 원인 분석, 조치 우선순위, 재발 방지 기준을 함께 제시합니다.",
    focusTitle:
      "콘크리트 품질 문제는 조기 진단과 재발 방지 기준이 핵심입니다.",
    heroAlt: "Concrete surface inspection for cracks and segregation",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDd2hEPYEu2WZcVDQr9vBj6s8SV9HsPs6Ho25OssPka3jDIDkwu2bT79STfDSS522-ArQZTWrY2oeVTeXz3bfZmD2ZF-VKKRboJgqTkkVlhj3jXkJoTRO61-wjMoaZowMySZPK9ETyyktR85MB6POrfQ4BxhwEz-kuPNUPwRh7ea8P6befp5_7GoyX8xCND1FSto1Su6Ds_LCt8s4S-1qQFHkqAaHu_r5dEC_XLuxsBAJo1wXm_vNaOv0B2wlaOQn_aOrjhKWyrIdpB",
    href: "/business/concrete-crack-segregation-management",
    introBody:
      "콘크리트 균열과 재료분리는 배합, 운반, 타설, 다짐, 양생 조건이 복합적으로 작용해 발생합니다. 큐품질관리기술은 현장 조사와 기록 검토를 통해 원인을 좁히고, 보수 방향과 재발 방지 관리 기준을 제안합니다.",
    introTitle: "균열과 재료분리 원인을 현장 조건에서 추적하는 관리 서비스",
    lead: "콘크리트 타설 품질, 균열 양상, 재료분리 발생 구간을 진단하여 보수·보강 판단과 재발 방지 중심의 품질관리를 지원합니다.",
    processSteps: [
      "균열 및 재료분리 발생 현황 조사",
      "타설 기록, 배합, 양생 조건 검토",
      "원인 분석 및 위험도 분류",
      "보수·보강 방향과 관리 기준 제시",
      "재발 방지 체크리스트 운영 지원",
    ],
    scopes: [
      {
        description:
          "균열 폭, 길이, 위치, 진행 여부를 확인해 구조적 위험과 관리 우선순위를 분류합니다.",
        icon: ScanLine,
        title: "콘크리트 균열 진단",
      },
      {
        description:
          "골재 노출, 블리딩, 충전 불량 등 재료분리 징후를 확인하고 발생 원인을 추적합니다.",
        icon: Waves,
        title: "재료분리 현장 점검",
      },
      {
        description:
          "배합, 운반 시간, 타설 속도, 다짐, 양생 조건을 종합 검토해 품질 저하 요인을 찾습니다.",
        icon: Ruler,
        title: "타설 품질 조건 분석",
      },
      {
        description:
          "보수 범위와 재발 방지 기준을 정리하여 후속 공정의 품질 안정성을 높입니다.",
        icon: Hammer,
        title: "보수 및 재발 방지 가이드",
      },
    ],
    slug: "concrete-crack-segregation-management",
    title: "콘크리트 균열 및 재료분리 관리 | 큐품질관리기술",
  },
} satisfies Record<BusinessSectionSlug, BusinessSection>;

export function getBusinessSectionMetadata(
  section: BusinessSectionSlug,
): Metadata {
  const { description, title } = businessSections[section];

  return {
    description,
    title,
  };
}
