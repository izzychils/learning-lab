export type UserRole = "student" | "educator";

export type DemoUser = {
  name: string;
  email: string;
  role: UserRole;
};

const SESSION_KEY = "learning-lab.session";

export const DEMO_ACCOUNT = {
  email: "ada@learninglab.app",
  password: "science123",
  name: "Ada Nwosu",
  role: "student" as UserRole,
};

export function readSession(): DemoUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<DemoUser>;
    if (
      typeof parsed.name !== "string" ||
      typeof parsed.email !== "string" ||
      (parsed.role !== "student" && parsed.role !== "educator")
    ) {
      return null;
    }
    return { name: parsed.name, email: parsed.email, role: parsed.role };
  } catch {
    return null;
  }
}

export function saveSession(user: DemoUser) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}

export function nameFromEmail(email: string) {
  const handle = email.split("@")[0] ?? "scientist";
  return handle
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ") || "Scientist";
}

export function roleLabel(role: UserRole) {
  return role === "educator" ? "Educator" : "Student";
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
