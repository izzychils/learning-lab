import type { Metadata } from "next";
import { PracticeQuiz } from "@/features/dashboard/practice-quiz";

export const metadata: Metadata = {
  title: "Practice",
  description: "Five question practice sets with explanations and saved personal bests.",
};

export default function PracticePage() {
  return <PracticeQuiz />;
}
