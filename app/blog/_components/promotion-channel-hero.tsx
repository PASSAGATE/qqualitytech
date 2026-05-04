import Image from "next/image";
import type { PromotionChannel } from "../_lib/promotion-channel-types";

export function PromotionChannelHero({
  channel,
}: {
  channel: PromotionChannel;
}) {
  return (
    <header className="relative min-h-[520px] overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKxMhT1zT29SgWveNZtgi3hBnPbNYF1YBLJaZaAdqpj7FhEF6J3ITydPbcJ_gXWWIcZODHm-7HyEoiaCv-RX5J0N8wUHAAFHoE4WB-MNNPqaAQoClczB0cxcoHqt4Qd8LFAbjIq6RY1GI6xTRjCMH8ghshDDkgfDOy9meC2t9yPgBrCC12HjmsTee6rPEYI1BGGXdKz6XcgM_oM1MetBavcfkFQyFk05VJaGlVtQDFpfA-mQZMtS0UZKTYeL2BFxuE_RcN_FQVWy2m"
          alt="Construction site and technical communication"
          fill
          preload
          sizes="100vw"
          className="object-cover opacity-35 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-[linear-gradient(65deg,var(--color-primary)_18%,rgba(0,21,42,0.9)_55%,rgba(0,21,42,0.28)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[520px] w-full max-w-[1600px] items-center px-5 py-20 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-secondary">
            Promotion Center
          </p>
          <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
            {channel.title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-on-primary-container md:text-xl">
            {channel.description}
          </p>
        </div>
      </div>
    </header>
  );
}
