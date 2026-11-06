import { ArrowDown, Check, Play } from "lucide-react";
import { ArrowButton } from "@/components/ui/arrow-button";
import { AtomConsole } from "@/components/marketing/atom-console";

const promises = ["Runs in your browser", "Curriculum aligned", "Teacher reviewed"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#0b0a08] text-paper">
      <div className="grid-dark absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <div className="absolute -right-52 top-[-260px] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.2),transparent_64%)]" />
      <div className="absolute left-[-280px] top-[380px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.08),transparent_70%)]" />

      <svg
        viewBox="0 0 800 800"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 top-36 hidden h-[780px] w-[780px] opacity-70 xl:block"
      >
        <circle cx="400" cy="400" r="270" stroke="#F4F1E9" strokeOpacity="0.06" />
        <circle cx="400" cy="400" r="340" stroke="#FF5A1F" strokeOpacity="0.1" strokeDasharray="2 12" />
        <ellipse cx="400" cy="400" rx="380" ry="140" stroke="#F4F1E9" strokeOpacity="0.05" transform="rotate(24 400 400)" />
        <ellipse cx="400" cy="400" rx="380" ry="140" stroke="#F4F1E9" strokeOpacity="0.045" transform="rotate(-42 400 400)" />
        <circle cx="647" cy="264" r="4" fill="#FF5A1F" />
        <circle cx="204" cy="556" r="3" fill="#F4F1E9" fillOpacity="0.4" />
      </svg>

      <div className="shell relative pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-16">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-9 xl:gap-14">
          <div className="relative z-10">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow text-paper/50">AI native science lab</span>
                <span className="hidden h-3 w-px bg-paper/15 sm:block" />
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper/32">
                  Chemistry · Biology · Physics · Medicine
                </span>
              </div>
            </div>

            <div>
              <h1 className="display mt-7 text-[clamp(3.35rem,6.9vw,6.05rem)] text-paper">
                <span className="block">Make the</span>
                <span className="block text-flare">invisible</span>
                <span className="block">visible.</span>
              </h1>
            </div>

            <div>
              <p className="mt-7 max-w-[510px] text-[15px] leading-[1.75] text-paper/58 sm:text-[16.5px]">
                Learning Lab turns the science you cannot hold into something you can move,
                test and understand. Explore molecules, run a practical, then ask the tutor
                why it happened.
              </p>
            </div>

            <div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ArrowButton href="/demo/molecular-lab" variant="flare">
                  Open the molecular lab
                </ArrowButton>
                <a
                  href="/platform"
                  className="group inline-flex h-12 items-center gap-2.5 rounded-full px-4 text-[13px] font-semibold text-paper/70 transition-colors hover:text-paper sm:px-5"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/20 bg-paper/[0.03] transition-colors group-hover:border-paper/40">
                    <Play className="ml-0.5 h-3 w-3 fill-current" />
                  </span>
                  See how it works
                </a>
              </div>
            </div>

            <div>
              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-paper/10 pt-5">
                {promises.map((item) => (
                  <span key={item} className="flex items-center gap-1.5 text-[11px] font-medium text-paper/45">
                    <Check className="h-3 w-3 text-flare" strokeWidth={2.8} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="animate-float-slow">
              <AtomConsole />
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-paper/10 pt-4 sm:mt-16">
          <a
            href="/platform"
            className="group flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/34 transition-colors hover:text-paper/70"
          >
            <ArrowDown className="h-3 w-3 transition-transform duration-300 group-hover:translate-y-0.5" />
            Scroll to explore the lab
          </a>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-paper/24 sm:block">
            01 / 07
          </p>
        </div>
      </div>
    </section>
  );
}
