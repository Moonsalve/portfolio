import { withBasePath } from "@/lib/paths";

/**
 * Credenciales verificables.
 *
 * Van separadas de `certifications.items`, que son cursos sin credencial, por
 * una razón que no es de diseño: un reclutador técnico puede comprobar estas
 * cuatro con un clic y las otras no. Mezclarlas en una sola lista borraría
 * justo la diferencia que las hace valer.
 *
 * Las imágenes se sirven desde `public/` en vez de pedirlas a
 * `images.credly.com`. Son 52 KB en total, y a cambio el sitio no abre una
 * conexión a un tercero ni queda a merced de su disponibilidad: el resto de
 * la página está medida en Lighthouse 96–100 y no vale la pena arriesgarlo
 * por cuatro imágenes que no cambian nunca.
 *
 * Los nombres están en inglés en los dos idiomas porque son el título oficial
 * de la credencial. Traducirlos rompería la correspondencia con la página de
 * verificación a la que enlazan.
 */
export const credentials = [
  {
    id: "gcp-computing-foundations",
    name: "Google Cloud Computing Foundations Certificate",
    image: withBasePath("/credly/gcp-computing-foundations.png"),
    verify: "https://www.credly.com/badges/50053e65-ed2a-45ea-8c74-44053add6bba/public_url",
  },
  {
    id: "gcp-app-dev-environment",
    name: "Set Up an App Dev Environment on Google Cloud",
    image: withBasePath("/credly/gcp-app-dev-environment.png"),
    verify: "https://www.credly.com/badges/5a1f3fb1-33e6-4cd7-bdaa-f77f767ad36b/public_url",
  },
  {
    id: "gcp-secure-network",
    name: "Build a Secure Google Cloud Network",
    image: withBasePath("/credly/gcp-secure-network.png"),
    verify: "https://www.credly.com/badges/5e354e96-5d31-45b0-b64c-3779fd701986/public_url",
  },
  {
    id: "gcp-ml-apis",
    name: "Prepare Data for ML APIs on Google Cloud",
    image: withBasePath("/credly/gcp-ml-apis.png"),
    verify: "https://www.credly.com/badges/55320283-a457-4865-b860-cb371e1770bd/public_url",
  },
] as const;

/** Lado del PNG de origen. Se muestra más pequeño, pero se descarga a 220
 *  para que no se vea blando en pantallas de densidad doble. */
export const CREDENTIAL_SOURCE_SIZE = 220;
