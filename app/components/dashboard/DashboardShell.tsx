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
    <div className="flex min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="min-w-0 flex-1">
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 lg:hidden">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#111827] text-white dark:bg-indigo-600">
              <span className="text-sm font-bold">M</span>
            </div>

            <div>
              <p className="font-bold tracking-tight text-slate-900 dark:text-white">
                MailBrief
                <span className="text-indigo-600"> AI</span>
              </p>

              <p className="text-[8px] uppercase tracking-[0.12em] text-slate-400">
                AI Email Intelligence
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
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

        {/* Mobile Backdrop */}
        {mobileMenuOpen && (
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMobileMenu}
            className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[1px] lg:hidden"
          />
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-16 z-50 border-b border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900 lg:hidden">
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

              <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

              <MobileNavLink
                href="/"
                label="← Back to Home"
                onClick={closeMobileMenu}
                muted
              />
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ==================================================
   MOBILE NAVIGATION LINK
================================================== */

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
      className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
        muted
          ? "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          : "text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-200 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
      }`}
    >
      {label}
    </Link>
  );
}