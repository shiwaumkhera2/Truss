/**
 * Every editable string on the site lives here.
 * Components import from this file and never hardcode copy.
 *
 * Values you will probably want to change are marked PLACEHOLDER.
 */

export type NavLink = { label: string; href: string };

export type TrustedLogo = {
  name: string;
  /** Optional path under /public, e.g. "/logos/northline.svg". A text wordmark is used when omitted. */
  src?: string;
  width?: number;
  height?: number;
};

export type FeatureId = "payroll" | "compliance" | "subs";

export type Feature = {
  id: FeatureId;
  title: string;
  body: string;
  points: string[];
};

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

export type Founder = {
  name: string;
  role: string;
  initials: string;
  /** Optional portrait under /public, e.g. "/founders/shiwaum.jpg". Initials are shown when null. */
  portrait: string | null;
};

export type LegalSection = { heading: string; body: string[] };

export type StatusTone = "ok" | "warn" | "bad" | "muted";
export type StatusCell = [label: string, tone: StatusTone];
export type SubRow = { name: string; trade: string; insurance: StatusCell; waiver: StatusCell; w9: StatusCell };

export const site = {
  name: "Truss",
  domain: "truss.example.com", // PLACEHOLDER: production domain, used for metadata and OpenGraph
  description:
    "Construction payroll in 30 minutes, built for compliance. Certified payroll, prevailing wage, and subcontractor management in one place.",
  contactEmail: "TrussHQ@gmail.com",
  contactPhone: "617-480-2895",
  contactPhoneHref: "tel:+16174802895",
  logo: {
    src: "/logo.svg",
    /** true recolors the SVG with CSS (single-colour marks). false renders it as a normal image. */
    monochrome: false,
    width: 32,
    height: 32,
  },

  nav: {
    links: [
      { label: "Product", href: "#product" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Compliance", href: "#compliance" },
      { label: "Founders", href: "#founders" },
    ] as NavLink[],
    cta: { label: "Get started", href: "#lead-form" },
    menuLabel: "Menu",
    closeLabel: "Close menu",
  },

  hero: {
    headline: ["Construction payroll in 30 minutes,", "built for compliance."],
    subhead:
      "Run payroll, file certified reports, and keep every subcontractor compliant from one place. Built for crews that would rather be on site.",
    video: {
      src: "/video/hero.mp4",
      poster: "/video/poster.jpg",
    },
    form: {
      heading: "See it on your next payroll",
      fields: {
        name: { label: "Name", placeholder: "Dana Ortiz", autoComplete: "name" },
        email: { label: "Work email", placeholder: "dana@northline.build", autoComplete: "email" },
        phone: { label: "Phone", placeholder: "(617) 555-0142", autoComplete: "tel" },
        company: { label: "Company", placeholder: "Northline Builders", autoComplete: "organization" },
      },
      submit: "Get started",
      submitting: "Sending",
      note: "No spam. We only use this to set up your walkthrough.",
      success: {
        title: "We'll be in touch",
        body: "Expect a note from us within one business day.",
      },
      errors: {
        name: "Enter your name.",
        email: "Enter a valid email address.",
        phone: "Enter a phone number with at least 10 digits.",
        company: "Enter your company name.",
        server: "Something went wrong on our end. Email us instead:",
      },
    },
    trustedBy: {
      label: "Trusted by crews across New England",
      // PLACEHOLDER: replace with customer names, or add `src` to render a logo image
      logos: [
        { name: "Northline Builders" },
        { name: "Granite State Electric" },
        { name: "Merrimack Masonry" },
        { name: "Bayview Concrete" },
        { name: "Ironside Steel" },
        { name: "Harbor Mechanical" },
        { name: "Ridgeline Roofing" },
        { name: "Atlantic Sitework" },
      ] as TrustedLogo[],
    },
  },

  problem: {
    headline: "Payroll shouldn't take your whole Friday.",
    body: [
      "Certified payroll. Prevailing wage rates that change by county. A crew that crossed two state lines this week. Subs who still haven't sent a certificate of insurance. Each one is a spreadsheet, a phone call, and an afternoon you don't get back.",
      "Truss puts all of it in one place. Hours flow in, wages and fringe are calculated against the right determination, the reports file themselves, and your subcontractors stay compliant without you chasing them.",
    ],
  },

  showcase: {
    headline: "One place for payroll and the paperwork around it.",
    intro:
      "Truss is built around the way construction actually pays people: by project, by classification, by week.",
    features: [
      {
        id: "payroll",
        title: "Run payroll in minutes",
        body:
          "Import hours from the field, review classifications and rates by project, and approve. Truss handles taxes, fringe, and direct deposit for W-2 crews and 1099 subs alike.",
        points: [
          "Prevailing wage and fringe applied per project",
          "Overtime, multi-state, and union rules built in",
          "Direct deposit and pay stubs, same day",
        ],
      },
      {
        id: "compliance",
        title: "Certified payroll and compliance reports, generated for you",
        body:
          "WH-347s, state certified payroll forms, and fringe statements are produced from the payroll you already ran. Review, sign, submit. Nothing to re-key.",
        points: [
          "Federal WH-347 and state-specific forms",
          "Apprentice ratio and fringe checks before you file",
          "Signed statements of compliance, stored per project",
        ],
      },
      {
        id: "subs",
        title: "Subcontractor onboarding, insurance, and lien waivers",
        body:
          "Bring subs on with W-9s and certificates of insurance collected up front. Truss tracks expirations and releases lien waivers with each payment, so nothing slips.",
        points: [
          "Self-serve onboarding with W-9 and COI collection",
          "Expiration alerts before coverage lapses",
          "Conditional and unconditional waivers tied to payments",
        ],
      },
    ] as Feature[],
  },

  howItWorks: {
    headline: "How it works",
    intro: "Three steps from hours worked to paid, filed, and documented.",
    steps: [
      {
        title: "Set up crews and projects",
        body: "Add workers, subcontractors, and jobs. Set prevailing wage classifications once per project and Truss carries them forward.",
      },
      {
        title: "Approve hours",
        body: "Time comes in from the field or your existing time clock. You review by project and approve in one pass.",
      },
      {
        title: "Truss runs the rest",
        body: "Payroll, taxes, certified reports, and lien waivers go out on schedule. You get a receipt for every filing.",
      },
    ],
  },

  trust: {
    headline: "Compliance is the product, not a checkbox.",
    intro:
      "Every rate, ratio, and form is checked against the current determination before anything goes out.",
    // PLACEHOLDER numbers. `value` counts up from 0; prefix and suffix are static.
    stats: [
      { value: 30, suffix: " min", label: "Typical time to run payroll for a 40-person crew" },
      { value: 50, label: "States with maintained prevailing wage and tax tables" },
      { value: 100, suffix: "%", label: "Certified payroll reports generated from live payroll data" },
      { value: 0, prefix: "$", label: "Late-filing penalties across Truss customers" },
    ] as Stat[],
    keywords: ["Certified payroll", "Prevailing wage", "Multi-state", "Union & non-union", "1099 & W-2"],
  },

  founders: {
    headline: "Built by owners of construction companies.",
    body:
      "Shiwaum Khera is studying Computer Science & Biology at Harvard College while Devan Labbe runs TMD Remodeling out of Salem, MA.",
    logos: [
      { name: "Harvard College", src: "/logos/harvard.png", width: 460, height: 150 },
      { name: "TMD Remodeling", src: "/logos/tmd.jpg", width: 1024, height: 1024 },
    ],
    people: [
      { name: "Shiwaum Khera", role: "Co-founder", initials: "SK", portrait: "/founders/shiwaum.jpg" },
      { name: "Devan Labbe", role: "Co-founder", initials: "DL", portrait: "/founders/devan.jpg" },
    ] as Founder[],
  },

  finalCta: {
    headline: "Run your next payroll with Truss.",
    body: "Tell us about your crew and we'll set up a walkthrough on your own numbers.",
    button: "Get started",
  },

  footer: {
    description: "Construction payroll and subcontractor management, built by people who run crews.",
    columns: [
      {
        heading: "Product",
        links: [
          { label: "Product", href: "#product" },
          { label: "How it works", href: "#how-it-works" },
          { label: "Compliance", href: "#compliance" },
          { label: "Founders", href: "#founders" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ],
      },
    ] as { heading: string; links: NavLink[] }[],
    contactLabel: "Contact",
    copyright: "© 2026 Truss",
    location: "Boston, Massachusetts",
  },

  legal: {
    privacy: {
      title: "Privacy policy",
      updated: "Last updated September 2026",
      sections: [
        {
          heading: "What we collect",
          body: [
            "When you request a walkthrough, we collect the name, email address, phone number, and company name you provide. We use this information only to respond to your request and to tell you about Truss.",
            "We do not sell your information, and we do not share it with third parties except the services we use to deliver email and store form submissions.",
          ],
        },
        {
          heading: "Cookies and analytics",
          body: ["This site does not use advertising cookies. If we add privacy-friendly analytics, this page will say so."],
        },
        {
          heading: "Your choices",
          body: ["You can ask us to delete anything you have shared with us at any time by emailing the address below."],
        },
      ] as LegalSection[],
    },
    terms: {
      title: "Terms of use",
      updated: "Last updated September 2026",
      sections: [
        {
          heading: "Use of this site",
          body: [
            "This website describes Truss and lets you request a walkthrough. Nothing on it is legal, tax, or accounting advice. Prevailing wage and payroll obligations depend on your projects and jurisdictions.",
          ],
        },
        {
          heading: "Service terms",
          body: ["Use of the Truss product is governed by a separate customer agreement, provided when you sign up."],
        },
        {
          heading: "Contact",
          body: ["Questions about these terms can be sent to the address below."],
        },
      ] as LegalSection[],
    },
  },
  /** Fixture data for the in-app mock screens in the product showcase. */
  mocks: {
    payroll: {
      title: "Payroll",
      crumb: "Riverside Elementary",
      periodLabel: "Pay period",
      period: "Sep 15 to 21, 2026",
      status: "Ready to run",
      columns: ["Worker", "Classification", "Hours", "Rate", "Gross"],
      rows: [
        ["M. Alvarez", "Electrician", "40.0", "$58.20", "$2,328.00"],
        ["J. Okafor", "Laborer, group 2", "38.0", "$41.15", "$1,563.70"],
        ["R. Chen", "Carpenter", "40.0", "$52.60", "$2,104.00"],
        ["S. Patel", "Apprentice, 60%", "32.0", "$31.56", "$1,009.92"],
      ],
      footer: { workers: "42 workers this period", gross: "Gross $84,312.55" },
      action: "Run payroll",
      progress: "Taxes and fringe calculated",
    },
    compliance: {
      title: "Certified payroll",
      crumb: "Riverside Elementary",
      status: "3 reports ready",
      reports: [
        { form: "WH-347, federal", scope: "Riverside Elementary, week 38", state: "Generated" },
        { form: "Massachusetts weekly certified payroll", scope: "Riverside Elementary, week 38", state: "Generated" },
        { form: "Fringe benefit statement", scope: "All projects, week 38", state: "Generated" },
      ],
      checksTitle: "Pre-file checks",
      checks: [
        "Rates match county determination",
        "Apprentice ratio within limits",
        "Fringe credited or paid in cash",
        "Statement of compliance signed",
      ],
      action: "Sign and submit",
    },
    subs: {
      title: "Subcontractors",
      crumb: "All projects",
      status: "12 active",
      columns: ["Subcontractor", "Trade", "Insurance", "Lien waiver", "W-9"],
      rows: [
        { name: "Harbor Mechanical", trade: "HVAC", insurance: ["Expires in 12 days", "warn"], waiver: ["Signed", "ok"], w9: ["Received", "ok"] },
        { name: "Ironside Steel", trade: "Structural", insurance: ["Current", "ok"], waiver: ["Awaiting signature", "warn"], w9: ["Received", "ok"] },
        { name: "Bayview Concrete", trade: "Foundations", insurance: ["Current", "ok"], waiver: ["Signed", "ok"], w9: ["Received", "ok"] },
        { name: "Ridgeline Roofing", trade: "Roofing", insurance: ["Expired", "bad"], waiver: ["Not sent", "muted"], w9: ["Missing", "bad"] },
      ] as SubRow[],
      footer: "Next payment releases 3 conditional waivers",
      action: "Send reminders",
    },
  },
};

export type Site = typeof site;
