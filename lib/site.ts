/**
 * Central site configuration & content.
 * Update contact placeholders, practice areas, and brand strings here —
 * every page reads from this single source of truth.
 */

export const site = {
  name: "Shrimal & Associates",
  shortName: "Shrimal & Associates",
  legalLine: "Advocates & Legal Consultants",

  // Hero / long-form tagline
  tagline: "Counsel You Can Trust, Advocacy That Delivers",
  // Recurring brand line (footer, cards, metadata)
  brandLine: "Advocacy. Integrity. Results.",

  description:
    "Shrimal & Associates is a litigation-focused law firm representing clients across Indian courts in criminal, matrimonial & family, service, and PMLA & special-legislation matters.",

  url: "https://www.shrimalassociates.in",

  // ── Contact placeholders — replace with real details ──
  contact: {
    // [PLACEHOLDER] Office address
    addressLines: [
      "Chamber No. 000, [Building Name]",
      "[Street / Area]",
      "New Delhi, 110000",
    ],
    addressInline:
      "Chamber No. 000, [Building Name], [Street / Area], New Delhi, 110000",
    // [PLACEHOLDER] Google Maps link
    mapsUrl: "https://maps.google.com/?q=Shrimal+%26+Associates+New+Delhi",
    // [PLACEHOLDER] Embedded map query
    mapsEmbedQuery: "Patiala House Courts, New Delhi",
    // [PLACEHOLDER] Phone
    phoneDisplay: "+91 00000 00000",
    phoneHref: "+910000000000",
    // [PLACEHOLDER] Email
    email: "contact@shrimalassociates.in",
    hours: "Mon – Sat · 10:00 AM – 7:00 PM",
  },

  social: {
    linkedin: "#",
  },
} as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Team", href: "/team" },
  { label: "Experience", href: "/experience" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export type PracticeArea = {
  slug: string;
  title: string;
  short: string;
  description: string;
  points: string[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "criminal-law",
    title: "Criminal Law",
    short: "Bail, trial & appellate defence across criminal courts.",
    description:
      "Strategic, discreet representation at every stage of the criminal process — from arrest and bail to trial, revision, and appeal — before Magistrate and Sessions Courts, High Courts, and the Supreme Court.",
    points: [
      "Anticipatory & regular bail applications",
      "Trial defence and cross-examination strategy",
      "Quashing petitions under Section 482 CrPC",
      "Appeals, revisions & criminal writs",
    ],
  },
  {
    slug: "matrimonial-family-law",
    title: "Matrimonial & Family Law",
    short: "Sensitive, decisive counsel for family disputes.",
    description:
      "Compassionate yet firm representation in matrimonial and family matters, with a focus on protecting your interests and your children's welfare while pursuing timely, dignified resolutions.",
    points: [
      "Divorce — contested & mutual consent",
      "Maintenance, alimony & child custody",
      "Domestic violence & protection orders",
      "Mediation, settlement & restitution",
    ],
  },
  {
    slug: "service-law",
    title: "Service Law",
    short: "Protecting the rights of employees and officers.",
    description:
      "Representation in service and employment disputes before Administrative Tribunals, High Courts, and the Supreme Court — safeguarding careers, entitlements, and procedural fairness.",
    points: [
      "Disciplinary & departmental proceedings",
      "Promotions, seniority & pension disputes",
      "Wrongful termination & reinstatement",
      "Tribunal & writ petitions",
    ],
  },
  {
    slug: "pmla-special-legislation",
    title: "PMLA & Special Legislation",
    short: "Defence in economic-offence & regulatory matters.",
    description:
      "Rigorous, detail-driven representation in proceedings under the Prevention of Money Laundering Act and allied economic and special statutes — before the Adjudicating Authority, Special Courts, and Appellate Tribunals.",
    points: [
      "ED summons, attachment & adjudication",
      "Bail in PMLA & economic offences",
      "Appellate Tribunal & High Court challenges",
      "Compliance & advisory on regulatory risk",
    ],
  },
  {
    slug: "civil-litigation",
    title: "Litigation & Civil Disputes",
    short: "Resolving property, commercial & contractual disputes.",
    description:
      "End-to-end conduct of civil and commercial disputes — from drafting and interim relief to trial and execution — across civil courts, High Courts, and specialised forums.",
    points: [
      "Property, partition & title disputes",
      "Contractual & commercial litigation",
      "Recovery, injunctions & interim relief",
      "Arbitration & enforcement",
    ],
  },
];

export type Matter = {
  area: string;
  summary: string;
};

// Generalised, confidentiality-safe representative experience.
export const matters: Matter[] = [
  {
    area: "PMLA & Economic Offences",
    summary:
      "Represented clients before Special Courts and the Appellate Tribunal in proceedings under the Prevention of Money Laundering Act, including attachment and bail matters.",
  },
  {
    area: "Matrimonial & Family",
    summary:
      "Extensive matrimonial litigation experience before Family Courts and at Patiala House, covering contested divorce, custody, and maintenance.",
  },
  {
    area: "Criminal Defence",
    summary:
      "Secured bail and conducted trial defence across Magistrate and Sessions Courts, with quashing and appellate work before the High Court.",
  },
  {
    area: "Service Law",
    summary:
      "Advised and represented government servants and officers in disciplinary, promotion, and pension disputes before Tribunals and the High Court.",
  },
  {
    area: "Civil & Commercial",
    summary:
      "Conducted property, contractual, and recovery disputes through interim relief, trial, and execution stages.",
  },
  {
    area: "Writ & Constitutional",
    summary:
      "Filed and argued writ petitions raising questions of procedural fairness and statutory interpretation before constitutional courts.",
  },
];

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "15+", label: "Years of combined practice" },
  { value: "5", label: "Core practice areas" },
  { value: "1,000+", label: "Matters handled" },
  { value: "All", label: "Forums — trial to Supreme Court" },
];

export const values = [
  {
    title: "Advocacy",
    body: "Prepared, persuasive, and relentless representation — at every forum, on every record.",
  },
  {
    title: "Integrity",
    body: "Candid advice and ethical conduct. We tell you where you stand, not what you want to hear.",
  },
  {
    title: "Results",
    body: "A strategy built around your outcome, with clear communication at every stage of the matter.",
  },
];
