import { AnatomyExplorer } from "@/features/anatomy/anatomy-explorer";
import { Reveal } from "@/components/ui/reveal";

export function Anatomy() {
  return (
    <section id="anatomy" className="scroll-mt-24 bg-paper-soft py-20 sm:py-28">
      <div className="shell">
        <div className="grid gap-7 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <Reveal>
            <span className="eyebrow text-ink/55">Anatomy / Explore</span>
            <h2 className="display mt-5 max-w-[700px] text-[clamp(2.5rem,4.7vw,4.25rem)] text-ink">
              The body is a system of{" "}
              <span className="serif text-flare">systems.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-[430px] text-[14px] leading-[1.75] text-ink/55 lg:ml-auto">
              Not a poster with forty arrows. A map you can interrogate, one system at a
              time, with the structures and relationships that matter.
            </p>
          </Reveal>
        </div>

        <Reveal delay={140} className="mt-10">
          <AnatomyExplorer />
        </Reveal>
      </div>
    </section>
  );
}
