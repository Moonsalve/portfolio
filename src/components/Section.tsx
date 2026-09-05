import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import styles from "./Section.module.css";

export function Section({
  id,
  title,
  lede,
  children,
}: {
  id: string;
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={`page ${styles.inner}`}>
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
