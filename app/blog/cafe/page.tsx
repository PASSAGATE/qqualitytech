import type { Metadata } from "next";
import {
  PromotionChannelPage,
  promotionChannels,
} from "../promotion-channel-page";

export const metadata: Metadata = {
  title: "카페 | 큐품질관리기술",
  description:
    "큐품질관리기술의 네이버 카페에서 고객 문의, 공지사항, 커뮤니티 소식을 확인하세요.",
};

export default function CafePage() {
  return <PromotionChannelPage channel={promotionChannels.cafe} />;
}
