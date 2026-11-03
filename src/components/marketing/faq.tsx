import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const questions = [
  {
    question: "Is this meant to replace the physical practical?",
    answer:
      "No. Learning Lab prepares learners for the bench and extends the lesson afterwards. A simulation can show the invisible parts, let a student repeat a step without wasting reagents and make a dangerous reaction safe to inspect. It does not replace handling real apparatus.",
  },
  {
    question: "Which sciences are covered right now?",
    answer:
      "Chemistry, biology, physics and anatomy. The current visual models are 2D and deliberately clear: molecular structures, cells, forces, waves and body systems. More guided practicals are added to the library over time.",
  },
  {
    question: "Can the AI make things up?",
    answer:
      "The tutor is designed to work from the course library and to show the source behind an answer. When the library does not cover something, it should say so instead of inventing a result. Teachers can also review the explanations learners receive.",
  },
  {
    question: "Will it run on school laptops and tablets?",
    answer:
      "Yes, if they run a current version of Chrome, Safari, Edge or Firefox. There is nothing to install and no dedicated graphics card required. The simulations are built to stay clear on a modest screen.",
  },
  {
    question: "Can teachers assign work and see progress?",
    answer:
      "Teachers can assign a practical to a class, watch live progress, spot learners who are stuck and review AI explanations before results are finalised. The teacher view is shown in the classroom section above.",
  },
  {
    question: "How do we try it with a class?",
    answer:
      "Start with the simulations on this page, then use the classroom walkthrough link. A pilot can begin with one practical and one class before the rest of the department joins.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-paper-soft py-20 sm:py-28">
      <div className="shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <Reveal>
          <span className="eyebrow text-ink/50">Questions</span>
          <h2 className="display mt-5 max-w-[420px] text-[clamp(2.3rem,4.2vw,3.8rem)] text-ink">
            Worth asking{" "}
            <span className="serif text-flare">before class.</span>
          </h2>
          <p className="mt-5 max-w-[330px] text-[13px] leading-relaxed text-ink/48">
            The short answers. If your question is about a specific curriculum or device,
            bring it to the walkthrough.
          </p>
          <a
            href="#access"
            className="mt-7 inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-[11.5px] font-semibold text-ink transition-colors hover:border-flare hover:text-flare-deep"
          >
            Ask us in a walkthrough
          </a>
        </Reveal>

        <Reveal delay={100}>
          <div className="border-t border-ink/12">
            {questions.map((item) => (
              <details key={item.question} className="group border-b border-ink/12">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[13.5px] font-semibold leading-snug text-ink/78 transition-colors hover:text-ink [&::-webkit-details-marker]:hidden sm:text-[14px]">
                  {item.question}
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/45 transition-transform duration-300 group-open:rotate-45 group-open:border-flare group-open:text-flare">
                    <Plus className="h-3 w-3" />
                  </span>
                </summary>
                <p className="max-w-[620px] pb-6 pr-8 text-[12px] leading-[1.75] text-ink/50 sm:text-[12.5px]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
