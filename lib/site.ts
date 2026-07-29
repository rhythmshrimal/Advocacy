/**
 * Central site configuration & content.
 * Update contact placeholders, practice areas, and brand strings here -
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

  // ── Contact placeholders ──
  contact: {
    // [PLACEHOLDER] Office address
    addressLines: [
      "Ground Floor, 304",
      "Barkat Nagar, Tonk Phatak",
      "Jaipur, Rajasthan 302015",
    ],
    addressInline:
      "Ground Floor, 304, Barkat Nagar, Tonk Phatak, Jaipur, Rajasthan 302015",
    // [PLACEHOLDER] Google Maps link
    mapsUrl: "https://maps.app.goo.gl/3Fvudu5wAGFY5qNu9",
    // [PLACEHOLDER] Embedded map query
    mapsEmbedQuery: "304, Barkat Nagar, Tonk Phatak, Jaipur, Rajasthan 302015",
    // [PLACEHOLDER] Phone
    phoneDisplay: "+91 99833 21035",
    phoneHref: "+919983321035",
    phone2Display: "+91 89495 69357",
    phone2Href: "+918949569357",
    // [PLACEHOLDER] Email
    email: "contact@shrimalassociates.in",
    hours: "Mon – Sun · 10:00 AM – 9:00 PM",
  },

  social: {
    linkedin: "#",
  },

  /**
   * Photography slots. Drop real, well-lit images into /public/images/ and set
   * the path here (e.g. "/images/hero.jpg"). Leave "" to show a branded
   * placeholder. See /public/images/README.md for recommended dimensions.
   */
  images: {
    hero: "", // wide chambers / courthouse exterior - 1920×1080
    about: "", // firm / chambers interior - 1200×1500 (portrait)
    office: "", // building exterior for the contact page - 1200×900
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

export type FAQ = { q: string; a: string };

export type PracticeArea = {
  slug: string;
  title: string;
  short: string;
  description: string;
  points: string[];
  /** Image slot for the detail page - see site.images notes */
  image: string;
  /** Longer overview paragraphs shown on the dedicated sub-page */
  overview: string[];
  faqs: FAQ[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "criminal-law",
    title: "Criminal Law",
    short: "Bail, trial & appellate defence across criminal courts.",
    description:
      "Strategic, discreet representation at every stage of the criminal process - from arrest and bail to trial, revision, and appeal - before Magistrate and Sessions Courts, High Courts, and the Supreme Court.",
    points: [
      "Anticipatory & regular bail applications",
      "Trial defence and cross-examination strategy",
      "Quashing petitions under Section 482 CrPC",
      "Appeals, revisions & criminal writs",
    ],
    image: "", // 1200×900 - courtroom / chambers
    overview: [
      "A criminal allegation - whether an FIR, a summons, or an arrest - is one of the most disorienting experiences a person can face. Our role is to bring order to it: to explain exactly what you are up against, protect your rights from the first hour, and build a defence grounded in the record rather than in reaction.",
      "We act at every stage of the process. That means anticipatory and regular bail, representation through investigation and trial, careful cross-examination, and, where required, revision and appeal before the High Court and Supreme Court. We also pursue quashing of proceedings under Section 482 CrPC where the case does not survive legal scrutiny at the threshold.",
      "Discretion matters in criminal matters, and we treat it as a professional obligation. Your matter is handled by counsel who has read the file in full and is prepared to argue it.",
    ],
    faqs: [
      {
        q: "What is the difference between anticipatory and regular bail?",
        a: "Anticipatory bail is sought before arrest, where there is an apprehension of being taken into custody. Regular bail is sought after arrest. We assess which applies to your situation and the forum best suited to it.",
      },
      {
        q: "Can an FIR be quashed?",
        a: "In appropriate cases, yes - the High Court can quash an FIR or criminal proceedings under Section 482 CrPC, for example where the allegations do not disclose an offence or where the dispute is essentially civil. Whether it applies depends on the specific facts.",
      },
      {
        q: "How quickly should I act after an FIR or summons?",
        a: "As early as possible. Steps taken in the first days - protecting against arrest, preserving evidence, framing the response - often shape the entire matter. Call us before responding to any notice.",
      },
    ],
  },
  {
    slug: "matrimonial-family-law",
    title: "Matrimonial & Family Law",
    short: "Sensitive, decisive counsel for family disputes.",
    description:
      "Compassionate yet firm representation in matrimonial and family matters, with a focus on protecting your interests and your children's welfare while pursuing timely, dignified resolutions.",
    points: [
      "Divorce - contested & mutual consent",
      "Maintenance, alimony & child custody",
      "Domestic violence & protection orders",
      "Mediation, settlement & restitution",
    ],
    image: "", // 1200×900 - calm, professional consultation setting
    overview: [
      "Family disputes are rarely only legal - they are personal, financial, and often involve children. We approach them with the sensitivity they demand and the firmness they require, helping you make clear decisions at a time when clarity is hardest to find.",
      "Our work covers contested and mutual-consent divorce, maintenance and alimony, child custody and guardianship, and protection under the domestic-violence framework. Wherever a dignified, time-bound settlement is achievable, we pursue it; where litigation is necessary to protect you, we conduct it with full preparation.",
      "Throughout, our focus is on your long-term interests and, where children are involved, their welfare - not on prolonging conflict.",
    ],
    faqs: [
      {
        q: "How long does a mutual-consent divorce take?",
        a: "It involves two motions with a statutory cooling-off period in between, which courts can waive in appropriate cases. Timelines vary by court and facts; we will give you a realistic estimate for your situation.",
      },
      {
        q: "How is child custody decided?",
        a: "The welfare of the child is the paramount consideration. Courts weigh factors such as the child's age, needs, and existing arrangements. We help present your case in a way that centres the child's best interests.",
      },
      {
        q: "Can maintenance be claimed during proceedings?",
        a: "Yes - interim maintenance can be sought while the main matter is pending, in addition to final maintenance or alimony. We advise on what is realistic given the circumstances.",
      },
    ],
  },
  {
    slug: "service-law",
    title: "Service Law",
    short: "Protecting the rights of employees and officers.",
    description:
      "Representation in service and employment disputes before Administrative Tribunals, High Courts, and the Supreme Court - safeguarding careers, entitlements, and procedural fairness.",
    points: [
      "Disciplinary & departmental proceedings",
      "Promotions, seniority & pension disputes",
      "Wrongful termination & reinstatement",
      "Tribunal & writ petitions",
    ],
    image: "", // 1200×900 - institutional / tribunal setting
    overview: [
      "For a government servant or institutional employee, a service dispute can put years of work - and a pension - at risk. We represent employees and officers in protecting their careers, entitlements, and right to a fair process.",
      "We handle disciplinary and departmental proceedings, charge-memo responses, disputes over promotion, seniority, and pension, and challenges to wrongful termination, before Administrative Tribunals, High Courts, and the Supreme Court. Procedural fairness is often where these matters are won or lost, and we hold authorities to it.",
      "Early advice is especially valuable here: how you respond to the first charge memo can determine the strength of your position for the rest of the matter.",
    ],
    faqs: [
      {
        q: "I have received a charge memo - what should I do first?",
        a: "Do not respond in haste. The reply to a charge memo frames your defence for the entire inquiry. We help you prepare a considered, complete response that protects your position.",
      },
      {
        q: "Which forum hears service disputes?",
        a: "Many service matters go before Administrative Tribunals (such as the CAT), with further recourse to the High Court and Supreme Court. The right forum depends on your service and the nature of the dispute.",
      },
      {
        q: "Can I challenge a denied promotion or seniority?",
        a: "Yes, where the denial is contrary to rules or vitiated by procedural unfairness. We assess the record and advise whether a challenge is sustainable.",
      },
    ],
  },
  {
    slug: "pmla-special-legislation",
    title: "PMLA & Special Legislation",
    short: "Defence in economic-offence & regulatory matters.",
    description:
      "Rigorous, detail-driven representation in proceedings under the Prevention of Money Laundering Act and allied economic and special statutes - before the Adjudicating Authority, Special Courts, and Appellate Tribunals.",
    points: [
      "ED summons, attachment & adjudication",
      "Bail in PMLA & economic offences",
      "Appellate Tribunal & High Court challenges",
      "Compliance & advisory on regulatory risk",
    ],
    image: "", // 1200×900 - documents / institutional
    overview: [
      "Proceedings under the Prevention of Money Laundering Act and allied economic statutes are document-heavy, high-stakes, and procedurally exacting. They demand counsel who is comfortable with both the financial detail and the constitutional questions these statutes raise.",
      "We represent clients responding to ED summons, attachment of property, and adjudication, and we appear in bail matters and before the Appellate Tribunal and High Courts. Our approach is meticulous: we work the record, the statutory scheme, and the precedent together to build a coherent defence.",
      "Where the issue is regulatory exposure rather than active proceedings, we also advise on compliance and risk before a problem becomes a prosecution.",
    ],
    faqs: [
      {
        q: "What should I do if I receive an ED summons?",
        a: "Take it seriously and seek advice before appearing. How you respond - what you produce, what you say, and the record you create - has lasting consequences. We prepare clients thoroughly before any appearance.",
      },
      {
        q: "Is bail under the PMLA difficult to obtain?",
        a: "The PMLA contains stringent conditions for bail, and each case turns on its facts and the stage of proceedings. We assess your matter candidly and frame the strongest available application.",
      },
      {
        q: "Can an attachment of property be challenged?",
        a: "Yes - provisional attachment is subject to adjudication and can be challenged before the Adjudicating Authority and the Appellate Tribunal, with further recourse to the courts.",
      },
    ],
  },
  {
    slug: "civil-litigation",
    title: "Litigation & Civil Disputes",
    short: "Resolving property, commercial & contractual disputes.",
    description:
      "End-to-end conduct of civil and commercial disputes - from drafting and interim relief to trial and execution - across civil courts, High Courts, and specialised forums.",
    points: [
      "Property, partition & title disputes",
      "Contractual & commercial litigation",
      "Recovery, injunctions & interim relief",
      "Arbitration & enforcement",
    ],
    image: "", // 1200×900 - civil court / commercial
    overview: [
      "Civil disputes - over property, contracts, money, or business relationships - can drag on for years if they are not handled with strategy from the outset. We conduct them end to end, with an eye on the outcome and the cost of getting there.",
      "Our work spans property, partition, and title disputes, contractual and commercial litigation, recovery actions, and applications for injunctions and interim relief. We also handle arbitration and the enforcement and execution of awards and decrees, so that a result on paper becomes a result in fact.",
      "We advise frankly on whether to fight, settle, or structure around a dispute - because the right answer is not always litigation.",
    ],
    faqs: [
      {
        q: "Can I get urgent interim relief while my case is pending?",
        a: "Yes - courts can grant injunctions and other interim relief to preserve the status quo or prevent harm while the main matter is decided. We move quickly where urgency demands it.",
      },
      {
        q: "Is arbitration faster than going to court?",
        a: "It often can be, and it offers privacy and flexibility, but it depends on the agreement and the dispute. We advise on whether arbitration suits your matter and represent you through it.",
      },
      {
        q: "I have a decree but the other side won't pay - what now?",
        a: "A decree is enforced through execution proceedings. We pursue execution and the available mechanisms to recover what you are owed.",
      },
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
      "Extensive matrimonial litigation experience before Family Courts, covering contested divorce, custody, and maintenance.",
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
  { value: "25+", label: "Years of combined practice" },
  { value: "5", label: "Core practice areas" },
  { value: "1,100+", label: "Matters handled" },
  { value: "All", label: "Forums - trial to Supreme Court" },
];

export const values = [
  {
    title: "Advocacy",
    body: "Prepared, persuasive, and relentless representation - at every forum, on every record.",
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
