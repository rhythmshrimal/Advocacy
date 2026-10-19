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
    "Shrimal & Associates is a litigation-focused law firm representing clients across Indian courts in criminal, matrimonial & family, service, civil & commercial, taxation, arbitration, and PMLA & special-legislation matters.",

  url: "https://shrimalassociates.vercel.app",

  // ── Contact placeholders ──
  contact: {
    // Office address
    addressLines: [
      "Ground Floor, 304",
      "Barkat Nagar, Tonk Phatak",
      "Jaipur, Rajasthan 302015",
    ],
    addressInline:
      "Ground Floor, 304, Barkat Nagar, Tonk Phatak, Jaipur, Rajasthan 302015",
    // Google Maps link
    mapsUrl: "https://maps.app.goo.gl/3Fvudu5wAGFY5qNu9",
    // Embedded map query
    mapsEmbedQuery: "304, Barkat Nagar, Tonk Phatak, Jaipur, Rajasthan 302015",
    // Phone
    phoneDisplay: "+91 99833 21035",
    phoneHref: "+919983321035",
    phone2Display: "+91 89495 69357",
    phone2Href: "+918949569357",
    // Email
    email: "contact@shrimalassociates.in",
    hours: "Mon – Sun · 10:00 AM – 9:00 PM",
  },

  social: {
    linkedin: "#",
  },

  /**
   * Photography slots. Drop real, well-lit images into /public/images/ and set
   * the path here (e.g. "/images/hero.webp"). Leave "" to show a branded
   * placeholder. See /public/images/README.md for recommended dimensions.
   */
  images: {
    hero: "", // wide chambers / courthouse exterior - 1920×1080
    about: "/images/chambers.webp", // firm / chambers interior - 1200×1500 (portrait)
    office: "", // building exterior for the contact page - 1200×900
  },
} as const;

