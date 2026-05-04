import { Mail, Phone } from "lucide-react";
import { HomeIcon } from "./home-icon";

export function HomeContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(160,65,0,0.95)_0%,transparent_50%)] opacity-30" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 text-center sm:px-8 lg:px-12">
        <h2 className="mb-8 text-4xl font-black tracking-[-0.06em] text-white md:text-5xl">
          신속하고 정확한 상담, 지금 바로 문의하세요
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-on-primary-container">
          고객님의 현장에 가장 적합한 품질 관리 솔루션을 제안해 드립니다.
          <br />
          전문가와 직접 통화하여 궁금증을 해결하세요.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="tel:01066665269"
            className="inline-flex items-center gap-3 rounded-md bg-secondary px-12 py-5 text-xl font-bold text-white transition-transform hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
              boxShadow: "0 16px 30px rgba(255, 107, 44, 0.35)",
            }}
          >
            <HomeIcon icon={Phone} className="size-6" />
            010-8941-4628
          </a>
          <a
            href="mailto:qqstart@naver.com"
            className="inline-flex items-center gap-3 rounded-md bg-white px-12 py-5 text-xl font-bold text-primary transition-all hover:scale-105 active:scale-95"
          >
            <HomeIcon icon={Mail} className="size-6" />
            온라인 문의 작성
          </a>
        </div>
      </div>
    </section>
  );
}
