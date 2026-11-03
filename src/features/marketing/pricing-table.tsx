"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Explorer",
    tag: "Start here",
    monthly: 0,
    annual: 0,
    copy: "For one curious learner who wants to see the invisible first.",
    cta: "Start free",
    href: "/signup",
    features: [
      "All live 2D simulations",
      "The grounded AI tutor",
      "Practice questions and feedback",
      "Progress saved on this device",
    ],
    muted: ["Class assignments", "Teacher review queue"],
  },
  {
    name: "Scholar",
    tag: "Most chosen",
    monthly: 9,
    annual: 7,
    copy: "For a student who wants the full lab, the notebook and the plan.",
    cta: "Start a free trial",
    href: "/signup",
    features: [
      "Everything in Explorer",
      "The full practical library",
      "Unlimited notebook entries",
      "AI study planner and exam sets",
      "Early access to new simulations",
    ],
    muted: ["Teacher review queue"],
  },
  {
    name: "Department",
    tag: "For schools",
    monthly: null,
    annual: null,
    copy: "For a science department that wants one view of every class.",
    cta: "Talk to us",
    href: "/for-educators",
    features: [
      "Everything in Scholar",
      "Up to 30 learner seats",
      "Class assignment and progress",
      "Teacher review and approval",
      "Department reporting and onboarding",
    ],
    muted: [],
  },
];

const faqs = [
  {
    question: "Is there really a free plan?",
    answer:
      "Yes. Explorer keeps the live demos, practice questions and the tutor open. It is enough to run a lesson or try the lab before a school decides.",
  },
  {
    question: "Do AI answers cost extra?",
    answer:
      "No. The tutor is part of the plan. Every answer is grounded in the course library and shows its source, so you can check it rather than trusting it blindly.",
  },
  {
    question: "Can a school pay by invoice?",
    answer:
      "The Department plan is set up around a school purchase order and a named onboarding contact. This demo does not collect payment.",
  },
  {
    question: "What happens to the work we make?",
    answer:
      "This frontend build stores profiles, notes and progress in your browser only. The production workspace will move that work to an authenticated account once the backend is connected.",
  },
];

export function PricingTable() {
  const [annual, setAnnual] = useState(true);

  return (
    <div>
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="inline-flex rounded-full border border-line bg-white p-1">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            aria-pressed={!annual}
            className={cn(
              "h-8 rounded-full px-4 text-[10px] font-semibold transition-colors",
              !annual ? "bg-ink text-paper" : "text-ink/45 hover:text-ink",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            aria-pressed={annual}
            className={cn(
              "h-8 rounded-full px-4 text-[10px] font-semibold transition-colors",
              annual ? "bg-ink text-paper" : "text-ink/45 hover:text-ink",
            )}
          >
            Annual
            <span className="ml-1.5 rounded-full bg-flare-soft px-1.5 py-0.5 font-mono text-[7px] text-flare-deep">
              -20%
            </span>
          </button>
        </div>
        <p className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink/28">
          Demo pricing / no payment is collected
        </p>
      </div>

      <div className="mt-8 grid gap-3 lg:grid-cols-3">
        {tiers.map((tier) => {
          const price = annual ? tier.annual : tier.monthly;
          const highlighted = tier.name === "Scholar";
          return (
            <article
              key={tier.name}
              className={cn(
                "flex h-full flex-col rounded-[26px] border p-5 sm:p-6",
                highlighted
                  ? "border-flare bg-flare text-ink"
                  : "border-line bg-white text-ink",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className={cn(
                      "font-mono text-[8px] uppercase tracking-[0.13em]",
                      highlighted ? "text-ink/50" : "text-ink/35",
                    )}
                  >
                    {tier.tag}
                  </p>
                  <h2 className="mt-2 text-[23px] font-extrabold tracking-[-0.045em]">
                    {tier.name}
                  </h2>
                </div>
                {highlighted ? (
                  <span className="rounded-full bg-ink px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-flare">
                    Popular
                  </span>
                ) : null}
              </div>

              <p className={cn("mt-3 min-h-[48px] text-[10.5px] leading-relaxed", highlighted ? "text-ink/58" : "text-ink/45")}>
                {tier.copy}
              </p>

              <div className="mt-5 flex items-end gap-1.5">
                {price === null ? (
                  <p className="font-display text-[36px] font-extrabold leading-none tracking-[-0.055em]">
                    Custom
                  </p>
                ) : (
                  <>
                    <p className="font-display text-[44px] font-extrabold leading-none tracking-[-0.06em]">
                      ${price}
                    </p>
                    <span
                      className={cn(
                        "mb-1.5 text-[10px]",
                        highlighted ? "text-ink/45" : "text-ink/35",
                      )}
                    >
                      / learner / month
                    </span>
                  </>
                )}
              </div>
              <p
                className={cn(
                  "mt-1.5 font-mono text-[7px] uppercase tracking-[0.08em]",
                  highlighted ? "text-ink/40" : "text-ink/28",
                )}
              >
                {price === null ? "Annual school agreement" : annual ? "Billed annually" : "Billed monthly"}
              </p>

              <Link
                href={tier.href}
                className={cn(
                  "group mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full text-[11px] font-bold transition-colors",
                  highlighted
                    ? "bg-ink text-paper hover:bg-ink-soft"
                    : "border border-ink/15 bg-paper-soft text-ink hover:border-ink/35",
                )}
              >
                {tier.cta}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <div
                className={cn(
                  "mt-6 border-t pt-4",
                  highlighted ? "border-ink/15" : "border-line",
                )}
              >
                <p
                  className={cn(
                    "font-mono text-[7px] uppercase tracking-[0.1em]",
                    highlighted ? "text-ink/40" : "text-ink/30",
                  )}
                >
                  What is included
                </p>
                <ul className="mt-3 space-y-2.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[10px] leading-snug">
                      <Check
                        className={cn("mt-0.5 h-3 w-3 shrink-0", highlighted ? "text-ink" : "text-flare")}
                        strokeWidth={3}
                      />
                      <span className={highlighted ? "text-ink/70" : "text-ink/55"}>{feature}</span>
                    </li>
                  ))}
                  {tier.muted.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[10px] leading-snug opacity-45">
                      <Minus className="mt-0.5 h-3 w-3 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 grid gap-3 lg:grid-cols-2">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-line bg-white px-5 py-4 open:bg-paper-soft"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[12px] font-semibold text-ink">
              {faq.question}
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-ink/35 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 max-w-[560px] text-[10.5px] leading-relaxed text-ink/45">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
