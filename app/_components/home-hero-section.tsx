import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeIcon } from "./home-icon";

export function HomeHeroSection() {
  return (
    <header
      id="home"
      className="relative flex min-h-[920px] items-center overflow-hidden bg-primary"
    >
      <div className="absolute inset-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk1sGSYNm31Ao0kd9nV4JBiGmX2P2gFkQ0tz-dDpTRs-KOg-ztj_7eLUAWCf_eP8wKbcJbrHGY2DDhnw4vsGledJIYLqaJ7ZdAS4UjaHMTZvbiWViJnQDHhEfmx76c9I9zQ_u3GFez-NcGREGBFOf_CflP0XKGAc3NEfs_5mnGHBVXWSLebmLDcisnZNoGC8XyqZSns03jS15y0oViDn1IxVPEjgUecx_YcmneaynutkjnAEwhA4UgiE7gJ5RLFMLB-6sUfAabZSyD"
          alt="Modern construction site with architectural scaffolding at dusk"
          fill
          preload
          sizes="100vw"
          className="object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-[linear-gradient(65deg,var(--color-primary)_18%,rgba(0,21,42,0.86)_52%,rgba(0,21,42,0.24)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 py-24 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <span className="mb-6 inline-flex rounded-sm border border-secondary/30 bg-secondary/20 px-4 py-1.5 text-sm font-bold tracking-[0.28em] text-secondary">
            INDUSTRIAL PRECISION
          </span>
          <h1 className="mb-7 text-5xl font-black leading-[1.05] tracking-[0.09em] text-white md:text-6xl">
            건설 품질관리와 시험장비,
            <br />
            신뢰할 수 있는 전문 솔루션
          </h1>
          <p className="mb-10 max-w-2xl text-xl font-medium leading-relaxed text-on-primary-container md:text-2xl">
            현장에 필요한 최적의 품질관리 기술과 정밀 시험장비를 제공하여
            안전하고 견고한 건축의 기초를 다집니다.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-secondary px-10 py-5 text-lg font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
                boxShadow: "0 16px 30px rgba(255, 107, 44, 0.35)",
              }}
            >
              상담 문의하기
              <HomeIcon icon={ArrowRight} className="size-5" />
            </Link>
            <Link
              href="/equipment"
              className="inline-flex rounded-md border border-white/20 bg-surface-container-highest px-10 py-5 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white active:scale-95"
            >
              시험장비 보기
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
