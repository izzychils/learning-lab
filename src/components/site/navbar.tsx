"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { LabLogo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

const links = [
  { label: "Simulations", href: "/simulations" },
  { label: "AI tutor", href: "/tutor" },
  { label: "For educators", href: "/for-educators" },
  { label: "Pricing", href: "/pricing" },
  { label: "Demo lab", href: "/demo" },
];

export function Navbar({ tone = "auto" }: { tone?: "auto" | "light" | "dark" }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const dark = tone === "auto" ? !scrolled : tone === "dark";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        dark
          ? "border-b border-paper/10 bg-[#0b0a08]/82 backdrop-blur-xl"
          : "border-b border-line bg-paper/94 backdrop-blur-xl",
      )}
    >
      <div className="shell flex h-[74px] items-center justify-between gap-6">
        <Link href="/" aria-label="Learning Lab home" className="shrink-0">
          <LabLogo tone={dark ? "dark" : "light"} />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-[12.5px] font-medium transition-colors",
                  dark
                    ? active
                      ? "text-paper"
                      : "text-paper/58 hover:text-paper"
                    : active
                      ? "text-ink"
                      : "text-ink/58 hover:text-ink",
                )}
              >
                {link.label}
                {active ? (
                  <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-flare" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className={cn(
              "text-[12.5px] font-medium transition-colors",
              dark ? "text-paper/58 hover:text-paper" : "text-ink/58 hover:text-ink",
            )}
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className={cn(
              "group inline-flex h-10 items-center gap-2 rounded-full px-4 text-[12px] font-bold transition-colors",
              dark
                ? "bg-flare text-ink hover:bg-[#ff6d39]"
                : "bg-ink text-paper hover:bg-ink-soft",
            )}
          >
            Start free
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden",
            dark ? "border-paper/20 text-paper" : "border-ink/15 text-ink",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={cn(
          "overflow-hidden border-t transition-[max-height,opacity] duration-300 lg:hidden",
          dark ? "border-paper/10 bg-[#0b0a08]" : "border-line bg-paper",
          open ? "max-h-[620px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="shell flex flex-col py-4">
          {links.map((link, index) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between border-b py-3.5 text-[14px] font-medium",
                  dark ? "border-paper/10" : "border-line/70",
                  dark
                    ? active
                      ? "text-flare"
                      : "text-paper"
                    : active
                      ? "text-flare-deep"
                      : "text-ink",
                )}
              >
                <span>{link.label}</span>
                <span
                  className={cn(
                    "font-mono text-[9px] uppercase tracking-[0.16em]",
                    dark ? "text-paper/30" : "text-muted",
                  )}
                >
                  0{index + 1}
                </span>
              </Link>
            );
          })}

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className={cn(
                "inline-flex h-12 items-center justify-center rounded-full border text-[13px] font-semibold",
                dark ? "border-paper/20 text-paper" : "border-ink/15 text-ink",
              )}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-flare text-[13px] font-bold text-ink"
            >
              Start free
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
