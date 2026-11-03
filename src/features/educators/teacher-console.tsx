import { ArrowUpRight, CircleAlert, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const learners = [
  { name: "Ada Nwosu", initials: "AN", progress: 94, state: "Complete", tone: "done" },
  { name: "Tunde Bello", initials: "TB", progress: 78, state: "Working", tone: "working" },
  { name: "Zara Kabir", initials: "ZK", progress: 46, state: "Stuck", tone: "stuck" },
  { name: "Chidi Obi", initials: "CO", progress: 88, state: "Working", tone: "working" },
];

export function TeacherConsole() {
  return (
    <div className="relative mx-auto w-full max-w-[500px]">
      <div className="absolute -inset-4 -z-10 rounded-[32px] bg-[radial-gradient(circle_at_60%_40%,rgba(255,90,31,0.22),transparent_65%)] blur-xl" />

      <div className="overflow-hidden rounded-[22px] border border-white/10 bg-paper-soft shadow-[0_35px_80px_-30px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between border-b border-ink/10 bg-paper px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-flare">
              <Sparkles className="h-3 w-3" />
            </span>
            <div>
              <p className="text-[10.5px] font-semibold leading-none text-ink">Class 11B</p>
              <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.11em] text-ink/35">
                Rates of reaction / practical 04
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-ink/10 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.1em] text-ink/40">
            <span className="h-1.5 w-1.5 rounded-full bg-flare" />
            Live
          </span>
        </div>

        <div className="px-4 pt-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Active", "24/28"],
              ["Class average", "82%"],
              ["Need help", "6"],
            ].map(([label, value], index) => (
              <div
                key={label}
                className={cn(
                  "rounded-xl border px-3 py-2.5",
                  index === 2 ? "border-flare/25 bg-flare-soft/60" : "border-ink/10 bg-white",
                )}
              >
                <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-ink/35">{label}</p>
                <p
                  className={cn(
                    "mt-1.5 font-display text-[19px] font-semibold leading-none tracking-[-0.04em]",
                    index === 2 ? "text-flare-deep" : "text-ink",
                  )}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-ink/10 bg-white">
            <div className="flex items-center justify-between border-b border-ink/8 px-3 py-2.5">
              <p className="text-[9.5px] font-semibold text-ink/70">Live progress</p>
              <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-ink/30">Auto refresh</p>
            </div>
            <div className="divide-y divide-ink/8">
              {learners.map((learner) => (
                <div key={learner.name} className="flex items-center gap-2.5 px-3 py-2.5">
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[7px] font-bold",
                      learner.tone === "stuck"
                        ? "bg-flare text-ink"
                        : "border border-ink/10 bg-paper text-ink/55",
                    )}
                  >
                    {learner.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-[9.5px] font-medium text-ink/70">{learner.name}</span>
                      <span
                        className={cn(
                          "shrink-0 font-mono text-[7px] uppercase tracking-[0.06em]",
                          learner.tone === "stuck" ? "text-flare-deep" : "text-ink/30",
                        )}
                      >
                        {learner.state}
                      </span>
                    </span>
                    <span className="mt-1.5 flex h-1 w-full overflow-hidden rounded-full bg-ink/8">
                      <span
                        className={cn(
                          "block h-full rounded-full",
                          learner.tone === "stuck" ? "bg-flare" : "bg-ink/45",
                        )}
                        style={{ width: `${learner.progress}%` }}
                      />
                    </span>
                  </span>
                  <span className="w-7 shrink-0 text-right font-mono text-[8px] text-ink/35">
                    {learner.progress}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-ink p-3 text-paper">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-flare text-ink">
              <Sparkles className="h-3 w-3" />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-flare/80">
                AI class insight
              </p>
              <p className="mt-1 text-[9.5px] leading-relaxed text-paper/65">
                Six learners paused at limiting reagents. A four minute recap is ready.
              </p>
            </div>
            <ArrowUpRight className="mt-1 h-3 w-3 shrink-0 text-paper/30" />
          </div>

          <div className="flex items-center gap-2 py-3">
            <CircleAlert className="h-3 w-3 text-ink/25" />
            <p className="font-mono text-[7px] uppercase tracking-[0.09em] text-ink/30">
              3 tutor answers waiting for teacher review
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
