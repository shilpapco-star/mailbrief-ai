"use client";

import {
  ArrowLeft,
  BarChart3,
  History,
  Mail,
  Settings,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Email Analyzer",
      href: "/analyzer",
      icon: Sparkles,
    },
    {
      name: "Email History",
      href: "/history",
      icon: History,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 lg:block">
      <div className="flex min-h-screen flex-col">
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-slate-100 px-6 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111827] text-white dark:bg-indigo-600">
              <Mail size={20} />
            </div>

            <div>
              <p className="font-bold tracking-tight text-slate-900 dark:text-white">
                MailBrief
                <span className="text-indigo-600"> AI</span>
              </p>

              <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400">
                AI Email Intelligence
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}

          {/* Back to Home */}
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </nav>

        {/* User */}
        <div className="border-t border-slate-100 p-4 dark:border-slate-800">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400">
              SP
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                User
              </p>

              <p className="truncate text-xs text-slate-400">
                Free workspace
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}