import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { completeSignupAction, startVerificationAction } from "./actions";

export const metadata: Metadata = {
  title: "회원가입 | 큐품질관리기술",
  description:
    "본인인증 기반 회원가입 페이지입니다. 인증 완료 후 계정을 생성할 수 있습니다.",
};

type RegisterPageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
    sessionId?: string;
    step?: string;
  }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { error, success, sessionId, step } = await searchParams;

  const verifyStarted = Boolean(sessionId);
  const done = step === "done";

  return (
    <main className="min-h-screen bg-surface px-6 py-12 text-on-surface antialiased">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-12">
        <section className="rounded-2xl border border-outline-variant/20 bg-primary p-8 text-white lg:col-span-5 lg:p-10">
          <span className="inline-block bg-secondary px-3 py-1 text-xs font-bold tracking-[0.2em] uppercase">
            KYC Signup
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight">
            본인인증 회원가입
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-on-primary-container">
            회원가입은 반드시 본인인증을 통과해야 완료됩니다. 인증이 완료되면
            계정 생성이 가능합니다.
          </p>

          <ol className="mt-8 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 text-secondary" />
              <span>1. 이름/전화번호로 인증 세션 시작</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 text-secondary" />
              <span>2. 본인인증 완료 후 VERIFIED 상태 확인</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-5 text-secondary" />
              <span>3. 이메일/비밀번호 입력 후 회원가입 완료</span>
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
            <h2 className="text-xl font-bold text-primary">1) 인증 세션 시작</h2>
            <p className="mt-2 text-sm text-on-surface-variant">
              이름과 전화번호를 입력하면 백엔드에서 verification session을
              생성합니다.
            </p>

            <form action={startVerificationAction} className="mt-6 space-y-4">
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
                  전화번호
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  placeholder="+821012345678"
                  className="w-full rounded-md border border-outline-variant/40 px-3 py-2.5 outline-none focus:border-secondary"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2.5 text-sm font-bold text-white hover:bg-[#fd7629]"
              >
                인증 세션 시작
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-outline-variant/20 bg-white p-6">
            <h2 className="text-xl font-bold text-primary">2) 회원가입 완료</h2>
            <p className="mt-2 text-sm text-on-surface-variant">
              callback 이후 session이 VERIFIED 상태일 때만 완료됩니다.
            </p>
            <p className="mt-2 text-sm text-on-surface-variant">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/login"
                className="font-bold text-secondary transition-colors hover:text-[#fd7629]"
              >
                로그인
              </Link>
            </p>

            {!verifyStarted && !done ? (
              <p className="mt-4 rounded-md bg-surface-container-highest px-4 py-3 text-sm text-on-surface-variant">
                먼저 1단계에서 인증 세션을 시작해 주세요.
              </p>
            ) : null}

            {verifyStarted ? (
              <p className="mt-4 rounded-md bg-[#eef7ff] px-4 py-3 text-sm font-medium text-[#0b4b84]">
                현재 sessionId: <span className="font-mono">{sessionId}</span>
              </p>
            ) : null}

            <form action={completeSignupAction} className="mt-6 space-y-4">
              <input type="hidden" name="sessionId" value={sessionId ?? ""} />

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

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0f2a43]"
              >
                회원가입 완료
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
