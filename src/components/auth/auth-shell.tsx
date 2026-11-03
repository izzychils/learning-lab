import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { LabLogo } from "@/components/brand/logo";

const notes = [
  "40+ guided practicals",
  "An AI tutor with sources",
  "Nothing to install",
];

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <div className="grid min-h-screen lg:grid-cols-[1.02fr_0.98fr]">
        <div className="flex min-h-screen flex-col px-5 py-5 sm:px-8 lg:px-12 xl:px-16">
          <header className="flex items-center justify-between">
            <Link href="/" aria-label="Learning Lab home">
              <LabLogo />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink/45 transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to home
            </Link>
          </header>

          <main className="flex flex-1 items-center py-10 sm:py-14">
            <div className="mx-auto w-full max-w-[430px]">{children}</div>
          </main>

          <footer className="flex flex-col gap-2 border-t border-line pt-4 text-[10px] text-ink/35 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Learning Lab</span>
            <span className="font-mono uppercase tracking-[0.12em]">Demo access / no card</span>
          </footer>
        </div>

        <aside className="relative hidden overflow-hidden bg-[#0b0a08] lg:block">
          <div className="grid-dark absolute inset-0 opacity-55" />
          <div className="absolute -right-28 top-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.2),transparent_66%)]" />
          <div className="absolute bottom-[-180px] left-[-120px] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.12),transparent_68%)]" />

          <div className="relative flex h-full flex-col justify-between p-10 text-paper xl:p-14">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-paper/35">
                <span className="h-1.5 w-1.5 rounded-full bg-flare" />
                AI native science lab
              </span>
              <Link
                href="/demo"
                className="group inline-flex items-center gap-1.5 text-[11px] font-semibold text-paper/50 transition-colors hover:text-paper"
              >
                Try a demo
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="my-10">
              <p className="max-w-[520px] text-[clamp(2.6rem,4.1vw,4.2rem)] font-extrabold leading-[0.98] tracking-[-0.055em]">
                Make the
                <br />
                <span className="text-flare">invisible</span>
                <br />
                visible.
              </p>
              <p className="mt-6 max-w-[390px] text-[13.5px] leading-[1.75] text-paper/48">
                A scientific workspace for the ideas that diagrams never quite explain.
                Explore, test, then ask why.
              </p>
            </div>

            <div className="relative mb-8 rounded-[24px] border border-paper/12 bg-paper/[0.035] p-3.5 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-paper/10 px-2 pb-3">
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-paper/35">
                  Live model / water
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-flare">
                  <span className="h-1.5 w-1.5 rounded-full bg-flare" />
                  2D
                </span>
              </div>
              <div className="flex items-center gap-5 px-2 pt-3">
                <svg viewBox="0 0 160 120" fill="none" aria-hidden="true" className="h-[106px] w-[140px] shrink-0">
                  <circle cx="80" cy="65" r="42" fill="none" stroke="#F4F1E9" strokeOpacity="0.09" strokeDasharray="2 6" />
                  <path d="M80 65 50 38M80 65l30-27" stroke="#F4F1E9" strokeOpacity="0.3" />
                  <circle cx="80" cy="66" r="16" fill="#FF5A1F" />
                  <text x="80" y="70" textAnchor="middle" fill="#12110E" fontSize="9" fontWeight="700" fontFamily="monospace">O</text>
                  <circle cx="49" cy="37" r="9" fill="#F4F1E9" />
                  <text x="49" y="40" textAnchor="middle" fill="#12110E" fontSize="6" fontWeight="700" fontFamily="monospace">H</text>
                  <circle cx="111" cy="37" r="9" fill="#F4F1E9" />
                  <text x="111" y="40" textAnchor="middle" fill="#12110E" fontSize="6" fontWeight="700" fontFamily="monospace">H</text>
                </svg>
                <div className="min-w-0 flex-1 space-y-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] text-paper/38">Bond angle</span>
                    <span className="text-[10.5px] font-semibold text-paper/70">104.5°</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] text-paper/38">Polarity</span>
                    <span className="text-[10.5px] font-semibold text-paper/70">Polar</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] text-paper/38">Molar mass</span>
                    <span className="text-[10.5px] font-semibold text-paper/70">18.02 g/mol</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-paper/10 pt-5">
              {notes.map((note) => (
                <span key={note} className="flex items-center gap-1.5 text-[10px] text-paper/38">
                  <Check className="h-2.5 w-2.5 text-flare" strokeWidth={3} />
                  {note}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

