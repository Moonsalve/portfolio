"use client";

import Image from "next/image";
import { roleIds } from "@/content/projects";
import { CREDENTIAL_SOURCE_SIZE, credentials } from "@/content/credentials";
import { useLocale } from "@/i18n/LocaleProvider";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import styles from "./Experience.module.css";

export function Experience() {
  const { t } = useLocale();
  const { education, certifications, languages, remote, roles } = t.experience;

  return (
    <Section
      id="experience"
      title={t.sections.experience.title}
      lede={t.sections.experience.lede}
    >
      <div className={styles.layout}>
        <Reveal as="ol" className={styles.timeline}>
          {roleIds.map((id) => {
            const role = roles[id];
            return (
              <li key={id} className={styles.role}>
                <p className={`mono ${styles.period}`}>{role.period}</p>
                <h3 className={styles.title}>{role.role}</h3>
                <p className={styles.company}>
                  {role.company} <span className={styles.separator}>·</span>{" "}
                  <span className={`mono ${styles.mode}`}>{remote}</span>
                </p>
              </li>
            );
          })}
        </Reveal>

        <Reveal className={styles.side}>
          <div className={styles.block}>
            <p className="eyebrow">{education.heading}</p>
            <p className={styles.degree}>{education.degree}</p>
            <p className={styles.detail}>{education.school}</p>
            <p className={`mono ${styles.detail}`}>{education.period}</p>
          </div>

          <div className={styles.block}>
            <p className="eyebrow">{certifications.verified.heading}</p>
            <ul className={styles.badges}>
              {credentials.map((credential) => (
                <li key={credential.id}>
                  <a
                    className={styles.badge}
                    href={credential.verify}
                    target="_blank"
                    rel="noreferrer"
                    // El nombre no cabe bajo la insignia sin romper la
                    // retícula, así que viaja en el enlace: quien navega con
                    // teclado o lector de pantalla oye qué credencial es y
                    // que se abre la verificación.
                    aria-label={`${credential.name} — ${certifications.verified.verifyLabel}`}
                  >
                    <Image
                      src={credential.image}
                      alt=""
                      width={CREDENTIAL_SOURCE_SIZE}
                      height={CREDENTIAL_SOURCE_SIZE}
                      className={styles.badgeImage}
                    />
                  </a>
                </li>
              ))}
            </ul>
            <p className={`mono ${styles.detail}`}>{certifications.verified.issuer}</p>
          </div>

          <div className={styles.block}>
            <p className="eyebrow">{certifications.heading}</p>
            <ul className={styles.tags}>
              {certifications.items.map((item) => (
                <li key={item} className={`mono ${styles.tag}`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.block}>
            <p className="eyebrow">{languages.heading}</p>
            <ul className={styles.plain}>
              {languages.items.map((item) => (
                <li key={item} className={styles.detail}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
