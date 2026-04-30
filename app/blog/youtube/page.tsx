import type { Metadata } from "next";
import {
  PromotionChannelPage,
  promotionChannels,
} from "../promotion-channel-page";

export const metadata: Metadata = {
  title: "유튜브 | 큐품질관리기술",
  description:
    "큐품질관리기술의 공식 유튜브 채널에서 시험 장비 소개 영상과 품질관리 실무 팁을 확인하세요.",
};

export default function YoutubePage() {
  return <PromotionChannelPage channel={promotionChannels.youtube} />;
}
