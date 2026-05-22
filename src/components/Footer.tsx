import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { CookieSettingsLink } from "@/components/CookieSettingsLink";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#1a1a1a] text-[#b3b3b3] py-16 mt-auto border-t border-white/5">
      <div className="w-[90vw] mx-auto md:w-full md:max-w-[95%] md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/5">
          {/* Logo and About */}
          <div className="space-y-4">
            <span className="text-2xl font-bold tracking-widest text-white">TAL COMPANY</span>
            <p className="text-sm leading-relaxed text-gray-400">
              Spoľahlivý partner v oblasti stavebníctva, hydroizolácií a komplexných stavebných prác s 18-ročnými skúsenosťami na trhu.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Stránky</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Domov</Link>
              <Link href="/sluzby" className="hover:text-white transition-colors">Služby</Link>
              <Link href="/galeria" className="hover:text-white transition-colors">Galéria</Link>
              <Link href="/kontakt" className="hover:text-white transition-colors">Kontakt</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Kontakt</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-blue shrink-0" />
                <a href="mailto:tal@talcompany.sk" className="hover:text-white transition-colors">tal@talcompany.sk</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-blue shrink-0" />
                <a href="tel:+421903385297" className="hover:text-white transition-colors">+421 903 385 297</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <span>Dolné Rudiny 41A, 010 01 Žilina, Slovenská republika</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-gray-500 uppercase tracking-widest font-semibold">
          <p>© {new Date().getFullYear()} TAL COMPANY s.r.o. Všetky práva vyhradené.</p>
          <div className="flex gap-6">
            <Link href="/ochrana-osobnych-udajov" className="hover:text-white transition-colors">
              Ochrana osobných údajov
            </Link>
            <CookieSettingsLink className="hover:text-white transition-colors cursor-pointer">
              Cookies
            </CookieSettingsLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
