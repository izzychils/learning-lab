import { ClipboardCheck, Radar, ShieldCheck } from "lucide-react";
import { ArrowButton } from "@/components/ui/arrow-button";
import { TeacherConsole } from "@/features/educators/teacher-console";
import { Reveal } from "@/components/ui/reveal";

const tools = [
  {
    icon: ClipboardCheck,
    title: "Assign from the library",
    copy: "Pick a practical, set a due date and send it to one class or the whole department.",
  },
  {
    icon: Radar,
    title: "See who is actually moving",
    copy: "Live progress and stuck points, without leaving your own screen.",
  },
  {
    icon: ShieldCheck,
    title: "Keep the final say",
    copy: "Review explanations and results before they count. The AI assists, it does not grade alone.",
  },
];

export function Educators() {
  return (
    <section id="educators" className="scroll-mt-24 bg-paper py-20 sm:py-24">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[32px] bg-ink text-paper">
          <div className="grid-dark absolute inset-0 opacity-50 [mask-image:linear-gradient(115deg,black,transparent_70%)]" />
          <div className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.15),transparent_66%)]" />

          <div className="relative grid gap-14 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12 lg:px-12 lg:py-16">
            <div>
              <Reveal>
                <span className="eyebrow text-paper/45">For educators</span>
                <h2 className="display mt-5 max-w-[500px] text-[clamp(2.3rem,4.2vw,3.8rem)] text-paper">
                  Set the practical. See the room{" "}
                  <span className="serif text-flare">get it.</span>
                </h2>
                <p className="mt-5 max-w-[455px] text-[13.5px] leading-[1.75] text-paper/48">
                  Give every learner a bench, keep the whole class in view and step in where
                  the understanding breaks down.
                </p>
              </Reveal>

              <div className="mt-8 space-y-5">
                {tools.map((tool, index) => (
                  <Reveal key={tool.title} delay={80 + index * 60}>
                    <div className="flex gap-3.5">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-paper/12 text-flare">
                        <tool.icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </span>
                      <div>
                        <h3 className="text-[12.5px] font-semibold text-paper/85">{tool.title}</h3>
                        <p className="mt-1 max-w-[360px] text-[11.5px] leading-relaxed text-paper/42">
                          {tool.copy}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={280}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <ArrowButton href="#access" variant="flare">
                    Bring your class
                  </ArrowButton>
                  <p className="font-mono text-[8px] uppercase tracking-[0.11em] text-paper/28">
                    Teacher review built in
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={180}>
              <TeacherConsole />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
