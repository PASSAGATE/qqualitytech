import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "홍보센터 | 큐품질관리기술",
  description:
    "큐품질관리기술의 유튜브, 네이버 블로그, 네이버 카페 채널을 확인하세요.",
};

export default function BlogPage() {
  redirect("/blog/youtube");
}
