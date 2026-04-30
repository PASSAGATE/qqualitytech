import type { Metadata } from "next";
import {
  PromotionChannelPage,
  promotionChannels,
} from "../promotion-channel-page";

export const metadata: Metadata = {
  title: "블로그 | 큐품질관리기술",
  description:
    "큐품질관리기술의 네이버 블로그에서 품질관리 트렌드, 시험 장비 운용 팁, 현장 적용 사례를 확인하세요.",
};

export default function NaverBlogPage() {
  return <PromotionChannelPage channel={promotionChannels.naverBlog} />;
}
