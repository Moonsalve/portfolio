import type { Dictionary } from "./types";

export const es: Dictionary = {
  localeName: "Español",
  meta: {
    title: "Juan Monsalve — Ingeniero de Software",
    description:
      "Ingeniero de software en Bucaramanga, Colombia. Construyo sistemas donde el modelo de lenguaje es una pieza más de la arquitectura, no el sistema entero.",
  },
  nav: {
    work: "Proyectos",
    approach: "Cómo trabajo",
    experience: "Experiencia",
    contact: "Contacto",
    skipToContent: "Saltar al contenido",
  },
  header: {
    role: "Ingeniero de Software",
    availability: "Disponible para trabajo remoto",
    availabilityShort: "Disponible",
    location: "Bucaramanga, Colombia · GMT−5",
    photoAlt: "Retrato de Juan Monsalve",
    monogramLabel: "Iniciales de Juan Monsalve",
    actions: {
      github: "GitHub",
      cv: "CV en PDF",
      email: "Escribirme",
      linkedin: "LinkedIn",
    },
    localeSwitch: "Cambiar idioma",
  },
  activity: {
    eyebrow: "Actividad en GitHub",
    total: "contribuciones en 12 meses",
    active: "semanas con actividad",
    peak: "semana más alta",
    live: "en vivo",
    snapshot: "instantánea del",
    empty: "Sin datos de actividad disponibles.",
  },
  thesis: {
    eyebrow: "Tesis",
    body: "Construyo sistemas donde el modelo de lenguaje es una pieza más de la arquitectura, no el sistema entero. Mi criterio de ingeniería se va en decidir dónde un modelo justifica su latencia y su costo, y dónde gana un camino determinista más barato.",
  },
  sections: {
    work: {
      title: "Proyectos",
      lede: "Cuatro sistemas, cada uno con la decisión que costó tomarla. Las cifras del margen están medidas, no estimadas.",
    },
    approach: {
      title: "Cómo trabajo",
      lede: "Tres principios, cada uno anclado a una decisión real que cambió de rumbo después de medirla.",
    },
    experience: {
      title: "Experiencia y formación",
      lede: "Tres años de trabajo remoto con equipos y clientes de EE.UU., en paralelo a la carrera.",
    },
    contact: {
      title: "Contacto",
      lede: "Abierto a roles remotos de backend, plataformas o sistemas con IA. Respondo en menos de 24 horas.",
    },
  },
  projects: {
    apollo: {
      tagline: "Asistente de voz en español, 100 % local.",
      status: null,
      access: "Repo público",
      body: [
        "Agente de voz de punta a punta corriendo enteramente en el dispositivo: Silero VAD, faster-whisper large-v3-turbo sobre CUDA, Piper TTS y un LLM local vía Ollama. Ningún audio sale de la máquina.",
        "La decisión central fue sacar al LLM de la ruta crítica. El ruteo tiene cuatro etapas —literal, patrones, similitud por embeddings y el modelo como último recurso— y la métrica que gobierna la latencia media no es la precisión, sino el porcentaje de turnos que llegan al LLM.",
        "El bug que más enseñó: los puntajes coseno de positivos y negativos se solapaban, así que ningún umbral absoluto los separaba. Se resolvió centrando los embeddings y agregando una clase negativa explícita, `_fallback`, en vez de seguir moviendo el número.",
        "Control de ejecución: las herramientas viven en una allowlist con esquemas Pydantic estrictos. El modelo elige una intención y sus argumentos; nunca emite shell.",
      ],
    },
    goatguard: {
      tagline: "Plataforma de monitoreo de red.",
      status: null,
      access: "3 repos públicos",
      body: [
        "Sistema distribuido en tres piezas: un servidor FastAPI, un agente de captura de paquetes en Python con Scapy, y una app Flutter con notificaciones push vía Firebase Cloud Messaging.",
        "Descubrimiento de dispositivos en la red, detección de eventos y alertas que llegan al teléfono sin que la app esté abierta. Es el proyecto que sí puedes leer entero en GitHub.",
      ],
    },
    canchas: {
      tagline: "Gestión de ligas deportivas amateur.",
      status: null,
      access: "Repo privado",
      body: [
        "Refactor de un monolito a dos repositorios tipados: una API y un cliente de escritorio. El dominio va de ligas a torneos, equipos y jugadores, partidos, goles, tarjetas, deudas y asignación de canchas.",
        "La decisión que vale contar es de producto. Todo esquema de fútbol modela el partido como local contra visitante, y así estaba construido. Pero las ligas amateur alquilan canchas neutrales: ambos equipos viajan al mismo lugar. La distinción no significaba nada y obligaba al administrador a una elección arbitraria en cada partido. Se reemplazó por `team1`/`team2`, con su migración.",
      ],
    },
    leadTriage: {
      tagline: "Clasificación de leads con un modelo comercial.",
      status: "En construcción",
      access: "Repo privado por ahora",
      body: [
        "Webhook que recibe formularios, descarta lo obvio con reglas baratas y clasifica solo lo dudoso con la API de Anthropic, usando salida estructurada validada contra un esquema.",
        "El punto del proyecto es la contabilidad: cada lead queda registrado con sus tokens y su costo, y un endpoint de estadísticas reporta qué porcentaje llegó al modelo. Es el mismo pre-filtro barato de Apollo, aplicado a un servicio que sí paga por token.",
      ],
    },
  },
  rail: {
    "apollo.turn": "turno completo medido en el PC: STT, ruteo y ejecución",
    "apollo.route": "ruteo semántico, frente a 250–500 ms del LLM",
    "apollo.suite": "positivos y negativos del banco de intenciones",
    "apollo.tests": "pruebas automatizadas en verde",
    "goatguard.repos": "repositorios: servidor, agente y app",
    "goatguard.push": "notificaciones push a la app Flutter",
    "goatguard.public": "código abierto y legible en GitHub",
    "canchas.repos": "repositorios tipados: API y cliente",
    "canchas.split": "monolito dividido, con migración de datos",
    "leadTriage.wip": "en construcción, especificado por completo",
    "leadTriage.cost": "tokens y costo registrados por lead",
  },
  railHeading: "Evidencia",
  stackHeading: "Stack",
  repoLink: "Ver código",
  principles: {
    measure: {
      title: "Medir antes de arquitecturar",
      body: "Descarté Moonshine para el reconocimiento de voz tras comprobar que no existe modelo en español. Descarté el umbral absoluto de coseno tras medir que positivos y negativos se solapan. Ninguna de las dos se veía venir en el papel.",
    },
    contract: {
      title: "Ensanchar el contrato en vez de apretar el prompt",
      body: "«Sube el volumen al 50» se clasificaba como subir un paso en vez de fijar el nivel: los encoders tratan las cifras casi como ruido. Agregar ejemplos funcionaba y se rompía con la siguiente frase. La solución fue hacer que equivocarse dejara de importar: ambas intenciones aceptan el nivel, y la skill lo prefiere sobre el paso.",
    },
    loud: {
      title: "Las fallas deben ser ruidosas",
      body: "Construí verificación de locutor para Apollo y la envié desactivada por defecto: al medirla con ruido de fondo empezaba a rechazarme a mí. Una función de seguridad cuyo modo de falla es dejar afuera al único usuario legítimo no es seguridad.",
    },
  },
  experience: {
    roles: {
      teamManager: {
        period: "Nov 2025 – Ago 2026",
        role: "Team Manager — Operaciones y análisis de datos",
        company: "WW Funcrafters JWA LLC",
      },
      sales: {
        period: "Feb 2024 – Nov 2025",
        role: "Customer Sales & Support",
        company: "WW Funcrafters JWA LLC",
      },
      support: {
        period: "Dic 2023 – Sep 2024",
        role: "Customer Technical Support Engineer",
        company: "Concentrix Web Help",
      },
    },
    remote: "Remoto",
    education: {
      heading: "Formación",
      degree: "Ingeniería de Sistemas",
      school: "Universidad Pontificia Bolivariana, Bucaramanga",
      period: "2023 – 2026",
    },
    certifications: {
      heading: "Certificaciones",
      items: [
        "AWS Cloud Practitioner Fundamentals",
        "Fundamentos de Linux",
        "Python",
        "SQL y bases de datos",
        "Git y GitHub",
        "Agile y Scrum",
        "Fundamentos de redes",
      ],
    },
    languages: {
      heading: "Idiomas",
      items: ["Español — nativo", "Inglés — C1+"],
    },
  },
  contact: {
    directHeading: "Directo",
    emailLabel: "Correo",
    githubLabel: "GitHub",
    cvLabel: "Descargar CV (PDF)",
    form: {
      heading: "O escribe aquí",
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      namePlaceholder: "Cómo te llamas",
      emailPlaceholder: "donde te respondo",
      messagePlaceholder: "En qué estás trabajando",
      honeypot: "No llenes este campo",
      submit: "Enviar mensaje",
      submitting: "Enviando…",
      success: "Mensaje enviado. Respondo en menos de 24 horas.",
      error: "No se pudo enviar. Escríbeme directo al correo de arriba.",
      validationEmail: "Ese correo no parece válido.",
      validationRequired: "Falta llenar este campo.",
      unavailable:
        "El formulario aún no está conectado. Por ahora, el correo de arriba es la vía directa.",
    },
  },
  footer: {
    built: "Hecho con Next.js y TypeScript. Sin analítica ni rastreadores.",
    source: "Código de esta página",
  },
};
