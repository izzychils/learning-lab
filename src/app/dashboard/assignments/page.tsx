import type { Metadata } from "next";
import { AssignmentList } from "@/features/dashboard/assignment-list";

export const metadata: Metadata = {
  title: "Assignments",
  description: "Every assigned practical, quiz, review and write up in one place.",
};

export default function AssignmentsPage() {
  return <AssignmentList />;
}
