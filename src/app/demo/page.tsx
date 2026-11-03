import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Atom,
  Check,
  ClipboardList,
  HeartPulse,
  Sparkles,
  Table2,
  TestTubes,
} from "lucide-react";
import { DemoHeader } from "@/components/site/demo-header";
import { DemoFooter } from "@/components/site/demo-footer";

export const metadata: Metadata = {
  title: "Demo lab",
  description:
    "Try Learning Lab interactively. Explore molecular structures, body systems, titration, the periodic table and the grounded AI tutor without creating an account.",
};

const demos = [
  {
    href: "/demo/molecular-lab",
    number: "01",
    label: "Chemistry",
    title: "Molecular lab",
    copy: "Switch between water, methane, carbon dioxide and ammonia. Watch shape, polarity and explanation move together.",
    time: "Interactive / 2D",
    icon: Atom,
    visual: "molecule" as const,
  },
  {
    href: "/demo/anatomy",
    number: "02",
    label: "Medicine",
    title: "Body systems",
    copy: "Move through four systems on a schematic body map, from the brain to the stomach, with the context attached.",
    time: "Interactive / 2D",
    icon: HeartPulse,
    visual: "body" as const,
  },
  {
    href: "/demo/ai-tutor",
    number: "03",
    label: "AI tutor",
    title: "Ask why, not just what.",
    copy: "Pick a question about the model on screen. Read the reasoning, the equation and the source behind it.",
    time: "Interactive / grounded",
    icon: Sparkles,
    visual: "chat" as const,
  },
  {
    href: "/demo/titration",
    number: "04",
    label: "Chemistry",
    title: "Titration bench",
    copy: "Move the burette, follow the pH curve and stop just past equivalence. The indicator reacts in real time.",
    time: "Interactive / practical",
    icon: TestTubes,
    visual: "titration" as const,
  },
  {
    href: "/demo/periodic-table",
    number: "05",
    label: "Reference",
    title: "Periodic table",
    copy: "Search 36 elements, filter by family and open a profile that connects the atom to a real use.",
    time: "Interactive / reference",
    icon: Table2,
    visual: "table" as const,
  },
];

export default function DemoHubPage() {
  return (
    <div className="min-h-screen bg-paper">
      <DemoHeader />
      <main>
        <section className="relative overflow-hidden bg-[#0b0a08] pb-16 pt-12 text-paper sm:pb-20 sm:pt-16">
          <div className="grid-dark absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
          <div className="absolute right-[-10%] top-[-300px] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.18),transparent_68%)]" />
          <div className="shell relative">
            <span className="eyebrow text-paper/45">Public demo lab</span>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
              <h1 className="display max-w-[800px] text-[clamp(2.8rem,6vw,5rem)] text-paper">
                Science, without the{" "}
                <span className="text-flare">sign-up wall.</span>
              </h1>
              <p className="max-w-[390px] text-[13px] leading-[1.75] text-paper/48 lg:ml-auto">
                Five working demos from the Learning Lab workspace. Move a model, run a
                practical and see how the explanation stays tied to the science.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-paper/10 pt-4">
              {["No account needed", "Runs in your browser", "Teacher reviewed"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-[10px] text-paper/38">
                  <Check className="h-2.5 w-2.5 text-flare" strokeWidth={3} />
                  {item}
                </span>
              ))}
              <span className="ml-auto hidden font-mono text-[8px] uppercase tracking-[0.12em] text-paper/25 sm:block">
                05 demos / 2D
              </span>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="shell grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {demos.map((demo) => {
              const Icon = demo.icon;
              return (
                <Link
                  key={demo.href}
                  href={demo.href}
                  className="group relative flex flex-col overflow-hidden rounded-[24px] border border-line bg-white p-2 transition-colors hover:border-ink/25"
                >
                  <div className="relative h-[190px] overflow-hidden rounded-[18px] bg-ink">
                    <div className="dot-grid absolute inset-0 opacity-40" />
                    <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_62%_45%,rgba(255,90,31,0.16),transparent_70%)]" />
                    <span className="absolute left-4 top-3 font-mono text-[8px] uppercase tracking-[0.14em] text-paper/28">
                      Fig. {demo.number}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DemoVisual kind={demo.visual} />
                    </div>
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-flare text-ink">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-paper/40">
                        {demo.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-[20px] font-extrabold leading-tight tracking-[-0.04em] text-ink">
                        {demo.title}
                      </h2>
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-ink/30 transition-all group-hover:border-flare group-hover:bg-flare group-hover:text-ink">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-ink/45">{demo.copy}</p>
                    <p className="mt-5 border-t border-line pt-3 font-mono text-[7.5px] uppercase tracking-[0.09em] text-ink/30">
                      {demo.time}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="pb-14">
          <div className="shell">
            <div className="relative overflow-hidden rounded-[24px] bg-flare px-5 py-7 text-ink sm:px-8 sm:py-8">
              <div className="dot-grid-dark absolute inset-0 opacity-25" />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-flare">
                    <ClipboardList className="h-4 w-4" />
                  </span>
                  <div>
                    <h2 className="text-[21px] font-extrabold leading-tight tracking-[-0.04em]">
                      Want the full workspace?
                    </h2>
                    <p className="mt-1 max-w-[470px] text-[11.5px] leading-relaxed text-ink/58">
                      Keep your progress, collect sessions and see your class in one place.
                      The demo account opens everything without a backend.
                    </p>
                  </div>
                </div>
                <Link
                  href="/signup"
                  className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 text-[11.5px] font-bold text-paper transition-colors hover:bg-ink-soft"
                >
                  Create a free account
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <DemoFooter />
    </div>
  );
}

