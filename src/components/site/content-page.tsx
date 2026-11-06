import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

const links = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
];

/**
 * Shared layout for the company pages (products, contact). Mirrors the legal
 * page shell so every document page shares the same navbar, type scale and
 * footer as the rest of the site.
 */
export function ContentPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar tone="light" />
      <main>
        <section className="border-b border-line bg-white pb-10 pt-10 sm:pb-14 sm:pt-14">
          <div className="shell">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/35 transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to the lab
            </Link>
            <div className="mt-8">
              <span className="eyebrow text-ink/40">{eyebrow}</span>
              <h1 className="display mt-4 max-w-[760px] text-[clamp(2.3rem,4.8vw,4.2rem)] text-ink">
                {title}
              </h1>
              <p className="mt-4 max-w-[570px] text-[12.5px] leading-[1.8] text-ink/48">{intro}</p>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="shell grid gap-8 lg:grid-cols-[180px_minmax(0,760px)]">
            <aside className="lg:sticky lg:top-[100px] lg:self-start">
              <p className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink/30">
                Company
              </p>
              <div className="mt-3 flex gap-1.5 lg:flex-col">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full px-3 py-2 text-[10px] font-semibold text-ink/45 transition-colors hover:bg-white hover:text-ink lg:rounded-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </aside>

            <article className="min-w-0 rounded-[24px] border border-line bg-white p-5 sm:p-8">
              <div className="space-y-7 text-[11.5px] leading-[1.85] text-ink/55">{children}</div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-[16px] font-bold tracking-[-0.025em] text-ink">{title}</h2>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}
