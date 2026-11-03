import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { LabLogo } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-[#0b0a08] px-5 py-12 text-paper">
      <div className="grid-dark absolute inset-0 opacity-50" />
      <div className="absolute right-[-15%] top-[-20%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.18),transparent_66%)]" />
      <svg
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[600px] w-[600px] opacity-40"
      >
        <circle cx="300" cy="300" r="210" stroke="#F4F1E9" strokeOpacity="0.07" />
        <circle cx="300" cy="300" r="270" stroke="#FF5A1F" strokeOpacity="0.14" strokeDasharray="2 10" />
        <ellipse cx="300" cy="300" rx="290" ry="110" stroke="#FF5A1F" strokeOpacity="0.12" transform="rotate(-28 300 300)" />
      </svg>

      <div className="relative mx-auto w-full max-w-[960px]">
        <LabLogo tone="dark" />
        <div className="mt-16 max-w-[640px]">
          <span className="eyebrow text-paper/40">404 / Off the map</span>
          <h1 className="display mt-4 text-[clamp(3.2rem,8vw,6rem)] text-paper">
            This page left the{" "}
            <span className="text-flare">lab.</span>
          </h1>
          <p className="mt-5 max-w-[430px] text-[13px] leading-[1.75] text-paper/45">
            The link may be old, or the experiment may not be ready yet. The rest of the lab
            is still open.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-flare px-5 text-[11px] font-bold text-ink transition-colors hover:bg-[#ff6d39]"
            >
              Open the demo lab
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-paper/20 px-5 text-[11px] font-semibold text-paper/65 transition-colors hover:border-paper/40 hover:text-paper"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back home
            </Link>
          </div>
        </div>
        <p className="mt-16 font-mono text-[8px] uppercase tracking-[0.14em] text-paper/20">
          Learning Lab / try asking a better question
        </p>
      </div>
    </div>
  );
}
