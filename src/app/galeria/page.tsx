import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FadeInUp } from "@/components/FadeInUp";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Galéria projektov | TAL COMPANY",
  description:
    "Prehľad našich úspešne realizovaných stavebných projektov a referencií TAL COMPANY Žilina.",
  alternates: { canonical: "/galeria" },
};

export default function Gallery() {
  return (
    <>
      <PageHero
        title="Galéria projektov"
        subtitle="Pozrite si naše úspešne realizované stavebné projekty a referencie"
        image="/sources/portfolio/HERO=EXTRA.jpg"
        alt="TAL COMPANY – galéria projektov"
      />
      <div className="py-16 md:py-20 bg-white flex flex-col w-full">
        <div className="w-[90vw] mx-auto md:w-full md:max-w-[95%] md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {PROJECTS.map((project, idx) => (
              <FadeInUp key={project.id} delay={Math.min((idx % 8) * 0.04, 0.28)}>
                <Link
                  href={`/projekty/${project.id}`}
                  className="group relative h-[340px] md:h-[400px] overflow-hidden bg-brand-dark-gray shadow-md block"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Visual overlay hover effect — matches the homepage cards */}
                  <div className="absolute inset-0 bg-brand-dark-gray/30 group-hover:bg-brand-blue/90 transition-all duration-500 ease-out z-10" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-7 z-20 text-white transform group-hover:translate-y-[-10px] transition-transform duration-500">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-2 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/80 font-medium uppercase tracking-widest">
                      {project.year}
                    </p>
                  </div>
                </Link>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
