import React from "react";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, Building } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { FadeInUp } from "@/components/FadeInUp";

export const metadata: Metadata = {
  title: "Kontakt – TAL COMPANY Žilina",
  description:
    "Máte stavebný projekt? Kontaktujte TAL COMPANY s.r.o. v Žiline. Adresa Dolné Rudiny 41A, telefón +421 903 385 297, email tal@talcompany.sk.",
  alternates: { canonical: "/kontakt" },
};

export default function Kontakt() {
  return (
    <>
      <PageHero
        title="Kontakt"
        subtitle="Máte stavebný projekt? Kontaktujte nás a my Vám radi poradíme."
        image="/sources/portfolio/hero1.jpg"
        alt="TAL COMPANY – kontakt"
      />
      <div className="py-16 md:py-20 bg-white flex flex-col w-full">
        <div className="w-[90vw] mx-auto md:w-full md:max-w-7xl md:px-10 space-y-12">
          <FadeInUp className="max-w-3xl space-y-3">
            <span className="text-brand-blue font-semibold uppercase tracking-wider text-sm">— SPOJTE SA S NAMI</span>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              Máte stavebný projekt alebo otázku? Neváhajte nás kontaktovať, radi vám poradíme a navrhneme optimálne riešenie.
            </p>
          </FadeInUp>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16">
            {/* Column 1: Contacts & Billing */}
            <FadeInUp className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-brand-blue" />
                    <h3 className="font-bold text-brand-dark-gray text-base uppercase tracking-wider">Adresa</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed font-semibold">
                    Dolné Rudiny 41A<br />
                    010 01 Žilina<br />
                    Slovenská republika
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-brand-blue" />
                    <h3 className="font-bold text-brand-dark-gray text-base uppercase tracking-wider">Priamy kontakt</h3>
                  </div>
                  <div className="text-gray-500 text-sm font-semibold space-y-1">
                    <p>
                      Tel:{" "}
                      <a href="tel:+421903385297" className="text-brand-dark-gray hover:text-brand-blue transition-colors">
                        +421 903 385 297
                      </a>
                    </p>
                    <p>
                      Email:{" "}
                      <a href="mailto:tal@talcompany.sk" className="text-brand-dark-gray hover:text-brand-blue transition-colors">
                        tal@talcompany.sk
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-light-gray p-8 border border-gray-100 space-y-4">
                <div className="flex items-center gap-3">
                  <Building className="w-6 h-6 text-brand-blue" />
                  <h3 className="font-bold text-brand-dark-gray text-base uppercase tracking-wider">Fakturačné údaje</h3>
                </div>
                <div className="grid grid-cols-2 gap-y-2 text-sm font-semibold text-brand-dark-gray">
                  <div className="text-gray-400 uppercase text-xs">Spoločnosť:</div>
                  <div>TAL COMPANY s.r.o.</div>
                  <div className="text-gray-400 uppercase text-xs">IČO:</div>
                  <div>50992309</div>
                  <div className="text-gray-400 uppercase text-xs">DIČ:</div>
                  <div>2120553990</div>
                  <div className="text-gray-400 uppercase text-xs">IČ DPH:</div>
                  <div>SK2120553990</div>
                </div>
              </div>

              <div className="relative h-[250px] w-full border border-gray-100 shadow-sm">
                <iframe
                  title="TAL COMPANY Žilina mapa"
                  src="https://maps.google.com/maps?q=Doln%C3%A9%20Rudiny%2041A,%20%C5%BDilina&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </FadeInUp>

            {/* Column 2: Form */}
            <FadeInUp delay={0.1} className="bg-brand-light-gray p-8 md:p-12 border border-gray-100 flex flex-col justify-center">
              <ContactForm />
            </FadeInUp>
          </div>
        </div>
      </div>
    </>
  );
}
