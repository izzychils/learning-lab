import type { Metadata } from "next";
import { Notebook } from "@/features/dashboard/notebook";

export const metadata: Metadata = {
  title: "Lab notebook",
  description: "A private working notebook for observations, sources and next questions.",
};

export default function NotebookPage() {
  return <Notebook />;
}
