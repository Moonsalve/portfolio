import "server-only";
import snapshot from "@/content/github-activity.json";
import { site } from "@/site.config";

/** Una semana del calendario de contribuciones: fecha del domingo y total. */
export type ActivityWeek = { readonly week: string; readonly count: number };

export type Activity = {
  readonly weeks: readonly ActivityWeek[];
  readonly total: number;
  readonly activeWeeks: number;
  readonly peak: number;
  readonly from: string;
  readonly to: string;
  /**
   * `live` = consultado a la API en este render (con caché de un día).
   * `snapshot` = copia versionada en el repo. La página dice cuál está viendo:
   * presentar datos de hace meses como si fueran de hoy sería mentir con una
   * gráfica, que es la forma más fácil de mentir.
   */
  readonly source: "live" | "snapshot";
  readonly capturedAt: string;
};

const QUERY = `query($login:String!){
  user(login:$login){
    contributionsCollection{
      contributionCalendar{
        totalContributions
        weeks{ contributionDays{ date contributionCount } }
      }
    }
  }
}`;

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
        };
      };
    };
  };
};

function fromSnapshot(): Activity {
  return { ...snapshot, source: "snapshot" } satisfies Activity;
}

/**
 * Historial de contribuciones del último año.
 *
 * Sin `GITHUB_TOKEN` —o si la API falla— devuelve el snapshot versionado en
 * `src/content/github-activity.json` en vez de dejar un hueco: una gráfica que
 * a veces desaparece es peor que una gráfica fechada.
 *
 * La consulta se cachea un día. El calendario de GitHub cambia como mucho una
 * vez al día; pedirlo en cada visita sería gastar cuota para ver lo mismo.
 */
export async function getActivity(): Promise<Activity> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return fromSnapshot();

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: site.githubUser } }),
      next: { revalidate: 86_400 },
    });
    if (!response.ok) return fromSnapshot();

    const payload = (await response.json()) as GraphQLResponse;
    const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar || calendar.weeks.length === 0) return fromSnapshot();

    const weeks: ActivityWeek[] = calendar.weeks.map((week) => ({
      week: week.contributionDays[0]?.date ?? "",
      count: week.contributionDays.reduce((sum, day) => sum + day.contributionCount, 0),
    }));

    const counts = weeks.map((entry) => entry.count);
    return {
      weeks,
      total: calendar.totalContributions,
      activeWeeks: counts.filter((count) => count > 0).length,
      peak: Math.max(...counts),
      from: weeks[0]?.week ?? "",
      to: calendar.weeks.at(-1)?.contributionDays.at(-1)?.date ?? "",
      source: "live",
      capturedAt: new Date().toISOString().slice(0, 10),
    };
  } catch {
    // Red caída, cuota agotada, token revocado: la página no se cae con la API.
    return fromSnapshot();
  }
}
