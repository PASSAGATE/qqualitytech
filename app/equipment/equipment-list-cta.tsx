import Link from "next/link";
import { Download, Headset, MessageSquare } from "lucide-react";

export function EquipmentListCta() {
  return (
    <section className="relative mt-24 overflow-hidden rounded-xl bg-primary-container p-12 lg:p-20">
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-20">
        <div className="h-full w-full bg-gradient-to-l from-secondary to-transparent" />
      </div>

      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-4xl font-black leading-tight tracking-[-0.07em] text-white">
            원하시는 장비를 찾지 못하셨나요?
          </h2>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-on-primary-container">
            큐품질관리기술은 기성 제품 외에도 프로젝트 특성에 맞는 커스텀
            시험 설비 구축 컨설팅을 제공합니다. 전문가와 상담하여 최적의
            솔루션을 설계하십시오.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-sm bg-secondary px-8 py-4 font-bold text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
                boxShadow: "0 14px 28px rgba(255, 107, 44, 0.32)",
              }}
            >
              전문가와 상담하기
              <MessageSquare
                aria-hidden="true"
                className="size-5"
                strokeWidth={1.8}
              />
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-3 rounded-sm border border-white/20 bg-white/10 px-8 py-4 font-bold text-white transition-all hover:bg-white/20"
            >
              카탈로그 PDF 다운로드
              <Download aria-hidden="true" className="size-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white">
                <Headset aria-hidden="true" className="size-5" strokeWidth={1.8} />
              </div>
              <div>
                <div className="font-bold text-white">실시간 기술 지원</div>
                <div className="text-sm text-on-primary-container">
                  평일 09:00 - 18:00 (GMT+9)
                </div>
              </div>
            </div>
            <div className="mb-2 text-3xl font-black tracking-tight text-white">
              010-8941-4628
            </div>
            <div className="text-sm text-on-primary-container">qqstart@naver.com</div>
          </div>
        </div>
      </div>
    </section>
  );
}
