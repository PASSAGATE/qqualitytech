import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, MailCheck } from "lucide-react";
import { registerWithEmailConfirmationAction } from "./actions";

export const metadata: Metadata = {
  title: "회원가입 | 큐품질관리기술",
  description:
    "이메일 인증 기반 회원가입 페이지입니다. 인증 메일 확인 후 로그인이 가능합니다.",
};

type RegisterPageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
    email?: string;
    step?: string;
  }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { error, success, email, step } = await searchParams;
  const confirmEmailStep = step === "confirm-email";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-6 py-12 text-on-surface antialiased">
      <div className="fixed inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUwLLTo-AsFizg7NyMViKQTiKt7EpEMc72MBPGpo-mJRDgtxet4b6zNQ6Tr0aw1tw9YaAj4UIoO_KY7_hGMiotWngwuq9IybEHmj_0apdTg9yJY7Ksl6JBvb0jF9uplzQITMc_B6RnM7QoP5RvfTg6Zk8744zklfctHCezxKbFtaWNFsNSI0yoezST5NtzInIqWI9nqIR0O9gFCo8JOPuqZ6jfgAHY_husDuv5DqD4RLZ1hROybvHaQLGvVGpQwf9BczYk1L-UC0Fz"
          alt="Modern high-tech industrial facility interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,21,42,0.92)_0%,rgba(16,42,67,0.85)_100%)]" />
      </div>

      <div className="relative z-10 grid w-full max-w-[1200px] gap-0 md:grid-cols-12">
        <section className="hidden flex-col justify-center pr-12 md:col-span-5 md:flex">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-all hover:bg-white/90 active:scale-95"
          >
            <ArrowLeft className="size-4" strokeWidth={1.8} />
            홈으로 돌아가기
          </Link>
          <span className="mb-4 inline-block bg-secondary px-3 py-1 text-xs font-bold tracking-[0.28em] text-white uppercase">
            Email Signup
          </span>
          <h1 className="text-5xl font-black leading-[1.1] tracking-[-0.03em] text-white">
            큐품질관리기술
            <br />
            <span className="text-[#ffb693]">회원가입</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-on-primary-container">
            이메일 인증을 통해 계정을 안전하게 생성합니다. 가입 후 이메일에서
            확인 링크를 눌러 활성화해 주세요.
          </p>

          <ol className="mt-10 space-y-4 text-sm text-on-primary-container">
            <li className="flex items-center gap-3">
              <MailCheck className="size-5 shrink-0 text-secondary" />
              1. 회원정보 입력 후 가입 요청
            </li>
            <li className="flex items-center gap-3">
              <MailCheck className="size-5 shrink-0 text-secondary" />
              2. 이메일로 받은 인증 링크 클릭
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="size-5 shrink-0 text-secondary" />
              3. 인증 완료 후 로그인
            </li>
          </ol>
        </section>

        <section className="flex items-start md:col-span-7">
          <div className="w-full border border-white/20 bg-white/95 p-8 shadow-[0px_16px_48px_rgba(23,28,31,0.08)] backdrop-blur-md md:p-12">
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
                회원가입 정보 입력
              </h2>
              <p className="mt-2 text-sm text-on-surface-variant">
                가입 후 이메일 인증 링크를 확인하셔야 로그인이 가능합니다.
              </p>
            </div>

            {error ? (
              <p className="mb-5 rounded-sm bg-[#fde8e8] px-4 py-3 text-sm font-semibold text-[#b42318]">
                {error}
              </p>
            ) : null}
            {success ? (
              <p className="mb-5 rounded-sm bg-[#e7f6ec] px-4 py-3 text-sm font-semibold text-[#087443]">
                {success}
              </p>
            ) : null}

            <form action={registerWithEmailConfirmationAction} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-on-surface-variant">
                    이름
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="홍길동"
                    className="w-full border-b-2 border-transparent bg-surface-container-highest px-4 py-3 font-medium text-primary outline-none transition-all focus:border-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="companyName" className="block text-sm font-semibold text-on-surface-variant">
                    회사명
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    required
                    placeholder="(주)회사명"
                    className="w-full border-b-2 border-transparent bg-surface-container-highest px-4 py-3 font-medium text-primary outline-none transition-all focus:border-secondary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-on-surface-variant">
                  이메일
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="customer@example.com"
                  className="w-full border-b-2 border-transparent bg-surface-container-highest px-4 py-3 font-medium text-primary outline-none transition-all focus:border-secondary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-on-surface-variant">
                  전화번호 <span className="font-normal text-outline">(선택)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="010-0000-0000"
                  className="w-full border-b-2 border-transparent bg-surface-container-highest px-4 py-3 font-medium text-primary outline-none transition-all focus:border-secondary"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-on-surface-variant">
                    비밀번호
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    placeholder="••••••••"
                    className="w-full border-b-2 border-transparent bg-surface-container-highest px-4 py-3 font-medium text-primary outline-none transition-all focus:border-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-on-surface-variant">
                    비밀번호 확인
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    placeholder="••••••••"
                    className="w-full border-b-2 border-transparent bg-surface-container-highest px-4 py-3 font-medium text-primary outline-none transition-all focus:border-secondary"
                  />
                </div>
              </div>

              {confirmEmailStep ? (
                <p className="rounded-sm bg-[#eef7ff] px-4 py-3 text-sm font-medium text-[#0b4b84]">
                  {email ? (
                    <>인증 메일 발송 대상: <span className="font-mono">{email}</span></>
                  ) : (
                    "인증 메일을 확인해 주세요."
                  )}
                </p>
              ) : null}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 bg-secondary py-4 text-base font-bold tracking-[0.03em] text-white transition-all hover:bg-[#fd7629] active:scale-[0.98]"
              >
                가입하기
                <ArrowRight className="size-5" strokeWidth={1.8} />
              </button>

              <p className="text-center text-sm text-on-surface-variant">
                이미 계정이 있으신가요?{" "}
                <Link
                  href="/login"
                  className="font-bold text-secondary transition-colors hover:text-[#fd7629]"
                >
                  로그인
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
