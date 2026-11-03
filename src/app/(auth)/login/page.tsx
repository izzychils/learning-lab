import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Learning Lab workspace.",
};

export default function LoginPage() {
  return <LoginForm />;
}
