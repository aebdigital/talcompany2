"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Domov", href: "/" },
    { name: "Služby", href: "/sluzby" },
    { name: "Galéria", href: "/galeria" },
    { name: "Kontakt", href: "/kontakt" },
  ];

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 w-1 h-full bg-blue-100/10 z-[9999]">
        <div 
          className="w-full bg-brand-blue scroll-progress-bar"
          style={{
            height: typeof window !== "undefined" 
              ? `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` 
              : "0%"
          }}
        />
      </div>

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md py-4 shadow-md border-b border-gray-100"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[95%] mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="logo-link">
            <span
              className={`text-2xl font-bold tracking-widest transition-colors duration-300 ${
                scrolled ? "text-brand-dark-gray" : "text-white drop-shadow-md"
              }`}
            >
              TAL COMPANY
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm uppercase tracking-wider font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-brand-blue text-white px-5 py-2"
                        : scrolled
                        ? "text-brand-dark-gray hover:text-brand-blue"
                        : "text-white hover:text-brand-blue drop-shadow-sm"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Hamburger button */}
          <button
            onClick={() => setMobileOpen(true)}
            className={`md:hidden p-2 transition-colors duration-300 ${
              scrolled ? "text-brand-dark-gray" : "text-white"
            }`}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-brand-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-4/5 max-w-sm h-full bg-white px-8 py-6 shadow-2xl flex flex-col gap-8 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Drawer Header */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <span className="text-xl font-bold tracking-widest text-brand-dark-gray">
              TAL COMPANY
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-brand-dark-gray p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-base uppercase tracking-wider font-semibold py-2 border-b border-gray-50 transition-colors ${
                      isActive
                        ? "text-brand-blue font-bold"
                        : "text-brand-dark-gray hover:text-brand-blue"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pt-6 border-t border-gray-100 text-xs text-brand-gray space-y-2">
            <p>Dolné Rudiny 41A, Žilina</p>
            <p>tal@talcompany.sk</p>
            <p>+421 903 385 297</p>
          </div>
        </div>
      </div>
    </>
  );
}
