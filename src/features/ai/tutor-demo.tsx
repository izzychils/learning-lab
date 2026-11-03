"use client";

import { useEffect, useRef, useState } from "react";
import {
  Atom,
  BadgeCheck,
  BookOpen,
  ChevronRight,
  MoreHorizontal,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TutorAnswer = {
  question: string;
  shortLabel: string;
  context: string;
  paragraphs: string[];
  equation?: string;
  fact?: string;
  source: string;
};

const answers: TutorAnswer[] = [
  {
    question: "Why does sodium react so violently with water?",
    shortLabel: "Sodium + water",
    context: "Na + H₂O / electron transfer",
    paragraphs: [
      "Sodium has one electron in its outer shell. Water's oxygen has room to take it, and the transfer is strongly favourable.",
      "That transfer produces sodium ions, hydroxide ions and hydrogen gas. The reaction also releases a lot of heat, which can ignite the hydrogen.",
    ],
    equation: "2Na + 2H₂O → 2NaOH + H₂",
    fact: "One valence electron. A very willing donor.",
    source: "Reactivity series, lesson 2.4",
  },
  {
    question: "Explain the 104.5° angle in water.",
    shortLabel: "Water angle",
    context: "H₂O / bent geometry",
    paragraphs: [
      "Oxygen has two bonding pairs and two lone pairs. Lone pairs need more room, so they push the O-H bonds closer together than the tetrahedral 109.5°.",
      "The result is a bent molecule with an angle of about 104.5°. Shape matters here because it makes water polar.",
    ],
    equation: "H₂O / two lone pairs → bent geometry",
    fact: "Lone pair repulsion bends the molecule.",
    source: "Chemical bonding, lesson 4.2",
  },
  {
    question: "Quiz me on covalent bonds.",
    shortLabel: "Covalent quiz",
    context: "Covalent bonding / quiz",
    paragraphs: [
      "Start with the definition: a covalent bond forms when two atoms share a pair of electrons.",
      "Which of these is a covalent bond? A. Na⁺ and Cl⁻, B. H and H, C. Fe and Fe²⁺. Answer with a reason, not just a letter.",
    ],
    fact: "Question set 03 / one correct answer",
    source: "Covalent bonding, lesson 1.1",
  },
];

export function TutorDemo() {
  const [selected, setSelected] = useState(0);
  const [thinking, setThinking] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = answers[selected];

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const choose = (index: number) => {
    if (index === selected && !thinking) return;
    if (timer.current) clearTimeout(timer.current);
    setSelected(index);
    setThinking(true);
    timer.current = setTimeout(() => setThinking(false), 680);
  };

  return (
    <div className="relative">
      <div className="absolute -inset-3 -z-10 rounded-[30px] bg-flare/[0.06] blur-xl" />
      <div className="overflow-hidden rounded-[24px] border border-ink/12 bg-paper-soft shadow-[0_24px_60px_-38px_rgba(18,17,14,0.5)]">
        <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-ink text-flare">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-paper-soft bg-flare" />
            </span>
            <div>
              <p className="text-[11.5px] font-semibold leading-none text-ink">Lab tutor</p>
              <p className="mt-1 font-mono text-[7.5px] uppercase tracking-[0.12em] text-ink/35">
                Grounded in your course
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-ink/10 px-2.5 py-1 font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink/38 sm:flex">
              <BadgeCheck className="h-2.5 w-2.5 text-flare" />
              Teacher reviewed
            </span>
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-ink/10 text-ink/35"
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        <div className="border-b border-ink/10 bg-paper px-4 py-2.5 sm:px-5">
          <div className="flex items-center gap-2">
            <Atom className="h-3 w-3 text-flare" />
            <span className="font-mono text-[7.5px] uppercase tracking-[0.12em] text-ink/38">
              Viewing context
            </span>
            <span className="ml-auto rounded-md border border-ink/10 bg-paper-soft px-2 py-1 font-mono text-[8px] text-ink/55">
              {active.context}
            </span>
          </div>
        </div>

        <div className="min-h-[330px] px-4 py-5 sm:min-h-[350px] sm:px-5">
          <div className="flex items-start justify-end">
            <div className="max-w-[84%] rounded-[14px] rounded-br-[4px] bg-ink px-3.5 py-2.5 text-[11px] leading-relaxed text-paper/88">
              {active.question}
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2.5">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-flare text-ink">
              <Sparkles className="h-3 w-3" />
            </span>
            <div className="min-w-0 flex-1" aria-live="polite" aria-busy={thinking}>
              {thinking ? (
                <div className="inline-flex h-9 items-center gap-1.5 rounded-[14px] rounded-tl-[4px] border border-ink/10 bg-white px-3.5">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/30"
                      style={{ animationDelay: `${dot * 120}ms`, animationDuration: "900ms" }}
                    />
                  ))}
                  <span className="ml-1 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/30">
                    Reading the model
                  </span>
                </div>
              ) : (
                <div key={selected} className="answer-in">
                  <div className="rounded-[14px] rounded-tl-[4px] border border-ink/10 bg-white px-3.5 py-3">
                    <div className="space-y-2.5">
                      {active.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-[11px] leading-[1.7] text-ink/70">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {active.equation ? (
                      <div className="mt-3 rounded-lg border border-flare/20 bg-flare-soft/60 px-3 py-2 font-mono text-[9.5px] text-ink/75">
                        {active.equation}
                      </div>
                    ) : null}

                    {active.fact ? (
                      <p className="mt-2.5 flex items-center gap-1.5 border-t border-ink/8 pt-2.5 font-mono text-[8px] uppercase tracking-[0.08em] text-ink/38">
                        <span className="h-1 w-1 rounded-full bg-flare" />
                        {active.fact}
                      </p>
                    ) : null}
                  </div>

                  <p className="mt-2 flex items-center gap-1.5 pl-1 font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink/30">
                    <BookOpen className="h-2.5 w-2.5" />
                    Source: {active.source}
                    <span className="ml-auto flex items-center gap-1 text-ink/25">
                      <ShieldCheck className="h-2.5 w-2.5" />
                      Checked
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-ink/10 bg-paper px-3 py-3 sm:px-4">
          <p className="px-1 font-mono text-[7.5px] uppercase tracking-[0.12em] text-ink/32">
            Try asking
          </p>
          <div className="mt-2 space-y-1">
            {answers.map((answer, index) => (
              <button
                key={answer.question}
                type="button"
                onClick={() => choose(index)}
                aria-pressed={index === selected}
                className={cn(
                  "group flex w-full items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition-colors",
                  index === selected
                    ? "border-flare/30 bg-flare-soft/55"
                    : "border-transparent hover:border-ink/10 hover:bg-paper-soft",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full",
                    index === selected ? "bg-flare" : "bg-ink/18",
                  )}
                />
                <span className="min-w-0 flex-1 truncate text-[10px] font-medium text-ink/68">
                  {answer.question}
                </span>
                <ChevronRight className="h-3 w-3 shrink-0 text-ink/20 transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
