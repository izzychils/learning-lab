import type { Metadata } from "next";
import { SettingsForm } from "@/features/dashboard/settings-form";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your Learning Lab demo profile and workspace preferences.",
};

export default function SettingsPage() {
  return <SettingsForm />;
}
