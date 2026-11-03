import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LabLogo } from "@/components/brand/logo";

export function DemoHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-paper/10 bg-[#0b0a08]/92 backdrop-blur-xl">
      <div className="shell flex h-[66px] items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <Link href="/" aria-label="Learning Lab home">
            <LabLogo tone="dark" />
          </Link>
          <span className="h-4 w-px bg-paper/12" />
          <Link
            href="/demo"
            className="text-[11.5px] font-medium text-paper/52 transition-colors hover:text-paper"
          >
            <span className="hidden sm:inline">All </span>Demos
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-[11.5px] font-medium text-paper/52 transition-colors hover:text-paper sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-flare px-3.5 text-[10.5px] font-bold text-ink transition-colors hover:bg-[#ff6d39]"
          >
            Start free
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
