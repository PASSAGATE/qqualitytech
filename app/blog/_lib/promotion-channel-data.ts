import {
  Bell,
  BookOpenCheck,
  ClipboardCheck,
  FileText,
  HelpCircle,
  MessagesSquare,
  Newspaper,
  Play,
  SearchCheck,
  Users,
  Wrench,
} from "lucide-react";
import type { PromotionChannel } from "./promotion-channel-types";

export const promotionChannels = {
  youtube: {
    activeHref: "/blog/youtube",
    body: "현장에서 자주 쓰이는 시험 장비, 품질검사 흐름, 관리 포인트를 영상 콘텐츠로 정리합니다. 실제 사용 장면을 보면서 장비와 품질관리 내용을 더 쉽게 이해할 수 있습니다.",
    ctaClassName: "bg-[#e62117]",
    ctaHref: "https://www.youtube.com/channel/UC3y7kzZc2szmtO_LYMhXw6w",
    ctaLabel: "유튜브 바로가기",
    description:
      "시험 장비 소개 영상과 현장 실무 팁을 영상으로 확인할 수 있는 공식 채널입니다.",
    eyebrow: "Video Channel",
    guideDescription:
      "영상은 장비를 처음 접하는 담당자 교육이나 현장 점검 전 사전 확인 자료로 활용하기 좋습니다.",
    guideItems: [
      "장비 사용 전 기본 구성과 작동 흐름을 먼저 확인합니다.",
      "현장 점검 전에 품질검사 절차와 주의사항을 영상으로 공유합니다.",
      "신규 담당자 교육 시 반복 설명이 필요한 부분을 영상 자료로 보완합니다.",
      "문의 전 관련 영상을 확인하면 증상 설명과 상담이 더 빨라집니다.",
    ],
    guideTitle: "영상을 이렇게 활용하세요",
    highlights: [
      {
        description:
          "시험장비의 구성, 사용 목적, 현장 적용 방식을 영상으로 쉽게 확인합니다.",
        icon: Play,
        title: "장비 소개 영상",
      },
      {
        description:
          "품질검사 흐름과 사전 점검 포인트를 현장 담당자 눈높이로 정리합니다.",
        icon: ClipboardCheck,
        title: "검사 절차 안내",
      },
      {
        description:
          "장비 운용 중 자주 발생하는 상황과 확인해야 할 항목을 소개합니다.",
        icon: SearchCheck,
        title: "실무 체크포인트",
      },
      {
        description:
          "담당자 교육과 내부 공유에 활용할 수 있는 짧은 콘텐츠를 제공합니다.",
        icon: BookOpenCheck,
        title: "교육 자료 활용",
      },
    ],
    icon: Play,
    label: "유튜브",
    title: "유튜브 채널",
    videoEmbedUrl: "https://www.youtube.com/embed/xt5rY9FDFPE",
  },
  naverBlog: {
    activeHref: "/blog/naver-blog",
    body: "품질관리 기준, 장비 관리 방법, 현장 사례 등 업무에 바로 참고할 수 있는 글을 제공합니다. 최신 소식과 실무 자료를 정리해 고객이 필요한 정보를 빠르게 찾을 수 있도록 운영합니다.",
    ctaClassName: "bg-[#1b7cff]",
    ctaHref: "https://blog.naver.com/qualityms",
    ctaLabel: "블로그 바로가기",
    description:
      "품질관리 트렌드, 시험 장비 운용 팁, 현장 적용 사례를 정리하는 공식 블로그입니다.",
    eyebrow: "Official Channel",
    guideDescription:
      "블로그는 품질관리 문서 작성, 시험장비 운용, 현장 대응 흐름을 차근차근 확인하는 실무형 자료실입니다.",
    guideItems: [
      "공정 시작 전 품질관리계획서와 시험·검사 준비 항목을 확인합니다.",
      "시험 기준이나 장비 운용 방법이 헷갈릴 때 관련 글로 흐름을 먼저 파악합니다.",
      "현장 사례를 참고해 반복되는 품질 리스크와 예방 포인트를 정리합니다.",
      "팀 내부 교육 자료나 고객 안내 자료로 필요한 글을 공유합니다.",
    ],
    guideTitle: "블로그를 이렇게 활용하세요",
    highlights: [
      {
        description:
          "건설 품질관리 기준과 업무 흐름을 실무자가 이해하기 쉬운 언어로 풀어냅니다.",
        icon: BookOpenCheck,
        title: "품질관리 기준 해설",
      },
      {
        description:
          "시험장비 점검, 보관, 운용 시 놓치기 쉬운 관리 포인트를 정리합니다.",
        icon: Wrench,
        title: "시험장비 운용 팁",
      },
      {
        description:
          "현장에서 자주 마주치는 품질 이슈와 대응 방향을 사례 중심으로 소개합니다.",
        icon: FileText,
        title: "현장 사례 정리",
      },
      {
        description:
          "착공부터 준공까지 필요한 품질 문서와 준비 항목을 체크할 수 있습니다.",
        icon: ClipboardCheck,
        title: "서류 준비 체크",
      },
    ],
    icon: Newspaper,
    label: "블로그",
    title: "네이버 블로그",
  },
  cafe: {
    activeHref: "/blog/cafe",
    body: "장비 사용 문의, 업데이트, 공지사항 등 고객과의 소통이 필요한 내용을 카페에서 확인할 수 있습니다. 현장 담당자와 사용자가 함께 정보를 공유하는 커뮤니티 공간입니다.",
    ctaClassName: "bg-[#00b17a]",
    ctaHref: "https://cafe.naver.com/qqualitymanagement",
    ctaLabel: "카페 바로가기",
    description:
      "사용자 문의, 공지사항, 커뮤니티 소식을 확인할 수 있는 네이버 카페 채널입니다.",
    eyebrow: "Community",
    guideDescription:
      "카페는 고객 문의와 공지, 장비 사용 경험을 한곳에서 확인하는 소통 중심 채널입니다.",
    guideItems: [
      "문의 전 장비명, 모델명, 현장 상황, 증상을 간단히 정리합니다.",
      "가능하면 사진이나 영상 자료를 함께 준비해 상담 정확도를 높입니다.",
      "공지사항과 업데이트 글을 확인해 최신 안내를 놓치지 않습니다.",
      "자주 올라오는 질문을 참고해 비슷한 사례의 해결 방향을 먼저 확인합니다.",
    ],
    guideTitle: "카페를 이렇게 활용하세요",
    highlights: [
      {
        description:
          "장비 사용 중 궁금한 점이나 현장 상황에 대한 문의를 남길 수 있습니다.",
        icon: HelpCircle,
        title: "사용 문의 공유",
      },
      {
        description:
          "운영 안내, 서비스 공지, 채널 업데이트를 빠르게 확인할 수 있습니다.",
        icon: Bell,
        title: "공지 및 업데이트",
      },
      {
        description:
          "현장 담당자와 사용자들이 필요한 정보를 공유하는 커뮤니티 공간입니다.",
        icon: Users,
        title: "고객 소통 공간",
      },
      {
        description:
          "장비 점검이나 A/S 상담 전 필요한 정보를 정리하는 데 도움을 줍니다.",
        icon: Wrench,
        title: "점검 상담 연결",
      },
    ],
    icon: MessagesSquare,
    label: "카페",
    title: "네이버 카페",
  },
} satisfies Record<string, PromotionChannel>;

export const channelLinks = [
  promotionChannels.youtube,
  promotionChannels.naverBlog,
  promotionChannels.cafe,
];
