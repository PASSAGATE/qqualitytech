import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MailCheck } from "lucide-react";
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
    <main className="min-h-screen bg-surface px-6 py-12 text-on-surface antialiased">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-12">
        <section className="rounded-2xl border border-outline-variant/20 bg-primary p-8 text-white lg:col-span-5 lg:p-10">
          <span className="inline-block bg-secondary px-3 py-1 text-xs font-bold tracking-[0.2em] uppercase">
            Email Signup
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight">회원가입</h1>
          <p className="mt-4 text-sm leading-relaxed text-on-primary-container">
            이메일 인증을 통해 계정을 안전하게 생성합니다. 가입 후 이메일에서
            확인 링크를 눌러 활성화해 주세요.
          </p>

          <ol className="mt-8 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MailCheck className="mt-0.5 size-5 text-secondary" />
              <span>1. 회원정보 입력 후 가입 요청</span>
            </li>
            <li className="flex items-start gap-3">
              <MailCheck className="mt-0.5 size-5 text-secondary" />
              <span>2. 이메일로 받은 인증 링크 클릭</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-5 text-secondary" />
              <span>3. 인증 완료 후 로그인</span>
            </li>
          </ol>

          <div className="mt-10 border-t border-white/20 pt-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white"
            >
              로그인 페이지로 이동 <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <section className="space-y-6 lg:col-span-7">
          {error ? (
            <p className="rounded-md bg-[#fde8e8] px-4 py-3 text-sm font-semibold text-[#b42318]">
              {error}
            </p>
          ) : null}

          {success ? (
            <p className="rounded-md bg-[#e7f6ec] px-4 py-3 text-sm font-semibold text-[#087443]">
              {success}
            </p>
          ) : null}

          <div className="rounded-2xl border border-outline-variant/20 bg-white p-6">
            <h2 className="text-xl font-bold text-primary">회원가입 정보 입력</h2>
            <p className="mt-2 text-sm text-on-surface-variant">
              가입 후 이메일 인증 링크를 확인하셔야 로그인이 가능합니다.
            </p>

            <form action={registerWithEmailConfirmationAction} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-semibold">
                  이메일
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="customer@example.com"
                  className="w-full rounded-md border border-outline-variant/40 px-3 py-2.5 outline-none focus:border-secondary"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="companyName" className="text-sm font-semibold">
                  회사명
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  required
                  placeholder="Acme Corp"
                  className="w-full rounded-md border border-outline-variant/40 px-3 py-2.5 outline-none focus:border-secondary"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-semibold">
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="StrongPassword123!"
                  className="w-full rounded-md border border-outline-variant/40 px-3 py-2.5 outline-none focus:border-secondary"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="text-sm font-semibold">
                  비밀번호 확인
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={8}
                  placeholder="비밀번호를 다시 입력해 주세요"
                  className="w-full rounded-md border border-outline-variant/40 px-3 py-2.5 outline-none focus:border-secondary"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="fullName" className="text-sm font-semibold">
                  이름
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="홍길동"
                  className="w-full rounded-md border border-outline-variant/40 px-3 py-2.5 outline-none focus:border-secondary"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-sm font-semibold">
                  전화번호 (선택)
                </label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="+821012345678"
                  className="w-full rounded-md border border-outline-variant/40 px-3 py-2.5 outline-none focus:border-secondary"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0f2a43]"
              >
                가입하기
              </button>
            </form>

            {confirmEmailStep ? (
              <p className="mt-4 rounded-md bg-[#eef7ff] px-4 py-3 text-sm font-medium text-[#0b4b84]">
                {email ? (
                  <>
                    인증 메일 발송 대상: <span className="font-mono">{email}</span>
                  </>
                ) : (
                  "인증 메일을 확인해 주세요."
                )}
              </p>
            ) : null}

            <p className="mt-4 text-sm text-on-surface-variant">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/login"
                className="font-bold text-secondary transition-colors hover:text-[#fd7629]"
              >
                로그인
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
