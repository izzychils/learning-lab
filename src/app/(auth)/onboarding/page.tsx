import type { Metadata } from "next";
import { OnboardingFlow } from "@/features/auth/onboarding-flow";

export const metadata: Metadata = {
  title: "Set up your lab",
  description: "Choose your level, weekly pace and subjects to start Learning Lab.",
};

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
