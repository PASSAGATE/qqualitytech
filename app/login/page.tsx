import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ArrowRight, Lock, User } from "lucide-react";
import { loginAction } from "./actions";

export const metadata: Metadata = {
  title: "로그인 | 큐품질관리기술",
  description:
    "큐품질관리기술 로그인 페이지에서 권한이 있는 계정으로 접속할 수 있습니다.",
};

function Icon({
  icon: IconComponent,
  className = "",
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <IconComponent aria-hidden="true" className={className} strokeWidth={1.8} />
  );
}

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-6 py-10 text-on-surface antialiased">
      <div className="fixed inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUwLLTo-AsFizg7NyMViKQTiKt7EpEMc72MBPGpo-mJRDgtxet4b6zNQ6Tr0aw1tw9YaAj4UIoO_KY7_hGMiotWngwuq9IybEHmj_0apdTg9yJY7Ksl6JBvb0jF9uplzQITMc_B6RnM7QoP5RvfTg6Zk8744zklfctHCezxKbFtaWNFsNSI0yoezST5NtzInIqWI9nqIR0O9gFCo8JOPuqZ6jfgAHY_husDuv5DqD4RLZ1hROybvHaQLGvVGpQwf9BczYk1L-UC0Fz"
          alt="Modern high-tech industrial facility interior with precision machinery"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,21,42,0.92)_0%,rgba(16,42,67,0.85)_100%)]" />
      </div>

      <div className="relative z-10 grid w-full max-w-[1200px] gap-0 md:grid-cols-12">
        {/* Left branding panel */}
        <section className="hidden flex-col justify-center pr-12 md:col-span-5 md:flex">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-all hover:bg-white/90 active:scale-95"
          >
            <ArrowLeft className="size-4" strokeWidth={1.8} />
            홈으로 돌아가기
          </Link>
          <span className="mb-4 inline-block bg-secondary px-3 py-1 text-xs font-bold tracking-[0.28em] text-white uppercase">
            Member Login
          </span>
          <h1 className="text-5xl font-black leading-[1.1] tracking-[-0.03em] text-white">
            큐품질관리기술
            <br />
            <span className="text-[#ffb693]">로그인</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-on-primary-container">
            산업 현장의 품질관리 전문기업. 시험장비 구매 및 임대, 상담 서비스를
            이용하시려면 로그인하세요.
          </p>

          <div className="mt-10 flex gap-12">
            <div>
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-sm font-medium text-on-primary-container">
                정밀도 정확성
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm font-medium text-on-primary-container">
                실시간 모니터링
              </div>
            </div>
          </div>
        </section>

        {/* Right form panel */}
        <section className="flex items-center md:col-span-7">
          <div className="w-full border border-white/20 bg-white/95 p-8 shadow-[0px_16px_48px_rgba(23,28,31,0.08)] backdrop-blur-md md:p-12">
            {/* Mobile homepage link */}
            <div className="mb-6 md:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-md border border-outline-variant/40 px-4 py-2 text-sm font-semibold text-on-surface-variant transition-all hover:border-secondary hover:text-secondary"
              >
                <ArrowLeft className="size-4" strokeWidth={1.8} />
                홈으로 돌아가기
              </Link>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-primary">
                로그인
              </h2>
              <p className="mt-2 text-sm text-on-surface-variant">
                계정 정보를 입력하여 로그인하세요.
              </p>
            </div>

            <form action={loginAction} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="admin-email"
                  className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant"
                >
                  <Icon icon={User} className="size-[18px]" />
                  이메일
                </label>
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="example@email.com"
                  className="w-full border-b-2 border-transparent bg-surface-container-highest px-4 py-3 font-medium text-primary outline-none transition-all focus:border-secondary"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="admin-pw"
                  className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant"
                >
                  <Icon icon={Lock} className="size-[18px]" />
                  비밀번호
                </label>
                <input
                  id="admin-pw"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full border-b-2 border-transparent bg-surface-container-highest px-4 py-3 font-medium text-primary outline-none transition-all focus:border-secondary"
                />
              </div>

              {error ? (
                <p className="rounded-sm bg-[#fde8e8] px-4 py-2 text-sm font-semibold text-[#b42318]">
                  {error}
                </p>
              ) : null}

              <div className="flex items-center justify-between py-2">
                <label className="group flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded-sm border-outline-variant text-secondary focus:ring-secondary/20"
                  />
                  <span className="text-sm text-on-surface-variant transition-colors group-hover:text-primary">
                    로그인 상태 유지
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm font-semibold text-secondary transition-colors hover:text-[#fd7629]"
                >
                  아이디/비밀번호 찾기
                </a>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 bg-secondary py-4 text-base font-bold tracking-[0.03em] text-white transition-all hover:bg-[#fd7629] active:scale-[0.98]"
              >
                로그인
                <Icon icon={ArrowRight} className="size-5" />
              </button>

              <p className="text-center text-sm text-on-surface-variant">
                아직 계정이 없으신가요?{" "}
                <Link
                  href="/register"
                  className="font-bold text-secondary transition-colors hover:text-[#fd7629]"
                >
                  회원가입
                </Link>
              </p>
            </form>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-outline-variant/20 pt-6 text-center">
              <a
                href="#"
                className="text-[11px] font-medium text-on-surface-variant transition-colors hover:text-primary"
              >
                이용약관
              </a>
              <span className="text-[11px] text-outline-variant">|</span>
              <a
                href="#"
                className="text-[11px] font-bold text-on-surface-variant transition-colors hover:text-primary"
              >
                개인정보처리방침
              </a>
              <span className="text-[11px] text-outline-variant">|</span>
              <Link
                href="/contact"
                className="text-[11px] font-medium text-on-surface-variant transition-colors hover:text-primary"
              >
                고객지원
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
