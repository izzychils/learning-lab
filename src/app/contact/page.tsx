import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ContentPage, Section } from "@/components/site/content-page";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.company} about Learning Lab — a demo for your class, educator rollout or support.`,
};

export default function ContactPage() {
  return (
    <ContentPage
      eyebrow="Contact"
      title="Talk to the people who build the lab."
      intro="Tell us the subject, the level and how many learners you have in mind. That is usually enough to say whether Learning Lab fits a class, a department or a whole school."
    >
      <Section title="Email">
        <p>
          Write to{" "}
          <a
            className="font-semibold text-ink underline decoration-flare/40 underline-offset-2 hover:decoration-flare"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>{" "}
          and a person reads it. {site.companyLine}
        </p>
      </Section>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Email", value: site.email, href: `mailto:${site.email}` },
          { label: "Based in", value: site.location },
          { label: "We reply", value: "Within two working days" },
        ].map((item) => (
          <div key={item.label} className="rounded-[18px] border border-line bg-paper p-4">
            <p className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink/30">
              {item.label}
            </p>
            {item.href ? (
              <a
                href={item.href}
                className="mt-1.5 block text-[11px] font-semibold text-ink hover:underline"
              >
                {item.value}
              </a>
            ) : (
              <p className="mt-1.5 text-[11px] font-semibold text-ink">{item.value}</p>
            )}
          </div>
        ))}
      </div>

      <Section title="For educators and schools">
        <p>
          Include the subject, the curriculum or exam board, the year group and whether you need
          assignment tracking. If you are comparing options, the{" "}
          <Link
            href="/for-educators"
            className="font-semibold text-ink underline decoration-flare/40 underline-offset-2 hover:decoration-flare"
          >
            educator overview
          </Link>{" "}
          answers most of the first questions.
        </p>
      </Section>

      <Section title="Before you write">
        <p>
          This is a demo build: your work is stored in your browser and is never transmitted.
          Anything you send by email is read by {site.company} and handled as described in the{" "}
          <Link
            href="/legal/privacy"
            className="font-semibold text-ink underline decoration-flare/40 underline-offset-2 hover:decoration-flare"
          >
            privacy page
          </Link>
          .
        </p>
      </Section>
    </ContentPage>
  );
}
