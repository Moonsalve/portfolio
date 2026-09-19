"use client";

import Image from "next/image";
import type { Activity } from "@/lib/github";
import { site } from "@/site.config";
import { useLocale } from "@/i18n/LocaleProvider";
import { ActivityTrace } from "./ActivityTrace";
import styles from "./Hero.module.css";

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

export function Hero({ activity }: { activity: Activity }) {
  const { t, locale } = useLocale();

  return (
    <section className={`page ${styles.hero}`} aria-label={site.name}>
      <div className={styles.identity}>
        <div className={styles.naming}>
          <h1 className={styles.name}>
            <span className={styles.given}>Juan</span>
            <span className={styles.family}>Monsalve</span>
          </h1>
          <p className={`mono ${styles.role}`}>&gt;&gt;&gt; {t.header.role}</p>
        </div>

        {/*
          Cadena de respaldo: la foto real cuando exista, la carátula mientras
          tanto, y el monograma si no hay ninguna de las dos. Cada una lleva su
          propio texto alternativo; ninguna hereda el de la otra.
        */}
        <div className={styles.portrait}>
          {site.photo ? (
            <Image
              src={site.photo.src}
              alt={t.header.photoAlt}
              width={site.photo.width}
              height={site.photo.height}
              priority
              sizes="(min-width: 48rem) 9rem, 5.5rem"
              className={styles.photo}
            />
          ) : site.sleeve ? (
            <Image
              src={site.sleeve.src}
              alt={t.sleeve.alt}
              width={site.sleeve.width}
              height={site.sleeve.height}
              priority
              sizes="(min-width: 48rem) 9rem, 5.5rem"
              className={styles.photo}
            />
          ) : (
            <Monogram label={t.header.monogramLabel} />
          )}
        </div>
      </div>

      <dl className={styles.specs}>
        <div className={styles.spec}>
          <dt className={`mono ${styles.specKey}`}>{t.specs.location}</dt>
          <dd className={`mono ${styles.specValue}`}>
            {site.location.city}, {site.location.country}
          </dd>
        </div>
        <div className={styles.spec}>
          <dt className={`mono ${styles.specKey}`}>{t.specs.timezone}</dt>
          <dd className={`mono ${styles.specValue}`}>{site.location.utcOffset}</dd>
        </div>
        <div className={styles.spec}>
          <dt className={`mono ${styles.specKey}`}>{t.specs.mode}</dt>
          <dd className={`mono ${styles.specValue} ${styles.hz}`}>{t.header.availability}</dd>
        </div>
        <div className={styles.spec}>
          <dt className={`mono ${styles.specKey}`}>{t.specs.languages}</dt>
          <dd className={`mono ${styles.specValue}`}>
            {t.experience.languages.items.join(" / ")}
          </dd>
        </div>
      </dl>

      <ActivityTrace activity={activity} />

      <ul className={styles.actions}>
        <li>
          <a className={`mono ${styles.action} ${styles.primary}`} href={`mailto:${site.email}`}>
            {t.header.actions.email}
          </a>
        </li>
        <li>
          <a className={`mono ${styles.action}`} href={site.github} rel="me noreferrer" target="_blank">
            {t.header.actions.github}
          </a>
        </li>
        {site.linkedin ? (
          <li>
            <a className={`mono ${styles.action}`} href={site.linkedin} rel="me noreferrer" target="_blank">
              {t.header.actions.linkedin}
            </a>
          </li>
        ) : null}
        <li>
          <a className={`mono ${styles.action}`} href={site.cv[locale]} download>
            {t.header.actions.cv}
          </a>
        </li>
      </ul>
    </section>
  );
}
