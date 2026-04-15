import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-korean",
  display: "swap",
});

export const metadata: Metadata = {
  title: "큐품질관리기술 | 건설 품질관리와 시험장비 전문 솔루션",
  description:
    "큐품질관리기술는 건설 품질관리 지원, 시험장비 판매·임대, 현장 시험 지원과 기술 상담을 제공하는 산업 품질 솔루션 파트너입니다.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${notoSansKr.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
