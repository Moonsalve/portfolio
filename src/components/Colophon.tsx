"use client";

import Image from "next/image";
import { site } from "@/site.config";
import { useLocale } from "@/i18n/LocaleProvider";
import styles from "./Colophon.module.css";

/**
 * Colofón del panel: una carátula, al final y en pequeño.
 *
 * Va aparte del hueco del retrato a propósito. `site.photo` es Juan; esto no lo
 * es, y su texto alternativo dice exactamente qué es. Confundir las dos cosas
 * sería mentirle a quien navega con lector de pantalla.
 */
export function Colophon() {
  const { t } = useLocale();
  if (!site.sleeve) return null;

  return (
    <section className={styles.section} aria-labelledby="colophon-title">
      <div className={`page ${styles.inner}`}>
        <p className="channel">
          <b className="mono">{t.colophon.channel}</b>
          <span className="mono" id="colophon-title">
            {t.colophon.title}
          </span>
        </p>

        <figure className={styles.card}>
          <Image
            src={site.sleeve.src}
            alt={t.colophon.alt}
            width={site.sleeve.width}
            height={site.sleeve.height}
            sizes="96px"
            loading="lazy"
            className={styles.sleeve}
          />
          <figcaption className={styles.caption}>
            <span className={styles.album}>{site.sleeve.album}</span>
            <span className={`mono ${styles.artist}`}>{site.sleeve.artist}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
