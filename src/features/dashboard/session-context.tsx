"use client";

import { createContext, useContext } from "react";
import type { DemoUser } from "@/lib/session";

type DashboardSession = {
  user: DemoUser;
  signOut: () => void;
  updateUser: (user: DemoUser) => void;
};

export const DashboardSessionContext = createContext<DashboardSession | null>(null);

export function useDashboardSession() {
  const value = useContext(DashboardSessionContext);
  if (!value) {
    throw new Error("useDashboardSession must be used inside the dashboard shell.");
  }
  return value;
}
