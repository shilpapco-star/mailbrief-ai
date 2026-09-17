"use client";

import {
  ArrowLeft,
  BarChart3,
  Brain,
  CalendarDays,
  Clock3,
  History,
  Mail,
  Menu,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const weeklyData = [
  { day: "Mon", value: 8 },
  { day: "Tue", value: 12 },
  { day: "Wed", value: 7 },
  { day: "Thu", value: 15 },
  { day: "Fri", value: 11 },
  { day: "Sat", value: 5 },
  { day: "Sun", value: 9 },
];

const categories = [
  { name: "Work", count: 24, percentage: 48 },
  { name: "Finance", count: 10, percentage: 20 },
  { name: "HR", count: 8, percentage: 16 },
  { name: "Personal", count: 5, percentage: 10 },
  { name: "Other", count: 3, percentage: 6 },
];

const priorities = [
  { name: "Low", count: 18 },
  { name: "Medium", count: 16 },
  { name: "High", count: 11 },
  { name: "Urgent", count: 5 },
];

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const maxValue = Math.max(...weeklyData.map((item) => item.value));

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Mobile Header */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#111827] text-white">
            <Mail size={18} />
          </div>

          <span className="font-bold">
            MailBrief<span className="text-indigo-600"> AI</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } absolute z-20 w-64 border-r border-slate-200 bg-white lg:relative lg:block`}
        >
          <div className="flex min-h-screen flex-col">
            {/* Logo */}
            <div className="flex h-20 items-center border-b border-slate-100 px-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111827] text-white">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="font-bold tracking-tight">
                    MailBrief<span className="text-indigo-600"> AI</span>
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400">
                    AI Email Intelligence
                  </p>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 p-4">
              <Link
                href="/analyzer"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <Sparkles size={18} />
                Email Analyzer
              </Link>

              <Link
                href="/history"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <History size={18} />
                Email History
              </Link>

              <Link
                href="/analytics"
                className="flex items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700"
              >
                <BarChart3 size={18} />
                Analytics
              </Link>

              <Link
                href="/"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            </nav>

            {/* User */}
            <div className="border-t border-slate-100 p-4">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                  SP
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
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

        {/* Main Content */}
        <section className="min-w-0 flex-1">
          {/* Desktop Top Bar */}
          <div className="hidden h-20 items-center justify-between border-b border-slate-200 bg-white px-8 lg:flex">
            <div>
              <p className="text-sm font-medium text-slate-400">
                Workspace
              </p>

              <h2 className="text-lg font-bold text-slate-900">
                Analytics
              </h2>
            </div>

            <Link
              href="/analyzer"
              className="flex items-center gap-2 rounded-xl bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Sparkles size={16} />
              Analyze email
            </Link>
          </div>

          {/* Page */}
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {/* Heading */}
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
                <BarChart3 size={16} />
                Email intelligence
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Analytics
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Understand how you use MailBrief and where your time is being
                saved.
              </p>
            </div>

            {/* Date Filter */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600">
                <CalendarDays size={16} />
                Last 7 days
              </div>

              <p className="text-xs text-slate-400">
                Sample analytics data
              </p>
            </div>

            {/* Stat Cards */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={<Mail size={19} />}
                label="Emails analyzed"
                value="50"
                change="+12%"
              />

              <StatCard
                icon={<Clock3 size={19} />}
                label="Time saved"
                value="3h 42m"
                change="+18%"
              />

              <StatCard
                icon={<TrendingUp size={19} />}
                label="Avg. reading time"
                value="42 sec"
                change="-31%"
              />

              <StatCard
                icon={<Brain size={19} />}
                label="AI insights"
                value="186"
                change="+24%"
              />
            </div>

            {/* Charts Row */}
            <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
              {/* Weekly Activity */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Analysis activity
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Emails analyzed during the last 7 days
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <BarChart3 size={17} />
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="mt-8 flex h-64 items-end justify-between gap-3 border-b border-slate-100 px-2">
                  {weeklyData.map((item) => {
                    const height = (item.value / maxValue) * 100;

                    return (
                      <div
                        key={item.day}
                        className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                      >
                        <div className="flex w-full flex-1 items-end justify-center">
                          <div
                            className="w-full max-w-10 rounded-t-lg bg-indigo-500/90 transition hover:bg-indigo-600"
                            style={{ height: `${height}%` }}
                            title={`${item.value} emails`}
                          />
                        </div>

                        <span className="pb-3 text-xs font-medium text-slate-400">
                          {item.day}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Total analyzed
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    67 emails
                  </span>
                </div>
              </div>

              {/* Priority */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Priority breakdown
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      How your emails were classified
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                    <TrendingUp size={17} />
                  </div>
                </div>

                <div className="mt-7 space-y-5">
                  {priorities.map((item) => {
                    const percentage = (item.count / 50) * 100;

                    return (
                      <div key={item.name}>
                        <div className="mb-2 flex justify-between text-xs">
                          <span className="font-semibold text-slate-600">
                            {item.name}
                          </span>

                          <span className="text-slate-400">
                            {item.count}
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-indigo-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Category + AI Insight */}
            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              {/* Categories */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Email categories
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Where your analyzed emails come from
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Mail size={17} />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {categories.map((category) => (
                    <div key={category.name}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-600">
                          {category.name}
                        </span>

                        <span className="text-xs text-slate-400">
                          {category.count} · {category.percentage}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-indigo-400"
                          style={{
                            width: `${category.percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insight */}
              <div className="rounded-3xl bg-[#111827] p-6 text-white shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <Sparkles size={19} />
                  </div>

                  <div>
                    <p className="font-bold">AI productivity insight</p>

                    <p className="text-xs text-slate-400">
                      Based on your recent analyses
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-lg font-semibold leading-7">
                  MailBrief is helping turn lengthy emails into quick,
                  actionable briefs.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs text-slate-400">
                      Estimated time saved
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      3h 42m
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs text-slate-400">
                      Avg. email
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      42 sec
                    </p>
                  </div>
                </div>

                <Link
                  href="/analyzer"
                  className="mt-6 flex h-11 items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Analyze another email
                  <Sparkles size={16} />
                </Link>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-4 text-center">
              <p className="text-xs leading-5 text-slate-400">
                Analytics will automatically update once your analyzed emails
                are connected to your MailBrief database.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* Stat Card */
function StatCard({
  icon,
  label,
  value,
  change,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>

        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
          {change}
        </span>
      </div>

      <p className="mt-5 text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
        {value}
      </p>
    </div>
  );
}