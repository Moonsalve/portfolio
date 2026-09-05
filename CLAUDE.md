# Portafolio — notas para trabajar aquí

Sitio personal en Next.js 16 (App Router) + React 19 + TypeScript estricto.
Dirección de diseño: **panel de instrumento** (rejilla milimetrada, secciones
como canales, cifras medidas como lecturas). El README explica el porqué de
cada decisión; esto es lo operativo.

## Comandos

```bash
npm run dev     # desarrollo
npm run build   # build de producción (corre TypeScript)
npm start       # servir el build
npm test        # node:test, sin dependencias
npx tsc --noEmit && npx eslint src
```

## Reglas que este repo se toma en serio

- **El diccionario es un contrato de tipos.** `Dictionary` en
  `src/i18n/types.ts` usa `Record` sobre uniones cerradas derivadas de
  `src/content/projects.ts`. Añadir una cifra al riel sin su etiqueta en los
  dos idiomas **rompe el build**, a propósito. No relajar esos tipos.
- **Cero métricas inventadas.** Toda cifra visible debe ser rastreable a un
  repo, a una medición o al snapshot de GitHub. Si no se puede verificar, no
  se publica.
- **El idioma se resuelve en el servidor** (`src/i18n/server.ts`): cookie
  primero, luego `Accept-Language`. No mover esa detección al cliente: se
  midió y costaba 0.312 de CLS.
- **Texto alternativo honesto.** `site.photo` es un retrato; `site.sleeve` es
  una carátula que ocupa ese hueco mientras no haya foto. Cada una tiene su
  propio `alt` y no se heredan.
- **Degradación en vez de mentira.** Sin `NEXT_PUBLIC_FORMSPREE_ID` el
  formulario avisa en vez de fingir un envío; sin `GITHUB_TOKEN` la traza usa
  el snapshot versionado y lo rotula con su fecha.

## Antes de dar algo por terminado

Medir, no suponer: `npm run build`, `npm test`, y comprobar en el build de
producción que no hay scroll horizontal entre 320 y 1600 px en los dos temas.
Lighthouse debe quedar por encima de 95 en las cuatro métricas.

## Exploraciones de diseño

Las direcciones alternativas viven fuera del repo, en
`~/Developer/portfolio-designs/` (mockups HTML autocontenidos).
