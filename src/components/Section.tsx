import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import styles from "./Section.module.css";

export function Section({
  id,
  channel,
  title,
  lede,
  children,
}: {
  id: string;
  /** Rótulo de canal del panel, p. ej. "CH 02". */
  channel: string;
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={`page ${styles.inner}`}>
        <p className="channel">
          <b className="mono">{channel}</b>
          <span className="mono">{title}</span>
        </p>
        <Reveal className={styles.head}>
          <h2 id={`${id}-title`} className={styles.title}>
            {title}
          </h2>
          <p className={styles.lede}>{lede}</p>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
