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
  const { t } = useLocale();

  return (
    <section className={`page ${styles.hero}`} aria-label={site.name}>
      <div className={styles.identity}>
        <div className={styles.naming}>
          <h1 className={styles.name}>
            <span className={styles.given}>Juan</span>
            <span className={styles.family}>Monsalve</span>
          </h1>
          <p className={`mono ${styles.role}`}>{t.header.role}</p>
          <ul className={styles.meta}>
            <li className={`mono ${styles.metaItem}`}>{t.header.location}</li>
            <li className={`mono ${styles.metaItem}`}>
              {t.experience.languages.items.join(" · ")}
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
              sizes="(min-width: 48rem) 11rem, 7rem"
              className={styles.photo}
            />
          ) : (
            <Monogram label={t.header.monogramLabel} />
          )}
        </div>
      </div>

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
          <a className={`mono ${styles.action}`} href={site.cv} download>
            {t.header.actions.cv}
          </a>
        </li>
      </ul>
    </section>
  );
}
