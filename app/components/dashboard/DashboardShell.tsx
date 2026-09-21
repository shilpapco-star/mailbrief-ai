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

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="min-w-0 flex-1">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#111827] text-white dark:bg-indigo-600">
              <span className="text-sm font-bold">M</span>
            </div>

            <div>
              <p className="font-bold text-slate-900 dark:text-white">
                MailBrief
                <span className="text-indigo-600"> AI</span>
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
            <nav className="space-y-2">
              <Link
                href="/analyzer"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Email Analyzer
              </Link>

              <Link
                href="/history"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Email History
              </Link>

              <Link
                href="/analytics"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Analytics
              </Link>

              <Link
                href="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Settings
              </Link>

              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                ← Back to Home
              </Link>
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