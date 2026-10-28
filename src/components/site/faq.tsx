import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/site/reveal";
import { imagery } from "@/lib/media";

const faqs = [
  {
    q: "Does this replace my project managers?",
    a: "It replaces the paperwork they do, not the judgement. Most companies keep their field leadership and stop hiring for the office roles that were really about chasing documents.",
  },
  {
    q: "What does it connect to?",
    a: "Your bank feeds, accounting software, email, calendar and the file storage you already use. Drawings come in as PDF or from your plan room. We run the integrations during onboarding.",
  },
  {
    q: "How does it price a job?",
    a: "From your own cost history first, then from regional trade rates where you have no history. Every line in a proposal shows where its number came from. You can override anything.",
  },
  {
    q: "Can it send things without me seeing them?",
    a: "You set the rules. Many owners let it send routine follow-ups and schedule updates on its own, and keep proposals, change orders and anything touching money behind a one-tap approval.",
  },
  {
    q: "How long does onboarding take?",
    a: "A working session on your live jobs, then a few weeks of running alongside your current process. Most companies are fully on it inside a month.",
  },
  {
    q: "What does it cost?",
    a: "Pricing is set per company after the first session, based on volume and modules. We would rather show you the number against your own books than publish a table that fits nobody.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-border bg-background py-28 sm:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.05]">
              The ones owners ask first.
            </h2>
            <div className="mt-10 overflow-hidden rounded-3xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagery.blueprintsTable}
                alt="Drawings spread on a site table with a hard hat, tape measure and coffee"
                className="aspect-[16/10] w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Accordion type="single" collapsible>
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger className="py-6 text-lg tracking-tight hover:text-brand hover:no-underline md:text-xl [&>svg]:mt-1 [&>svg]:size-5">{f.q}</AccordionTrigger>
                  <AccordionContent className="pb-6 pr-12 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
