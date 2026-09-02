# Portafolio — Juan Monsalve

Página personal en Next.js, bilingüe ES/EN, pensada para acompañar aplicaciones
de trabajo. Existe porque los dos mejores proyectos —Apollo y Canchas— están en
repos privados: la web permite mostrarlos con profundidad sin exponer el código.

El concepto de diseño es un **panel de instrumento**: fondo de rejilla
milimetrada, secciones rotuladas como canales (`CH 01`, `CH 02`…) y las cifras
medidas presentadas como lecturas al margen del párrafo que sustentan. En el
encabezado, una traza de osciloscopio dibuja el historial real de
contribuciones de GitHub.

## Stack

| Pieza | Elección |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Lenguaje | TypeScript en modo estricto |
| Estilos | CSS Modules + tokens en `:root` |
| Tipografía | Chivo · JetBrains Mono, ambas variables (`next/font`) |
| Formulario | Formspree |
| Datos | GitHub GraphQL API, con snapshot versionado como respaldo |
| Pruebas | `node:test` nativo, sin dependencias |
| Despliegue | Vercel |

## Comandos

```bash
npm run dev     # desarrollo en http://localhost:3000
npm run build   # build de producción
npm start       # servir el build
npm test        # pruebas unitarias
npx tsc --noEmit && npx eslint src   # tipos y lint
```

## Variables de entorno

Copiar `.env.example` a `.env.local`:

```
NEXT_PUBLIC_FORMSPREE_ID=xxxxxxxx
GITHUB_TOKEN=ghp_xxxxxxxx
```

`NEXT_PUBLIC_FORMSPREE_ID` es el identificador de `https://formspree.io/f/<id>`.
**Sin él el formulario no se rompe**: se degrada a un aviso que remite al correo
directo, en vez de fingir un envío que nadie recibiría.

`GITHUB_TOKEN` es un token con permiso `read:user`, usado para consultar el
calendario de contribuciones. **Sin él la traza tampoco se rompe**: cae al
snapshot versionado en `src/content/github-activity.json` y lo rotula con su
fecha, en vez de desaparecer o mentir sobre cuándo se midió.

## Decisiones que no son obvias

**La traza del encabezado son datos, no decoración.** El boceto tenía una línea
de osciloscopio dibujada a mano. Sustituirla por el historial real de
contribuciones cuesta poco y cambia lo que la página afirma: pasa de sugerir
que aquí se mide, a mostrarlo. La escala es lineal contra el pico del propio
periodo —sin recortes ni normalizaciones inventadas—, así que la forma de la
curva es la forma real de la actividad.

**La consulta se cachea un día y nunca tumba la página.** El calendario de
GitHub cambia como mucho una vez al día; pedirlo en cada visita sería gastar
cuota para ver lo mismo. Si la API falla, la cuota se agota o el token se
revoca, se sirve el snapshot: una gráfica que a veces desaparece es peor que
una gráfica fechada.

**El idioma se resuelve en el servidor.** Cookie `locale` primero, luego
`Accept-Language`. La alternativa —detectar en el cliente y corregir tras
hidratar— hacía que un navegador en inglés recibiera HTML en español y lo
reemplazara entero a la vista: un destello de idioma equivocado y 0.312 de CLS
medidos. El servidor ya recibe las preferencias del navegador en cada petición;
no usarlas era regalar el problema.

**Cookie y no `localStorage`.** Una preferencia guardada donde el servidor no la
ve garantiza que el primer render esté equivocado.

**El diccionario es un contrato de tipos.** `Dictionary` (en `src/i18n/types.ts`)
usa `Record` sobre uniones cerradas derivadas de `src/content/projects.ts`. Si
una clave falta en un idioma, **el build falla**; no queda un hueco silencioso.
Agregar una cifra al riel sin su etiqueta en ambos idiomas también rompe.

**Una línea, no un mapa de calor.** Los cuadritos de GitHub castigan la
dispersión: 43 semanas vacías se leen como abandono. Una traza con pulsos
aislados se lee como señal real de un instrumento. Con estos datos concretos
—64 contribuciones, 10 de 53 semanas activas— la diferencia no es estética,
es lo que el visitante concluye.

**`font-display: optional`, no `swap`.** Con `swap`, el intercambio de fuente
reflowaba el encabezado y movía la página entera: 0.282 de CLS. `optional` deja
la página quieta a cambio de que una primera visita por conexión mala vea las
fuentes del sistema.

**Chivo y JetBrains Mono variables, sin `weight`.** Esta dirección usa 300 para
el cuerpo y 900 para los titulares; en instancias estáticas eso serían cuatro
descargas en vez de dos. La regla no es "variable siempre": en la iteración
anterior, con dos pesos de una serif, las instancias estáticas ganaban. Se mide
cada caso.

