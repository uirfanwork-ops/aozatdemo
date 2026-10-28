import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Ticker } from "@/components/site/ticker";
import { Statement } from "@/components/site/statement";
import { Operator } from "@/components/site/operator";
import { PhotoBreak } from "@/components/site/photo-break";
import { Dashboard } from "@/components/site/dashboard";
import { Day } from "@/components/site/day";
import { Trust } from "@/components/site/trust";
import { Apply } from "@/components/site/apply";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Ticker />
      <Statement />
      <Operator />
      <PhotoBreak />
      <Dashboard />
      <Day />
      <Trust />
      <Apply />
      <Faq />
      <Footer />
    </main>
  );
}
