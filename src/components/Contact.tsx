"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { site } from "@/site.config";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import styles from "./Contact.module.css";

export function Contact() {
  const { t } = useLocale();

  return (
    <Section id="contact" title={t.sections.contact.title} lede={t.sections.contact.lede}>
      <div className={styles.layout}>
        <Reveal className={styles.direct}>
          <p className="eyebrow">{t.contact.directHeading}</p>
          <ul className={styles.links}>
            <li>
              <span className={`mono ${styles.key}`}>{t.contact.emailLabel}</span>
              <a className={styles.value} href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <span className={`mono ${styles.key}`}>{t.contact.githubLabel}</span>
              <a className={styles.value} href={site.github} target="_blank" rel="me noreferrer">
                github.com/Moonsalve
              </a>
            </li>
            <li>
              <span className={`mono ${styles.key}`}>CV</span>
              <a className={styles.value} href={site.cv} download>
                {t.contact.cvLabel}
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal className={styles.formWrap}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
