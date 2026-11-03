import { Check } from "lucide-react";
import { ArrowButton } from "@/components/ui/arrow-button";
import { LabMark } from "@/components/brand/logo";
import { Reveal } from "@/components/ui/reveal";

const notes = ["No downloads", "No lab coat", "Runs on a school laptop"];

export function Closing() {
  return (
    <section id="access" className="relative scroll-mt-20 overflow-hidden bg-flare text-ink">
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#12110e_1px,transparent_1px),linear-gradient(to_bottom,#12110e_1px,transparent_1px)] [background-size:56px_56px]" />

      <svg
        viewBox="0 0 700 700"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 top-1/2 hidden h-[720px] w-[720px] -translate-y-1/2 opacity-25 lg:block"
      >
        <circle cx="350" cy="350" r="86" stroke="#12110E" strokeWidth="1" />
        <circle cx="350" cy="350" r="146" stroke="#12110E" strokeOpacity="0.55" strokeDasharray="3 8" />
        <circle cx="350" cy="350" r="232" stroke="#12110E" strokeOpacity="0.35" strokeDasharray="2 10" />
        <ellipse cx="350" cy="350" rx="330" ry="124" stroke="#12110E" strokeOpacity="0.45" transform="rotate(24 350 350)" />
        <ellipse cx="350" cy="350" rx="330" ry="124" stroke="#12110E" strokeOpacity="0.3" transform="rotate(-42 350 350)" />
        <circle cx="350" cy="264" r="9" fill="#12110E" />
        <circle cx="350" cy="204" r="6" fill="#12110E" />
        <circle cx="563" cy="439" r="6" fill="#12110E" />
      </svg>

      <div className="shell relative py-20 sm:py-24 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Reveal>
              <span className="eyebrow text-ink/55">Start exploring</span>
              <h2 className="display mt-5 max-w-[680px] text-[clamp(3rem,6vw,5.5rem)]">
                The invisible is{" "}
                <span className="serif">waiting.</span>
              </h2>
              <p className="mt-5 max-w-[470px] text-[14px] leading-[1.7] text-ink/65 sm:text-[15px]">
                Open the molecular lab, switch a bond, then ask the tutor why it behaves that
                way. The first simulation takes about a minute.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ArrowButton href="/simulations" variant="ink">
                  Open a simulation
                </ArrowButton>
                <a
                  href="/for-educators"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-ink/25 px-5 text-[13px] font-semibold text-ink transition-colors hover:border-ink/60 hover:bg-ink/[0.05] sm:px-6"
                >
                  Bring your class
                </a>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5">
                {notes.map((note) => (
                  <span key={note} className="flex items-center gap-1.5 text-[10.5px] font-medium text-ink/55">
                    <Check className="h-3 w-3" strokeWidth={3} />
                    {note}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} className="relative hidden justify-center lg:flex">
            <div className="relative w-[330px] rotate-[-3deg] rounded-[22px] border border-ink/15 bg-paper p-5 shadow-[18px_22px_0_rgba(18,17,14,0.12)]">
              <div className="flex items-start justify-between border-b border-ink/10 pb-4">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-ink/40">
                    Learning Lab / pass
                  </p>
                  <p className="mt-2 font-display text-[23px] font-semibold leading-none tracking-[-0.05em]">
                    Admit one
                  </p>
                </div>
                <LabMark className="text-ink" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-ink/35">Access</p>
                  <p className="mt-1 text-[10.5px] font-semibold text-ink/75">All sciences</p>
                </div>
                <div>
                  <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-ink/35">Mode</p>
                  <p className="mt-1 text-[10.5px] font-semibold text-ink/75">Browser / 2D</p>
                </div>
                <div>
                  <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-ink/35">Valid</p>
                  <p className="mt-1 text-[10.5px] font-semibold text-ink/75">Any term</p>
                </div>
                <div>
                  <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-ink/35">Subject</p>
                  <p className="mt-1 text-[10.5px] font-semibold text-ink/75">Curious minds</p>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-3 border-t border-ink/10 pt-4">
                <div className="flex h-8 items-end gap-[3px]" aria-hidden="true">
                  {[2, 5, 3, 7, 2, 4, 6, 3, 5, 2, 7, 3, 4, 6, 2, 5, 3, 6, 2, 4].map((height, index) => (
                    <span key={index} className="w-[3px] bg-ink/70" style={{ height: `${height * 4}px` }} />
                  ))}
                </div>
                <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-ink/30">
                  LL / 2026 / 001
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
