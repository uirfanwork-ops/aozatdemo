// The features page and the Features menu: eleven parts of the business, each
// with one screen and the three features contractors use most in it.
import {
  Building2,
  Hammer,
  Handshake,
  HardHat,
  KeyRound,
  Landmark,
  Megaphone,
  Ruler,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  name: string;
  summary: string;
};

export type FeatureCategory = {
  slug: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  /** Every feature in this part of the portal, shown or not. */
  total: number;
  shot: { src: string; label: string; alt: string };
  /** The three shown, numbered to match the notes on the screen. */
  features: [Feature, Feature, Feature];
};

export const featureCategories: FeatureCategory[] = [
  {
    slug: "sales",
    title: "Sales and CRM",
    blurb: "Every lead on one board, every contact attempt counted, and the next email drafted for you.",
    icon: Handshake,
    total: 5,
    shot: { src: "/features/sales.jpg", label: "Leads", alt: "The lead board with each lead's stage and contact attempts" },
    features: [
      { name: "Lead pipeline", summary: "Track each lead from new to won on one board, with every call, email, and meeting counted." },
      { name: "Business card scan", summary: "Take a photo of a card and the lead fills itself in: name, company, phone, and email." },
      { name: "AI-drafted follow-ups", summary: "The AI drafts the next email to each lead from your templates. You edit it and send." },
    ],
  },
  {
    slug: "estimating",
    title: "Estimating",
    blurb: "From drawings to a signed contract: measure, price, bid out, and send a proposal the client signs online.",
    icon: Ruler,
    total: 13,
    shot: { src: "/features/estimating.jpg", label: "AI takeoff", alt: "An AI takeoff with measured items waiting for review on a floor plan" },
    features: [
      { name: "AI takeoff", summary: "Upload the drawings and the AI measures areas, lengths, and counts. Nothing counts until you accept it." },
      { name: "Quote builder", summary: "Price scope sections with private costs and margin, and let the AI draft the proposal." },
      { name: "Bids and e-signed contracts", summary: "Send bid requests to subcontractors, compare prices by section, and have the client sign online." },
    ],
  },
  {
    slug: "marketing",
    title: "Marketing",
    blurb: "Brochures, follow-ups, and email sequences that go out on their own once you approve the wording.",
    icon: Megaphone,
    total: 4,
    shot: { src: "/features/marketing.jpg", label: "Email flows", alt: "An email flow with its trigger, waits, and emails" },
    features: [
      { name: "Email flows", summary: "Build sequences from a trigger, waits, and emails, and they run on their own." },
      { name: "Automatic client follow-ups", summary: "Quote chases and thank-you notes go out on schedule, each with its own switch." },
      { name: "Brochure library", summary: "Keep your brochures in one place and attach the right one to any lead email." },
    ],
  },
  {
    slug: "projects",
    title: "Project Management",
    blurb: "Each job on one page: the plan, the schedule, progress and budget, reports, files, chat, and change orders.",
    icon: HardHat,
    total: 21,
    shot: { src: "/features/projects.jpg", label: "Project", alt: "A project page with its team, tabs, progress, and budget" },
    features: [
      { name: "Project hub", summary: "The phase plan, progress against budget, files, chat, and change orders for each job." },
      { name: "Gantt and lookahead", summary: "The schedule draws itself from the plan, with a three-week lookahead for the site." },
      { name: "Reports and punch list", summary: "Daily reports roll into a weekly summary the AI writes, and punch items close with photos." },
    ],
  },
  {
    slug: "crews",
    title: "Field and Crew Management",
    blurb: "Your crew run their day from a phone: clock in, sign the safety sheet, log the work, and take photos.",
    icon: Hammer,
    total: 7,
    shot: { src: "/features/crews.jpg", label: "Crew portal", alt: "Three crew portal screens on a phone: clocked in, the daily log, and the safety sign-off" },
    features: [
      { name: "Clock in on the job", summary: "Crews clock in only on projects they are assigned to, and their hours wait for the PM's approval." },
      { name: "Daily logs with photos", summary: "Notes and photos from the field land on the project the same day." },
      { name: "Start-of-shift safety sign-off", summary: "Every shift starts with the safety sheet, signed on the phone." },
    ],
  },
  {
    slug: "portals",
    title: "Client and Sub Portals",
    blurb: "Clients and subcontractors get their own login to everything that concerns them, and nothing that does not.",
    icon: KeyRound,
    total: 6,
    shot: { src: "/features/portals.jpg", label: "Client portal", alt: "A client's portal with every job they have" },
    features: [
      { name: "Client portal", summary: "One login per client with every job, its schedule, photos, invoices, and selections." },
      { name: "Messages and sign-offs", summary: "Clients message the office, choose finishes, and sign off with their initials and the date." },
      { name: "Subcontractor portal", summary: "Subcontractors see their jobs, paperwork, orders, and payments, and get start notices by email and text." },
    ],
  },
  {
    slug: "purchasing",
    title: "Purchasing",
    blurb: "Orders, suppliers, subcontractors, and the paper trail behind every dollar you commit.",
    icon: ShoppingCart,
    total: 11,
    shot: { src: "/features/purchasing.jpg", label: "Purchase orders", alt: "The list of purchase orders with vendor, job, and total" },
    features: [
      { name: "Purchase orders", summary: "Raise orders for materials and subtrades, with a log of every edit." },
      { name: "Vendor price lists", summary: "Pick items from each vendor's price list so the same product is never entered twice." },
      { name: "Subcontractor directory", summary: "Trades, contacts, insurance dates, and the bids each company has won, in one place." },
    ],
  },
  {
    slug: "finances",
    title: "Finances",
    blurb: "Invoices, payments, expenses, and job costing, with receipts read for you and files ready for QuickBooks.",
    icon: Landmark,
    total: 12,
    shot: { src: "/features/finances.jpg", label: "Expenses", alt: "The expense dashboard with spend by category and by project" },
    features: [
      { name: "Invoices and online payments", summary: "Bill against the contract, take card and bank payments online, and see what is still owed." },
      { name: "Expenses with receipt scan", summary: "Take a photo of a receipt and the expense fills itself in, matched to a job and phase." },
      { name: "Job costing and QuickBooks", summary: "See cost against plan for each phase, and export everything to QuickBooks." },
    ],
  },
  {
    slug: "safety",
    title: "Health and Safety Tools",
    blurb: "Toolbox talks, site sign-in, incidents, and expiring certificates, kept on the job they belong to.",
    icon: ShieldCheck,
    total: 6,
    shot: { src: "/features/safety.jpg", label: "Safety", alt: "Toolbox talks, incident reports, and expiring certificates on a project" },
    features: [
      { name: "Toolbox talks", summary: "Hold a talk, show the code, and the crew sign from their phones." },
      { name: "Incident reports", summary: "Report injuries and near misses the day they happen, and the office is emailed at once." },
      { name: "Certificate and insurance expiry", summary: "See what expires soon, and keep a lapsed firm from being awarded work." },
    ],
  },
  {
    slug: "ai",
    title: "AI and Automation",
    blurb: "Ask, say, or let it run: the assistant answers from your records, and nothing happens without your Confirm.",
    icon: Sparkles,
    total: 8,
    shot: { src: "/features/ai.jpg", label: "Assistant", alt: "An action the assistant proposes, waiting for Confirm" },
    features: [
      { name: "Dashboard assistant", summary: "Ask about any job, quote, or purchase order and get the answer from your own records." },
      { name: "Actions you confirm", summary: "Type or say what to do. The assistant shows it as a card and waits for your Confirm." },
      { name: "Approval routing", summary: "Draw who signs what on a board, and each request goes to the right people." },
    ],
  },
  {
    slug: "company",
    title: "Company and Admin",
    blurb: "Who sees what, what happened when, and every record recoverable for 40 days.",
    icon: Building2,
    total: 14,
    shot: { src: "/features/company.jpg", label: "Business analytics", alt: "Business analytics ranking clients by projects, contract value, and what they owe" },
    features: [
      { name: "Employees and page access", summary: "Add your team and choose which pages each person can open." },
      { name: "Business analytics", summary: "See your top clients, vendor spend, subcontractor awards, and win rate." },
      { name: "Recycle bin and system log", summary: "Every sign-in and change is logged, and deleted records come back for 40 days." },
    ],
  },
];

/** Every feature across the portal, shown on this page or not. */
export const featureTotal = featureCategories.reduce((n, c) => n + c.total, 0);
