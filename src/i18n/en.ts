import type { Dictionary } from "./types";

export const en: Dictionary = {
  localeName: "English",
  meta: {
    title: "Juan Monsalve — Systems and Computing Engineer",
    description:
      "Systems and computing engineer. I build and deploy backend systems that reach production: a voice assistant that answers in 135 ms offline, and a product a whole league runs on every day.",
  },
  nav: {
    work: "Work",
    approach: "How I work",
    experience: "Experience",
    contact: "Contact",
    skipToContent: "Skip to content",
  },
  header: {
    role: "Systems & Computing Engineer · Software Engineer",
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
    body: "I design, build, and deploy backend systems that reach production and stay there: deployment, verified backups, and updates included. When a language model is part of one, I treat it as a component of the architecture rather than the architecture itself. My job is deciding where it earns its latency and cost, and where a cheaper deterministic path is the better answer.",
  },
  sections: {
    work: {
      title: "Work",
      lede: "Three systems I designed, built, and deployed myself. Every figure in the margin is measured on the running system, not estimated.",
    },
    approach: {
      title: "How I work",
      lede: "Three calls I got wrong the first time and corrected once I measured them. They say more than any statement of principles.",
    },
    experience: {
      title: "Experience and education",
      lede: "Three years of remote work with US teams and customers, alongside the degree.",
    },
    contact: {
      title: "Contact",
      lede: "I am looking for a remote backend, platform, or AI systems role. I reply within 24 hours.",
    },
  },
  projects: {
    apollo: {
      tagline: "Spanish voice assistant. 135 ms, fully offline.",
      status: null,
      access: "Public repository",
      body: [
        "A full turn, from microphone to spoken answer, takes 135 milliseconds measured on the target machine. All of it happens there: offline, with no third-party services, and without a single byte of audio leaving the device.",
        "That number is the result of an architectural decision: the language model is not on the critical path. Commands resolve through four stages of increasing cost, and only the ambiguous ones reach the model, so what governs latency and spend is not the model's accuracy but the share of commands that need it at all. That share is measured on every release.",
        "Execution is allowlisted: the model picks an intent and its arguments inside a validated schema, and never generates commands. The project carries 307 automated tests, and the full intent benchmark runs before any threshold is touched.",
      ],
    },
    canchas: {
      tagline: "A whole league runs on this, every day.",
      status: "In production",
      access: "2 private repositories",
      body: [
        "An amateur football league runs its tournaments, its collections, and its payroll on this, every day and in production. Twenty-two domain models split across an API and a desktop client, both strictly typed. It began as a monolith refactor; today it is a product that installs, updates, and maintains itself.",
        "The decision that changed the product most was about the domain, not the code. Every football schema models a match as home versus away, and that is how this was built; but amateur leagues rent neutral fields and both teams travel to the same place. The distinction meant nothing and forced the administrator into an arbitrary choice on every match, so it was removed, data migration included.",
        "Deployment and operations are mine as well: containers on a self-hosted server, a certificate that renews itself, a database with no exposed port, daily backups, and a script that restores the latest one into a separate database to prove the backups work. The client updates from that same server with no configuration from the user, and permissions follow the job: the administrator handles accounts and payroll, the scorekeeper only sees the day's cash box.",
      ],
    },
    leadTriage: {
      tagline: "Triages inbound forms and meters what each call costs.",
      status: "In progress",
      access: "Private repository for now",
      body: [
        "A service that receives contact forms, drops whatever does not need a model using cheap rules, and classifies the rest through the Anthropic API, validating the response against a schema before storing it.",
        "The goal is cost control: every call is recorded with its token count and spend, and an endpoint reports what share of submissions needed the model at all. It is the same judgment as Apollo, applied to a service that bills per use.",
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
    "canchas.commits": "commits across two typed repositories, April to September",
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
      body: "I dropped Moonshine for speech recognition after confirming no Spanish model exists. I dropped the fixed similarity threshold after measuring that valid and invalid cases overlapped. Neither decision was visible on paper.",
    },
    contract: {
      title: "Widen the contract instead of tightening the prompt",
      body: "\"Set the volume to 50\" kept classifying as step-up rather than set-level, because similarity models treat numbers as close to noise. Adding examples worked, then broke on the next phrasing. The fix was making the mistake stop mattering: both intents accept a level, and the action prefers the level over the step.",
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
        role: "Team Manager, operations and data analysis",
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
      // Was "Certifications". With verifiable credentials next to it, giving
      // both the same name erased the distinction.
      heading: "Coursework",
      verified: {
        heading: "Verifiable credentials",
        issuer: "Google Cloud · October 2024",
        verifyLabel: "Verify on Credly",
      },
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
      items: ["Spanish: native", "English: C1+"],
    },
  },
  contact: {
    directHeading: "Direct",
    emailLabel: "Email",
    githubLabel: "GitHub",
    cvEsLabel: "Résumé in Spanish (PDF)",
    cvEnLabel: "Résumé in English (PDF)",
    form: {
      heading: "Or write here",
      name: "Name",
      email: "Email",
      message: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "where I should reply",
      messagePlaceholder: "What you're working on",
      honeypot: "Leave this field empty",
      emailSubject: "Message from the portfolio",
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