function DemoVisual({ kind }: { kind: "molecule" | "body" | "chat" | "titration" | "table" }) {
  if (kind === "molecule") {
    return (
      <svg viewBox="0 0 260 170" fill="none" aria-hidden="true" className="h-[150px] w-[230px]">
        <circle cx="130" cy="85" r="58" stroke="#F4F1E9" strokeOpacity="0.08" strokeDasharray="2 6" />
        <path d="M130 85 92 54M130 85l38-31M130 85v47" stroke="#F4F1E9" strokeOpacity="0.25" />
        <circle cx="130" cy="86" r="19" fill="#FF5A1F" />
        <text x="130" y="90" textAnchor="middle" fill="#12110E" fontSize="10" fontWeight="700" fontFamily="monospace">C</text>
        <circle cx="91" cy="53" r="11" fill="#F4F1E9" />
        <text x="91" y="57" textAnchor="middle" fill="#12110E" fontSize="7" fontWeight="700" fontFamily="monospace">H</text>
        <circle cx="169" cy="53" r="11" fill="#F4F1E9" />
        <text x="169" y="57" textAnchor="middle" fill="#12110E" fontSize="7" fontWeight="700" fontFamily="monospace">H</text>
        <circle cx="130" cy="134" r="11" fill="#F4F1E9" />
        <text x="130" y="138" textAnchor="middle" fill="#12110E" fontSize="7" fontWeight="700" fontFamily="monospace">H</text>
        <circle cx="158" cy="92" r="2.5" fill="#FF5A1F" />
      </svg>
    );
  }

  if (kind === "body") {
    return (
      <svg viewBox="0 0 180 190" fill="none" aria-hidden="true" className="h-[165px] w-[160px]">
        <circle cx="90" cy="33" r="19" stroke="#F4F1E9" strokeOpacity="0.22" />
        <path d="M76 55c-16 5-25 18-27 36l-4 36M104 55c16 5 25 18 27 36l4 36M70 65 61 118M110 65l9 53M75 64l-6 86M105 64l6 86" stroke="#F4F1E9" strokeOpacity="0.18" strokeLinecap="round" />
        <path d="M75 56h30l10 24-7 55H72l-7-55 10-24Z" stroke="#F4F1E9" strokeOpacity="0.24" />
        <path d="M91 91c-6-6-15-1-13 7 1 6 7 13 13 20 6-7 12-14 13-20 2-8-7-13-13-7Z" fill="#FF5A1F" />
        <circle cx="90" cy="99" r="28" stroke="#FF5A1F" strokeOpacity="0.25" strokeDasharray="2 5" />
      </svg>
    );
  }

  if (kind === "titration") {
    return (
      <svg viewBox="0 0 260 170" fill="none" aria-hidden="true" className="h-[155px] w-[235px]">
        <rect x="62" y="16" width="20" height="88" rx="4" stroke="#F4F1E9" strokeOpacity="0.2" />
        <rect x="66" y="20" width="12" height="54" rx="2" fill="#FF5A1F" fillOpacity="0.28" />
        {[0, 1, 2, 3, 4].map((index) => (
          <line key={index} x1="76" y1={30 + index * 13} x2="82" y2={30 + index * 13} stroke="#F4F1E9" strokeOpacity="0.22" />
        ))}
        <path d="M62 104h20l-4 7H66z" fill="#F4F1E9" fillOpacity="0.16" />
        <path d="M72 111v9" stroke="#FF5A1F" strokeWidth="1.2" strokeDasharray="2 3" />
        <path d="M57 145l10-13h10l10 13c2 3 0 5-3 5H60c-3 0-5-2-3-5z" fill="#FF5A1F" fillOpacity="0.24" stroke="#FF5A1F" strokeOpacity="0.48" />
        <path d="M136 42v108" stroke="#F4F1E9" strokeOpacity="0.1" />
        <path d="M140 128c18-1 31-8 38-25 8-18 11-34 29-49" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" />
        <circle cx="207" cy="54" r="3.5" fill="#FF5A1F" stroke="#0B0A08" strokeWidth="1.5" />
        <text x="139" y="49" fill="#F4F1E9" fillOpacity="0.34" fontFamily="monospace" fontSize="7">pH 12</text>
        <text x="139" y="151" fill="#F4F1E9" fillOpacity="0.26" fontFamily="monospace" fontSize="6">25 mL ADDED</text>
        <text x="44" y="162" fill="#F4F1E9" fillOpacity="0.28" fontFamily="monospace" fontSize="6">NaOH</text>
      </svg>
    );
  }

  if (kind === "table") {
    return (
      <div className="grid w-[220px] grid-cols-6 gap-1">
        {Array.from({ length: 24 }, (_, index) => {
          const tones = [
            "bg-flare",
            "bg-[#ffb08d]",
            "bg-[#ffd9c7]",
            "bg-paper/20",
            "bg-paper/10",
            "bg-paper/5",
          ];
          const filled = index !== 3 && index !== 9 && index !== 16 && index !== 21;
          return (
            <span
              key={index}
              className={
                filled
                  ? `flex aspect-square items-center justify-center rounded-[3px] ${tones[index % tones.length]}`
                  : "aspect-square rounded-[3px] border border-paper/10"
              }
            >
              {filled ? (
                <span className="font-mono text-[5px] font-bold text-ink/60">
                  {["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg"][index % 12]}
                </span>
              ) : null}
            </span>
          );
        })}
        <span className="col-span-6 mt-2 flex items-center justify-between font-mono text-[6px] text-paper/25">
          <span>CORE 36</span>
          <span>FAMILY COLOURS</span>
        </span>
      </div>
    );
  }

  return (
    <div className="w-[215px] space-y-2">
      <div className="ml-auto w-fit max-w-[180px] rounded-[12px] rounded-br-[3px] bg-flare px-3 py-2.5 text-[9px] font-semibold leading-snug text-ink">
        Why is water bent?
      </div>
      <div className="w-fit max-w-[195px] rounded-[12px] rounded-bl-[3px] border border-paper/12 bg-paper/[0.05] px-3 py-2.5 text-[9px] leading-snug text-paper/65">
        Oxygen has two lone pairs. They push the bonds closer together.
      </div>
      <div className="ml-1 flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.08em] text-paper/25">
        <span className="h-1 w-1 rounded-full bg-flare" />
        Source attached
      </div>
    </div>
  );
}
