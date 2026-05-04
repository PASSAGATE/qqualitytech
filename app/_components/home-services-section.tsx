import { homeServices } from "./home-data";
import { HomeIcon } from "./home-icon";

export function HomeServicesSection() {
  return (
    <section id="services" className="bg-surface py-24">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-20">
          <h2 className="mb-4 text-4xl font-black tracking-[-0.06em] text-primary">
            Core Services
          </h2>
          <div className="h-1.5 w-20 bg-secondary" />
        </div>

        <div className="grid grid-cols-1 gap-px md:grid-cols-3">
          {homeServices.map((service) => (
            <article
              key={service.title}
              className={`group p-10 transition-colors duration-500 hover:bg-primary ${service.tone}`}
            >
              <HomeIcon
                icon={service.icon}
                className="mb-8 size-10 text-secondary transition-colors duration-500 group-hover:text-white"
              />
              <h3 className="mb-4 text-2xl font-bold tracking-[-0.04em] text-primary transition-colors duration-500 group-hover:text-white">
                {service.title}
              </h3>
              <p className="leading-relaxed text-on-surface-variant transition-colors duration-500 group-hover:text-on-primary-container">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
