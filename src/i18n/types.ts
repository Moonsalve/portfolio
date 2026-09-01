import type {
  PrincipleId,
  ProjectId,
  RailKey,
  RoleId,
} from "@/content/projects";

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

type ProjectCopy = {
  /** Una línea: qué es y con qué está hecho. */
  readonly tagline: string;
  /** Etiqueta de estado; `null` cuando el proyecto está terminado. */
  readonly status: string | null;
  /** Visibilidad del código, dicha explícitamente. */
  readonly access: string;
  readonly body: readonly string[];
};

type RoleCopy = {
  readonly period: string;
  readonly role: string;
  readonly company: string;
};

/**
 * Contrato de contenido. Cada idioma debe satisfacerlo por completo: los
 * `Record` sobre uniones cerradas hacen que una clave faltante en `es.ts` o
 * `en.ts` sea un error de tipos, no un hueco silencioso en la página.
 */
export type Dictionary = {
  readonly localeName: string;
  readonly meta: {
    readonly title: string;
    readonly description: string;
  };
  readonly nav: {
    readonly work: string;
    readonly approach: string;
    readonly experience: string;
    readonly contact: string;
    readonly skipToContent: string;
  };
  readonly header: {
    readonly role: string;
    readonly availability: string;
    readonly location: string;
    readonly photoAlt: string;
    readonly monogramLabel: string;
    readonly actions: {
      readonly github: string;
      readonly cv: string;
      readonly email: string;
      readonly linkedin: string;
    };
    readonly localeSwitch: string;
  };
  readonly thesis: {
    readonly eyebrow: string;
    readonly body: string;
  };
  readonly sections: {
    readonly work: { readonly title: string; readonly lede: string };
    readonly approach: { readonly title: string; readonly lede: string };
    readonly experience: { readonly title: string; readonly lede: string };
    readonly contact: { readonly title: string; readonly lede: string };
  };
  readonly projects: Record<ProjectId, ProjectCopy>;
  /** Etiqueta de cada cifra del riel, por clave declarada en `content/projects.ts`. */
  readonly rail: Record<RailKey, string>;
  readonly railHeading: string;
  readonly stackHeading: string;
  readonly repoLink: string;
  readonly principles: Record<
    PrincipleId,
    { readonly title: string; readonly body: string }
  >;
  readonly experience: {
    readonly roles: Record<RoleId, RoleCopy>;
    readonly remote: string;
    readonly education: {
      readonly heading: string;
      readonly degree: string;
      readonly school: string;
      readonly period: string;
    };
    readonly certifications: {
      readonly heading: string;
      readonly items: readonly string[];
    };
    readonly languages: {
      readonly heading: string;
      readonly items: readonly string[];
    };
  };
  readonly contact: {
    readonly directHeading: string;
    readonly emailLabel: string;
    readonly githubLabel: string;
    readonly cvLabel: string;
    readonly form: {
      readonly heading: string;
      readonly name: string;
      readonly email: string;
      readonly message: string;
      readonly namePlaceholder: string;
      readonly emailPlaceholder: string;
      readonly messagePlaceholder: string;
      /** Campo trampa: invisible para personas, tentador para bots. */
      readonly honeypot: string;
      readonly submit: string;
      readonly submitting: string;
      readonly success: string;
      readonly error: string;
      readonly validationEmail: string;
      readonly validationRequired: string;
      /** Se muestra cuando no hay endpoint configurado en el build. */
      readonly unavailable: string;
    };
  };
  readonly footer: {
    readonly built: string;
    readonly source: string;
  };
};
