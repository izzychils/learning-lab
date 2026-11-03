import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How the Learning Lab demo handles account details, notes and progress. Everything stays in your browser.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Your work stays in your browser."
      intro="Learning Lab is currently a frontend demo. It has no backend, no analytics service and no payment processor connected. This page explains exactly what that means for your data."
      updated="2 November 2026"
    >
      <section>
        <h2 className="text-[16px] font-bold tracking-[-0.025em] text-ink">
          What we store
        </h2>
        <p className="mt-2">
          The demo uses your browser's local storage to keep a small profile: the name and
          email you enter, your role, your setup preferences, simulation progress, quiz
          results and notebook entries. This information stays on the device you used.
        </p>
        <p className="mt-3">
          Nothing is sent to a Learning Lab server. There is no account database to look up
          and no email is delivered by the demo.
        </p>
      </section>

      <section>
        <h2 className="text-[16px] font-bold tracking-[-0.025em] text-ink">
          What we do not collect
        </h2>
        <ul className="mt-2 space-y-2">
          {[
            "No passwords are stored. The demo only keeps the signed-in profile.",
            "No analytics, advertising identifiers or tracking pixels are loaded.",
            "No payment details are requested or processed.",
            "No uploaded files are transmitted or stored.",
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
          Removing your data
        </h2>
        <p className="mt-2">
          Signing out removes the active session. To remove everything, clear the site data
          for this address in your browser settings. That will delete your demo profile,
          notes and progress from the device.
        </p>
      </section>

      <section>
        <h2 className="text-[16px] font-bold tracking-[-0.025em] text-ink">
          If the product changes
        </h2>
        <p className="mt-2">
          When an authenticated backend is connected, this page will explain what is stored
          on the server, why it is needed, how long it is kept and how to request deletion.
          The current browser-only build will be clearly marked until then.
        </p>
      </section>

      <section className="rounded-xl border border-line bg-paper-soft p-4">
        <p className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink/35">
          Demo note
        </p>
        <p className="mt-2 text-[10.5px] leading-relaxed text-ink/45">
          This privacy page is illustrative copy for a product prototype. It is not legal
          advice and should be reviewed before a production launch.
        </p>
      </section>
    </LegalPage>
  );
}
