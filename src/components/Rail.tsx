import styles from "./Rail.module.css";

export type RailEntry = { value: string; label: string };

/**
 * Riel de evidencia: las cifras medidas viven al margen del párrafo que
 * sustentan, como anotaciones de laboratorio. En pantallas angostas la columna
 * colapsa debajo de su bloque, sin perder el orden de lectura.
 */
export function Rail({ heading, entries }: { heading: string; entries: readonly RailEntry[] }) {
  return (
    <aside className={styles.rail} aria-label={heading}>
      <p className={`eyebrow ${styles.heading}`}>{heading}</p>
      <ul className={styles.list}>
        {entries.map((entry) => (
          <li key={entry.label} className={styles.item}>
            <span className={`mono ${styles.value}`}>{entry.value}</span>
            <span className={styles.label}>{entry.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
