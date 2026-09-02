/**
 * Estructura de los proyectos: lo que NO cambia entre idiomas —nombres propios,
 * stack, enlaces y las cifras del riel—. La prosa y las etiquetas viven en
 * `src/i18n`, enlazadas por estos identificadores.
 *
 * `RailKey` se deriva de este archivo, de modo que agregar una cifra aquí sin
 * su etiqueta en ambos idiomas rompe la compilación.
 */

export const projects = [
  {
    id: "apollo",
    name: "Apollo",
    featured: true,
    year: "2026",
    stack: ["Python", "Whisper", "Silero VAD", "Ollama", "Pydantic", "Piper"],
    repo: "https://github.com/Moonsalve/asistente-local",
    rail: [
      { value: "0.135 s", key: "apollo.turn" },
      { value: "~2 ms", key: "apollo.route" },
      { value: "24/24 · 8/8", key: "apollo.suite" },
      { value: "307", key: "apollo.tests" },
    ],
  },
  {
    id: "goatguard",
    name: "GoatGuard",
    featured: false,
    year: "2026",
    stack: ["FastAPI", "Scapy", "Flutter", "Firebase Cloud Messaging"],
    repo: "https://github.com/Moonsalve/goatguard-server",
    rail: [
      { value: "3", key: "goatguard.repos" },
      { value: "FCM", key: "goatguard.push" },
      { value: "OSS", key: "goatguard.public" },
    ],
  },
  {
    id: "canchas",
    name: "Canchas",
    featured: false,
    year: "2026",
    stack: ["Node", "Express", "TypeScript", "Prisma", "PostgreSQL", "Electron", "React"],
    repo: null,
    rail: [
      { value: "2", key: "canchas.repos" },
      { value: "1 → 2", key: "canchas.split" },
    ],
  },
  {
    id: "leadTriage",
    name: "Lead Triage Agent",
    featured: false,
    year: "2026",
    stack: ["FastAPI", "Claude API", "PostgreSQL", "Slack"],
    repo: null,
    rail: [
      { value: "WIP", key: "leadTriage.wip" },
      { value: "$ / lead", key: "leadTriage.cost" },
    ],
  },
] as const;

export type Project = (typeof projects)[number];
export type ProjectId = Project["id"];
/** Unión de todas las claves de riel usadas arriba. */
export type RailKey = Project["rail"][number]["key"];

export const principleIds = ["measure", "contract", "loud"] as const;
export type PrincipleId = (typeof principleIds)[number];

export const roleIds = ["teamManager", "sales", "support"] as const;
export type RoleId = (typeof roleIds)[number];
