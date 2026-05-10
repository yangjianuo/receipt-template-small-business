import { getSiteUrl } from "@/lib/site";

export type FaqItem = {
  question: string;
  answer: string;
};

export type JumpLink = {
  href: string;
  label: string;
};

export type LandingPageLink = {
  href: string;
  label: string;
  description?: string;
};

export type IntentSection = {
  heading: string;
  intro: string;
  points: string[];
};

export type ReceiptLandingPageKey =
  | "home"
  | "rent-receipt-template"
  | "cash-payment-receipt-template"
  | "donation-receipt-template"
  | "service-receipt-template"
  | "payment-receipt-template"
  | "editable-receipt-template"
  | "printable-receipt-template"
  | "sales-receipt-template"
  | "blank-receipt-template"
  | "itemized-receipt-template";

export type StructuredData = {
  faq: {
    "@context": string;
    "@type": string;
    mainEntity: Array<{
      "@type": string;
      name: string;
      acceptedAnswer: {
        "@type": string;
        text: string;
      };
    }>;
  };
  breadcrumb: {
    "@context": string;
    "@type": string;
    itemListElement: Array<Record<string, string | number>>;
  };
};

export type ReceiptLandingPageConfig = {
  key: ReceiptLandingPageKey;
  pathname: string;
  title: string;
  description: string;
  heroEyebrow: string;
  h1: string;
  intro: string;
  supportingCopy: string;
  editorIntro: string;
  editorTip: string;
  templateIntro: string;
  fieldsHeading: string;
  fieldsIntro: string;
  howItWorksIntro: string;
  useCasesHeading: string;
  useCasesIntro: string;
  faqHeading: string;
  faqIntro: string;
  ctaHeading: string;
  ctaCopy: string;
  reassurancePoints: string[];
  fields: string[];
  useCases: string[];
  faqs: FaqItem[];
  jumpLinks: JumpLink[];
  featuredLinks?: LandingPageLink[];
  intentSection?: IntentSection;
  relatedPages: LandingPageLink[];
  defaultTemplateId?: "classic" | "service" | "invoice";
  metadata: {
    pathname: string;
  };
  structuredData: StructuredData;
};

