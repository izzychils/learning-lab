"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Atom,
  BarChart3,
  Bell,
  BookOpen,
  ChevronRight,
  ClipboardList,
  FlaskConical,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  TestTubes,
  Users,
  X,
} from "lucide-react";
import { LabLogo } from "@/components/brand/logo";
import { DashboardSessionContext } from "@/features/dashboard/session-context";
import {
  clearSession,
  initials,
  readSession,
  saveSession,
  type DemoUser,
} from "@/lib/session";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Learn",
    items: [
      { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { label: "Simulations", href: "/dashboard/simulations", icon: FlaskConical },
      { label: "Practicals", href: "/dashboard/practicals", icon: TestTubes },
      { label: "AI tutor", href: "/dashboard/simulations/ai-tutor", icon: Sparkles },
    ],
  },
  {
    label: "Study",
    items: [
      { label: "Notebook", href: "/dashboard/notebook", icon: BookOpen },
      { label: "Practice", href: "/dashboard/practice", icon: ListChecks },
      { label: "Progress", href: "/dashboard/progress", icon: BarChart3 },
    ],
  },
  {
    label: "Class",
    items: [
      { label: "Classes", href: "/dashboard/classes", icon: Users },
      { label: "Assignments", href: "/dashboard/assignments", icon: ClipboardList },
    ],
  },
  {
    label: "Reference",
    items: [{ label: "Periodic table", href: "/dashboard/periodic-table", icon: Atom }],
  },
  {
    label: "Account",
    items: [{ label: "Settings", href: "/dashboard/settings", icon: Settings }],
  },
];

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/simulations": "Simulations",
  "/dashboard/practicals": "Guided practicals",
  "/dashboard/practice": "Practice",
  "/dashboard/notebook": "Lab notebook",
  "/dashboard/progress": "Progress",
  "/dashboard/classes": "Classes",
  "/dashboard/assignments": "Assignments",
  "/dashboard/periodic-table": "Periodic table",
  "/dashboard/settings": "Settings",
  "/dashboard/simulations/molecular-lab": "Molecular lab",
  "/dashboard/simulations/anatomy": "Body systems",
  "/dashboard/simulations/ai-tutor": "AI tutor",
  "/dashboard/simulations/titration": "Titration curves",
};

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const session = readSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    setUser(session);
    setReady(true);
  }, [router]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const signOut = () => {
    clearSession();
    router.push("/login");
  };

  const updateUser = (next: DemoUser) => {
    saveSession(next);
    setUser(next);
  };

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0a08]">
        <div className="flex flex-col items-center gap-5">
          <LabLogo tone="dark" />
          <div className="flex items-center gap-2 font-mono text-[8.5px] uppercase tracking-[0.14em] text-paper/35">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flare" />
            Opening your lab
          </div>
        </div>
      </div>
    );
  }

  const title =
    pageTitles[pathname] ??
    (pathname.startsWith("/dashboard/simulations/")
      ? "Simulation workspace"
      : pathname.startsWith("/dashboard/classes/")
        ? "Class detail"
        : "Workspace");
  const currentSection = pathname.startsWith("/dashboard/simulations")
    ? "Simulations"
    : pathname.startsWith("/dashboard/practicals")
      ? "Practicals"
      : pathname.startsWith("/dashboard/practice")
        ? "Practice"
        : pathname.startsWith("/dashboard/notebook")
          ? "Notebook"
          : pathname.startsWith("/dashboard/progress")
            ? "Progress"
            : pathname.startsWith("/dashboard/classes")
              ? "Classes"
              : pathname.startsWith("/dashboard/assignments")
                ? "Assignments"
                : pathname.startsWith("/dashboard/periodic-table")
                  ? "Reference"
                  : pathname.startsWith("/dashboard/settings")
                    ? "Settings"
                    : "Overview";

  return (
    <DashboardSessionContext.Provider value={{ user, signOut, updateUser }}>
      <div className="min-h-screen bg-paper">
        {menuOpen ? (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-ink/45 backdrop-blur-sm lg:hidden"
          />
        ) : null}

        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col bg-[#0b0a08] text-paper transition-transform duration-300 lg:translate-x-0",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
          aria-label="Workspace navigation"
        >
          <div className="flex h-[70px] shrink-0 items-center justify-between border-b border-paper/10 px-5">
            <Link href="/dashboard" aria-label="Learning Lab dashboard">
              <LabLogo tone="dark" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-paper/40 hover:bg-paper/10 hover:text-paper lg:hidden"
              aria-label="Close navigation"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-5">
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-paper/12 bg-paper/[0.04] px-3 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-flare" />
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-paper/45">
                Demo workspace
              </span>
              <span className="ml-auto rounded-full border border-paper/12 px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-[0.08em] text-paper/30">
                Local
              </span>
            </div>

            <nav className="space-y-4">
              {navGroups.map((group) => (
                <div key={group.label}>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const active =
                        item.href === "/dashboard"
                          ? pathname === "/dashboard"
                          : item.href === "/dashboard/simulations"
                            ? pathname.startsWith("/dashboard/simulations") &&
                              !pathname.startsWith("/dashboard/simulations/ai-tutor")
                            : pathname === item.href || pathname.startsWith(`${item.href}/`);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors",
                            active
                              ? "bg-paper/[0.06] text-paper"
                              : "text-paper/52 hover:bg-paper/[0.06] hover:text-paper",
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-[18px] w-[18px]",
                              active ? "text-flare" : "text-paper/35",
                            )}
                          />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            <div className="mt-auto pt-6">
              <Link
                href="/dashboard/simulations/ai-tutor"
                className="group block rounded-2xl border border-paper/12 bg-paper/[0.04] p-3.5 transition-colors hover:border-flare/30"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-flare text-ink">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-[10.5px] font-semibold text-paper/80">Stuck on a model?</p>
                </div>
                <p className="mt-2 text-[9.5px] leading-relaxed text-paper/35">
                  Ask the tutor why it behaves that way.
                </p>
                <span className="mt-2.5 inline-flex items-center gap-1 font-mono text-[7.5px] uppercase tracking-[0.1em] text-flare/80">
                  Open tutor
                  <ChevronRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </div>

          <div className="shrink-0 border-t border-paper/10 p-3">
            <button
              type="button"
              onClick={signOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-paper/50 transition-colors hover:bg-paper/[0.06] hover:text-paper"
            >
              <LogOut className="h-[18px] w-[18px] text-paper/35" />
              Sign out
            </button>
          </div>
        </aside>

        <div className="lg:pl-[264px]">
          <header className="sticky top-0 z-30 border-b border-line bg-paper/92 backdrop-blur-xl">
            <div className="mx-auto flex h-[64px] max-w-[1360px] items-center gap-4 px-4 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-ink/60 lg:hidden"
                aria-label="Open navigation"
              >
                <Menu className="h-4 w-4" />
              </button>

              <div className="flex min-w-0 items-center gap-2 text-[11px]">
                <span className="hidden text-ink/35 sm:inline">Workspace</span>
                <ChevronRight className="hidden h-3 w-3 text-ink/20 sm:inline" />
                <span className="truncate font-semibold text-ink/70">{title}</span>
              </div>

              <div className="ml-auto flex items-center gap-2.5">
                <span className="hidden items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-ink/40 md:flex">
                  <Bell className="h-3 w-3 text-ink/30" />
                  Demo mode
                </span>
                <Link
                  href="/dashboard/settings"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[8px] font-bold text-paper transition-colors hover:bg-ink-soft"
                  aria-label="Open settings"
                >
                  {initials(user.name)}
                </Link>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-[1360px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>

          <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-4 px-4 pb-6 text-[9px] text-ink/30 sm:px-6 lg:px-8">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3 w-3" />
              Learning Lab / demo workspace
            </span>
            <span className="font-mono uppercase tracking-[0.1em]">{currentSection}</span>
          </div>
        </div>
      </div>
    </DashboardSessionContext.Provider>
  );
}
