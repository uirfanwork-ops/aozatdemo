import { Logo } from "@/components/site/logo";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="container-x py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo />
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
              The operating layer for general contractors. Built in Ontario for companies that
              build.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <FooterCol title="Product" links={["Platform", "Security", "Pricing", "Changelog"]} />
            <FooterCol title="Company" links={["About", "Careers", "Contact"]} />
            <FooterCol title="Legal" links={["Privacy", "Terms", "Data processing"]} />
          </div>
        </div>
        <Separator className="my-10" />
        <div className="flex flex-col gap-3 text-[12.5px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Omni GC. Working name.</p>
          <p >Toronto, Canada</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="text-sm font-medium text-foreground/80">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-foreground/75 transition-colors hover:text-foreground">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
