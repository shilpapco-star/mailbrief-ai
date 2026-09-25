"use client";

import { Menu, X } from "lucide-react";
import { ReactNode, useState } from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";

type DashboardShellProps = {
  children: ReactNode;
};

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <div
      className="
        relative isolate flex min-h-screen overflow-x-hidden
        bg-[#f6f7fb] text-slate-900
        transition-colors duration-300
        dark:bg-[#050816] dark:text-slate-100
      "
    >
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute -left-32 -top-32
            h-[420px] w-[420px]
            rounded-full
            bg-violet-400/15
            blur-[110px]
            dark:bg-violet-600/15
          "
        />

        <div
          className="
            absolute right-[-120px] top-[15%]
            h-[420px] w-[420px]
            rounded-full
            bg-cyan-400/10
            blur-[120px]
            dark:bg-cyan-500/10
          "
        />

        <div
          className="
            absolute bottom-[-180px] left-[30%]
            h-[500px] w-[500px]
            rounded-full
            bg-fuchsia-400/10
            blur-[130px]
            dark:bg-fuchsia-600/10
          "
        />

        {/* Subtle grid */}
        <div
          className="
            absolute inset-0 opacity-[0.025]
            dark:opacity-[0.035]
            [background-image:linear-gradient(rgba(99,102,241,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.7)_1px,transparent_1px)]
            [background-size:48px_48px]
          "
        />
      </div>

      {/* Desktop Sidebar */}
      <div className="relative z-20">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="relative z-10 min-w-0 flex-1">

        {/* Mobile Header */}
        <header
          className="
            sticky top-0 z-50 flex h-16 items-center
            justify-between
            border-b border-white/60
            bg-white/65 px-4
            backdrop-blur-2xl
            dark:border-white/10
            dark:bg-[#070b1a]/75
            lg:hidden
          "
        >
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="group flex items-center gap-2"
          >
            <div
              className="
                relative flex h-9 w-9 items-center justify-center
                overflow-hidden rounded-xl
                bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400
                text-white shadow-md shadow-violet-500/20
                transition group-hover:scale-105
              "
            >
              <span className="relative text-sm font-bold">M</span>
            </div>

            <div>
              <p className="font-bold tracking-tight text-slate-900 dark:text-white">
                MailBrief
                <span className="text-violet-600 dark:text-cyan-400">
                  {" "}
                  AI
                </span>
              </p>

              <p className="text-[8px] uppercase tracking-[0.12em] text-slate-400">
                AI Email Intelligence
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl
              border border-white/70
              bg-white/60
              text-slate-600
              shadow-sm
              backdrop-blur-xl
              transition
              hover:bg-white
              hover:text-violet-600
              dark:border-white/10
              dark:bg-white/5
              dark:text-slate-300
              dark:hover:bg-white/10
              dark:hover:text-cyan-300
            "
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </header>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMobileMenu}
            className="
              fixed inset-0 z-40
              bg-slate-950/20
              backdrop-blur-[2px]
              lg:hidden
            "
          />
        )}

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div
            className="
              absolute left-3 right-3 top-[68px] z-50
              overflow-hidden rounded-3xl
              border border-white/70
              bg-white/80 p-4
              shadow-2xl shadow-slate-900/10
              backdrop-blur-2xl
              dark:border-white/10
              dark:bg-[#090d1d]/90
              dark:shadow-black/30
              lg:hidden
            "
          >
            <div className="mb-3 px-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                Workspace
              </p>
            </div>

            <nav className="space-y-2">
              <MobileNavLink
                href="/analyzer"
                label="Email Analyzer"
                onClick={closeMobileMenu}
              />

              <MobileNavLink
                href="/history"
                label="Email History"
                onClick={closeMobileMenu}
              />

              <MobileNavLink
                href="/analytics"
                label="Analytics"
                onClick={closeMobileMenu}
              />

              <MobileNavLink
                href="/settings"
                label="Settings"
                onClick={closeMobileMenu}
              />

              <div className="my-3 h-px bg-slate-200/70 dark:bg-white/10" />

              <MobileNavLink
                href="/"
                label="← Back to Home"
                onClick={closeMobileMenu}
                muted
              />
            </nav>
          </div>
        )}

        {/* Page content */}
        <main className="relative min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
  muted = false,
}: {
  href: string;
  label: string;
  onClick: () => void;
  muted?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        group flex items-center rounded-2xl
        border px-4 py-3.5
        text-sm font-medium
        transition-all duration-300
        ${
          muted
            ? `
              border-transparent
              text-slate-500
              hover:border-white/60
              hover:bg-white/60
              hover:text-slate-900
              dark:text-slate-400
              dark:hover:border-white/10
              dark:hover:bg-white/5
              dark:hover:text-white
            `
            : `
              border-white/40
              bg-white/35
              text-slate-700
              hover:border-violet-300/40
              hover:bg-violet-50/70
              hover:text-violet-700
              dark:border-white/5
              dark:bg-white/[0.03]
              dark:text-slate-200
              dark:hover:border-violet-400/20
              dark:hover:bg-violet-500/10
              dark:hover:text-white
            `
        }
      `}
    >
      {label}
    </Link>
  );
}