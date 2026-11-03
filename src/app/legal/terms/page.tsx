import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The conditions for using the Learning Lab demo, including educational limits and acceptable use.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="A lab for learning, not a diagnosis."
      intro="Learning Lab is an educational simulation workspace. These terms describe the limits of the demo and the way the material should be used."
      updated="2 November 2026"
    >
      <section>
        <h2 className="text-[16px] font-bold tracking-[-0.025em] text-ink">
          Educational use only
        </h2>
        <p className="mt-2">
          Simulations, diagrams, readings and tutor explanations are simplified for learning.
          They are not a substitute for supervised laboratory work, clinical judgement,
          medical advice or professional training.
        </p>
        <p className="mt-3">
          Do not use the titration bench, anatomy explorer or any other demonstration to make
          a real-world safety, health or engineering decision.
        </p>
      </section>

      <section>
        <h2 className="text-[16px] font-bold tracking-[-0.025em] text-ink">
          Demo scope
        </h2>
        <p className="mt-2">
          This build is a frontend prototype. Accounts, progress and notes are local to your
          browser and can be cleared without notice. No payment is collected and no service
          level is promised.
        </p>
      </section>

      <section>
        <h2 className="text-[16px] font-bold tracking-[-0.025em] text-ink">
          Acceptable use
        </h2>
        <ul className="mt-2 space-y-2">
          {[
            "Use the lab for personal study, teaching or curriculum planning.",
            "Do not attempt to disrupt the site or access another person's browser data.",
            "Do not present generated text as a real experimental result or qualification.",
            "Check the source behind an answer before relying on it.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-flare" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-[16px] font-bold tracking-[-0.025em] text-ink">
          Accuracy and availability
        </h2>
        <p className="mt-2">
          The simulations are built from standard course models and reviewed demo content,
          but errors can still exist. The site is provided as is, without warranties of
          accuracy, availability or fitness for a particular purpose.
        </p>
      </section>

      <section className="rounded-xl border border-line bg-paper-soft p-4">
        <p className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink/35">
          Demo note
        </p>
        <p className="mt-2 text-[10.5px] leading-relaxed text-ink/45">
          These terms are illustrative copy for a product prototype. They are not legal
          advice and should be reviewed before a production launch.
        </p>
      </section>
    </LegalPage>
  );
}
