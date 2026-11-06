import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ContentPage, Section } from "@/components/site/content-page";

export const metadata: Metadata = {
  title: "Products",
  description:
    "What Learning Lab includes: the simulation library, the AI tutor, guided practicals, the practice engine and the lab notebook.",
};

const products = [
  {
    name: "Simulation library",
    audience: "For learners",
    copy: "Run experiments that behave like the real thing: change a value, watch the system respond, and see the idea instead of memorising the diagram.",
    points: ["Browser-based", "Real parameters", "No download"],
  },
  {
    name: "AI tutor",
    audience: "For learners",
    copy: "Ask a question about the simulation on screen. The tutor reads the current state of the experiment, so the answer is about what you are looking at rather than a generic definition.",
    points: ["Reads the live state", "Explains, never grades", "Follow-up ready"],
  },
  {
    name: "Guided practicals",
    audience: "For classes",
    copy: "Structured practicals with steps, checkpoints and a record of completion, so a lesson survives a substitute teacher and a spotty connection.",
    points: ["Step checkpoints", "Progress saved", "Reset and retry"],
  },
  {
    name: "Practice and notebook",
    audience: "For revision",
    copy: "Practice questions with best-score tracking, and a lab notebook for observations, results and the write-up that follows the experiment.",
    points: ["Best-score tracking", "Notebook entries", "Assignment submission"],
  },
];

export default function ProductsPage() {
  return (
    <ContentPage
      eyebrow="Products"
      title="One workspace for the experiment, the question and the write-up."
      intro="Learning Lab is a single scientific workspace made of four parts that share the same state: what you set up in the simulation is what the tutor explains and what your notebook records."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {products.map((product) => (
          <div key={product.name} className="rounded-[18px] border border-line bg-paper p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-[14px] font-bold tracking-[-0.02em] text-ink">{product.name}</h2>
              <span className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink/35">
                {product.audience}
              </span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-ink/50">{product.copy}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {product.points.map((point) => (
                <li
                  key={point}
                  className="rounded-full border border-line bg-white px-2.5 py-1 text-[9.5px] text-ink/45"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Section title="Who Learning Lab serves">
        <p>
          Students learning science and engineering ideas that resist a static diagram, teachers who
          want a practical that works without a lab, and schools that need something that runs on the
          devices learners already have.
        </p>
      </Section>

      <Section title="For educators">
        <p>
          Classes, assignment setting and progress visibility sit alongside the learner workspace.
          The <Link href="/for-educators" className="font-semibold text-ink underline decoration-flare/40 underline-offset-2 hover:decoration-flare">educator overview</Link>{" "}
          covers how a practical is set, submitted and reviewed.
        </p>
      </Section>

      <p>
        <Link href="/demo" className="font-semibold text-ink underline decoration-flare/40 underline-offset-2 hover:decoration-flare">
          Open a demo
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="font-semibold text-ink underline decoration-flare/40 underline-offset-2 hover:decoration-flare">
          talk to {site.company}
        </Link>
        .
      </p>
    </ContentPage>
  );
}
