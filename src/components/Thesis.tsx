"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import styles from "./Thesis.module.css";

/**
 * Sin revelación al hacer scroll, a propósito: este bloque está sobre el
 * pliegue en cualquier viewport realista, así que animarlo no revela nada —
 * solo retrasa el Largest Contentful Paint hasta después de hidratar. Medido:
 * el LCP pasaba del `<h1>` a este párrafo, de 68 ms a 636 ms sin estrangular.
 */
export function Thesis() {
  const { t } = useLocale();

  return (
    <section className={styles.section} aria-label={t.thesis.eyebrow}>
      <div className={`page ${styles.inner}`}>
        <p className="eyebrow">{t.thesis.eyebrow}</p>
        <p className={styles.body}>{t.thesis.body}</p>
      </div>
    </section>
  );
}
