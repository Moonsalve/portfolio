"use client";

import type { Activity } from "@/lib/github";
import { useLocale } from "@/i18n/LocaleProvider";
import styles from "./ActivityTrace.module.css";

/** Lienzo del trazo. Coordenadas internas; el SVG se estira al ancho real. */
const VIEW = { w: 1000, h: 96, top: 10, bottom: 84 } as const;

type Point = { x: number; y: number };

/**
 * Convierte la serie semanal en coordenadas. La escala es lineal contra el pico
 * del propio periodo: no se normaliza contra un máximo inventado ni se recorta,
 * de modo que la forma de la curva es la forma real de la actividad.
 */
function toPoints(weeks: readonly { count: number }[]): Point[] {
  const peak = Math.max(...weeks.map((entry) => entry.count), 1);
  const span = Math.max(weeks.length - 1, 1);
  const usable = VIEW.bottom - VIEW.top;

  return weeks.map((entry, index) => ({
    x: (index / span) * VIEW.w,
    y: VIEW.bottom - (entry.count / peak) * usable,
  }));
}

function toPath(points: readonly Point[]): string {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)},${point.y.toFixed(1)}`)
    .join(" ");
}

/** Formato corto y localizado: "sep 2025". */
function monthLabel(iso: string, locale: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" })
    .format(date)
    .replace(".", "");
}

/**
 * Historial de contribuciones de GitHub dibujado como la traza de un
 * instrumento. Sustituye a la línea decorativa del boceto: el mismo gesto, pero
 * alimentado con datos reales y fechados.
 *
 * Todo se calcula a partir de las props, así que el servidor y el cliente
 * producen exactamente el mismo SVG y no hay desajuste de hidratación ni
 * trabajo de red en el navegador.
 */
export function ActivityTrace({ activity }: { activity: Activity }) {
  const { t, locale } = useLocale();

  if (activity.weeks.length === 0) {
    return (
      <div className={styles.panel}>
        <p className={`mono ${styles.empty}`}>{t.activity.empty}</p>
      </div>
    );
  }

  const points = toPoints(activity.weeks);
  const line = toPath(points);
  const area = `${line} L${VIEW.w},${VIEW.bottom} L0,${VIEW.bottom} Z`;

  const peakIndex = activity.weeks.reduce(
    (best, entry, index) => (entry.count > (activity.weeks[best]?.count ?? 0) ? index : best),
    0,
  );
  const peakPoint = points[peakIndex];

  const source =
    activity.source === "live"
      ? t.activity.live
      : `${t.activity.snapshot} ${monthLabel(activity.capturedAt, locale)}`;

  const description = `${t.activity.eyebrow}: ${activity.total} ${t.activity.total}, ${activity.activeWeeks} ${t.activity.active}, ${t.activity.peak} ${activity.peak}.`;

  return (
    <figure className={styles.panel}>
      <div className={styles.readout}>
        <span className={`mono ${styles.value}`}>{activity.total}</span>
        <span className={styles.label}>{t.activity.total}</span>
      </div>

      <div className={styles.plot}>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          preserveAspectRatio="none"
          role="img"
          aria-label={description}
        >
          {/* Línea de base: el cero del instrumento, visible incluso sin señal. */}
          <line
            x1="0"
            y1={VIEW.bottom}
            x2={VIEW.w}
            y2={VIEW.bottom}
            className={styles.baseline}
            vectorEffect="non-scaling-stroke"
          />
          <path d={area} className={styles.area} />
          <path
            d={line}
            className={styles.line}
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
          {peakPoint ? (
            <>
              <line
                x1={peakPoint.x}
                y1={peakPoint.y}
                x2={peakPoint.x}
                y2={VIEW.bottom}
                className={styles.peakTick}
                vectorEffect="non-scaling-stroke"
              />
              <circle cx={peakPoint.x} cy={peakPoint.y} r="7" className={styles.peakDot} />
            </>
          ) : null}
        </svg>
        <div className={`mono ${styles.axis}`}>
          <span>{monthLabel(activity.from, locale)}</span>
          <span className={styles.source} data-live={activity.source === "live"}>
            {source}
          </span>
          <span>{monthLabel(activity.to, locale)}</span>
        </div>
      </div>

      <div className={styles.readout}>
        <span className={`mono ${styles.value} ${styles.alt}`}>{activity.peak}</span>
        <span className={styles.label}>{t.activity.peak}</span>
      </div>
    </figure>
  );
}
