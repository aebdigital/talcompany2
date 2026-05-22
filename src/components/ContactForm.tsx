"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

type FormState = { name: string; email: string; phone: string; message: string };
type Status = "idle" | "submitting" | "success" | "error";

const INITIAL: FormState = { name: "", email: "", phone: "", message: "" };
const ENDPOINT = "/.netlify/functions/contact";

export function ContactForm() {
  const [data, setData] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Server odpovedal ${res.status}`);
      }

      setStatus("success");
      setData(INITIAL);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Nepodarilo sa odoslať správu.");
    }
  }

  if (status === "success") {
    return (
      <div className="space-y-4 text-center py-12">
        <CheckCircle2 className="w-16 h-16 text-brand-blue mx-auto" />
        <h3 className="text-2xl font-bold text-brand-dark-gray uppercase tracking-wide">
          Správa odoslaná!
        </h3>
        <p className="text-gray-500 font-medium text-sm">
          Ďakujeme za kontaktovanie. Odpovieme vám v čo najkratšom čase.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="bg-brand-blue hover:bg-brand-dark-blue text-white uppercase text-xs font-semibold tracking-wider px-6 py-3 transition-colors duration-300 mt-4"
        >
          Napísať novú správu
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-brand-dark-gray uppercase tracking-wide">Napíšte nám</h3>
        <p className="text-xs text-gray-400 uppercase font-semibold">Vyplňte formulár a my sa vám ozveme</p>
      </div>

      <div className="space-y-4">
        <Field
          id="name"
          label="Meno a priezvisko"
          required
          value={data.name}
          onChange={(v) => setData({ ...data, name: v })}
          placeholder="Meno a priezvisko"
          disabled={submitting}
        />
        <Field
          id="email"
          type="email"
          label="E-mailová adresa"
          required
          value={data.email}
          onChange={(v) => setData({ ...data, email: v })}
          placeholder="vasemail@firma.sk"
          disabled={submitting}
        />
        <Field
          id="phone"
          type="tel"
          label="Telefónne číslo"
          value={data.phone}
          onChange={(v) => setData({ ...data, phone: v })}
          placeholder="+421 903 123 456"
          disabled={submitting}
        />
        <div>
          <label htmlFor="message" className="block text-xs font-bold text-brand-dark-gray uppercase tracking-wider mb-2">
            Vaša správa
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={data.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
            placeholder="Dobrý deň, mal by som záujem o cenovú ponuku na..."
            disabled={submitting}
            className="w-full bg-white border border-gray-200 focus:border-brand-blue px-4 py-3 text-sm font-medium outline-none transition-colors resize-none disabled:opacity-60"
          />
        </div>
      </div>

      {status === "error" && (
        <div className="flex items-start gap-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{errorMessage || "Nepodarilo sa odoslať správu. Skúste prosím znova."}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-brand-blue hover:bg-brand-dark-blue disabled:bg-brand-blue/70 text-white uppercase text-sm font-semibold tracking-wider py-4 transition-colors duration-300 inline-flex items-center justify-center gap-2"
      >
        {submitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
        {submitting ? "Odosielam…" : "Odoslať dopyt"}
      </button>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
};

function Field({ id, label, value, onChange, type = "text", required, placeholder, disabled }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold text-brand-dark-gray uppercase tracking-wider mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full bg-white border border-gray-200 focus:border-brand-blue px-4 py-3 text-sm font-medium outline-none transition-colors disabled:opacity-60"
      />
    </div>
  );
}
