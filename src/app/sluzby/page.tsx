import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FadeInUp } from "@/components/FadeInUp";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Naše služby – komplexné stavebné riešenia",
  description:
    "Servisné a udržiavacie práce, zatepľovanie budov, hydroizolácie, výstavba rodinných domov, inžinierske siete a ďalšie stavebné služby od TAL COMPANY Žilina.",
  alternates: { canonical: "/sluzby" },
};

export default function Services() {
  return (
    <>
      <PageHero
        title="Naše služby"
        subtitle="Komplexné stavebné riešenia pre každý typ projektu"
        image="/sources/portfolio/HERO=EXTRA.jpg"
        alt="TAL COMPANY – stavebné služby"
      />
      <div className="py-16 md:py-24 bg-brand-light-gray flex flex-col w-full">
        <div className="w-[90vw] mx-auto md:w-full md:max-w-7xl md:px-10 space-y-10 md:space-y-14">
          {SERVICES.map((service, i) => {
            const imageFirst = i % 2 === 0;
            return (
              <FadeInUp
                key={service.title}
                as="article"
                className="bg-white shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-2"
              >
                <div
                  className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] ${
                    imageFirst ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    loading={i < 2 ? "eager" : "lazy"}
                    priority={i === 0}
                  />
                </div>
                <div
                  className={`p-8 md:p-12 lg:p-14 flex flex-col justify-center space-y-5 ${
                    imageFirst ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-dark-gray leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 pt-1">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm text-brand-dark-gray font-medium leading-relaxed"
                      >
                        <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInUp>
            );
          })}
        </div>
      </div>
    </>
  );
}
