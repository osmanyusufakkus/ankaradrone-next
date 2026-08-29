"use client";

import { useActionState, useId } from "react";
import {
  submitContactForm,
  type ContactField,
  type ContactFormState,
} from "@/lib/actions/contact";
import { PROJECT_TYPES } from "@/lib/site";
import { EMAIL_REGEX, PHONE_REGEX } from "@/lib/validation/contact";

// Lives here rather than beside the action: a "use server" module can only
// export async functions, and a const export there fails at runtime only.
const INITIAL_STATE: ContactFormState = { status: "idle", message: "" };

const FIELD_CLASSES =
  "w-full rounded-2xl border-1.5 border-white/10 bg-brand-black/40 px-4 py-3 text-[15px] text-brand-white transition-colors duration-200 placeholder:text-white/30 focus:border-brand-blue focus:outline-none aria-[invalid=true]:border-red-400/70";

const LABEL_CLASSES =
  "mb-2 block text-[11px] font-bold tracking-[2px] text-white/50 uppercase";

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-red-400">
      {children}
    </p>
  );
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, INITIAL_STATE);
  const uid = useId();

  const fieldId = (field: ContactField) => `${uid}-${field}`;
  const errorId = (field: ContactField) => `${uid}-${field}-error`;
  /** Wires a field to its error message for screen readers, and marks it invalid. */
  const errorProps = (field: ContactField) =>
    state.fieldErrors?.[field]
      ? { "aria-invalid": true as const, "aria-describedby": errorId(field) }
      : {};

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex h-full min-h-75 flex-col items-center justify-center rounded-3xl border-1.5 border-brand-blue/25 bg-brand-black/40 p-10 text-center"
      >
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-1.5 border-brand-blue/40 bg-brand-blue/12">
          <svg width="26" height="26" fill="none" stroke="#2196F3" strokeWidth="2.2" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-display text-2xl tracking-wide text-brand-white">Mesajınız ulaştı</p>
        <p className="mt-2 max-w-80 text-sm leading-relaxed font-light text-brand-offwhite">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="text-left">
      {/* Honeypot: off-screen and skipped by keyboard/screen readers, so only bots fill it. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={fieldId("name") + "-website"}>Web siteniz</label>
        <input
          id={fieldId("name") + "-website"}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor={fieldId("name")} className={LABEL_CLASSES}>
          Ad Soyad
        </label>
        <input
          id={fieldId("name")}
          name="name"
          type="text"
          required
          autoComplete="name"
          defaultValue={state.values?.name}
          placeholder="Adınız ve soyadınız"
          className={FIELD_CLASSES}
          {...errorProps("name")}
        />
        <FieldError id={errorId("name")}>{state.fieldErrors?.name}</FieldError>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div>
          <label htmlFor={fieldId("email")} className={LABEL_CLASSES}>
            E-posta
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            pattern={EMAIL_REGEX.source}
            title="ornek@firma.com biçiminde geçerli bir e-posta adresi girin."
            defaultValue={state.values?.email}
            placeholder="ornek@firma.com"
            className={FIELD_CLASSES}
            {...errorProps("email")}
          />
          <FieldError id={errorId("email")}>{state.fieldErrors?.email}</FieldError>
        </div>

        <div>
          <label htmlFor={fieldId("phone")} className={LABEL_CLASSES}>
            Telefon
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            maxLength={24}
            pattern={PHONE_REGEX.source}
            title="+90 5xx xxx xx xx biçiminde geçerli bir Türkiye mobil numarası girin."
            defaultValue={state.values?.phone}
            placeholder="+90 5xx xxx xx xx"
            className={FIELD_CLASSES}
            {...errorProps("phone")}
          />
          <FieldError id={errorId("phone")}>{state.fieldErrors?.phone}</FieldError>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={fieldId("projectType")} className={LABEL_CLASSES}>
          Proje Tipi
        </label>
        <select
          id={fieldId("projectType")}
          name="projectType"
          defaultValue={state.values?.projectType ?? PROJECT_TYPES[0].id}
          className={FIELD_CLASSES}
        >
          {PROJECT_TYPES.map((type) => (
            <option key={type.id} value={type.id} className="bg-brand-card">
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor={fieldId("message")} className={LABEL_CLASSES}>
          Projeniz Hakkında
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          required
          rows={4}
          defaultValue={state.values?.message}
          placeholder="Çekim yeri, tarih ve beklentileriniz hakkında kısaca bilgi verin."
          className={`${FIELD_CLASSES} resize-y`}
          {...errorProps("message")}
        />
        <FieldError id={errorId("message")}>{state.fieldErrors?.message}</FieldError>
      </div>

      <div className="mt-5">
        <label htmlFor={fieldId("consent")} className="flex cursor-pointer items-start gap-3">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-brand-blue"
            {...errorProps("consent")}
          />
          <span className="text-xs leading-relaxed font-light text-white/50">
            Bu formu göndererek, iletişim bilgilerimin yalnızca talebime dönüş yapılması
            amacıyla işlenmesine izin veriyorum.{" "}
            <a
              href="/kvkk"
              className="rounded text-brand-blue underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              Aydınlatma metni
            </a>
          </span>
        </label>
        <FieldError id={errorId("consent")}>{state.fieldErrors?.consent}</FieldError>
      </div>

      {/* Server-side failures (validation summary, mail errors) land here. */}
      <p aria-live="polite" className="min-h-5">
        {state.status === "error" && !state.fieldErrors && (
          <span className="mt-4 block text-sm text-red-400">{state.message}</span>
        )}
      </p>

      <button
        type="submit"
        disabled={pending}
        className="mt-3 inline-flex items-center gap-2 rounded-pill bg-brand-blue px-10 py-4 text-sm font-bold tracking-wide text-white transition-all duration-250 hover:-translate-y-0.75 hover:bg-brand-blue-dark hover:shadow-[0_12px_36px_rgba(33,150,243,.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {pending ? "Gönderiliyor…" : "Teklif İste"}
      </button>
    </form>
  );
}
