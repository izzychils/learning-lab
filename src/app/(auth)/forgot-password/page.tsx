import type { Metadata } from "next";
import { ForgotForm } from "@/features/auth/forgot-form";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Recover access to your Learning Lab account.",
};

export default function ForgotPasswordPage() {
  return <ForgotForm />;
}