function buildFaqStructuredData(faqs: FaqItem[]): StructuredData["faq"] {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function buildBreadcrumbStructuredData(
  page: Pick<ReceiptLandingPageConfig, "pathname" | "h1">,
): StructuredData["breadcrumb"] {
  const siteUrl = getSiteUrl();
  const items: StructuredData["breadcrumb"]["itemListElement"] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Receipt Template Generator",
      item: siteUrl,
    },
  ];

  if (page.pathname !== "/") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: page.h1,
      item: `${siteUrl}${page.pathname}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

type LandingPageSeed = Omit<ReceiptLandingPageConfig, "metadata" | "structuredData">;

function withSeo(page: LandingPageSeed): ReceiptLandingPageConfig {
  return {
    ...page,
    metadata: {
      pathname: page.pathname,
    },
    structuredData: {
      faq: buildFaqStructuredData(page.faqs),
      breadcrumb: buildBreadcrumbStructuredData(page),
    },
  };
}

const homeFaqs: FaqItem[] = [
  {
    question: "What should a small business receipt include?",
    answer:
      "A complete small business receipt should include your business name, contact details, receipt number, issue date, customer name, itemized products or services, subtotal, tax, total, and payment method.",
  },
  {
    question: "Can I use this receipt template for cash payments?",
    answer:
      "Yes. You can mark the payment method as cash, card, or another option, then print the finished receipt as proof of payment for in-person sales or local service jobs.",
  },
  {
    question: "How do I add tax, subtotal, and total to a receipt?",
    answer:
      "Enter your line items and tax rate in the editor. The receipt preview updates the subtotal, tax amount, and final total automatically so the printable receipt stays accurate.",
  },
  {
    question: "Is this receipt template suitable for service businesses or freelancers?",
    answer:
      "Yes. The layouts work for retail shops, freelancers, repair pros, salons, cleaners, and other small service businesses that need a fast printable receipt.",
  },
  {
    question: "Can I print a receipt immediately after filling it out?",
    answer:
      "Yes. Once your details look right in the live preview, use the print action to open a paper-ready receipt layout in your browser print dialog.",
  },
];

export const receiptLandingPageSlugs: ReceiptLandingPageKey[] = [
  "rent-receipt-template",
  "cash-payment-receipt-template",
  "donation-receipt-template",
  "service-receipt-template",
  "payment-receipt-template",
  "editable-receipt-template",
  "printable-receipt-template",
  "sales-receipt-template",
  "blank-receipt-template",
  "itemized-receipt-template",
];

export const landingPages: Record<ReceiptLandingPageKey, ReceiptLandingPageConfig> = {
  home: withSeo({
    key: "home",
    pathname: "/",
    title: "Free Receipt Template Generator | Editable & Printable Receipts",
    description:
      "Create free editable and printable receipt templates online for payments, rent, cash, services, and small business records with live totals and instant print preview.",
    heroEyebrow: "Editable receipt template · Printable payment receipt · Rent and cash receipts",
    h1: "Free Editable and Printable Receipt Template Generator",
    intro:
      "Create a polished editable receipt in minutes. Fill in payment, rent, cash, or small business details, update line items and tax, then print a clear proof-of-payment receipt without leaving the page.",
    supportingCopy:
      "Built for users comparing the highest-intent receipt workflows first: payment receipts, rent receipts, cash payment receipts, editable receipt templates, and printable receipt templates.",
    editorIntro:
      "Fill in the fields that matter, adjust your totals, and keep the receipt preview in sync as you type.",
    editorTip:
      "Use the live preview above to confirm the final printable version before you hand it to a customer or save it for bookkeeping.",
    templateIntro:
      "Choose the layout that best fits how your small business sells, serves, or documents payments.",
    fieldsHeading: "Required receipt fields for small businesses",
    fieldsIntro:
      "This receipt template is built around the details most small businesses need for clean records, tax visibility, and customer proof of payment.",
    howItWorksIntro:
      "A quick path from blank receipt fields to a professional proof-of-payment record.",
    useCasesHeading: "Built for everyday small business use",
    useCasesIntro:
      "Whether you run a local shop or a solo service business, a clear receipt helps you look professional and stay organized.",
    faqHeading: "Frequently asked questions",
    faqIntro:
      "Common questions about creating, filling out, and printing a small business receipt template.",
    ctaHeading: "Create your receipt online in minutes",
    ctaCopy:
      "Pick the receipt type that matches the payment, fill in the details, and print or save the finished receipt for customer handoff, bookkeeping, or internal records.",
    reassurancePoints: [
      "No signup wall or multi-step flow",
      "Live totals stay in sync while you edit",
      "Direct paths for payment, rent, cash, editable, and printable receipt intent",
    ],
    fields: [
      "Business name and contact details",
      "Receipt number and issue date",
      "Customer name or walk-in label",
      "Products or services provided",
      "Subtotal, taxes, and final total",
      "Payment method and notes",
    ],
    useCases: [
      "Retail stores issuing quick in-person purchase receipts",
      "Freelancers sending simple proof of payment after a job",
      "Home service businesses documenting cash or card payments",
      "Studios, salons, and local shops that need a clean printable receipt",
    ],
    faqs: homeFaqs,
    jumpLinks: [
      { href: "#featured-template-links", label: "Browse by use case" },
      { href: "#editor", label: "Jump to editor" },
      { href: "#templates", label: "Receipt templates" },
      { href: "#receipt-fields", label: "Required receipt fields" },
      { href: "#use-cases", label: "Small business use cases" },
      { href: "#faq", label: "FAQ" },
    ],
    relatedPages: [
      {
        href: "/rent-receipt-template",
        label: "Rent receipt template",
        description: "Create a printable rent payment receipt with tenant, landlord, amount, month-covered, and property details.",
      },
      {
        href: "/payment-receipt-template",
        label: "Payment receipt template",
        description: "Create general proof-of-payment receipts with payer details, totals, purpose, and payment method fields.",
      },
      {
        href: "/cash-payment-receipt-template",
        label: "Cash payment receipt template",
        description: "Show cash received, what it covered, payment date, and same-day proof-of-payment details clearly.",
      },
      {
        href: "/editable-receipt-template",
        label: "Editable receipt template",
        description: "Fill out receipt fields online when you want a fillable, edit-first workflow before printing.",
      },
      {
        href: "/printable-receipt-template",
        label: "Printable receipt template",
        description: "Open the paper-ready receipt path when your priority is a clean layout to fill out and print immediately.",
      },
      {
        href: "/service-receipt-template",
        label: "Service receipt template",
        description: "List services rendered, labor charges, and provider details for customer handoff.",
      },
      {
        href: "/donation-receipt-template",
        label: "Donation receipt template",
        description: "Acknowledge gifts with donor, organization, and contribution notes in a printable format.",
      },
      {
        href: "/sales-receipt-template",
        label: "Sales receipt template",
        description: "Use an item-focused receipt page for store sales, product quantities, and checkout totals.",
      },
      {
        href: "/blank-receipt-template",
        label: "Blank receipt template",
        description: "Choose a flexible layout when you need a general-purpose receipt form to customize.",
      },
      {
        href: "/itemized-receipt-template",
        label: "Itemized receipt template",
        description: "Break down multiple products or services into separate line items and totals.",
      },
    ],
    defaultTemplateId: "classic",
  }),
  "rent-receipt-template": withSeo({
    key: "rent-receipt-template",
    pathname: "/rent-receipt-template",
    title: "Rent Receipt Template | Printable Rent Payment Receipt Online",
    description:
      "Create a printable rent receipt template online. Add tenant, landlord, property, payment period, amount, and notes, then print proof of rent paid in minutes.",
    heroEyebrow: "Rent payment receipt · Printable proof of rent paid · Fast fill-out",
    h1: "Printable Rent Receipt Template for Rent Payments",
    intro:
      "Use this rent receipt template to document monthly rent payments and hand tenants a clean proof-of-payment receipt right away.",
    supportingCopy:
      "It works well for landlords, property managers, room rentals, and small real-estate operators who need a simple printable rent receipt.",
    editorIntro:
      "Enter the property, tenant, payment amount, and billing period, then review the printable layout before you print.",
    editorTip:
      "Use the notes field for month covered, unit number, or deposit details so the receipt is easier to reference later.",
    templateIntro:
      "Choose a receipt layout that keeps rent amount, payment date, and property details easy to scan.",
    fieldsHeading: "What a rent receipt should include",
    fieldsIntro:
      "A useful rent receipt makes the tenant, property, period covered, and paid amount clear at a glance.",
    howItWorksIntro:
      "Pick a layout, enter the rent payment details, and print a tenant-ready receipt in a few steps.",
    useCasesHeading: "Who needs a rent receipt template",
    useCasesIntro:
      "Rent receipts help landlords and tenants keep a simple paper trail for monthly payments and move-in records.",
    faqHeading: "Rent receipt template FAQ",
    faqIntro: "Quick answers for filling out and printing a rent payment receipt.",
    ctaHeading: "Create a printable rent receipt",
    ctaCopy:
      "Document the payment, confirm the billing period, and print a rent receipt that is ready to hand over.",
    reassurancePoints: [
      "Good fit for monthly rent tracking",
      "Easy to note unit and payment period",
      "Fast printable proof of payment",
    ],
    fields: [
      "Landlord or property manager name",
      "Tenant name and unit reference",
      "Rent amount paid",
      "Billing period or month covered",
      "Payment date and receipt number",
      "Notes for deposit, late fee, or method paid",
    ],
    useCases: [
      "Independent landlords issuing monthly rent receipts",
      "Room rentals that need a simple payment record",
      "Property managers documenting in-person rent collection",
      "Tenants requesting proof that rent was paid on time",
    ],
    faqs: [
      {
        question: "What should be included on a rent receipt?",
        answer:
          "A rent receipt should include the tenant name, landlord or property name, amount paid, payment date, receipt number, and the rental period covered by the payment.",
      },
      {
        question: "Can I use this for monthly rent payments?",
        answer:
          "Yes. This page is designed for recurring monthly rent payments and works well when you need a simple printable proof-of-payment record.",
      },
      {
        question: "Should a rent receipt mention the month covered?",
        answer:
          "Yes. Including the billing period or month covered makes it much easier for both landlord and tenant to match the receipt to the payment.",
      },
      {
        question: "Can I print the rent receipt after editing it online?",
        answer:
          "Yes. Fill in the details in the editor, confirm the preview, and print the final rent receipt immediately.",
      },
      {
        question: "Can I use this rent receipt as proof of rent paid?",
        answer:
          "Yes. The template is designed to show tenant, landlord, amount, payment date, and period covered so it works as a clear proof-of-rent-payment record.",
      },
    ],
    jumpLinks: [
      { href: "#editor", label: "Edit rent receipt" },
      { href: "#receipt-fields", label: "Rent receipt fields" },
      { href: "#intent-guide", label: "Rent checklist" },
      { href: "#use-cases", label: "Rent use cases" },
      { href: "#related-templates", label: "Related templates" },
      { href: "#faq", label: "Rent receipt FAQ" },
    ],
    intentSection: {
      heading: "Rent receipt checklist for monthly payment records",
      intro:
        "This page is tailored for recurring rent receipts where the payment period and property context matter as much as the amount paid.",
      points: [
        "Record the month covered so landlord and tenant can match the receipt to the exact rent period.",
        "Include the property or unit reference when you manage multiple rentals or room leases.",
        "Add landlord, tenant, and payment-date details to make rent proof easy to verify later.",
      ],
    },
    relatedPages: [
      {
        href: "/cash-payment-receipt-template",
        label: "Cash payment receipt template",
        description: "Use this if the rent was paid in cash and you want the payment method highlighted more clearly.",
      },
      {
        href: "/payment-receipt-template",
        label: "Payment receipt template",
        description: "Choose the broader proof-of-payment format for non-rent scenarios or mixed payment records.",
      },
      {
        href: "/service-receipt-template",
        label: "Service receipt template",
        description: "Switch to the service receipt page when the payment is for labor or property work instead of rent.",
      },
    ],
    defaultTemplateId: "classic",
  }),
  "cash-payment-receipt-template": withSeo({
    key: "cash-payment-receipt-template",
    pathname: "/cash-payment-receipt-template",
    title: "Cash Payment Receipt Template | Printable Cash Receipt Online",
    description:
      "Create a printable cash payment receipt template online. Add payer details, cash received, line items, payment date, and notes, then print a clear cash receipt.",
    heroEyebrow: "Cash payment receipt · Printable proof of payment · Fast fill-out",
    h1: "Printable Cash Payment Receipt Template",
    intro:
      "Use this cash payment receipt template to document in-person cash transactions and give customers a simple printed record of what they paid.",
    supportingCopy:
      "It works well for local shops, repair visits, market stalls, delivery handoffs, and any small business that accepts cash and needs clear proof of payment.",
    editorIntro:
      "Fill out the business details, customer name, paid items, and cash payment notes, then check the preview before printing.",
    editorTip:
      "Set the payment method to cash and keep the notes field specific when you need a stronger payment trail for bookkeeping.",
    templateIntro:
      "Choose a cash receipt layout that keeps line items, totals, and payment notes easy to read.",
    fieldsHeading: "What a cash receipt should include",
    fieldsIntro:
      "A good cash payment receipt makes the amount received, payment date, and reason for payment easy to verify at a glance.",
    howItWorksIntro:
      "Pick a layout, enter the cash payment details, and print a signed-off receipt fast.",
    useCasesHeading: "Common uses for a cash payment receipt template",
    useCasesIntro:
      "Cash receipts are especially useful when the customer pays in person and you want a clear paper trail.",
    faqHeading: "Cash payment receipt template FAQ",
    faqIntro: "Quick answers for using a printable cash payment receipt.",
    ctaHeading: "Create a printable cash payment receipt",
    ctaCopy:
      "Document the payment, verify the total, and print a cash receipt you can hand over on the spot.",
    reassurancePoints: [
      "Built for in-person cash payments",
      "Clear totals and payment notes",
      "Fast printable proof of payment",
    ],
    fields: [
      "Business and payer details",
      "Receipt number and payment date",
      "Cash payment amount",
      "Products or services covered by the payment",
      "Tax, subtotal, and final total if needed",
      "Cash-specific notes or reference details",
    ],
    useCases: [
      "Retail counters that accept cash purchases",
      "Home service visits paid in cash after the job",
      "Markets, fairs, and pop-up stalls handling in-person sales",
      "Freelancers or contractors who need same-day cash payment records",
    ],
    faqs: [
      {
        question: "Can I use this template as a cash payment receipt?",
        answer:
          "Yes. This page is designed for cash payments, so you can note the payer, amount received, and what the payment covered before printing.",
      },
      {
        question: "Should a cash receipt include the payment method?",
        answer:
          "Yes. Marking the payment method as cash helps make the receipt clearer for both customer records and bookkeeping.",
      },
      {
        question: "Can I use this cash payment receipt template for service jobs?",
        answer:
          "Yes. It works for repair work, home services, freelance work, and other local jobs where payment is collected in cash.",
      },
      {
        question: "Do I need to list items on a cash receipt?",
        answer:
          "Listing the product or service details is a good idea because it shows exactly what the cash payment was for.",
      },
      {
        question: "Can I print a cash receipt right after editing it?",
        answer:
          "Yes. Fill out the cash payment details, review the live preview, and print a clean cash receipt from the browser.",
      },
    ],
    jumpLinks: [
      { href: "#editor", label: "Edit cash receipt" },
      { href: "#receipt-fields", label: "Cash receipt fields" },
      { href: "#intent-guide", label: "Cash receipt guide" },
      { href: "#use-cases", label: "Cash payment uses" },
      { href: "#related-templates", label: "Related templates" },
      { href: "#faq", label: "Cash receipt FAQ" },
    ],
    intentSection: {
      heading: "When to use a cash payment receipt template",
      intro:
        "This page is optimized for in-person cash transactions where same-day proof of payment needs to be clear for both the customer and your records.",
      points: [
        "Use it for walk-in sales, repair visits, pop-up stalls, and delivery handoffs paid in cash.",
        "Make the cash payment method obvious so the receipt is easier to reconcile during bookkeeping.",
        "List what the payment covered to avoid vague cash records later.",
      ],
    },
    relatedPages: [
      {
        href: "/payment-receipt-template",
        label: "Payment receipt template",
        description: "Open the broader proof-of-payment page when the receipt does not need a cash-specific focus.",
      },
      {
        href: "/service-receipt-template",
        label: "Service receipt template",
        description: "Use the service receipt page when the cash payment was for labor, repairs, or completed work.",
      },
      {
        href: "/rent-receipt-template",
        label: "Rent receipt template",
        description: "Switch to the rent receipt workflow when the cash payment was for monthly rent or room rental.",
      },
    ],
    defaultTemplateId: "classic",
  }),
  "donation-receipt-template": withSeo({
    key: "donation-receipt-template",
    pathname: "/donation-receipt-template",
    title: "Donation Receipt Template | Printable Donation Acknowledgement",
    description:
      "Create a donation receipt template online. Add donor, organization, amount, date, and acknowledgement details, then print a clean donation receipt in minutes.",
    heroEyebrow: "Donation acknowledgement receipt · Printable record · Simple setup",
    h1: "Donation Receipt Template",
    intro:
      "Use this donation receipt template to acknowledge gifts and give donors a clean written record without over-claiming tax or legal treatment.",
    supportingCopy:
      "It fits nonprofits, school groups, community clubs, and small organizations that need a clear printable donation acknowledgement.",
    editorIntro:
      "Enter the donor details, organization name, donation amount, and acknowledgement note, then review the printable layout before you print.",
    editorTip:
      "Use the notes field to clarify what was donated or whether goods or services were provided, without making unsupported compliance claims.",
    templateIntro:
      "Choose a clean receipt layout that keeps donor, amount, and acknowledgement details easy to read.",
    fieldsHeading: "What a donation receipt should include",
    fieldsIntro:
      "A donation receipt should clearly state who gave, who received, when the donation happened, and the amount or value being acknowledged.",
    howItWorksIntro:
      "Pick a layout, enter the donation details, and print a simple acknowledgement receipt in minutes.",
    useCasesHeading: "When a donation receipt template helps",
    useCasesIntro:
      "Donation receipts are useful whenever an organization or informal group needs to acknowledge a contribution in writing.",
    faqHeading: "Donation receipt template FAQ",
    faqIntro: "Answers to common questions about printable donation acknowledgements.",
    ctaHeading: "Print a donation receipt in minutes",
    ctaCopy:
      "Document the contribution, review the acknowledgement details, and print a donation receipt that is easy to keep on file.",
    reassurancePoints: [
      "Clear donor and organization details",
      "Simple printable acknowledgement format",
      "Avoids overstating compliance promises",
    ],
    fields: [
      "Donor and organization name",
      "Donation amount or estimated value",
      "Donation date",
      "Donation type or purpose",
      "Acknowledgement note",
      "Receipt number and contact information",
    ],
    useCases: [
      "Community organizations acknowledging contributions",
      "School and local fundraising events",
      "Small nonprofits documenting donor gifts",
      "Clubs and associations keeping printable records",
    ],
    faqs: [
      {
        question: "What should a donation receipt include?",
        answer:
          "A donation receipt should include the donor name, organization name, donation date, amount or value, and an acknowledgement statement describing the contribution.",
      },
      {
        question: "Can I use this for nonprofit donation records?",
        answer:
          "Yes. It can be used as a printable acknowledgement template for nonprofit and community donation records, but you should review any legal or tax language yourself.",
      },
      {
        question: "Should I mention what the donor gave?",
        answer:
          "Yes. Including the donation type, purpose, or estimated value helps make the acknowledgement clearer and more useful later.",
      },
      {
        question: "Can I print this donation receipt after editing it online?",
        answer:
          "Yes. Fill in the details, confirm the preview, and print the donation receipt as soon as it looks right.",
      },
    ],
    jumpLinks: [
      { href: "#editor", label: "Edit donation receipt" },
      { href: "#receipt-fields", label: "Donation receipt fields" },
      { href: "#intent-guide", label: "Donation essentials" },
      { href: "#use-cases", label: "Donation use cases" },
      { href: "#related-templates", label: "Related templates" },
      { href: "#faq", label: "Donation receipt FAQ" },
    ],
    intentSection: {
      heading: "Donation acknowledgement essentials",
      intro:
        "This page is for contribution records where donor acknowledgement language and organization details matter more than standard sales wording.",
      points: [
        "Include the donor name, organization name, and date so the acknowledgement is easy to keep on file.",
        "State the donation amount or estimated value plus the purpose or type of contribution when relevant.",
        "Use the notes area to mention goods or services context without making unsupported compliance claims.",
      ],
    },
    relatedPages: [
      {
        href: "/itemized-receipt-template",
        label: "Itemized receipt template",
        description: "Open the itemized page when the contribution record needs a more detailed breakdown of donated items.",
      },
      {
        href: "/printable-receipt-template",
        label: "Printable receipt template",
        description: "Choose the print-first format if the donation acknowledgement just needs a simple paper-ready layout.",
      },
      {
        href: "/payment-receipt-template",
        label: "Payment receipt template",
        description: "Use the general payment receipt page for standard paid transactions rather than donations.",
      },
    ],
    defaultTemplateId: "classic",
  }),
  "service-receipt-template": withSeo({
    key: "service-receipt-template",
    pathname: "/service-receipt-template",
    title: "Service Receipt Template | Receipt for Services Rendered",
    description:
      "Fill out a free service receipt template online. Add job details, service line items, totals, and payment information, then print a receipt for services rendered in minutes.",
    heroEyebrow: "Service receipt template · For freelancers and local pros · Printable",
    h1: "Service Receipt Template",
    intro:
      "Use this service receipt template when you need a simple receipt for services rendered, whether you run a solo business or a local service team.",
    supportingCopy:
      "It is useful for salons, repairs, cleaning, consulting, coaching, and other appointment-based or project-based businesses that need a clear payment record.",
    editorIntro:
      "List the service performed, adjust the totals, and print a customer-ready receipt once the preview looks right.",
    editorTip:
      "Choose the service template if you want the default tone and layout to fit labor-based work better than a retail receipt.",
    templateIntro:
      "Start with the service-oriented receipt style, then personalize the business details, tasks, and totals.",
    fieldsHeading: "What to put on a service receipt",
    fieldsIntro:
      "A service receipt should show who performed the work, what was done, when it was completed, and how the customer paid.",
    howItWorksIntro:
      "Choose the service layout, enter the work details, and print a receipt for services rendered.",
    useCasesHeading: "Who this service receipt template helps",
    useCasesIntro:
      "This layout is built for small service businesses that need a fast professional receipt after a job or appointment.",
    faqHeading: "Service receipt template FAQ",
    faqIntro: "Answers to common questions about receipts for services rendered.",
    ctaHeading: "Print a service receipt in minutes",
    ctaCopy:
      "Document the completed work, show the totals clearly, and print a receipt your customer can keep right away.",
    reassurancePoints: [
      "Good fit for labor-based work",
      "Service line items are easy to update",
      "Useful for customer proof of payment and records",
    ],
    fields: [
      "Business and technician or provider details",
      "Receipt number and service date",
      "Customer name and job reference",
      "Services rendered or labor line items",
      "Subtotal, tax, and amount paid",
      "Payment method and completion notes",
    ],
    useCases: [
      "Freelancers issuing a receipt after finishing a project",
      "Repair, maintenance, and home service businesses",
      "Salons, studios, and appointment-based providers",
      "Consultants and solo operators who need a professional paper trail",
    ],
    faqs: [
      {
        question: "What is a service receipt used for?",
        answer:
          "A service receipt records the work completed, the amount paid, and the payment method so both the business and customer have proof of payment.",
      },
      {
        question: "Can I use this as a receipt for services rendered?",
        answer:
          "Yes. This template is suitable for service businesses and freelancers who need a receipt for services rendered after a job or appointment.",
      },
      {
        question: "Should I list each service separately?",
        answer:
          "Yes. Listing each task or service line helps the customer understand the charges and keeps your internal records clearer.",
      },
      {
        question: "Can I print this service receipt after editing it online?",
        answer:
          "Yes. The preview updates live, and you can print the final service receipt as soon as the details are complete.",
      },
    ],
    jumpLinks: [
      { href: "#editor", label: "Edit service receipt" },
      { href: "#receipt-fields", label: "Service receipt fields" },
      { href: "#intent-guide", label: "Service wording guide" },
      { href: "#use-cases", label: "Service use cases" },
      { href: "#related-templates", label: "Related templates" },
      { href: "#faq", label: "Service receipt FAQ" },
    ],
    intentSection: {
      heading: "How to describe services rendered clearly",
      intro:
        "This page is designed for labor-based work where customers need to see what was completed, who performed it, and what the charges represent.",
      points: [
        "Name the service, task, or job scope instead of using a vague single-line payment note.",
        "Include provider, technician, or freelancer details when the receipt needs a stronger service reference.",
        "Use separate service lines for labor, visit fees, or materials when you want a clearer finished-work record.",
      ],
    },
    relatedPages: [
      {
        href: "/itemized-receipt-template",
        label: "Itemized receipt template",
        description: "Use the itemized page when you need to break service work into multiple tasks or detailed charges.",
      },
      {
        href: "/payment-receipt-template",
        label: "Payment receipt template",
        description: "Switch to the general payment receipt format when the main goal is simple proof of payment.",
      },
      {
        href: "/cash-payment-receipt-template",
        label: "Cash payment receipt template",
        description: "Open the cash receipt page when the completed service was paid in cash and you want that context featured.",
      },
    ],
    defaultTemplateId: "service",
  }),
  "payment-receipt-template": withSeo({
    key: "payment-receipt-template",
    pathname: "/payment-receipt-template",
    title: "Payment Receipt Template | Editable Printable Proof of Payment",
    description:
      "Create an editable payment receipt template online. Add payer, amount paid, purpose, line items, and payment method, then print clear proof of payment in minutes.",
    heroEyebrow: "Payment receipt template · Proof of payment · Fast printable workflow",
    h1: "Editable Payment Receipt Template for Proof of Payment",
    intro:
      "Use this payment receipt template when you need a general proof-of-payment document that is quick to edit, easy to print, and clear for both business records and customer handoff.",
    supportingCopy:
      "It works well for one-off payments, service jobs, local sales, and admin workflows where the main intent is simply to confirm payment happened.",
    editorIntro:
      "Enter who paid, what the payment covered, the amount received, and the payment method, then review the preview before printing.",
    editorTip:
      "Keep the notes field specific for reference numbers, partial-payment context, or what the payment settled.",
    templateIntro:
      "Choose a layout that keeps payer details, receipt number, and final amount easy to verify.",
    fieldsHeading: "What a payment receipt should include",
    fieldsIntro:
      "A strong payment receipt should make the payer, amount, payment method, and reason for payment obvious at a glance.",
    howItWorksIntro:
      "Pick a layout, fill in the payment details, and print proof of payment in a few quick steps.",
    useCasesHeading: "When a payment receipt template is useful",
    useCasesIntro:
      "This page is a good fit when the searcher wants a general payment receipt rather than a more specialized rent, donation, or service receipt.",
    faqHeading: "Payment receipt template FAQ",
    faqIntro: "Common questions about editable and printable proof-of-payment receipts.",
    ctaHeading: "Create proof of payment in minutes",
    ctaCopy:
      "Add the payment details, verify the totals, and print a payment receipt that is easy to keep on file.",
    reassurancePoints: [
      "Strong match for general payment intent",
      "Easy to mark amount paid and method",
      "Printable proof-of-payment layout",
    ],
    fields: [
      "Payer and business details",
      "Receipt number and issue date",
      "Payment amount received",
      "What the payment covered",
      "Payment method and confirmation notes",
      "Subtotal, tax, and total when needed",
    ],
    useCases: [
      "Small businesses documenting general customer payments",
      "Freelancers confirming a completed payment",
      "Front-desk teams issuing quick proof of payment",
      "Local operators handling same-day payment records",
    ],
    faqs: [
      {
        question: "What is a payment receipt used for?",
        answer:
          "A payment receipt is used to confirm that money was received, who paid it, how much was paid, and what the payment was for.",
      },
      {
        question: "Can I use this as proof of payment?",
        answer:
          "Yes. This page is designed to help you create a clear printable proof-of-payment receipt for routine business use.",
      },
      {
        question: "Should a payment receipt include the payment method?",
        answer:
          "Yes. Including whether the payment was cash, card, transfer, or another method makes the receipt more useful later.",
      },
      {
        question: "Can I print the payment receipt after editing it online?",
        answer:
          "Yes. The live preview updates as you type, and you can print the payment receipt as soon as the details are ready.",
      },
      {
        question: "Is this payment receipt editable before printing?",
        answer:
          "Yes. You can edit payer details, payment method, notes, line items, tax, and totals before printing the proof-of-payment receipt.",
      },
    ],
    jumpLinks: [
      { href: "#editor", label: "Edit payment receipt" },
      { href: "#receipt-fields", label: "Payment receipt fields" },
      { href: "#intent-guide", label: "Proof of payment guide" },
      { href: "#use-cases", label: "Payment receipt use cases" },
      { href: "#related-templates", label: "Related templates" },
      { href: "#faq", label: "Payment receipt FAQ" },
    ],
    intentSection: {
      heading: "What makes this page a general proof-of-payment template",
      intro:
        "Use this receipt page when the transaction does not need rent-, donation-, or service-specific wording and the main goal is to confirm that a payment was received.",
      points: [
        "State who paid, who received the payment, and what invoice, order, or balance the payment settled.",
        "Keep the payment method, amount paid, and date visible so the receipt works as easy proof of payment later.",
        "Use this page as the broad payment option when you do not need more specialized rent, cash-only, or service wording.",
      ],
    },
    relatedPages: [
      {
        href: "/cash-payment-receipt-template",
        label: "Cash payment receipt template",
        description: "Use the cash payment page when the payment method itself needs to be explicit for in-person cash transactions.",
      },
      {
        href: "/printable-receipt-template",
        label: "Printable receipt template",
        description: "Choose the printable page when the search intent is mainly about getting a clean paper-ready receipt fast.",
      },
      {
        href: "/itemized-receipt-template",
        label: "Itemized receipt template",
        description: "Switch to the itemized page when the payment receipt needs a clearer line-by-line breakdown of charges.",
      },
    ],
    defaultTemplateId: "classic",
  }),
  "editable-receipt-template": withSeo({
    key: "editable-receipt-template",
    pathname: "/editable-receipt-template",
    title: "Editable Receipt Template | Fillable Receipt Template Online",
    description:
      "Use a free editable receipt template online. Fill in business, customer, payment, and line-item details, update totals instantly, and print a clean fillable receipt.",
    heroEyebrow: "Editable receipt template · Fillable online editor · Live preview",
    h1: "Editable Receipt Template to Fill Out and Print",
    intro:
      "Use this editable receipt template when you want to change business details, customer fields, line items, and totals directly in the browser before printing.",
    supportingCopy:
      "This page matches users looking for a fillable or customizable receipt template rather than a static download that still needs separate editing.",
    editorIntro:
      "Update the receipt fields in the editor, watch the preview change live, and print the final version once everything looks right.",
    editorTip:
      "This page is especially strong when you want to emphasize editable fields such as customer name, notes, tax rate, and custom line items.",
    templateIntro:
      "Choose a layout, then personalize the receipt details for your exact payment scenario.",
    fieldsHeading: "What makes a receipt template editable",
    fieldsIntro:
      "An editable receipt template should let you customize the business identity, payment details, line items, and totals without reformatting the document by hand.",
    howItWorksIntro:
      "Open the editor, change the fields you need, and print a fully customized receipt from the same page.",
    useCasesHeading: "Who needs an editable receipt template",
    useCasesIntro:
      "This search intent often comes from people who want speed and flexibility instead of downloading a blank form and editing it elsewhere.",
    faqHeading: "Editable receipt template FAQ",
    faqIntro: "Answers to common questions about fillable online receipt templates.",
    ctaHeading: "Edit your receipt directly online",
    ctaCopy:
      "Fill in your details, adjust your totals, and print an editable receipt without switching tools.",
    reassurancePoints: [
      "Strong match for edit-first intent",
      "Live preview updates while you type",
      "No separate formatting step before printing",
    ],
    fields: [
      "Editable business and contact details",
      "Customizable customer name and date",
      "Flexible line items and quantities",
      "Tax rate and totals that update live",
      "Payment method and notes",
      "Receipt number and reference details",
    ],
    useCases: [
      "Owners who want to customize each receipt quickly",
      "Freelancers who need a fillable receipt after each job",
      "Administrative teams preparing receipts from a browser",
      "Searchers specifically looking for editable or fillable receipt forms",
    ],
    faqs: [
      {
        question: "What is an editable receipt template?",
        answer:
          "An editable receipt template is a receipt form you can customize by changing the business details, customer fields, items, and totals before printing.",
      },
      {
        question: "Can I fill out this receipt template online?",
        answer:
          "Yes. This page is built for online editing, so you can fill out the receipt fields directly in the browser and print immediately.",
      },
      {
        question: "Can I change the line items and totals?",
        answer:
          "Yes. You can edit the item descriptions, quantities, unit prices, and tax rate, and the totals update automatically.",
      },
      {
        question: "Is this better than downloading a blank file first?",
        answer:
          "For many users, yes. Editing directly online is faster because you can customize the receipt and print it from the same workflow.",
      },
      {
        question: "Can I print the editable receipt after filling it out?",
        answer:
          "Yes. After editing the receipt fields online, review the live preview and print the completed receipt directly from the page.",
      },
    ],
    jumpLinks: [
      { href: "#editor", label: "Edit receipt online" },
      { href: "#receipt-fields", label: "Editable fields" },
      { href: "#intent-guide", label: "Editable receipt guide" },
      { href: "#use-cases", label: "Editable receipt use cases" },
      { href: "#related-templates", label: "Related templates" },
      { href: "#faq", label: "Editable receipt FAQ" },
    ],
    intentSection: {
      heading: "Why this page fits editable and fillable receipt intent",
      intro:
        "This page is aimed at people who want to change receipt details in the browser right away instead of downloading a static template first.",
      points: [
        "Highlight the fields that usually need editing, such as customer name, notes, payment method, and custom line items.",
        "Use this page when flexibility and quick field changes matter more than a generic blank form or a print-first workflow.",
        "Keep the copy focused on filling, updating, and customizing so Google can distinguish it from printable or blank receipt pages.",
      ],
    },
    relatedPages: [
      {
        href: "/printable-receipt-template",
        label: "Printable receipt template",
        description: "Move to the printable page when the main goal is a paper-ready receipt layout rather than editability messaging.",
      },
      {
        href: "/blank-receipt-template",
        label: "Blank receipt template",
        description: "Use the blank receipt page when the visitor wants a more open-ended form without edit-first positioning.",
      },
      {
        href: "/itemized-receipt-template",
        label: "Itemized receipt template",
        description: "Choose the itemized page when the editable receipt also needs a more detailed breakdown of charges or services.",
      },
    ],
    defaultTemplateId: "classic",
  }),
  "printable-receipt-template": withSeo({
    key: "printable-receipt-template",
    pathname: "/printable-receipt-template",
    title: "Printable Receipt Template | Fill Out and Print Online",
    description:
      "Create a printable receipt template online. Fill in payment details, line items, tax, and notes, preview the final layout, and print a clean receipt fast.",
    heroEyebrow: "Printable receipt template · Ready-to-print layout · Fast browser workflow",
    h1: "Printable Receipt Template to Fill Out Online",
    intro:
      "Use this printable receipt template when your main goal is to create a clean receipt layout that looks ready on paper as soon as you finish editing the fields.",
    supportingCopy:
      "It is a strong fit for users searching printable receipt wording, especially when they care more about paper-ready output than file format talk.",
    editorIntro:
      "Fill in the receipt details, confirm the preview, and print a polished receipt that is ready for customer handoff or back-office filing.",
    editorTip:
      "Check spacing, totals, and notes in the preview before printing so the final receipt stays clean on paper.",
    templateIntro:
      "Choose the receipt style that prints clearly for your business and payment workflow.",
    fieldsHeading: "What to include on a printable receipt",
    fieldsIntro:
      "A printable receipt should keep the key payment details visible and uncluttered so it works well both on paper and in saved records.",
    howItWorksIntro:
      "Pick a layout, fill in the receipt details, and print from the browser once the preview looks complete.",
    useCasesHeading: "When a printable receipt template is the right fit",
    useCasesIntro:
      "This page is aimed at users who already know they want a paper-ready receipt and want the shortest path to printing.",
    faqHeading: "Printable receipt template FAQ",
    faqIntro: "Quick answers for users who want a receipt to fill out and print online.",
    ctaHeading: "Print a receipt without extra formatting",
    ctaCopy:
      "Complete the receipt fields, review the layout, and print a clean final version in minutes.",
    reassurancePoints: [
      "Built around print-ready output",
      "Live preview helps catch mistakes before printing",
      "Works for customer copies and internal records",
    ],
    fields: [
      "Business name and receipt number",
      "Customer or payer details",
      "Items or services with totals",
      "Tax and final amount",
      "Payment method",
      "Notes that still print cleanly",
    ],
    useCases: [
      "Store counters issuing same-day printed receipts",
      "Service teams handing customers a finished receipt",
      "Admins preparing paper-ready receipts fast",
      "Searchers specifically asking for printable receipt templates",
    ],
    faqs: [
      {
        question: "What is a printable receipt template?",
        answer:
          "A printable receipt template is a receipt layout designed to be filled out and printed clearly without extra manual formatting.",
      },
      {
        question: "Can I print this receipt directly from the browser?",
        answer:
          "Yes. Once you finish editing the fields and reviewing the preview, you can print the receipt directly from the page.",
      },
      {
        question: "Should a printable receipt still include line items and totals?",
        answer:
          "Yes. A printable receipt should still show the items or services, subtotal, tax if applicable, and final amount paid.",
      },
      {
        question: "Can I use this printable receipt template for small business use?",
        answer:
          "Yes. It is designed for small business workflows where a clean, fast printable receipt matters.",
      },
      {
        question: "Can I edit this printable receipt before printing?",
        answer:
          "Yes. Fill out the receipt fields online first, check the preview, and then print the finished receipt without a separate formatting tool.",
      },
    ],
    jumpLinks: [
      { href: "#editor", label: "Print receipt now" },
      { href: "#receipt-fields", label: "Printable receipt fields" },
      { href: "#intent-guide", label: "Printable receipt guide" },
      { href: "#use-cases", label: "Printable receipt use cases" },
      { href: "#related-templates", label: "Related templates" },
      { href: "#faq", label: "Printable receipt FAQ" },
    ],
    intentSection: {
      heading: "How this page differs from editable or blank receipt templates",
      intro:
        "This page is optimized for people who want a receipt that looks ready to print as soon as the fields are filled in, with less emphasis on file-format language.",
      points: [
        "Keep the messaging centered on clean paper output, quick browser printing, and ready-to-hand-over receipts.",
        "Use this template when print speed matters more than fully open-ended customization or scenario-specific wording.",
        "If the receipt also needs broader payment wording or editable positioning, route visitors to those more specific pages from here.",
      ],
    },
    relatedPages: [
      {
        href: "/editable-receipt-template",
        label: "Editable receipt template",
        description: "Visit the editable page when the user first needs to customize receipt fields extensively before thinking about printing.",
      },
      {
        href: "/payment-receipt-template",
        label: "Payment receipt template",
        description: "Use the payment receipt page for broader proof-of-payment intent that is less tied to print-focused wording.",
      },
      {
        href: "/blank-receipt-template",
        label: "Blank receipt template",
        description: "Open the blank receipt page when a flexible general-purpose receipt form is a better fit than a print-first page.",
      },
    ],
    defaultTemplateId: "classic",
  }),
  "sales-receipt-template": withSeo({
    key: "sales-receipt-template",
    pathname: "/sales-receipt-template",
    title: "Sales Receipt Template | Free Printable Receipt for Sales",
    description:
      "Create a sales receipt template online. Add sold items, quantities, prices, and payment details, then print a clean sales receipt for your small business.",
    heroEyebrow: "Sales receipt template · Item-based transactions · Printable output",
    h1: "Sales Receipt Template",
    intro:
      "Use this sales receipt template when you need to document items sold, amounts paid, and the final sale total in a customer-friendly printable format.",
    supportingCopy:
      "It fits small retailers, pop-up sellers, market vendors, and other item-based businesses that need a quick sales receipt after checkout.",
    editorIntro:
      "Enter the sold items, quantities, prices, and payment details, then review the printable receipt before handing it over.",
    editorTip:
      "This page works best when the search intent is clearly about documenting a sale rather than a service appointment or rent payment.",
    templateIntro:
      "Choose a layout that keeps products, quantities, and total sale amount easy to scan.",
    fieldsHeading: "What a sales receipt should include",
    fieldsIntro:
      "A good sales receipt should make the items sold, quantities, payment method, and total paid easy to verify.",
    howItWorksIntro:
      "Select a layout, enter the sold items, and print a clear sales receipt in a few steps.",
    useCasesHeading: "Who should use a sales receipt template",
    useCasesIntro:
      "This layout is made for item-based transactions where customers expect a receipt showing what they bought.",
    faqHeading: "Sales receipt template FAQ",
    faqIntro: "Common questions about printable receipts for sales transactions.",
    ctaHeading: "Create a sales receipt fast",
    ctaCopy:
      "List the products sold, confirm the totals, and print a sales receipt that is ready for checkout handoff.",
    reassurancePoints: [
      "Built for item-based sales",
      "Clear quantity and price fields",
      "Useful for fast checkout receipts",
    ],
    fields: [
      "Business name and receipt number",
      "Customer name or walk-in label",
      "Items sold with quantities",
      "Unit prices and line totals",
      "Tax and total sale amount",
      "Payment method and sale notes",
    ],
    useCases: [
      "Retail shops issuing customer sales receipts",
      "Market sellers documenting same-day transactions",
      "Pop-up stores and seasonal vendors",
      "Small businesses that need a printable proof of sale",
    ],
    faqs: [
      {
        question: "What is a sales receipt used for?",
        answer:
          "A sales receipt records the items sold, how much the customer paid, and the payment details for that transaction.",
      },
      {
        question: "Should a sales receipt list each item sold?",
        answer:
          "Yes. Listing each item helps the customer verify the purchase and makes the receipt more useful for business records.",
      },
      {
        question: "Can I use this sales receipt template for retail transactions?",
        answer:
          "Yes. This page is a strong fit for small retail and item-based business transactions.",
      },
      {
        question: "Can I print the sales receipt after editing it online?",
        answer:
          "Yes. Once the product details and totals look right in the preview, you can print the final sales receipt immediately.",
      },
    ],
    jumpLinks: [
      { href: "#editor", label: "Edit sales receipt" },
      { href: "#receipt-fields", label: "Sales receipt fields" },
      { href: "#intent-guide", label: "Sales receipt guide" },
      { href: "#use-cases", label: "Sales receipt use cases" },
      { href: "#related-templates", label: "Related templates" },
      { href: "#faq", label: "Sales receipt FAQ" },
    ],
    intentSection: {
      heading: "How this page supports product-sale receipt intent",
      intro:
        "Use this page when the receipt needs to show what was sold, how many units were purchased, and the final sale amount in a customer-facing format.",
      points: [
        "Keep product names, quantities, and unit prices easy to scan so the receipt clearly reads like a completed sale record.",
        "Use this page instead of service or rent receipt pages when the transaction is centered on physical goods or item-based checkout.",
        "Link to the itemized version when the sale needs more detailed line-by-line breakdowns or extra charge transparency.",
      ],
    },
    relatedPages: [
      {
        href: "/itemized-receipt-template",
        label: "Itemized receipt template",
        description: "Switch to the itemized page when the sales receipt needs a more detailed breakdown of products, fees, or add-ons.",
      },
      {
        href: "/printable-receipt-template",
        label: "Printable receipt template",
        description: "Use the printable page when the main goal is a paper-ready receipt workflow for quick checkout handoff.",
      },
      {
        href: "/payment-receipt-template",
        label: "Payment receipt template",
        description: "Open the payment receipt page when the intent is broader proof of payment instead of a product-sale-specific receipt.",
      },
    ],
    defaultTemplateId: "classic",
  }),
  "blank-receipt-template": withSeo({
    key: "blank-receipt-template",
    pathname: "/blank-receipt-template",
    title: "Blank Receipt Template | Free Fillable Receipt Form",
    description:
      "Open a blank receipt template online, fill in the business, customer, items, and payment details, then print a simple receipt form in minutes.",
    heroEyebrow: "Blank receipt template · Fillable receipt form · Flexible setup",
    h1: "Blank Receipt Template",
    intro:
      "Use this blank receipt template when you want a flexible starting point that can be filled in for many different payment situations without being too narrowly pre-labeled.",
    supportingCopy:
      "It is useful for users searching a blank receipt form they can adapt for sales, services, simple payments, or internal paperwork.",
    editorIntro:
      "Start from a general receipt layout, fill in the details you need, and print once the preview looks complete.",
    editorTip:
      "This page works best when the searcher wants flexibility first and plans to customize the fields for each new receipt.",
    templateIntro:
      "Choose a clean receipt style that gives you room to adapt the form to different payment scenarios.",
    fieldsHeading: "What to put on a blank receipt template",
    fieldsIntro:
      "A blank receipt should still capture the core payment fields so it stays useful after you customize it for the current transaction.",
    howItWorksIntro:
      "Open the form, fill in only the fields you need, and print a simple adaptable receipt.",
    useCasesHeading: "Why use a blank receipt template",
    useCasesIntro:
      "Blank receipt intent usually comes from users who want a flexible receipt form rather than a highly specific page tied to one scenario.",
    faqHeading: "Blank receipt template FAQ",
    faqIntro: "Answers to common questions about starting from a blank fillable receipt form.",
    ctaHeading: "Start with a blank receipt form",
    ctaCopy:
      "Fill in your business and payment details, keep the layout simple, and print a blank-style receipt that fits the transaction.",
    reassurancePoints: [
      "Flexible starting point",
      "Works across multiple receipt scenarios",
      "Still prints clean after customization",
    ],
    fields: [
      "Business identity and contact details",
      "Customer or payer information",
      "Receipt number and date",
      "Line items or payment description",
      "Totals and payment method",
      "Custom notes for the scenario",
    ],
    useCases: [
      "Offices that need a general-purpose receipt form",
      "Small businesses handling mixed receipt scenarios",
      "Users who want to customize each receipt from scratch",
      "People searching specifically for a blank receipt template",
    ],
    faqs: [
      {
        question: "What is a blank receipt template?",
        answer:
          "A blank receipt template is a flexible receipt form that gives you the core fields but leaves the details open for you to customize.",
      },
      {
        question: "Can I fill out this blank receipt online?",
        answer:
          "Yes. You can enter the receipt details directly in the editor and print the completed form from the page.",
      },
      {
        question: "Is a blank receipt template useful for different business scenarios?",
        answer:
          "Yes. A blank receipt works well when you need one adaptable layout for sales, services, and general payment records.",
      },
      {
        question: "Should I still include a receipt number and payment method?",
        answer:
          "Yes. Even on a blank receipt, those details help keep the final record clear and easier to reference later.",
      },
    ],
    jumpLinks: [
      { href: "#editor", label: "Fill blank receipt" },
      { href: "#receipt-fields", label: "Blank receipt fields" },
      { href: "#intent-guide", label: "Blank receipt guide" },
      { href: "#use-cases", label: "Blank receipt use cases" },
      { href: "#related-templates", label: "Related templates" },
      { href: "#faq", label: "Blank receipt FAQ" },
    ],
    intentSection: {
      heading: "When a blank receipt template is the better fit",
      intro:
        "This page is best when the visitor wants a flexible starting point that can be adapted to different receipt scenarios without strongly pre-labeled wording.",
      points: [
        "Use blank receipt messaging for open-ended customization, not for print-first or edit-first positioning alone.",
        "Keep the guidance broad so the page can support mixed scenarios like general payments, simple sales, or ad hoc paperwork.",
        "Route users to editable or printable pages when their intent becomes more specific than a flexible blank form.",
      ],
    },
    relatedPages: [
      {
        href: "/editable-receipt-template",
        label: "Editable receipt template",
        description: "Choose the editable page when the visitor explicitly wants to customize receipt fields online with stronger edit-first language.",
      },
      {
        href: "/printable-receipt-template",
        label: "Printable receipt template",
        description: "Move to the printable page when the next step is mainly producing a paper-ready receipt rather than keeping the form general.",
      },
      {
        href: "/payment-receipt-template",
        label: "Payment receipt template",
        description: "Use the payment receipt page when the receipt should read as explicit proof that a payment was received.",
      },
    ],
    defaultTemplateId: "classic",
  }),
  "itemized-receipt-template": withSeo({
    key: "itemized-receipt-template",
    pathname: "/itemized-receipt-template",
    title: "Itemized Receipt Template | Free Detailed Receipt with Line Items",
    description:
      "Create an itemized receipt template online. Add multiple line items, quantities, prices, taxes, and totals, then print a detailed receipt in minutes.",
    heroEyebrow: "Itemized receipt template · Detailed line items · Printable totals",
    h1: "Itemized Receipt Template",
    intro:
      "Use this itemized receipt template when you need a more detailed receipt that clearly breaks down each product or service line instead of only showing one total amount.",
    supportingCopy:
      "It fits businesses that want cleaner records, customers who need charge transparency, and searches that explicitly ask for an itemized receipt.",
    editorIntro:
      "Add each item or service line, adjust quantities and prices, and review the updated totals before printing.",
    editorTip:
      "This page is especially useful when the detail level of the line items is the main reason someone is searching.",
    templateIntro:
      "Choose a receipt layout that keeps descriptions, quantities, prices, and totals easy to scan.",
    fieldsHeading: "What belongs on an itemized receipt",
    fieldsIntro:
      "An itemized receipt should separate each product or service into its own line so the subtotal and total are easier to understand.",
    howItWorksIntro:
      "Enter each line item, verify the running totals, and print a detailed itemized receipt from the same page.",
    useCasesHeading: "When to use an itemized receipt template",
    useCasesIntro:
      "Itemized receipts are a strong fit when the customer or business needs a more transparent breakdown of what was provided.",
    faqHeading: "Itemized receipt template FAQ",
    faqIntro: "Common questions about detailed printable receipts with line items.",
    ctaHeading: "Print a detailed itemized receipt",
    ctaCopy:
      "Break down each charge, verify your totals, and print an itemized receipt that is easier to review later.",
    reassurancePoints: [
      "Built for multi-line detail",
      "Clear quantities, prices, and totals",
      "Useful for transparent customer records",
    ],
    fields: [
      "Receipt number and business details",
      "Customer or payer information",
      "Multiple item or service descriptions",
      "Quantities and unit prices",
      "Subtotal, tax, and grand total",
      "Payment method and notes",
    ],
    useCases: [
      "Businesses that want detailed proof of charges",
      "Service providers listing multiple tasks",
      "Retail receipts with several products",
      "Searchers looking specifically for itemized receipt templates",
    ],
    faqs: [
      {
        question: "What is an itemized receipt?",
        answer:
          "An itemized receipt is a receipt that lists each product or service separately with quantities, prices, and totals instead of showing only one final amount.",
      },
      {
        question: "Why use an itemized receipt template?",
        answer:
          "An itemized receipt helps customers understand each charge and gives the business a clearer record of what was sold or completed.",
      },
      {
        question: "Can I add multiple line items to this template?",
        answer:
          "Yes. You can add and edit multiple line items, quantities, and unit prices, and the totals update automatically.",
      },
      {
        question: "Can I print the itemized receipt after editing it online?",
        answer:
          "Yes. Once the line items and totals are complete, you can print the final itemized receipt directly from the page.",
      },
    ],
    jumpLinks: [
      { href: "#editor", label: "Add line items" },
      { href: "#receipt-fields", label: "Itemized receipt fields" },
      { href: "#intent-guide", label: "Itemized receipt guide" },
      { href: "#use-cases", label: "Itemized receipt use cases" },
      { href: "#related-templates", label: "Related templates" },
      { href: "#faq", label: "Itemized receipt FAQ" },
    ],
    intentSection: {
      heading: "Why this page is different from general payment or sales receipts",
      intro:
        "Use this page when the searcher needs a more detailed breakdown of charges, quantities, or service lines than a basic payment receipt would normally show.",
      points: [
        "Separate products or services into individual lines so the receipt clearly explains where the total came from.",
        "Use this page when transparency and charge detail matter more than a short proof-of-payment format.",
        "Link to sales or editable pages when the visitor needs either item-sale framing or broader field customization instead of detail-heavy breakdowns.",
      ],
    },
    relatedPages: [
      {
        href: "/sales-receipt-template",
        label: "Sales receipt template",
        description: "Use the sales receipt page when the receipt should emphasize product checkout rather than a detailed multi-line breakdown.",
      },
      {
        href: "/payment-receipt-template",
        label: "Payment receipt template",
        description: "Choose the payment receipt page for simpler proof-of-payment intent when a detailed item list is not necessary.",
      },
      {
        href: "/editable-receipt-template",
        label: "Editable receipt template",
        description: "Open the editable page when the main need is flexible browser editing, with itemization as a secondary concern.",
      },
    ],
    defaultTemplateId: "classic",
  }),
};

export function getLandingPageStructuredData(page: ReceiptLandingPageConfig) {
  return page.structuredData;
}
