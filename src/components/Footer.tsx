"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { site } from "@/site.config";
import styles from "./Footer.module.css";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`page ${styles.inner}`}>
        <p className={`mono ${styles.line}`}>
          © {year} {site.name}
        </p>
        <p className={`mono ${styles.line}`}>{t.footer.built}</p>
      </div>
    </footer>
  );
}
