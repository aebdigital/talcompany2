import React from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FadeInUp } from "@/components/FadeInUp";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov – TAL COMPANY",
  description:
    "Zásady ochrany osobných údajov spoločnosti TAL COMPANY s.r.o. – aké údaje spracúvame, na aký účel, ako dlho ich uchovávame a aké sú vaše práva podľa GDPR.",
  alternates: { canonical: "/ochrana-osobnych-udajov" },
};

export default function OchranaOsobnychUdajov() {
  return (
    <>
      <PageHero
        title="Ochrana osobných údajov"
        subtitle="Ako spracúvame osobné údaje a aké máte práva podľa GDPR"
        image="/sources/portfolio/hero1.jpg"
        alt="TAL COMPANY – ochrana osobných údajov"
      />
      <div className="py-16 md:py-20 bg-white flex flex-col w-full">
        <FadeInUp as="article" className="w-[90vw] mx-auto md:w-full md:max-w-4xl md:px-10 space-y-6 text-gray-600 leading-relaxed [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-brand-dark-gray [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-brand-dark-gray [&_a]:text-brand-blue [&_a:hover]:text-brand-dark-blue [&_a]:underline">
          <div className="bg-brand-light-gray border border-gray-100 p-8 space-y-2 text-sm text-brand-dark-gray font-medium [&_a]:no-underline">
            <p className="font-bold text-base">TAL COMPANY, s.r.o.</p>
            <p>Dolné Rudiny 41A, 010 01 Žilina</p>
            <p>IČO: 45717711, DIČ: 2023095261</p>
            <p>IČ DPH: SK2023095261, podľa §4, registrácia od 14.10.2010</p>
            <p>
              E-mail:{" "}
              <a href="mailto:tal@talcompany.sk" className="text-brand-blue hover:text-brand-dark-blue">
                tal@talcompany.sk
              </a>
            </p>
            <p>
              Tel.:{" "}
              <a href="tel:+421903385297" className="text-brand-blue hover:text-brand-dark-blue">
                +421 903 385 297
              </a>
            </p>
            <p>
              Web:{" "}
              <a href="https://www.talcompany.sk" className="text-brand-blue hover:text-brand-dark-blue">
                www.talcompany.sk
              </a>
            </p>
          </div>

          <p>
            Tieto Zásady ochrany osobných údajov (ďalej len „Zásady“) popisujú, aké osobné údaje spracúvame v súvislosti s používaním našej webovej stránky a kontaktných formulárov.
          </p>

          <h2>I. Kontaktný formulár</h2>
          <p>
            Na stránke <a href="https://www.talcompany.sk">www.talcompany.sk</a> prevádzkujeme kontaktný formulár na dvoch samostatných stránkach, ktorého účelom je umožniť vám:
          </p>
          <ul>
            <li>Položiť otázku k našim produktom a službám</li>
            <li>Požiadať o cenovú ponuku</li>
          </ul>

          <p>
            <strong>Rozsah spracúvaných údajov:</strong>
          </p>
          <ul>
            <li>Meno a priezvisko</li>
            <li>E-mailová adresa</li>
            <li>Telefónne číslo</li>
          </ul>

          <p>
            <strong>Účel spracovania:</strong>
            <br />
            Spracúvame uvedené údaje, aby sme vás mohli kontaktovať a reagovať na váš dopyt.
          </p>

          <p>
            <strong>Právny základ:</strong>
            <br />
            Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred uzavretím zmluvy na žiadosť dotknutej osoby.
          </p>

          <p>
            <strong>Doba uchovávania:</strong>
            <br />
            Osobné údaje budeme uchovávať maximálne 10 rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.
          </p>

          <h2>II. Súbory cookies</h2>
          <p>Na našej webovej stránke používame cookies výlučne na nasledujúce účely:</p>
          <ul>
            <li>
              <strong>Nevyhnutné cookies</strong> – zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača).
            </li>
            <li>
              <strong>Štatistické (analytické) cookies</strong> – pomáhajú nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom používateľa).
            </li>
          </ul>

          <p>
            <strong>Správa súhlasov:</strong>
            <br />
            Používateľ môže kedykoľvek odvolať súhlas s využívaním štatistických cookies prostredníctvom nastavení cookie lišty alebo priamo v prehliadači.
          </p>

          <h2>III. Práva dotknutej osoby</h2>
          <p>Podľa nariadenia GDPR máte nasledujúce práva:</p>
          <ul>
            <li>Prístup k osobným údajom, ktoré spracúvame</li>
            <li>Oprava nepresných alebo neúplných údajov</li>
            <li>Vymazanie („právo zabudnutia“), ak na spracovanie už nie je právny základ</li>
            <li>Obmedzenie spracovania</li>
            <li>Prenosnosť údajov</li>
            <li>Odvolanie súhlasu – stane sa účinným dňom odvolania</li>
            <li>
              Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12, 820 07 Bratislava,{" "}
              <a href="https://www.dataprotection.gov.sk" target="_blank" rel="noreferrer">
                www.dataprotection.gov.sk
              </a>
              )
            </li>
          </ul>

          <p>
            V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na{" "}
            <a href="mailto:tal@talcompany.sk">tal@talcompany.sk</a> alebo telefónnom čísle{" "}
            <a href="tel:+421903385297">+421 903 385 297</a>.
          </p>

          <p className="text-sm text-gray-400 italic">Tieto Zásady nadobúdajú účinnosť dňom 16. 9. 2025.</p>
        </FadeInUp>
      </div>
    </>
  );
}
