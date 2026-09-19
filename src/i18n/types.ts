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
    /** Versión corta para la barra en pantallas angostas. */
    readonly availabilityShort: string;
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
  /** Rótulos de la traza de actividad de GitHub del encabezado. */
  readonly activity: {
    readonly eyebrow: string;
    readonly total: string;
    readonly active: string;
    readonly peak: string;
    readonly live: string;
    /** Prefijo para la fecha del snapshot versionado. */
    readonly snapshot: string;
    readonly empty: string;
  };
  /** Etiquetas de la franja de parámetros bajo el nombre. */
  readonly specs: {
    readonly location: string;
    readonly timezone: string;
    readonly mode: string;
    readonly languages: string;
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
      /** Credenciales con página de verificación, frente a los cursos de
       *  `items`, que no la tienen. La distinción es el contenido. */
      readonly verified: {
        readonly heading: string;
        readonly issuer: string;
        readonly verifyLabel: string;
      };
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
    readonly cvEsLabel: string;
    readonly cvEnLabel: string;
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
      /** Prefijo del asunto del correo que llega al buzón. */
      readonly emailSubject: string;
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
  /** Carátula usada como marcador de posición mientras no haya retrato. */
  readonly sleeve: {
    /**
     * Describe lo que la imagen es de verdad. Ocupa el hueco del retrato, pero
     * el texto alternativo no puede decir que sea un retrato: ese atributo
     * existe para quien no ve la imagen, y ahí es donde una descripción falsa
     * se convierte en una mentira y no en una licencia de diseño.
     */
    readonly alt: string;
  };
  readonly footer: {
    readonly built: string;
    readonly source: string;
  };
};
