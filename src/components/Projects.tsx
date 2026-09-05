"use client";

import { projects } from "@/content/projects";
import { useLocale } from "@/i18n/LocaleProvider";
import { Rail, type RailEntry } from "./Rail";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import styles from "./Projects.module.css";

/**
 * Convierte `código` en `<code>` sin meter un parser de Markdown ni HTML crudo:
 * el contenido lo escribo yo, y esto es lo único que necesita marcado.
 */
function renderInlineCode(text: string) {
  return text.split(/(`[^`]+`)/g).map((chunk, index) =>
    chunk.startsWith("`") && chunk.endsWith("`") && chunk.length > 2 ? (
      <code key={index}>{chunk.slice(1, -1)}</code>
    ) : (
      chunk
    ),
  );
}

export function Projects() {
  const { t } = useLocale();

  return (
    <Section
      id="work"
      title={t.sections.work.title}
      lede={t.sections.work.lede}
    >
      <ol className={styles.list}>
        {projects.map((project, index) => {
          const projectCopy = t.projects[project.id];
          const entries: RailEntry[] = project.rail.map((item) => ({
            value: item.value,
            label: t.rail[item.key],
          }));

          return (
            <Reveal as="li" key={project.id}>
              <article className={styles.card} data-featured={project.featured}>
                <header className={styles.head}>
                  <div className={styles.headMain}>
                    <p className={`mono ${styles.index}`}>
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className={styles.name}>{project.name}</h3>
                  </div>
                  <ul className={styles.badges}>
                    {projectCopy.status ? (
                      <li className={`mono ${styles.badge}`} data-tone="active">
                        {projectCopy.status}
                      </li>
                    ) : null}
                    <li className={`mono ${styles.badge}`}>{projectCopy.access}</li>
                    <li className={`mono ${styles.badge}`}>{project.year}</li>
                  </ul>
                </header>

                <div className={styles.grid}>
                  <div className={styles.main}>
                    <p className={`mono ${styles.tagline}`}>{projectCopy.tagline}</p>

                    <div className={styles.prose}>
                      {projectCopy.body.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)}>{renderInlineCode(paragraph)}</p>
                      ))}
                    </div>

                    <footer className={styles.foot}>
                      <p className="visually-hidden">{t.stackHeading}</p>
                      <ul className={styles.stack}>
                        {project.stack.map((tech) => (
                          <li key={tech} className={`mono ${styles.tech}`}>
                            {tech}
                          </li>
                        ))}
                      </ul>
                      {project.repo ? (
                        <a
                          className={`mono ${styles.repo}`}
                          href={project.repo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t.repoLink} ↗
                        </a>
                      ) : null}
                    </footer>
                  </div>

                  <Rail heading={t.railHeading} entries={entries} />
                </div>
              </article>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
