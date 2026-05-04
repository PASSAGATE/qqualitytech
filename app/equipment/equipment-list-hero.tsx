import Image from "next/image";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDd2hEPYEu2WZcVDQr9vBj6s8SV9HsPs6Ho25OssPka3jDIDkwu2bT79STfDSS522-ArQZTWrY2oeVTeXz3bfZmD2ZF-VKKRboJgqTkkVlhj3jXkJoTRO61-wjMoaZowMySZPK9ETyyktR85MB6POrfQ4BxhwEz-kuPNUPwRh7ea8P6befp5_7GoyX8xCND1FSto1Su6Ds_LCt8s4S-1qQFHkqAaHu_r5dEC_XLuxsBAJo1wXm_vNaOv0B2wlaOQn_aOrjhKWyrIdpB";

export function EquipmentListHero() {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Professional construction testing equipment catalog background"
          fill
          preload
          sizes="100vw"
          className="object-cover opacity-35 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-[linear-gradient(65deg,var(--color-primary)_18%,rgba(0,21,42,0.9)_55%,rgba(0,21,42,0.28)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[620px] w-full max-w-[1600px] items-center px-5 py-24 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <span className="mb-5 block text-sm font-bold uppercase tracking-[0.24em] text-secondary">
            Industrial Catalog
          </span>
          <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
            정밀한 측정을 위한
            <br />
            전문 시험장비 카탈로그
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-on-primary-container md:text-xl">
            국제 표준을 준수하는 고정밀 건설 시험 장비를 통해 프로젝트의
            안전과 품질을 보장하십시오. 큐품질관리기술의 모든 장비는 엄격한
            캘리브레이션을 거쳐 제공됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}
