import type { Dictionary } from "./types";

export const en: Dictionary = {
  localeName: "English",
  meta: {
    title: "Juan Monsalve — Systems and Computing Engineer",
    description:
      "Software engineer in Bucaramanga, Colombia. I build systems where the language model is one component, not the whole architecture.",
  },
  nav: {
    work: "Work",
    approach: "How I work",
    experience: "Experience",
    contact: "Contact",
    skipToContent: "Skip to content",
  },
  header: {
    role: "Systems and Computing Engineer",
    availability: "Available for remote work",
    availabilityShort: "Available",
    location: "Bucaramanga, Colombia · GMT−5",
    photoAlt: "Portrait of Juan Monsalve",
    monogramLabel: "Juan Monsalve's initials",
    actions: {
      github: "GitHub",
      cv: "Résumé (PDF)",
      email: "Email me",
      linkedin: "LinkedIn",
    },
    localeSwitch: "Change language",
  },
  activity: {
    eyebrow: "GitHub activity",
    total: "contributions in 12 months",
    active: "weeks with activity",
    peak: "busiest week",
    live: "live",
    snapshot: "snapshot from",
    empty: "No activity data available.",
  },
  specs: {
    location: "Location",
    timezone: "Time zone",
    mode: "Mode",
    languages: "Languages",
  },
  thesis: {
    eyebrow: "Thesis",
    body: "I build systems where the language model is one component, not the whole architecture. Most of my engineering judgment goes into deciding where a model earns its latency and cost — and where a cheaper deterministic path wins.",
  },
  sections: {
    work: {
      title: "Work",
      lede: "Three systems, each with the decision that was hard to make. The figures in the margin are measured, not estimated.",
    },
    approach: {
      title: "How I work",
      lede: "Three principles, each anchored to a real decision that changed course once it was measured.",
    },
    experience: {
      title: "Experience and education",
      lede: "Three years of remote work with US teams and customers, alongside the degree.",
    },
    contact: {
      title: "Contact",
      lede: "Open to remote backend, platform, or AI systems roles. I reply within 24 hours.",
    },
  },
  projects: {
    apollo: {
      tagline: "Spanish voice assistant, fully local.",
      status: null,
      access: "Public repo",
      body: [
        "An end-to-end voice agent running entirely on device: Silero VAD, faster-whisper large-v3-turbo on CUDA, Piper TTS, and a local LLM through Ollama. No audio ever leaves the machine.",
        "The central decision was taking the LLM off the critical path. Routing has four stages — literal, patterns, embedding similarity, and the model as a last resort — and the metric that governs average latency isn't accuracy, it's the share of turns that reach the LLM at all.",
        "The bug that taught the most: cosine scores for positives and negatives overlapped, so no absolute threshold could separate them. The fix was centering the embeddings and adding an explicit negative class, `_fallback`, instead of going back to tune the number again.",
        "Execution control: tools live behind an allowlist with strict Pydantic schemas. The model picks an intent and its arguments; it never emits shell.",
      ],
    },
    canchas: {
      tagline: "Amateur football league management, in production.",
      status: "In production",
      access: "2 private repos",
      body: [
        "It started as a refactor from one monolith into two typed repositories — a Node API and an Electron desktop client — and today it is a deployed product the league's scorekeepers use. Twenty-two domain models: leagues, tournaments, teams, players, matches, goals, cards, debts, fines, credits, payroll, and field assignment.",
        "The decision worth telling is a product one. Every football schema models a match as home versus away, and that's how this was built. But amateur leagues rent neutral fields — both teams travel to the same place. The distinction meant nothing and forced the administrator into an arbitrary choice on every match. It was replaced with `team1`/`team2`, migration included.",
        "Deployment is a `docker compose` on a self-hosted server: Caddy issues and renews the certificate on its own, Postgres publishes no port — only the API reaches it over the internal network — and migrations run as the container boots. Backups are daily, and a script restores the latest one into a separate database and counts what survived. A backup that has never been restored isn't a backup, it's a folder.",
        "The client updates itself from that same server, and the API address is compiled into the installer: the scorekeeper installs it, opens it, and signs in without configuring anything. Permissions follow the job rather than the hierarchy — the administrator manages accounts and payroll; the scorekeeper only sees today's cash box — and whoever collected a payment stays on the record even if the account is later deleted.",
      ],
    },
    leadTriage: {
      tagline: "Lead triage with a commercial model.",
      status: "In progress",
      access: "Private repo for now",
      body: [
        "A webhook that receives form submissions, drops the obvious ones with cheap rules, and classifies only the ambiguous ones through the Anthropic API, using structured output validated against a schema.",
        "The point of the project is the accounting: every lead is stored with its token count and cost, and a stats endpoint reports what share of them reached the model at all. It's the same cheap pre-filter as Apollo, applied to a service that actually bills per token.",
      ],
    },
  },
  rail: {
    "apollo.turn": "full turn measured on the PC: STT, routing, and execution",
    "apollo.route": "semantic routing, against 250–500 ms for the LLM",
    "apollo.suite": "positives and negatives in the intent bench",
    "apollo.tests": "automated tests passing",
    "canchas.shipped": "in production, self-updating from its own server",
    "canchas.models": "domain models in Postgres",
    "canchas.commits": "commits across two typed repos, April to September",
    "canchas.containers": "containers: Caddy, the API, and Postgres with no public port",
    "leadTriage.wip": "under construction, fully specified",
    "leadTriage.cost": "tokens and cost recorded per lead",
  },
  railHeading: "Evidence",
  stackHeading: "Stack",
  repoLink: "View code",
  principles: {
    measure: {
      title: "Measure before architecting",
      body: "I dropped Moonshine for speech recognition after confirming no Spanish model exists. I dropped the absolute cosine threshold after measuring that positives and negatives overlap. Neither was visible on paper.",
    },
    contract: {
      title: "Widen the contract instead of tightening the prompt",
      body: "\"Set the volume to 50\" kept classifying as step-up rather than set-level: encoders treat numbers as close to noise. Adding examples worked, then broke on the next phrasing. The fix was making the mistake stop mattering: both intents accept a level, and the skill prefers it over the step.",
    },
    loud: {
      title: "Failures should be loud",
      body: "I built speaker verification for Apollo and shipped it off by default: measured against background noise, it started rejecting me. A security feature whose failure mode is locking out the only legitimate user isn't security.",
    },
  },
  experience: {
    roles: {
      teamManager: {
        period: "Nov 2025 – Aug 2026",
        role: "Team Manager — Operations and data analysis",
        company: "WW Funcrafters JWA LLC",
      },
      sales: {
        period: "Feb 2024 – Nov 2025",
        role: "Customer Sales & Support",
        company: "WW Funcrafters JWA LLC",
      },
      support: {
        period: "Dec 2023 – Sep 2024",
        role: "Customer Technical Support Engineer",
        company: "Concentrix Web Help",
      },
    },
    remote: "Remote",
    education: {
      heading: "Education",
      degree: "B.Sc. Systems and Computing Engineering",
      school: "Universidad Pontificia Bolivariana, Bucaramanga",
      period: "2023 – 2026",
    },
    certifications: {
      heading: "Certifications",
      items: [
        "AWS Cloud Practitioner Fundamentals",
        "Linux Fundamentals",
        "Python",
        "SQL & Databases",
        "Git & GitHub",
        "Agile & Scrum",
        "Networking Fundamentals",
      ],
    },
    languages: {
      heading: "Languages",
      items: ["Spanish — native", "English — C1+"],
    },
  },
  contact: {
    directHeading: "Direct",
    emailLabel: "Email",
    githubLabel: "GitHub",
    cvLabel: "Download résumé (PDF)",
    form: {
      heading: "Or write here",
      name: "Name",
      email: "Email",
      message: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "where I should reply",
      messagePlaceholder: "What you're working on",
      honeypot: "Leave this field empty",
      submit: "Send message",
      submitting: "Sending…",
      success: "Message sent. I reply within 24 hours.",
      error: "Couldn't send it. Email me directly at the address above.",
      validationEmail: "That email doesn't look valid.",
      validationRequired: "This field is required.",
      unavailable:
        "The form isn't wired up yet. For now, the email above is the direct route.",
    },
  },
  sleeve: {
    alt: "Cover of the album OK Computer, by Radiohead",
  },
  footer: {
    built: "Built with Next.js and TypeScript. No analytics, no trackers.",
    source: "Source for this page",
  },
};
