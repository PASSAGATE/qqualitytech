import Image from "next/image";
import { Box, Building2, Gauge, HardHat, ShieldCheck } from "lucide-react";
import { HomeIcon } from "./home-icon";

export function HomeAboutSection() {
  return (
    <section id="about" className="bg-surface-container-low py-24">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-4 text-4xl font-black tracking-[-0.06em] text-primary">
              왜 큐품질관리기술?
            </h2>
            <p className="text-lg text-on-surface-variant">
              우리가 제공하는 품질의 차이가 고객의 신뢰를 만듭니다.
            </p>
          </div>
          <div className="h-px w-full bg-outline-variant/30 md:w-1/3" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <article className="relative col-span-12 flex min-h-[400px] flex-col justify-end overflow-hidden bg-primary p-12 md:col-span-8">
            <HomeIcon
              icon={HardHat}
              className="absolute left-12 top-12 size-14 text-secondary"
            />
            <div className="relative z-10">
              <h3 className="mb-4 text-3xl font-bold text-white">
                풍부한 현장 경험
              </h3>
              <p className="max-w-xl text-lg text-on-primary-container">
                수많은 대형 프로젝트를 통해 축적된 노하우로 어떠한 변수에도
                신속하고 정확한 해답을 제시합니다.
              </p>
            </div>
            <HomeIcon
              icon={Building2}
              className="absolute right-0 bottom-0 size-[260px] -translate-y-2 text-white/10"
            />
          </article>

          <article className="col-span-12 bg-surface-container-highest p-12 md:col-span-4">
            <HomeIcon
              icon={ShieldCheck}
              className="mb-8 size-12 text-secondary"
            />
            <h3 className="mb-4 text-2xl font-bold text-primary">
              전문 기술력
            </h3>
            <p className="text-on-surface-variant">
              국가 공인 자격과 지속적인 기술 연마를 통해 최상위 수준의 품질 관리
              서비스를 보장합니다.
            </p>
          </article>

          <article className="col-span-12 bg-secondary p-12 md:col-span-4">
            <HomeIcon icon={Gauge} className="mb-8 size-12 text-white" />
            <h3 className="mb-4 text-2xl font-bold text-white">빠른 대응</h3>
            <p className="text-white/80">
              현장의 긴박함을 이해하기에 실시간 소통 채널과 신속한 장비 수급
              시스템을 가동합니다.
            </p>
          </article>

          <article className="col-span-12 flex items-center gap-12 border border-outline-variant/10 bg-surface-container-lowest p-12 md:col-span-8">
            <div className="flex-1">
              <HomeIcon icon={Box} className="mb-8 size-12 text-secondary" />
              <h3 className="mb-4 text-2xl font-bold text-primary">
                안정적인 장비 공급
              </h3>
              <p className="text-on-surface-variant">
                자체 물류 시스템과 철저한 장비 점검을 통해 현장에서 즉시 사용
                가능한 최상의 장비만을 출고합니다.
              </p>
            </div>
            <div className="relative hidden h-48 w-48 overflow-hidden rounded-sm bg-surface-container lg:block">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd2hEPYEu2WZcVDQr9vBj6s8SV9HsPs6Ho25OssPka3jDIDkwu2bT79STfDSS522-ArQZTWrY2oeVTeXz3bfZmD2ZF-VKKRboJgqTkkVlhj3jXkJoTRO61-wjMoaZowMySZPK9ETyyktR85MB6POrfQ4BxhwEz-kuPNUPwRh7ea8P6befp5_7GoyX8xCND1FSto1Su6Ds_LCt8s4S-1qQFHkqAaHu_r5dEC_XLuxsBAJo1wXm_vNaOv0B2wlaOQn_aOrjhKWyrIdpB"
                alt="High-tech material testing sensor with metallic textures"
                fill
                sizes="192px"
                className="object-cover"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
