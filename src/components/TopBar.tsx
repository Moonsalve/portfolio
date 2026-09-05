"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { LocaleSwitch } from "./LocaleSwitch";
import styles from "./TopBar.module.css";

/**
 * Barra fija del panel.
 *
 * Vive fuera del encabezado a propósito: `position: sticky` solo se pega
 * dentro de su bloque contenedor, así que estando dentro del hero se despegaba
 * en cuanto el hero salía de pantalla. Como hija directa del cuerpo, acompaña
 * toda la página y la navegación queda siempre a un clic.
 */
export function TopBar() {
  const { t } = useLocale();
  const nav = [
    { href: "#work", label: t.nav.work },
    { href: "#approach", label: t.nav.approach },
    { href: "#experience", label: t.nav.experience },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className={styles.chrome}>
      {/* Va dentro de la barra fija, no encima: así la franja acompaña toda la
          página en vez de desaparecer con el primer scroll. */}
      <div className="stripe" aria-hidden="true" />
      <div className={`page ${styles.inner}`}>
        <span className={`mono ${styles.sigil}`} aria-hidden="true">
          JM <span className={styles.slash}>{"/"}</span> REV 2026.09
        </span>

        <nav aria-label={t.nav.work}>
          <ul className={styles.navList}>
            {nav.map((item) => (
              <li key={item.href}>
                <a className={`mono ${styles.navLink}`} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.end}>
          <span className={`mono ${styles.led}`}>
            <span className={styles.ledLong}>{t.header.availability}</span>
            <span className={styles.ledShort}>{t.header.availabilityShort}</span>
          </span>
          <LocaleSwitch />
        </div>
      </div>
    </header>
  );
}
