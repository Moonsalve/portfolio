# Portafolio — Juan Monsalve

Página personal en Next.js, bilingüe ES/EN, pensada para acompañar aplicaciones
de trabajo. Existe porque los dos mejores proyectos —Apollo y Canchas— están en
repos privados: la web permite mostrarlos con profundidad sin exponer el código.

El concepto de diseño es un **riel de evidencia**: las cifras medidas viven al
margen del párrafo que sustentan, como anotaciones de laboratorio. En pantallas
angostas el riel colapsa debajo de su bloque.

## Stack

| Pieza | Elección |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Lenguaje | TypeScript en modo estricto |
| Estilos | CSS Modules + tokens en `:root` |
| Tipografía | Newsreader · IBM Plex Sans · IBM Plex Mono (`next/font`) |
| Formulario | Formspree |
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
```

Es el identificador de `https://formspree.io/f/<id>`. **Sin él el formulario no
se rompe**: se degrada a un aviso que remite al correo directo, en vez de fingir
un envío que nadie recibiría.

## Decisiones que no son obvias

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

**`font-display: optional`, no `swap`.** Con `swap`, el intercambio de fuente
reflowaba el encabezado y movía la página entera: 0.282 de CLS. `optional` deja
la página quieta a cambio de que una primera visita por conexión mala vea las
fuentes del sistema.

**Newsreader estático de un peso, no variable.** El archivo variable cubre todo
el rango pero cuesta 60 KB por estilo frente a 23 KB. En una página cuyo LCP es
texto, esos 70 KB se pagan en la primera pintura. La jerarquía la da el tamaño.

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
| Lighthouse (móvil) | 98 rendimiento · 100 accesibilidad · 100 buenas prácticas · 100 SEO |
| Core Web Vitals | LCP 2.5 s · FCP 0.9 s · CLS 0.000 · TBT 0 ms |
| Scroll horizontal | ninguno entre 320 y 1600 px, en tema claro y oscuro |
| Idioma | negociado en servidor; la elección persiste; `<html lang>` se actualiza |
| Formulario | los cuatro estados, validación en cliente y honeypot, sin red de por medio cuando no corresponde |
| Sin JavaScript | contenido completo y visible |
| Pruebas | 6/6 |

## Estructura

```
src/
  app/          layout (fuentes, metadatos, JSON-LD), página, sitemap, robots, imagen OG
  components/   secciones de la página, cada una con su CSS Module
  content/      estructura de proyectos: nombres, stack, enlaces, cifras del riel
  i18n/         contrato Dictionary, diccionarios es/en, store de idioma, negociación
  site.config.ts  identidad, enlaces y banderas de configuración
tests/          pruebas unitarias
```

## Pendientes antes de publicar

- [ ] **Foto profesional** en `public/`, y apuntar `site.photo` en
      `src/site.config.ts`. Mientras sea `null`, el encabezado muestra un
      monograma en vez de romper el build con un `next/image` vacío.
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

## Despliegue

1. Subir el repo a `github.com/Moonsalve/portfolio`.
2. Importarlo en Vercel; detecta Next.js sin configuración.
3. Definir `NEXT_PUBLIC_FORMSPREE_ID` en las variables del proyecto.
4. Apuntar el dominio y actualizar `site.url`.
5. Verificar HTTPS, `sitemap.xml`, `robots.txt` y la previsualización del enlace
   (`/opengraph-image`).
