import type { Metadata } from "next";
import { SignUpForm } from "@/features/auth/signup-form";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create your Learning Lab account and start exploring science simulations.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
