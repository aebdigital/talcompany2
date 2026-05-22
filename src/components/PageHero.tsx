import Image from "next/image";
import { FadeInUp } from "@/components/FadeInUp";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  image: string;
  alt?: string;
};

export function PageHero({ title, subtitle, image, alt }: PageHeroProps) {
  return (
    <section className="relative flex h-[44vh] min-h-[320px] w-full items-center justify-center overflow-hidden bg-brand-dark-gray">
      <Image
        src={image}
        alt={alt ?? title}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      <div className="relative z-10 w-[90vw] mx-auto md:w-full md:max-w-5xl md:px-6 text-center text-white">
        <FadeInUp trigger="mount">
          <h1 className="text-4xl font-bold uppercase tracking-tight md:text-6xl">{title}</h1>
        </FadeInUp>
        {subtitle && (
          <FadeInUp trigger="mount" delay={0.15}>
            <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-white/85 md:text-lg">
              {subtitle}
            </p>
          </FadeInUp>
        )}
      </div>
    </section>
  );
}
