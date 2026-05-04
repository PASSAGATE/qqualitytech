import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  CircleHelp,
  Newspaper,
} from "lucide-react";
import { blogPreviewPosts } from "../blog/data";
import { homeFaqs } from "./home-data";
import { HomeIcon } from "./home-icon";

export function HomeInsightsFaqSection() {
  return (
    <section className="bg-surface-container-low py-24">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-24 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
        <div id="insights">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-3 text-3xl font-black tracking-[-0.05em] text-primary">
              <HomeIcon icon={Newspaper} className="size-7 text-secondary" />
              Latest Insights
            </h2>
            <Link
              href="/blog/naver-blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-secondary"
            >
              전체 글 보기
              <HomeIcon icon={ArrowUpRight} className="size-4" />
            </Link>
          </div>
          <div className="space-y-8">
            {blogPreviewPosts.map((item) => (
              <Link
                key={item.slug}
                href="/blog/naver-blog"
                className="group flex cursor-pointer flex-col gap-6 sm:flex-row"
              >
                <div className="relative h-32 w-full overflow-hidden rounded-sm bg-surface-container sm:w-32 sm:shrink-0">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="128px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <div className="mb-2 text-xs font-bold text-secondary">
                    {item.category}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-primary transition-colors group-hover:text-secondary">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div id="faq">
          <h2 className="mb-12 flex items-center gap-3 text-3xl font-black tracking-[-0.05em] text-primary">
            <HomeIcon icon={CircleHelp} className="size-7 text-secondary" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {homeFaqs.map((item) => (
              <details
                key={item.question}
                open={item.open}
                className="group border border-outline-variant/10 bg-surface-container-lowest"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-bold text-primary [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <HomeIcon
                    icon={ChevronDown}
                    className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                {item.answer ? (
                  <p className="px-6 pb-6 text-sm leading-relaxed text-on-surface-variant">
                    {item.answer}
                  </p>
                ) : null}
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
