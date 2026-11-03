import type { Metadata } from "next";
import { PracticalGuide } from "@/features/dashboard/practical-guide";

export const metadata: Metadata = {
  title: "Guided practicals",
  description: "Step by step virtual practicals with saved progress and safety notes.",
};

export default function PracticalsPage() {
  return <PracticalGuide />;
}
