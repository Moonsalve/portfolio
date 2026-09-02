"use client";

import { principleIds } from "@/content/projects";
import { useLocale } from "@/i18n/LocaleProvider";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import styles from "./Principles.module.css";

export function Principles() {
  const { t } = useLocale();

  return (
    <Section
      id="approach"
      channel="CH 03"
      title={t.sections.approach.title}
      lede={t.sections.approach.lede}
    >
      <ol className={styles.list}>
        {principleIds.map((id, index) => {
          const principle = t.principles[id];
          return (
            <Reveal as="li" key={id} className={styles.item}>
              <p className={`mono ${styles.index}`}>{String(index + 1).padStart(2, "0")}</p>
              <h3 className={styles.title}>{principle.title}</h3>
              <p className={styles.body}>{principle.body}</p>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