**Las variables de fuente van en `<html>`, no en `<body>`.** Los tokens
`--font-display/body/mono` se declaran en `:root`; un `var()` dentro de otra
custom property se resuelve en el elemento donde está declarada. Con las
variables un nivel más abajo, toda la tipografía cae a Times sin que nada falle
de forma visible. Pasó, y solo se detectó midiendo `getComputedStyle`.

**La tesis no se anima al hacer scroll.** Está sobre el pliegue en cualquier
viewport realista: animarla no revela nada y movía el LCP de 68 ms a 636 ms.

## Verificado

Medido contra el build de producción, no estimado:

| Criterio | Resultado |
|---|---|
| Lighthouse (móvil) | 97 rendimiento · 100 accesibilidad · 100 buenas prácticas · 100 SEO |
| Core Web Vitals | LCP 2.6 s · FCP 0.9 s · CLS 0.000 · TBT 10 ms |
| Scroll horizontal | ninguno entre 320 y 1600 px, en tema claro y oscuro |
| Idioma | negociado en servidor; la elección persiste; `<html lang>` se actualiza |
| Formulario | los cuatro estados, validación en cliente y honeypot, sin red de por medio cuando no corresponde |
| Sin JavaScript | contenido completo y visible |
| Traza de actividad | renderizada en servidor, con `aria-label` que enuncia las cifras |
| Pruebas | 6/6 |

## Estructura

```
src/
  app/          layout (fuentes, metadatos, JSON-LD), página, sitemap, robots, imagen OG
  components/   secciones de la página, cada una con su CSS Module
  content/      estructura de proyectos y snapshot de actividad de GitHub
  lib/          acceso a la API de GitHub, con respaldo y caché
  i18n/         contrato Dictionary, diccionarios es/en, store de idioma, negociación
  site.config.ts  identidad, enlaces y banderas de configuración
tests/          pruebas unitarias
```

## Pendientes antes de publicar

- [ ] **Foto profesional** en `public/`, y apuntar `site.photo` en
      `src/site.config.ts`. El hueco del retrato tiene una cadena de respaldo:
      `photo` si existe, si no `sleeve`, y si no un monograma. Basta con
      rellenar `photo` para que la carátula desaparezca sola; no hay que borrar
      nada.
      `site.sleeve` es una carátula de disco, no un retrato, y por eso su texto
      alternativo describe la carátula. Ocupar el hueco del retrato es una
      decisión de diseño; decir en el `alt` que es una persona sería una
      afirmación falsa dirigida justamente a quien no puede ver la imagen. Es
      además obra de un tercero: conviene tenerlo en cuenta antes de publicar
      el sitio en un dominio propio.
- [ ] **Dominio.** Actualizar `site.url` — hoy apunta a `juanmonsalve.dev` como
      marcador. Afecta canonical, sitemap, Open Graph y JSON-LD.
- [ ] **Correo profesional.** `site.email` sigue siendo el de Hotmail. Con el
      dominio se puede tener `juan@<dominio>` redirigiendo al actual.
- [ ] **LinkedIn.** `site.linkedin` es `null` a propósito: el handle está sin
      verificar y el de GitHub asumido resultó equivocado. Al confirmarlo, poner
      la URL y el enlace aparece solo, en el encabezado y en el JSON-LD.
- [ ] **Formspree.** Crear el formulario y poner `NEXT_PUBLIC_FORMSPREE_ID` en
      las variables de entorno de Vercel.
- [ ] **CV.** `public/cv-juan-monsalve.pdf` es el que estaba en `~/Downloads`
      con fecha del 1 de septiembre de 2026. Reemplazarlo cuando cambie.
- [ ] **Token de GitHub** en las variables de Vercel, para que la traza sea
      "en vivo" en vez de "instantánea del …".
- [ ] **La traza sale dispersa, y eso es un dato real, no un bug.** Medido el
      2026-09-02: 64 contribuciones en 12 meses, 10 de 53 semanas con
      actividad, 0 contribuciones privadas. Canchas tiene 2 commits por repo y
      Apollo 22 para 307 tests: el trabajo existe, pero no está versionado. Lo
      único que arregla la gráfica es commitear con la frecuencia con la que
      realmente se trabaja. Si hay contribuciones en repos privados, activar
      además "Include private contributions" en el perfil de GitHub.

## Despliegue

1. Subir el repo a `github.com/Moonsalve/portfolio`.
2. Importarlo en Vercel; detecta Next.js sin configuración.
3. Definir `NEXT_PUBLIC_FORMSPREE_ID` en las variables del proyecto.
4. Apuntar el dominio y actualizar `site.url`.
5. Verificar HTTPS, `sitemap.xml`, `robots.txt` y la previsualización del enlace
   (`/opengraph-image`).
