import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Exportación estática: el sitio se sirve como HTML plano, sin Node detrás.
   * Es lo que permite alojarlo en GitHub Pages.
   */
  output: "export",

  /**
   * El optimizador de imágenes necesita un servidor. Con export no lo hay, así
   * que las imágenes se sirven tal cual; por eso `sleeve.jpg` ya viene
   * redimensionada a 320 px en vez de confiar en el redimensionado en vuelo.
   */
  images: { unoptimized: true },

  /**
   * Genera `en/index.html` en vez de `en.html`. GitHub Pages resuelve las dos
   * formas, pero la carpeta con índice la sirve bien cualquier host estático,
   * y evita depender de una comodidad concreta del proveedor.
   */
  trailingSlash: true,

  /**
   * Prefijo de ruta, solo para el sitio de proyecto de GitHub Pages, que vive
   * bajo `/portfolio/`. Con dominio propio el sitio cuelga de la raíz y esta
   * variable no se define, así que queda vacío.
   */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
};

export default nextConfig;
