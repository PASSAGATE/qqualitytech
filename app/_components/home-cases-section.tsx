import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeFieldCasePreview } from "../cases/data";
import { HomeIcon } from "./home-icon";

export function HomeCasesSection() {
  return (
    <section id="cases" className="bg-primary py-24 text-white">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="mb-6 text-4xl font-black tracking-[-0.06em]">
              Field Cases
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-on-primary-container">
              전국 각지의 현장에서 큐품질관리기술의 기술력이 프로젝트의 완성도를
              높이고 있습니다.
            </p>
            <Link
              href="/#cases"
              className="mb-10 inline-flex items-center gap-2 font-bold text-white transition-colors hover:text-secondary"
            >
              전체 사례 보기
              <HomeIcon icon={ArrowUpRight} className="size-4" />
            </Link>
            <div className="space-y-4">
              <article className="border-l-4 border-secondary bg-white/5 p-6">
                <div className="mb-1 text-sm font-bold text-secondary">
                  진행중
                </div>
                <h3 className="text-xl font-bold">
                  인천국제공항 4단계 확장 현장
                </h3>
              </article>
              <article className="border-l-4 border-outline-variant/30 bg-white/5 p-6 opacity-60">
                <div className="mb-1 text-sm font-bold text-outline">완료</div>
                <h3 className="text-xl font-bold">
                  서울 세종로 정부종합청사 정밀진단
                </h3>
              </article>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {homeFieldCasePreview.map((item) => (
                <Link
                  key={item.slug}
                  id={item.slug}
                  href={`/#${item.slug}`}
                  className="group relative aspect-video overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-black/60 p-8">
                    <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                    <p className="text-sm text-on-primary-container">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
