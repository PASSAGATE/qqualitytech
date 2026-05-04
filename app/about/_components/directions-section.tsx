import { MapPin } from "lucide-react";
import { AboutIcon } from "./about-icon";

export function DirectionsSection() {
  return (
    <section
      id="directions"
      className="border-t border-outline-variant/20 bg-surface py-24 scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="rounded-sm border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm md:p-12">
          <h1 className="mb-6 flex items-center gap-2 text-2xl font-black tracking-tight text-primary">
            <AboutIcon icon={MapPin} className="size-5 text-secondary" />
            오시는 길
          </h1>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="group relative aspect-video w-full overflow-hidden rounded-sm bg-surface-container-highest lg:col-span-8">
              <iframe
                title="큐품질관리기술 위치"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3159.4877855487384!2d127.12421107629939!3d37.63773472004149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cb7621349b89f%3A0xe0c929cda93757a8!2z6rK96riw64-EIOq1rOumrOyLnCDqsIjrp6Trj5kgNTQ1!5e0!3m2!1sko!2skr!4v1777271349533!5m2!1sko!2skr"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
              <div className="absolute inset-0 bg-primary/20 transition-all group-hover:bg-transparent" />
              <div className="absolute bottom-4 left-4 border-l-4 border-secondary bg-white p-4 shadow-lg">
                <p className="text-sm font-bold text-primary">
                  경기도 구리시 갈매동 545
                </p>
                <p className="mt-1 text-xs text-on-surface-variant">
                  휴밸나인 9층 C동9051호, C동9052호
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6 lg:col-span-4">
              <div className="rounded-sm bg-primary p-8 text-white">
                <p className="mb-4 text-2xl font-black">
                  전문가가 대기 중입니다
                </p>
                <p className="text-sm leading-relaxed text-on-primary-container">
                  현장 상황을 고려한 맞춤형 컨설팅을 제공합니다. 문의 사항을
                  남겨주시면 평균 4시간 이내에 담당 엔지니어가 직접 검토 후 회신
                  드립니다.
                </p>
              </div>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                방문 전 연락주시면 담당자가 더 빠르게 안내해 드립니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
