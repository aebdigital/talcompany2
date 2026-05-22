"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "tal-cookie-consent";
const STORAGE_VERSION = 1;
export const COOKIE_SETTINGS_EVENT = "tal:open-cookie-settings";

type Consent = {
  version: number;
  necessary: true;
  statistics: boolean;
  decidedAt: string;
};

function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (parsed?.version !== STORAGE_VERSION) return null;
    return {
      version: STORAGE_VERSION,
      necessary: true,
      statistics: !!parsed.statistics,
      decidedAt: parsed.decidedAt ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

function writeConsent(consent: Omit<Consent, "version" | "decidedAt">) {
  if (typeof window === "undefined") return;
  const record: Consent = {
    version: STORAGE_VERSION,
    necessary: true,
    statistics: consent.statistics,
    decidedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  window.dispatchEvent(new CustomEvent("tal:consent-changed", { detail: record }));
}

export function CookieConsent() {
  const [stage, setStage] = useState<"hidden" | "banner" | "settings">("hidden");
  const [statistics, setStatistics] = useState(false);

  // First-load: decide whether to show the banner
  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setStage("banner");
    } else {
      setStatistics(existing.statistics);
    }
  }, []);

  // Allow other parts of the site (e.g. footer link) to reopen the settings dialog
  useEffect(() => {
    function openSettings() {
      const existing = readConsent();
      setStatistics(existing?.statistics ?? false);
      setStage("settings");
    }
    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  // Lock background scroll while settings dialog is open
  useEffect(() => {
    if (stage !== "settings") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [stage]);

  function acceptAll() {
    writeConsent({ necessary: true, statistics: true });
    setStatistics(true);
    setStage("hidden");
  }

  function acceptNecessary() {
    writeConsent({ necessary: true, statistics: false });
    setStatistics(false);
    setStage("hidden");
  }

  function saveSelected() {
    writeConsent({ necessary: true, statistics });
    setStage("hidden");
  }

  if (stage === "hidden") return null;

  return (
    <>
      {/* Banner (first visit) */}
      {stage === "banner" && (
        <div
          role="dialog"
          aria-label="Súhlas s používaním cookies"
          aria-describedby="cookie-banner-text"
          className="fixed inset-x-0 bottom-0 z-[80] mx-auto max-w-5xl m-4 md:m-6 bg-white border border-gray-200 shadow-2xl"
        >
          <div className="flex items-start gap-4 p-5 md:p-6">
            <div className="hidden md:grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-blue/10 text-brand-blue">
              <Cookie className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-base font-bold text-brand-dark-gray uppercase tracking-wider">
                Používame cookies
              </h2>
              <p id="cookie-banner-text" className="text-sm leading-relaxed text-gray-600">
                Na našej stránke používame nevyhnutné cookies pre základnú funkčnosť a štatistické cookies (len so súhlasom), ktoré nám pomáhajú zlepšovať obsah. Viac sa dozviete v{" "}
                <Link href="/ochrana-osobnych-udajov" className="text-brand-blue hover:text-brand-dark-blue underline">
                  zásadách ochrany osobných údajov
                </Link>
                .
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="bg-brand-blue hover:bg-brand-dark-blue text-white uppercase text-xs font-bold tracking-wider px-5 py-3 transition-colors"
                >
                  Prijať všetky
                </button>
                <button
                  type="button"
                  onClick={acceptNecessary}
                  className="border border-gray-300 hover:border-brand-dark-gray text-brand-dark-gray uppercase text-xs font-bold tracking-wider px-5 py-3 transition-colors"
                >
                  Iba nevyhnutné
                </button>
                <button
                  type="button"
                  onClick={() => setStage("settings")}
                  className="text-brand-blue hover:text-brand-dark-blue uppercase text-xs font-bold tracking-wider px-3 py-3 transition-colors"
                >
                  Nastavenia
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings dialog */}
      {stage === "settings" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Nastavenia cookies"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 md:p-6"
          onClick={() => setStage(readConsent() ? "hidden" : "banner")}
        >
          <div
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 p-6 md:p-8 border-b border-gray-100">
              <div className="space-y-1">
                <h2 className="text-xl md:text-2xl font-bold text-brand-dark-gray uppercase tracking-tight">
                  Nastavenia cookies
                </h2>
                <p className="text-sm text-gray-500">
                  Vyberte si, ktoré kategórie cookies povolíte. Svoju voľbu môžete kedykoľvek zmeniť.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStage(readConsent() ? "hidden" : "banner")}
                aria-label="Zavrieť"
                className="p-2 text-brand-dark-gray hover:text-brand-blue transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-5">
              <CategoryRow
                title="Nevyhnutné"
                description="Zabezpečujú základnú funkčnosť stránky (relácia, nastavenia prehliadača). Bez nich web nemôže správne fungovať."
                enabled
                locked
              />
              <CategoryRow
                title="Štatistické (analytické)"
                description="Pomáhajú nám pochopiť, ako návštevníci stránku používajú – anonymne, len so súhlasom."
                enabled={statistics}
                onChange={setStatistics}
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end p-6 md:p-8 border-t border-gray-100 bg-brand-light-gray">
              <button
                type="button"
                onClick={acceptNecessary}
                className="border border-gray-300 hover:border-brand-dark-gray text-brand-dark-gray uppercase text-xs font-bold tracking-wider px-5 py-3 transition-colors"
              >
                Iba nevyhnutné
              </button>
              <button
                type="button"
                onClick={saveSelected}
                className="bg-white border border-brand-dark-gray hover:bg-brand-dark-gray hover:text-white text-brand-dark-gray uppercase text-xs font-bold tracking-wider px-5 py-3 transition-colors"
              >
                Uložiť výber
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="bg-brand-blue hover:bg-brand-dark-blue text-white uppercase text-xs font-bold tracking-wider px-5 py-3 transition-colors"
              >
                Prijať všetky
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

type CategoryRowProps = {
  title: string;
  description: string;
  enabled: boolean;
  locked?: boolean;
  onChange?: (next: boolean) => void;
};

function CategoryRow({ title, description, enabled, locked, onChange }: CategoryRowProps) {
  return (
    <div className="flex items-start justify-between gap-6 border border-gray-100 p-5 bg-white">
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-brand-dark-gray uppercase tracking-wider">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={`Prepnúť kategóriu ${title}`}
        disabled={locked}
        onClick={() => onChange?.(!enabled)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          enabled ? "bg-brand-blue" : "bg-gray-300"
        } ${locked ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <span
          className={`absolute top-1 inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
