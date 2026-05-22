"use client";

import React from "react";
import { COOKIE_SETTINGS_EVENT } from "@/components/CookieConsent";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function CookieSettingsLink({ className, children }: Props) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_EVENT))}
      className={className}
    >
      {children}
    </button>
  );
}
