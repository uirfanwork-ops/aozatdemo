import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Ticker } from "@/components/site/ticker";
import { Statement } from "@/components/site/statement";
import { Army } from "@/components/site/army";
import { Orbit } from "@/components/site/orbit";
import { Confirm } from "@/components/site/confirm";
import { Operator } from "@/components/site/operator";
import { PhotoBreak } from "@/components/site/photo-break";
import { Day } from "@/components/site/day";
import { Trust } from "@/components/site/trust";
import { Apply } from "@/components/site/apply";
import { Pricing } from "@/components/site/pricing";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Ticker />
      <Army />
      <Statement />
      <Operator />
      <Orbit />
      <PhotoBreak />
      <Day />
      <Confirm />
      <Trust />
      <Pricing />
      <Apply />
      <Faq />
      <Footer />
    </main>
  );
}
