/**
 * Pricing tiers. Set `price` to the monthly figure (for example "$499") when it is final.
 * Until then the page shows the placeholder so nothing invented ships.
 */
export type Tier = {
  id: string;
  name: string;
  tagline: string;
  price: string | null;
  priceNote: string;
  cta: string;
  href: string;
  popular?: boolean;
  included: string[];
  excluded?: string[];
};

export const PRICE_PLACEHOLDER = "[needs number]";

export const tiers: Tier[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "The platform without the AI operator. For smaller teams getting organised.",
    price: "$150",
    priceNote: "per month",
    cta: "Start with Basic",
    href: "#apply",
    included: [
      "Up to 3 users",
      "Up to 5 field crews",
      "Projects, scheduling, client portal and invoicing",
      "Daily AI usage limit",
    ],
    excluded: ["AI operator", "AI agents"],
  },
  {
    id: "pro-ai",
    name: "Pro AI",
    tagline: "The AI operator and its agents, working every part of the business.",
    price: "$300",
    priceNote: "per month",
    cta: "Request a walkthrough",
    href: "#apply",
    popular: true,
    included: [
      "Up to 10 users",
      "Up to 20 field crews",
      "AI operator",
      "AI takeoffs",
      "Sales agent",
      "Marketing agent",
      "PM assist agent",
      "Subcontractor and vendor AI manager",
      "Everything in Basic",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Built around how your company already runs. Scoped with you.",
    price: "Custom",
    priceNote: "talk to us",
    cta: "Contact us",
    href: "#apply",
    included: [
      "Users and field crews sized to your company",
      "Everything in Pro AI",
      "Custom agents and integrations",
      "Onboarding planned around your live jobs",
    ],
  },
];
