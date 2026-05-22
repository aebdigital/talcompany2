"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FadeInUp } from "@/components/FadeInUp";

const HERO_IMAGES = [
  "/sources/portfolio/HERO=EXTRA.jpg",
  "/sources/portfolio/hero-2.jpg",
  "/sources/portfolio/hero1.jpg",
  "/sources/portfolio/photo-3.jpg",
  "/sources/portfolio/photo-5.jpg"
];

const PARTNER_LOGOS = [
  { name: "BB Centrum", src: "/sources/partneri-logo/bb_centrum.jpg" },
  { name: "Bilingválne gymnázium", src: "/sources/partneri-logo/bilingvalne_gymnazium.jpg" },
  { name: "Billa", src: "/sources/partneri-logo/billa.jpg" },
  { name: "Bytterm", src: "/sources/partneri-logo/bytterm.jpg" },
  { name: "Coop Jednota", src: "/sources/partneri-logo/coop_jednota.jpg" },
  { name: "DM", src: "/sources/partneri-logo/dm-logo.jpg" },
  { name: "Schiedel", src: "/sources/partneri-logo/schiedel.jpg" },
  { name: "Slovenské elektrárne", src: "/sources/partneri-logo/slov_elektrarne.jpg" },
  { name: "SPP", src: "/sources/partneri-logo/spp.jpg" },
  { name: "VÚB", src: "/sources/partneri-logo/vub.jpg" },
  { name: "VÚC Žilina", src: "/sources/partneri-logo/vuc_za.jpg" }
];

