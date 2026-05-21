"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Building, CheckCircle2 } from "lucide-react";

export default function Kontakt() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log("Submitting form data: ", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="py-20 md:py-28 bg-white flex flex-col w-full">
      <div className="max-w-[95%] mx-auto px-6 space-y-16">
        {/* Header Title */}
        <div className="max-w-3xl space-y-4">
          <span className="text-brand-blue font-semibold uppercase tracking-wider text-sm">— SPOJTE SA S NAMI</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-dark-gray uppercase">
            Kontakt
          </h1>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Máte stavebný projekt alebo otázku? Neváhajte nás kontaktovať, radi vám poradíme a navrhneme optimálne riešenie.
          </p>
        </div>

        {/* Info & Form Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Column 1: Contacts & Billing */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Address */}
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

              {/* Phone & Email */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-brand-blue" />
                  <h3 className="font-bold text-brand-dark-gray text-base uppercase tracking-wider">Priamy kontakt</h3>
                </div>
                <div className="text-gray-500 text-sm font-semibold space-y-1">
                  <p>Tel: <a href="tel:+421903385297" className="text-brand-dark-gray hover:text-brand-blue transition-colors">+421 903 385 297</a></p>
                  <p>Email: <a href="mailto:tal@talcompany.sk" className="text-brand-dark-gray hover:text-brand-blue transition-colors">tal@talcompany.sk</a></p>
                </div>
              </div>
            </div>

            {/* Invoicing info */}
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

            {/* Map Frame */}
            <div className="relative h-[250px] w-full border border-gray-100 shadow-sm">
              <iframe
                title="TAL COMPANY Žilina location map"
                src="https://maps.google.com/maps?q=Doln%C3%A9%20Rudiny%2041A,%20%C5%BDilina&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Column 2: Form */}
          <div className="bg-brand-light-gray p-8 md:p-12 border border-gray-100 flex flex-col justify-center">
            {submitted ? (
              <div className="space-y-4 text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-brand-blue mx-auto" />
                <h3 className="text-2xl font-bold text-brand-dark-gray uppercase tracking-wide">
                  Správa odoslaná!
                </h3>
                <p className="text-gray-500 font-medium text-sm">
                  Ďakujeme za kontaktovanie. Odpovieme vám v čo najkratšom čase.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-brand-blue hover:bg-brand-dark-blue text-white uppercase text-xs font-semibold tracking-wider px-6 py-3 transition-colors duration-300 mt-4"
                >
                  Napísať novú správu
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-brand-dark-gray uppercase tracking-wide">Napíšte nám</h3>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Vyplňte formulár a my sa vám ozveme</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-brand-dark-gray uppercase tracking-wider mb-2">Meno a priezvisko</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Meno a priezvisko"
                      className="w-full bg-white border border-gray-200 focus:border-brand-blue px-4 py-3 text-sm font-medium outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-brand-dark-gray uppercase tracking-wider mb-2">E-mailová adresa</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vashovec@firma.sk"
                      className="w-full bg-white border border-gray-200 focus:border-brand-blue px-4 py-3 text-sm font-medium outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-brand-dark-gray uppercase tracking-wider mb-2">Telefónne číslo</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+421 903 123 456"
                      className="w-full bg-white border border-gray-200 focus:border-brand-blue px-4 py-3 text-sm font-medium outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-brand-dark-gray uppercase tracking-wider mb-2">Vaša správa</label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Dobrý deň, mal by som záujem o cenovú ponuku na..."
                      className="w-full bg-white border border-gray-200 focus:border-brand-blue px-4 py-3 text-sm font-medium outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-blue hover:bg-brand-dark-blue text-white uppercase text-sm font-semibold tracking-wider py-4 transition-colors duration-300"
                >
                  Odoslať dopyt
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
