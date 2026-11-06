import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LabLogo } from "@/components/brand/logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "The lab",
    links: [
      { label: "Simulation library", href: "/simulations" },
      { label: "Periodic table", href: "/demo/periodic-table" },
      { label: "Science glossary", href: "/glossary" },
      { label: "All demos", href: "/demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Contact", href: "/contact" },
      { label: "For educators", href: "/for-educators" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Workspace",
    links: [
      { label: "Overview", href: "/dashboard" },
      { label: "Guided practicals", href: "/dashboard/practicals" },
      { label: "Practice questions", href: "/dashboard/practice" },
      { label: "Lab notebook", href: "/dashboard/notebook" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink pb-8 pt-16 text-paper sm:pt-20">
      <div className="shell">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Learning Lab home">
              <LabLogo tone="dark" />
            </Link>
            <p className="mt-5 max-w-[280px] text-[13px] leading-relaxed text-paper/58">
              A scientific simulation workspace for the ideas that diagrams never quite explain.
            </p>
            <Link
              href="/demo"
              className="group mt-7 inline-flex items-center gap-2 border-b border-paper/25 pb-2 text-[13px] font-semibold text-paper transition-colors hover:border-flare hover:text-flare"
            >
              Open a demo
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <p className="mt-6 max-w-[240px] text-[10px] leading-relaxed text-paper/28">
              No downloads. No lab coat required. This demo keeps your work in your browser.
            </p>
            <p className="mt-6 text-[11px] font-semibold text-paper/80">{site.companyLine}</p>
            <p className="mt-2 text-[10.5px] leading-relaxed text-paper/45">
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-flare">
                {site.email}
              </a>
              <br />
              {site.location}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="mono-label text-paper/35">{column.title}</p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-paper/68 transition-colors hover:text-flare"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-6 text-[10.5px] text-paper/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.company}. {site.name} is a product of {site.company}.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/legal/privacy" className="transition-colors hover:text-paper">
              Privacy
            </Link>
            <Link href="/legal/terms" className="transition-colors hover:text-paper">
              Terms
            </Link>
            <span className="font-mono uppercase tracking-[0.14em] text-paper/22">
              Make the invisible visible
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
