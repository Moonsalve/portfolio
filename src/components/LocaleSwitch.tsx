"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { locales, type Locale } from "@/i18n";
import { preferredLocale } from "@/i18n/acceptLanguage";
import { useLocale } from "@/i18n/LocaleProvider";
import styles from "./LocaleSwitch.module.css";

const shortLabel: Record<Locale, string> = { es: "ES", en: "EN" };
const path: Record<Locale, string> = { es: "/", en: "/en" };

function subscribeToLanguages(onChange: () => void): () => void {
  window.addEventListener("languagechange", onChange);
  return () => window.removeEventListener("languagechange", onChange);
}

/** Devuelve un primitivo, así que comparar por valor basta para no rerenderizar. */
function readPreferred(): Locale {
  return preferredLocale(navigator.languages ?? [navigator.language]);
}

export function LocaleSwitch() {
  const { locale, t } = useLocale();

  /**
   * Marca discretamente el idioma que el navegador del visitante prefiere, en
   * lugar de redirigirlo. Google desaconseja el redireccionamiento automático
   * por idioma, y un enlace señalado respeta a quien llegó a propósito a la
   * versión que no es la suya.
   *
   * `navigator.languages` es estado externo a React y puede cambiar en caliente
   * (evento `languagechange`), así que se lee suscribiéndose, no con un efecto
   * que fije estado: eso encadena renders y el servidor no tiene navegador.
   */
  const preferred = useSyncExternalStore(subscribeToLanguages, readPreferred, () => null);
  const suggested = preferred && preferred !== locale ? preferred : null;

  return (
    <nav className={styles.wrap} aria-label={t.header.localeSwitch}>
      {locales.map((option) => {
        const active = option === locale;
        return (
          <Link
            key={option}
            href={path[option]}
            hrefLang={option}
            lang={option}
            className={styles.option}
            data-active={active}
            data-suggested={!active && suggested === option}
            aria-current={active ? "page" : undefined}
          >
            {shortLabel[option]}
          </Link>
        );
      })}
    </nav>
  );
}
