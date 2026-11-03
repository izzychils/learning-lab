import type { Metadata } from "next";
import { Atom } from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { PeriodicTable } from "@/features/reference/periodic-table";

export const metadata: Metadata = {
  title: "Periodic table",
  description: "Search and compare the core 36 elements, with a profile for every one.",
};

export default function DashboardPeriodicTablePage() {
  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Reference / Chemistry"
        title="The table, open beside the model."
        description="Search by name or symbol, filter a family and open the profile for any element in periods one to four."
        action={
          <span className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/40">
            <Atom className="h-3 w-3 text-flare" />
            36 elements / 2D
          </span>
        }
      />
      <PeriodicTable molecularHref="/dashboard/simulations/molecular-lab" />
    </div>
  );
}
