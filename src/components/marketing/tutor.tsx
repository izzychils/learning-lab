import { BookOpenCheck, Eye, GitBranch, ShieldCheck } from "lucide-react";
import { TutorDemo } from "@/features/ai/tutor-demo";
import { Reveal } from "@/components/ui/reveal";

const principles = [
  {
    icon: Eye,
    title: "It sees the same model",
    copy: "Answers start from the molecule, apparatus or system on your screen, not a generic article.",
  },
  {
    icon: GitBranch,
    title: "It shows the reasoning",
    copy: "Equations, structures and cause and effect, laid out a step at a time.",
  },
  {
    icon: BookOpenCheck,
    title: "It stops at the evidence",
    copy: "No invented results. When the source library does not cover something, the tutor says so.",
  },
];

export function Tutor() {
  return (
    <section id="tutor" className="relative scroll-mt-24 overflow-hidden bg-paper py-20 sm:py-28">
      <div className="absolute inset-0 grid-paper opacity-35 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]" />
      <div className="absolute left-[-15%] top-1/3 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.1),transparent_68%)]" />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <span className="eyebrow text-ink/55">The AI layer</span>
            <h2 className="display mt-5 max-w-[560px] text-[clamp(2.5rem,4.6vw,4.15rem)] text-ink">
              A tutor that can see what you are{" "}
              <span className="serif text-flare">seeing.</span>
            </h2>
            <p className="mt-5 max-w-[480px] text-[14px] leading-[1.75] text-ink/58 sm:text-[15px]">
              Most AI tutors know the subject. This one knows the screen. Ask about the bond
              angle you are staring at, and the explanation begins there.
            </p>
          </Reveal>

          <div className="mt-9 space-y-5">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={80 + index * 60}>
                <div className="flex gap-3.5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-ink/10 bg-paper-soft text-flare">
                    <principle.icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="text-[12.5px] font-semibold text-ink">{principle.title}</h3>
                    <p className="mt-1 max-w-[370px] text-[11.5px] leading-relaxed text-ink/48">
                      {principle.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={260}>
            <div className="mt-8 flex max-w-[430px] items-start gap-3 rounded-xl border border-ink/10 bg-paper-soft p-3.5">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-flare" />
              <p className="text-[10.5px] leading-relaxed text-ink/50">
                <span className="font-semibold text-ink/75">Grounded by design.</span> Every
                explanation is linked to a source in the course library, and teachers can
                review any answer their class receives.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150} className="relative">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="mono-label text-ink/35">Live tutor / sample</span>
            <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/30">
              Click a question
            </span>
          </div>
          <TutorDemo />
          <p className="mt-3 px-1 text-right font-mono text-[8px] uppercase tracking-[0.1em] text-ink/25">
            Illustrative course context
          </p>
        </Reveal>
      </div>
    </section>
  );
}
