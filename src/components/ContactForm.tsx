"use client";

import { useId, useState, type FormEvent } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { site } from "@/site.config";
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

/** Suficientemente estricta para atrapar erratas, no tanto como para rechazar correos válidos. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Campo trampa: los bots llenan todo, las personas no ven este. */
const HONEYPOT_FIELD = "_gotcha";

export function ContactForm() {
  const { t, locale } = useLocale();
  const form = t.contact.form;
  const fieldId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const endpoint = site.formspreeId
    ? `https://formspree.io/f/${site.formspreeId}`
    : null;

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) next.name = form.validationRequired;
    if (!email) next.email = form.validationRequired;
    else if (!EMAIL_PATTERN.test(email)) next.email = form.validationEmail;
    if (!message) next.message = form.validationRequired;

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!endpoint || status === "submitting") return;

    const element = event.currentTarget;
    const data = new FormData(element);

    // Trampa disparada: se acepta en silencio para no enseñarle al bot qué falló.
    if (String(data.get(HONEYPOT_FIELD) ?? "").length > 0) {
      setStatus("success");
      element.reset();
      return;
    }

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    data.set("_language", locale);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Formspree respondió ${response.status}`);
      setStatus("success");
      element.reset();
    } catch {
      setStatus("error");
    }
  }

  if (!endpoint) {
    return (
      <div className={styles.notice} role="note">
        <p>{form.unavailable}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <p className="eyebrow">{form.heading}</p>

      <Field
        id={`${fieldId}-name`}
        name="name"
        label={form.name}
        placeholder={form.namePlaceholder}
        error={errors.name}
        autoComplete="name"
      />
      <Field
        id={`${fieldId}-email`}
        name="email"
        type="email"
        label={form.email}
        placeholder={form.emailPlaceholder}
        error={errors.email}
        autoComplete="email"
      />
      <Field
        id={`${fieldId}-message`}
        name="message"
        label={form.message}
        placeholder={form.messagePlaceholder}
        error={errors.message}
        multiline
      />

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${fieldId}-hp`}>{form.honeypot}</label>
        <input id={`${fieldId}-hp`} type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.submitRow}>
        <button type="submit" className={styles.submit} disabled={status === "submitting"}>
          {status === "submitting" ? form.submitting : form.submit}
        </button>

        {/* Región viva: el resultado se anuncia al lector de pantalla, no solo se pinta. */}
        <p className={styles.status} role="status" aria-live="polite" data-status={status}>
          {status === "success" ? form.success : status === "error" ? form.error : ""}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  error,
  type = "text",
  multiline = false,
  autoComplete,
}: {
  id: string;
  name: FieldName;
  label: string;
  placeholder: string;
  error: string | undefined;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
}) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    placeholder,
    className: styles.input,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errorId : undefined,
    autoComplete,
  };

  return (
    <div className={styles.field}>
      <label className={`mono ${styles.label}`} htmlFor={id}>
        {label}
      </label>
      {multiline ? <textarea rows={5} {...shared} /> : <input type={type} {...shared} />}
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