const FEATURED_PROJECTS = [
  {
    id: "30",
    title: "ÚVN SNP Ružomberok",
    type: "rekonštrukcia, od roku 2019",
    image: "/sources/portfolio/30/uvn_ruzomberok_(5).jpg"
  },
  {
    id: "7",
    title: "Základná škola v Zázrivej",
    type: "rok 2008",
    image: "/sources/portfolio/7/zs_zazriva_001.jpg"
  },
  {
    id: "29",
    title: "CAPITIS development, s.r.o",
    type: "od roku 2019",
    image: "/sources/portfolio/29/capitis_(4).jpg"
  },
  {
    id: "17",
    title: "Budova ALPHA",
    type: "BB Centrum, Praha 4, rok 2011-2012",
    image: "/sources/portfolio/17/alpha_praha_001.jpg"
  }
];

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[95vh] w-full overflow-hidden flex items-center -mt-[88px] md:-mt-[100px]">
        {/* Slideshow background */}
        <div className="absolute inset-0 bg-brand-black/50 z-10" />
        <div className="absolute inset-0 w-full h-full">
          {HERO_IMAGES.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === heroIdx ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={src}
                alt={`Hero construction project ${i + 1}`}
                fill
                priority={i === 0}
                className="object-cover scale-105"
              />
            </div>
          ))}
        </div>

        {/* Hero text */}
        <div className="relative z-20 w-[90vw] mx-auto md:w-full md:max-w-[95%] md:px-6 mt-20">
          <div className="max-w-4xl space-y-6">
            <FadeInUp trigger="mount">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.1] drop-shadow-md">
                KOMPLEXNÉ STAVEBNÉ RIEŠENIA PRE KAŽDÝ PROJEKT
              </h1>
            </FadeInUp>
            <FadeInUp trigger="mount" delay={0.15}>
              <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl drop-shadow-sm leading-relaxed">
                Spoľahlivý partner vo výstavbe a rekonštrukciách. Realizujeme vaše stavebné vízie s vysokou kvalitou a dodržaním termínov.
              </p>
            </FadeInUp>
            <FadeInUp trigger="mount" delay={0.3} className="flex flex-wrap gap-5 pt-4">
              <Link
                href="/galeria"
                className="bg-brand-blue hover:bg-brand-dark-blue text-white uppercase text-sm font-semibold tracking-wider px-8 py-4 transition-colors duration-300"
              >
                Projekty
              </Link>
              <Link
                href="/kontakt"
                className="border border-white hover:bg-white hover:text-brand-dark-gray text-white uppercase text-sm font-semibold tracking-wider px-8 py-4 transition-all duration-300"
              >
                Kontakt
              </Link>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Partners Marquee Logo Loop */}
      <section className="bg-white border-y border-gray-100 py-10 overflow-hidden">
        <div className="w-[90vw] mx-auto md:w-full md:max-w-[95%] md:px-6">
          <div className="relative w-full overflow-hidden select-none">
            <div className="animate-marquee gap-16 items-center">
              {/* First Track Loop */}
              {PARTNER_LOGOS.map((partner, i) => (
                <div key={`${partner.name}-${i}`} className="relative w-36 h-12 shrink-0">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    fill
                    sizes="150px"
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
              {/* Duplicate Track Loop for Seamless Effect */}
              {PARTNER_LOGOS.map((partner, i) => (
                <div key={`${partner.name}-dup-${i}`} className="relative w-36 h-12 shrink-0">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    fill
                    sizes="150px"
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="w-[90vw] mx-auto md:w-full md:max-w-[95%] md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: About Text */}
          <FadeInUp className="space-y-6">
            <div className="flex flex-col gap-2">
              <span className="text-brand-blue font-semibold uppercase tracking-wider text-sm">— KTO SME</span>
              <h2 className="text-4xl font-bold tracking-tight text-brand-dark-gray">O nás</h2>
            </div>
            <div className="text-gray-600 space-y-4 text-base leading-relaxed font-medium">
              <p>
                Sme stavebno-obchodná spoločnosť fungujúca na trhu od roku 2006, ktorej hlavným cieľom je poskytovanie kvalitných a spoľahlivých služieb v oblasti stavebného, developerského a obchodného segmentu. Našou filozofiou je korektný prístup zabezpečujúci kvalitu a včasnosť vykonávaných prác a služieb, tímová práca, operatívnosť, profesionalita, otvorenosť, diskrétnosť a ústretovosť.
              </p>
              <p>
                Naše portfólio služieb zahŕňa komplexné stavebné práce od výstavby domov na kľúč, cez hydroizolácie a zatepľovanie budov, až po servisné a udržiavacie práce pre všetky typy stavieb. Realizujeme tiež projekty v oblasti záhradnej a krajinnej architektúry, výstavby komunikácií a inžinierskych sietí, pričom každý projekt pristupujeme s maximálnou odbornosťou a dôrazom na kvalitu.
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-3 bg-brand-blue hover:bg-brand-dark-blue text-white uppercase text-sm font-semibold tracking-wider px-8 py-4 transition-colors duration-300"
              >
                Kontaktujte nás
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </FadeInUp>

          {/* Right: About Visual Grid */}
          <FadeInUp delay={0.1} className="grid grid-cols-2 gap-6 w-full lg:max-w-2xl mx-auto">
            <div className="flex flex-col gap-6">
              <div className="relative h-[250px] md:h-[280px] w-full overflow-hidden shadow-md">
                <Image
                  src="/sources/portfolio/photo-1.jpg"
                  alt="Udržiavacie stavebné práce"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-[220px] md:h-[240px] w-full overflow-hidden shadow-md">
                <Image
                  src="/sources/portfolio/7/zs_zazriva_001.jpg"
                  alt="Základná škola v Zázrivej"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="relative h-[490px] md:h-[544px] w-full overflow-hidden shadow-md">
              <Image
                src="/sources/portfolio/photo-3.jpg"
                alt="Moderná bytová stavba"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="py-24 bg-brand-light-gray border-t border-gray-100">
        <div className="w-[90vw] mx-auto md:w-full md:max-w-[95%] md:px-6 space-y-12">
          <FadeInUp className="flex justify-between items-end">
            <h2 className="text-4xl font-bold tracking-tight text-brand-dark-gray">Naše projekty</h2>
            <Link
              href="/galeria"
              className="text-brand-blue hover:text-brand-dark-blue font-semibold uppercase tracking-wider text-sm border-b-2 border-brand-blue/30 hover:border-brand-blue transition-colors"
            >
              Všetky projekty
            </Link>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURED_PROJECTS.map((project, idx) => (
              <FadeInUp key={project.id} delay={idx * 0.08}>
              <Link
                href={`/projekty/${project.id}`}
                className="group relative h-[350px] md:h-[420px] overflow-hidden bg-brand-dark-gray shadow-md block"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Visual overlay hover effect */}
                <div className="absolute inset-0 bg-brand-dark-gray/30 group-hover:bg-brand-blue/90 transition-all duration-500 ease-out z-10 flex flex-col justify-end p-8" />
                <div className="absolute bottom-0 left-0 p-8 z-20 text-white transform group-hover:translate-y-[-10px] transition-transform duration-500">
                  <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">{project.title}</h3>
                  <p className="text-sm text-white/80 font-medium uppercase tracking-widest">{project.type}</p>
                </div>
              </Link>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
