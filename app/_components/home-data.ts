import type { LucideIcon } from "lucide-react";
import {
  Clock3,
  HardHat,
  MessageSquare,
  SearchCheck,
  ShoppingCart,
  Wrench,
} from "lucide-react";

export const homeServices: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  tone: string;
}> = [
  {
    icon: Wrench,
    title: "품질관리 지원",
    description:
      "건설 현장의 전반적인 품질 시험 및 관리 체계 수립을 전문 엔지니어가 직접 지원합니다.",
    tone: "bg-surface-container-low",
  },
  {
    icon: ShoppingCart,
    title: "시험장비 판매",
    description:
      "KS 규격에 부합하는 정밀 건설 시험 장비를 합리적인 가격과 정식 라이선스로 공급합니다.",
    tone: "bg-surface-container",
  },
  {
    icon: Clock3,
    title: "시험장비 임대",
    description:
      "단기 현장 및 특정 프로젝트를 위한 최신 사양의 시험 장비 렌탈 서비스를 운영합니다.",
    tone: "bg-surface-container-high",
  },
  {
    icon: MessageSquare,
    title: "기술 상담",
    description:
      "각종 품질 시험 방법 및 현장 애로사항에 대한 기술적 솔루션을 제공해 드립니다.",
    tone: "bg-surface-container-high",
  },
  {
    icon: HardHat,
    title: "현장 시험 지원",
    description:
      "실시간 대응이 필요한 현장에서 직접 시험을 수행하고 정확한 데이터를 리포팅합니다.",
    tone: "bg-surface-container",
  },
  {
    icon: SearchCheck,
    title: "검사 솔루션",
    description:
      "구조물 진단 및 특수 검사를 위한 고도화된 검사 프로토콜과 장비를 제안합니다.",
    tone: "bg-surface-container-low",
  },
] as const;

export const homeFaqs = [
  {
    question: "장비 임대 시 현장 배송이 가능한가요?",
    answer:
      "네, 전국 모든 건설 현장으로 전문 물류팀이 안전하게 배송 및 설치를 지원해 드립니다. 반납 시에도 방문 회수 서비스를 제공합니다.",
    open: true,
  },
  {
    question: "품질 시험 성적서 대행 발급이 되나요?",
    answer: "",
    open: false,
  },
  {
    question: "장비 고장 시 A/S 처리 기간은 얼마나 걸리나요?",
    answer: "",
    open: false,
  },
] as const;
