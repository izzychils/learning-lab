import Link from "next/link";
import { LabLogo } from "@/components/brand/logo";

export function DemoFooter() {
  return (
    <footer className="border-t border-paper/10 bg-[#0b0a08] py-8 text-paper">
      <div className="shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link href="/" aria-label="Learning Lab home">
            <LabLogo tone="dark" />
          </Link>
          <span className="hidden h-4 w-px bg-paper/12 sm:block" />
          <p className="text-[10.5px] text-paper/35">Make the invisible visible.</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] text-paper/38">
          <Link href="/demo" className="transition-colors hover:text-paper">Demos</Link>
          <Link href="/signup" className="transition-colors hover:text-paper">Start free</Link>
          <Link href="/login" className="transition-colors hover:text-paper">Sign in</Link>
          <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-paper/22">© 2026</span>
        </div>
      </div>
    </footer>
  );
}
