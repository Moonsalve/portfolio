"use client";

import { locales, type Locale } from "@/i18n";
import { useLocale } from "@/i18n/LocaleProvider";
import styles from "./LocaleSwitch.module.css";

const shortLabel: Record<Locale, string> = { es: "ES", en: "EN" };

export function LocaleSwitch() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className={styles.wrap} role="group" aria-label={t.header.localeSwitch}>
      {locales.map((option) => {
        const active = option === locale;
        return (
          <button
            key={option}
            type="button"
            lang={option}
            className={styles.option}
            data-active={active}
            aria-pressed={active}
            onClick={() => setLocale(option)}
          >
            {shortLabel[option]}
          </button>
        );
      })}
    </div>
  );
}
