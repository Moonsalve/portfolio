import type { Dictionary } from "./types";

export const es: Dictionary = {
  localeName: "Español",
  meta: {
    title: "Juan Monsalve — Ingeniero en Sistemas e Informática",
    description:
      "Ingeniero en sistemas e informática. Construyo y despliego sistemas de backend que llegan a producción: un asistente de voz que responde en 135 ms sin conexión y un producto que una liga entera usa a diario.",
  },
  nav: {
    work: "Proyectos",
    approach: "Cómo trabajo",
    experience: "Experiencia",
    contact: "Contacto",
    skipToContent: "Saltar al contenido",
  },
  header: {
    role: "Ingeniero en Sistemas e Informática · Software Engineer",
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
  specs: {
    location: "Ubicación",
    timezone: "Zona horaria",
    mode: "Modalidad",
    languages: "Idiomas",
  },
  thesis: {
    eyebrow: "Tesis",
    body: "Diseño, construyo y despliego sistemas de backend que llegan a producción y se sostienen ahí: despliegue, respaldos verificados y actualizaciones incluidos. Cuando un modelo de lenguaje forma parte de uno, lo trato como un componente más de la arquitectura, no como la arquitectura entera. Mi trabajo es decidir dónde justifica su latencia y su costo, y dónde conviene un camino determinista más barato.",
  },
  sections: {
    work: {
      title: "Proyectos",
      lede: "Tres sistemas que diseñé, construí y desplegué yo. Cada cifra del margen está medida sobre el sistema real, no estimada.",
    },
    approach: {
      title: "Cómo trabajo",
      lede: "Tres decisiones que tomé mal la primera vez y corregí al medirlas. Sirven mejor que cualquier declaración de principios.",
    },
    experience: {
      title: "Experiencia y formación",
      lede: "Tres años de trabajo remoto con equipos y clientes de EE.UU., en paralelo a la carrera.",
    },
    contact: {
      title: "Contacto",
      lede: "Busco un rol remoto de backend, plataformas o sistemas con IA. Respondo en menos de 24 horas.",
    },
  },
  projects: {
    apollo: {
      tagline: "Asistente de voz en español. 135 ms, sin conexión.",
      status: null,
      access: "Repositorio público",
      body: [
        "Un turno completo, del micrófono a la respuesta hablada, tarda 135 milisegundos medidos sobre el equipo de destino. Todo ocurre ahí mismo: sin conexión, sin servicios de terceros y sin que un solo byte de audio salga de la máquina.",
        "Ese tiempo es consecuencia de una decisión de arquitectura: el modelo de lenguaje no está en la ruta crítica. Las órdenes se resuelven en cuatro etapas de costo creciente y solo las ambiguas llegan al modelo, de modo que lo que gobierna la latencia y el gasto no es la precisión del modelo, sino qué porcentaje de órdenes necesita llegar hasta él. Ese porcentaje se mide en cada versión.",
        "El control de ejecución va por lista blanca: el modelo elige una intención y sus argumentos dentro de un esquema validado, y nunca genera comandos. El proyecto acumula 307 pruebas automatizadas, y el banco de intenciones se ejecuta entero antes de tocar cualquier umbral.",
      ],
    },
    canchas: {
      tagline: "Una liga entera corriendo sobre esto, todos los días.",
      status: "En producción",
      access: "2 repositorios privados",
      body: [
        "Una liga de fútbol amateur lleva aquí sus torneos, sus cobros y sus nóminas, todos los días y en producción. Veintidós modelos de dominio repartidos entre una API y un cliente de escritorio, ambos con tipado estricto. Empezó como el refactor de un monolito; hoy es un producto que se instala, se actualiza y se mantiene solo.",
        "La decisión que más cambió el producto no fue técnica sino de dominio. Todo esquema de fútbol modela el partido como local contra visitante, y así estaba construido; pero las ligas amateur alquilan canchas neutrales y ambos equipos viajan al mismo lugar. La distinción no significaba nada y obligaba al administrador a una elección arbitraria en cada partido, así que se eliminó, con su migración de datos.",
        "El despliegue y la operación también son míos: contenedores en un servidor propio, certificado que se renueva solo, base de datos sin puerto expuesto, respaldos diarios y un script que restaura el último en una base aparte para comprobar que sirven. El cliente se actualiza desde ese mismo servidor sin que el usuario configure nada, y los permisos siguen al oficio: el administrador maneja cuentas y nóminas, el planillero solo ve la caja del día.",
      ],
    },
    leadTriage: {
      tagline: "Clasifica formularios y mide lo que cuesta cada consulta.",
      status: "En construcción",
      access: "Repositorio privado por ahora",
      body: [
        "Servicio que recibe formularios de contacto, descarta con reglas baratas lo que no necesita un modelo y clasifica el resto con la API de Anthropic, validando la respuesta contra un esquema antes de guardarla.",
        "El objetivo es el control de costos: cada consulta queda registrada con sus tokens y su gasto, y un endpoint reporta qué porcentaje de los formularios llegó a necesitar el modelo. Es el mismo criterio de Apollo aplicado a un servicio que cobra por uso.",
      ],
    },
  },
  rail: {
    "apollo.turn": "turno completo medido en el PC: STT, ruteo y ejecución",
    "apollo.route": "ruteo semántico, frente a 250–500 ms del LLM",
    "apollo.suite": "positivos y negativos del banco de intenciones",
    "apollo.tests": "pruebas automatizadas en verde",
    "canchas.shipped": "en producción, con auto-actualización desde el servidor propio",
    "canchas.models": "modelos de dominio en Postgres",
    "canchas.commits": "commits en dos repositorios tipados, entre abril y septiembre",
    "canchas.containers": "contenedores: Caddy, la API y Postgres sin puerto público",
    "leadTriage.wip": "en construcción, especificado por completo",
    "leadTriage.cost": "tokens y costo registrados por lead",
  },
  railHeading: "Evidencia",
  stackHeading: "Stack",
  repoLink: "Ver código",
  principles: {
    measure: {
      title: "Medir antes de arquitecturar",
      body: "Descarté Moonshine para el reconocimiento de voz tras comprobar que no existe modelo en español. Descarté el umbral fijo de similitud tras medir que los casos válidos y los inválidos se solapaban. Ninguna de las dos decisiones se veía venir sobre el papel.",
    },
    contract: {
      title: "Ensanchar el contrato en vez de apretar el prompt",
      body: "«Sube el volumen al 50» se clasificaba como subir un paso en vez de fijar el nivel, porque los modelos de similitud tratan las cifras casi como ruido. Agregar ejemplos funcionaba y se rompía con la siguiente frase. La solución fue hacer que equivocarse dejara de importar: ambas intenciones aceptan el nivel, y la acción da prioridad al nivel sobre el paso.",
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
        role: "Team Manager, operaciones y análisis de datos",
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
      degree: "Ingeniería de Sistemas e Informática",
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
      items: ["Español: nativo", "Inglés: C1+"],
    },
  },
  contact: {
    directHeading: "Directo",
    emailLabel: "Correo",
    githubLabel: "GitHub",
    cvEsLabel: "CV en español (PDF)",
    cvEnLabel: "CV en inglés (PDF)",
    form: {
      heading: "O escribe aquí",
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      namePlaceholder: "Cómo te llamas",
      emailPlaceholder: "donde te respondo",
      messagePlaceholder: "En qué estás trabajando",
      honeypot: "No llenes este campo",
      emailSubject: "Mensaje desde el portafolio",
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
  sleeve: {
    alt: "Carátula del disco OK Computer, de Radiohead",
  },
  footer: {
    built: "Hecho con Next.js y TypeScript. Sin analítica ni rastreadores.",
    source: "Código de esta página",
  },
};
