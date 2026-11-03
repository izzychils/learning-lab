import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const quotes = [
  {
    quote:
      "My students used to memorise the 104.5 degree angle. Now they can explain it before I finish the question.",
    name: "Dr. Amaka Obi",
    role: "Head of Science, Cedar Grove College",
    initials: "AO",
  },
  {
    quote:
      "A practical that scales to 28 devices without losing the point. That is the part I did not think was possible.",
    name: "Samuel Adeniyi",
    role: "Chemistry teacher, Lagos",
    initials: "SA",
  },
  {
    quote:
      "I revise with the body map, then ask the tutor to quiz me. It finds the gaps I would have skipped.",
    name: "Farah Bello",
    role: "Medical foundation learner",
    initials: "FB",
  },
];

export function Proof() {
  return (
    <section className="bg-paper pb-20 pt-4 sm:pb-28 sm:pt-6">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-3 border-y border-ink/10 py-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="eyebrow text-ink/45">From the pilot lab</span>
            <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/28">
              Teachers and learners / first term
            </p>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-3 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <figure className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-[26px] bg-flare p-6 text-ink sm:p-8">
              <div className="dot-grid-dark absolute inset-0 opacity-30" />
              <Quote className="relative h-7 w-7 fill-ink/15 text-ink/15" />
              <blockquote className="relative mt-8 max-w-[560px] font-display text-[clamp(1.55rem,2.8vw,2.35rem)] font-medium leading-[1.18] tracking-[-0.04em]">
                “{quotes[0].quote}”
              </blockquote>
              <figcaption className="relative mt-9 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[9px] font-bold text-paper">
                  {quotes[0].initials}
                </span>
                <div>
                  <p className="text-[11.5px] font-semibold">{quotes[0].name}</p>
                  <p className="mt-0.5 font-mono text-[7.5px] uppercase tracking-[0.08em] text-ink/50">
                    {quotes[0].role}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {quotes.slice(1).map((item, index) => (
              <Reveal key={item.name} delay={80 + index * 60}>
                <figure className="flex h-full flex-col justify-between rounded-[22px] border border-ink/10 bg-paper-soft p-5 sm:p-6">
                  <blockquote className="text-[13px] leading-[1.65] text-ink/68">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-2.5 border-t border-ink/10 pt-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/10 bg-paper text-[7.5px] font-bold text-ink/55">
                      {item.initials}
                    </span>
                    <div>
                      <p className="text-[10.5px] font-semibold text-ink/75">{item.name}</p>
                      <p className="mt-0.5 text-[9px] text-ink/38">{item.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
