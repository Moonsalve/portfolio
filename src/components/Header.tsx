"use client";

import Image from "next/image";
import { site } from "@/site.config";
import { useLocale } from "@/i18n/LocaleProvider";
import { LocaleSwitch } from "./LocaleSwitch";
import styles from "./Header.module.css";

/** Iniciales, usadas mientras no haya foto profesional en `/public`. */
function Monogram({ label }: { label: string }) {
  return (
    <div className={styles.monogram} role="img" aria-label={label}>
      <span className="mono" aria-hidden="true">
        JM
      </span>
    </div>
  );
}

export function Header() {
  const { t } = useLocale();
  const nav = [
    { href: "#work", label: t.nav.work },
    { href: "#approach", label: t.nav.approach },
    { href: "#experience", label: t.nav.experience },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className={styles.header}>
      <div className={`page ${styles.inner}`}>
        <nav className={styles.topbar} aria-label={t.nav.contact}>
          <ul className={styles.navList}>
            {nav.map((item) => (
              <li key={item.href}>
                <a className={styles.navLink} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <LocaleSwitch />
        </nav>

        <div className={styles.identity}>
          <div className={styles.text}>
            <h1 className={styles.name}>{site.name}</h1>
            <p className={styles.role}>{t.header.role}</p>
            <ul className={styles.meta}>
              <li className={`mono ${styles.metaItem}`}>{t.header.location}</li>
              <li className={`mono ${styles.metaItem} ${styles.available}`}>
                <span className={styles.dot} aria-hidden="true" />
                {t.header.availability}
              </li>
            </ul>
            <ul className={styles.actions}>
              <li>
                <a className={styles.action} href={site.github} rel="me noreferrer" target="_blank">
                  {t.header.actions.github}
                </a>
              </li>
              {site.linkedin ? (
                <li>
                  <a className={styles.action} href={site.linkedin} rel="me noreferrer" target="_blank">
                    {t.header.actions.linkedin}
                  </a>
                </li>
              ) : null}
              <li>
                <a className={styles.action} href={site.cv} download>
                  {t.header.actions.cv}
                </a>
              </li>
              <li>
                <a className={styles.action} href={`mailto:${site.email}`}>
                  {t.header.actions.email}
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.portrait}>
            {site.photo ? (
              <Image
                src={site.photo.src}
                alt={t.header.photoAlt}
                width={site.photo.width}
                height={site.photo.height}
                priority
                sizes="(min-width: 48rem) 13rem, 8rem"
                className={styles.photo}
              />
            ) : (
              <Monogram label={t.header.monogramLabel} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