export const offices = [
  {
    name: "Jaipur Office",
    address: site.contact.addressInline,
    mapsUrl: site.contact.mapsUrl,
    phones: [
      { display: site.contact.phoneDisplay, href: site.contact.phoneHref },
      { display: site.contact.phone2Display, href: site.contact.phone2Href },
    ],
  },
  {
    name: "Delhi Office",
    address: "C-276, 2nd Floor, Defence Colony, New Delhi",
    mapsUrl: "https://maps.app.goo.gl/pfppPk16CTdAjdTx5",
    phones: [{ display: "+91 97111 79388", href: "+919711179388" }],
  },
  {
    name: "Gurugram Office",
    address: "1st Floor, A3-05, Westerlies Experion, Sector 108, Gurugram",
    mapsUrl: "https://maps.app.goo.gl/Jt1LZszXcZLmPn4p8",
    phones: [{ display: "+91 88606 62013", href: "+918860662013" }],
  },
  {
    name: "Prayagraj Office",
    address: "81/40 G, Sardar Patel Marg, Vasant Vihar Colony, Prayagraj",
    mapsUrl: "https://maps.app.goo.gl/56jyjsBoHta5knTT8",
    phones: [{ display: "+91 82998 37469", href: "+918299837469" }],
  },
];

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Team", href: "/team" },
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
    short: "Representation in bail, trial, and criminal appellate proceedings.",
    description:
      "Representation at every stage of a criminal matter - bail, trial, quashing, revision, and appeal - before Magistrate and Sessions Courts, High Courts, and the Supreme Court.",
    points: [
      "Anticipatory & regular bail applications",
      "Trial defence and cross-examination strategy",
      "Quashing petitions under Section 482 CrPC",
      "Appeals, revisions & criminal writs",
    ],
    image: "", // 1200×900 - courtroom / chambers
    overview: [
      "We appear for individuals and companies in criminal matters from the FIR stage onwards. The first step is usually a straight assessment: what the allegation is, what the record actually shows, and what needs to be done immediately to protect your position.",
      "The work covers anticipatory and regular bail, representation through investigation and trial, cross-examination, and quashing petitions under Section 482 CrPC. Where a matter has to be taken further, we file and argue revisions, appeals, and criminal writs before the High Court and the Supreme Court.",
      "Your matter is handled by counsel who has read the file. We tell you where the case is weak as well as where it is strong, and we treat confidentiality as a professional obligation.",
    ],
    faqs: [
      {
        q: "What is the difference between anticipatory and regular bail?",
        a: "Anticipatory bail is applied for before arrest, where there is a reasonable apprehension of being taken into custody. Regular bail is applied for after arrest. We advise which one applies to your case and which court to approach first.",
      },
      {
        q: "Can an FIR be quashed?",
        a: "In appropriate cases, yes. The High Court can quash an FIR or criminal proceedings under Section 482 CrPC - for example, where the allegations do not disclose an offence, or where the dispute is essentially civil. Whether it applies depends on the facts and the material on record.",
      },
      {
        q: "How quickly should I act after an FIR or summons?",
        a: "As early as possible. What is done in the first few days - protecting against arrest, preserving documents, framing the response - usually decides how the rest of the matter goes. Speak to us before replying to any notice.",
      },
    ],
  },
  {
    slug: "matrimonial-family-law",
    title: "Matrimonial & Family Law",
    short: "Handling divorce, maintenance, custody, and related family law matters.",
    description:
      "Representation in divorce, maintenance, custody, and domestic-violence matters before Family Courts and High Courts, with settlement pursued wherever it is workable.",
    points: [
      "Divorce - contested & mutual consent",
      "Maintenance, alimony & child custody",
      "Domestic violence & protection orders",
      "Mediation, settlement & restitution",
    ],
    image: "", // 1200×900 - calm, professional consultation setting
    overview: [
      "We act in matrimonial and family disputes, including contested and mutual-consent divorce, maintenance and alimony, child custody and guardianship, and proceedings under the domestic-violence law.",
      "A large part of the work is deciding what is worth contesting and what is better settled. Where terms can be agreed, we negotiate the settlement and document it properly so it holds. Where they cannot, we conduct the litigation - interim applications included - with the record prepared in full.",
      "Where children are involved, the court decides on the welfare of the child, and we build the case on that footing. We also give you a realistic view of timelines at the outset, because family matters usually take longer than clients expect.",
    ],
    faqs: [
      {
        q: "How long does a mutual-consent divorce take?",
        a: "The process involves two motions, with a statutory cooling-off period in between that courts can waive in appropriate cases. Actual timelines depend on the court and the facts, and we will give you an estimate for your matter.",
      },
      {
        q: "How is child custody decided?",
        a: "The welfare of the child is the paramount consideration. Courts look at the child's age and needs, the existing arrangement, and each parent's ability to provide care. Financial strength alone is not the test.",
      },
      {
        q: "Can maintenance be claimed during proceedings?",
        a: "Yes. Interim maintenance can be sought while the main matter is pending, separately from final maintenance or alimony. We advise on what is realistic on the facts.",
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
    slug: "civil-commercial-law",
    title: "Civil & Commercial Law",
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
  {
    slug: "taxation",
    title: "Taxation",
    short: "Advisory and representation in direct and indirect tax disputes.",
    description:
      "Advice and representation in income-tax, GST, and other tax disputes - from notices and assessment proceedings to appeals before tax authorities, tribunals, and courts.",
    points: [
      "Income-tax assessments & appeals",
      "GST notices, demands & disputes",
      "Tax recovery & interim relief",
      "Tax advisory & compliance support",
    ],
    image: "",
    overview: [
      "Tax disputes call for a close reading of both the financial record and the reasons behind a demand. We assist individuals and businesses in understanding their position, preparing responses, and deciding how best to contest a disputed liability.",
      "Our work covers income-tax and GST notices, assessments, demands, recovery proceedings, and appeals. We prepare submissions and represent clients before the relevant tax authorities, tribunals, and courts, with attention to deadlines and the documents needed at each stage.",
      "We also advise on tax compliance and the implications of proposed transactions, helping clients identify issues early and maintain a clear record to support their position.",
    ],
    faqs: [
      {
        q: "What should I do after receiving a tax notice?",
        a: "Keep the notice and supporting records, note the response deadline, and seek advice before replying. We review what is being asked and help prepare a response based on your documents.",
      },
      {
        q: "Do you handle both income-tax and GST disputes?",
        a: "Yes. We advise and represent clients in direct and indirect tax matters, including income-tax and GST disputes, according to the issues and forum involved.",
      },
      {
        q: "What documents should I bring for an initial consultation?",
        a: "Bring the notice or order, relevant returns, financial statements, transaction records, and any earlier correspondence with the department. We will identify any further documents needed after reviewing the matter.",
      },
    ],
  },
  {
    slug: "arbitration",
    title: "Arbitration",
    short: "Handling arbitral proceedings and award-related disputes.",
    description:
      "Representation in contractual and commercial arbitrations - from reviewing the arbitration agreement and preparing claims to hearings, interim relief, and award-related court proceedings.",
    points: [
      "Arbitration agreements & dispute strategy",
      "Appointment of arbitrators & interim relief",
      "Claims, defence & arbitral hearings",
      "Challenges to & enforcement of awards",
    ],
    image: "",
    overview: [
      "An arbitration needs the same preparation as a court case: a clear account of the dispute, an organised record, and a practical view of the relief sought. We represent businesses and individuals in contractual and commercial arbitrations.",
      "We review arbitration agreements, advise on commencing or responding to proceedings, and assist with the appointment of arbitrators. Our work includes preparing claims and defences, handling evidence and hearings, and seeking interim protection where appropriate.",
      "Our representation also extends to court proceedings concerning arbitral awards, including challenges and enforcement. Throughout, we keep the commercial objective, cost, and prospects of settlement in view.",
    ],
    faqs: [
      {
        q: "How do I know whether my dispute belongs in arbitration?",
        a: "Start with the contract and any arbitration agreement. We review the dispute-resolution clause, the parties involved, and the nature of the dispute to advise on the appropriate next step.",
      },
      {
        q: "Can you act if arbitration has already started?",
        a: "Yes. Bring the agreement, notices, pleadings, procedural orders, and hearing schedule so we can assess the current stage and prepare the next steps.",
      },
      {
        q: "Do you handle proceedings after an award is issued?",
        a: "Yes. We review the award and advise on enforcement or a possible challenge, including the applicable deadlines and the available grounds in your matter.",
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
];

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "25+", label: "Years of combined practice" },
  { value: String(practiceAreas.length), label: "Core practice areas" },
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
