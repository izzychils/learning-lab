import type { Metadata } from "next";
import { SimulationLibrary } from "@/features/dashboard/simulation-library";

export const metadata: Metadata = {
  title: "Simulations",
  description: "Browse Guided Learning Lab simulations across chemistry, biology, physics and medicine.",
};

export default function SimulationsPage() {
  return <SimulationLibrary />;
}
