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
  Settings,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";

type Email = {
  id: string;
  subject: string | null;
  sender: string | null;
  summary: string | null;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | null;
  sender_intent: string | null;
  created_at: string;
};

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

type Category = {
  name: string;
  count: number;
  percentage: number;
};

type Priority = {
  name: string;
  count: number;
};

type WeeklyItem = {
  day: string;
  value: number;
};

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [emails, setEmails] = useState<Email[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [totalEmails, setTotalEmails] = useState(0);
  const [timeSaved, setTimeSaved] = useState("0 min");
  const [averageReadingTime, setAverageReadingTime] = useState("0 sec");
  const [aiInsights, setAiInsights] = useState(0);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      setLoading(true);
      setError("");

      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("Please log in to view your analytics.");
        return;
      }

      const { data: emailData, error: emailError } = await supabase
        .from("emails")
        .select(
          "id, subject, sender, summary, priority, sender_intent, created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (emailError) {
        console.error("Analytics email error:", emailError);
        setError("Unable to load analytics.");
        return;
      }

      const loadedEmails = (emailData || []) as Email[];

      setEmails(loadedEmails);

      calculateAnalytics(loadedEmails);
    } catch (err) {
      console.error("Analytics error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading analytics."
      );
    } finally {
      setLoading(false);
    }
  }

  function calculateAnalytics(emailList: Email[]) {
    const total = emailList.length;

    setTotalEmails(total);

    // -----------------------------
    // PRIORITY BREAKDOWN
    // -----------------------------

    const priorityNames = ["LOW", "MEDIUM", "HIGH", "URGENT"];

    const priorityData: Priority[] = priorityNames.map((priority) => ({
      name: priority.charAt(0) + priority.slice(1).toLowerCase(),
      count: emailList.filter((email) => email.priority === priority).length,
    }));

    setPriorities(priorityData);

    // -----------------------------
    // CATEGORY BREAKDOWN
    // -----------------------------

    const categoryMap: Record<string, number> = {};

    emailList.forEach((email) => {
      const category = email.sender_intent?.trim() || "Other";

      categoryMap[category] = (categoryMap[category] || 0) + 1;
    });

    const categoryData: Category[] = Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      }));

    setCategories(categoryData);

    // -----------------------------
    // LAST 7 DAYS ACTIVITY
    // -----------------------------

    const now = new Date();

    const lastSevenDays: WeeklyItem[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);

      date.setDate(now.getDate() - i);

      const dateKey = date.toLocaleDateString("en-CA");

      const count = emailList.filter((email) => {
        const emailDate = new Date(email.created_at).toLocaleDateString(
          "en-CA"
        );

        return emailDate === dateKey;
      }).length;

      lastSevenDays.push({
        day: date.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        value: count,
      });
    }

    setWeeklyData(lastSevenDays);

    // -----------------------------
    // READING TIME
    // -----------------------------

    let totalOriginalReadingSeconds = 0;
    let totalBriefReadingSeconds = 0;

    emailList.forEach((email) => {
      const summaryLength = email.summary?.length || 0;

      const estimatedOriginalSeconds = Math.max(
        30,
        Math.round(summaryLength / 2)
      );

      const estimatedBriefSeconds = Math.max(
        8,
        Math.round(summaryLength / 8)
      );

      totalOriginalReadingSeconds += estimatedOriginalSeconds;
      totalBriefReadingSeconds += estimatedBriefSeconds;
    });

    const savedSeconds =
      totalOriginalReadingSeconds - totalBriefReadingSeconds;

    setTimeSaved(formatTime(savedSeconds));

    // -----------------------------
    // AVERAGE READING TIME
    // -----------------------------

    const averageSeconds =
      total > 0
        ? Math.round(totalOriginalReadingSeconds / total)
        : 0;

    setAverageReadingTime(`${averageSeconds} sec`);

    // -----------------------------
    // AI INSIGHTS
    // -----------------------------

    loadInsightCount(emailList);
  }

  async function loadInsightCount(emailList: Email[]) {
    if (emailList.length === 0) {
      setAiInsights(0);
      return;
    }

    try {
      const supabase = createClient();

      const emailIds = emailList.map((email) => email.id);

      const [
        keyPointsResult,
        actionItemsResult,
        datesResult,
      ] = await Promise.all([
        supabase
          .from("email_key_points")
          .select("id")
          .in("email_id", emailIds),

        supabase
          .from("email_action_items")
          .select("id")
          .in("email_id", emailIds),

        supabase
          .from("email_dates")
          .select("id")
          .in("email_id", emailIds),
      ]);

      const keyPointsCount = keyPointsResult.data?.length || 0;
      const actionItemsCount = actionItemsResult.data?.length || 0;
      const datesCount = datesResult.data?.length || 0;

      setAiInsights(
        keyPointsCount + actionItemsCount + datesCount
      );
    } catch (err) {
      console.error("AI insight count error:", err);
      setAiInsights(0);
    }
  }

  function formatTime(seconds: number) {
    if (seconds <= 0) {
      return "0 min";
    }

    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    return `${minutes} min`;
  }

  const maxValue = Math.max(
    ...weeklyData.map((item) => item.value),
    1
  );

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">

      {/* MOBILE HEADER */}

      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#111827] text-white dark:bg-indigo-600">
            <Mail size={18} />
          </div>

          <span className="font-bold text-slate-900 dark:text-white">
            MailBrief
            <span className="text-indigo-600"> AI</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <div className="flex min-h-screen">

        {/* SIDEBAR */}

        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } absolute z-20 w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:relative lg:block`}
        >
          <div className="flex min-h-screen flex-col">

            {/* LOGO */}

            <div className="flex h-20 items-center border-b border-slate-100 px-6 dark:border-slate-800">
              <Link
                href="/"
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111827] text-white dark:bg-indigo-600">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="font-bold tracking-tight text-slate-900 dark:text-white">
                    MailBrief
                    <span className="text-indigo-600">
                      {" "}
                      AI
                    </span>
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400">
                    AI Email Intelligence
                  </p>
                </div>
              </Link>
            </div>

            {/* NAVIGATION */}

            <nav className="flex-1 space-y-2 p-4">

              <Link
                href="/analyzer"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <Sparkles size={18} />
                Email Analyzer
              </Link>

              <Link
                href="/history"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <History size={18} />
                Email History
              </Link>

              <Link
                href="/analytics"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
              >
                <BarChart3 size={18} />
                Analytics
              </Link>

              <Link
                href="/settings"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <Settings size={18} />
                Settings
              </Link>

              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            </nav>

            {/* USER */}

            <div className="border-t border-slate-100 p-4 dark:border-slate-800">
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 transition hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
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
              </Link>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}

        <section className="min-w-0 flex-1">

          {/* DESKTOP TOP BAR */}

          <div className="hidden h-20 items-center justify-between border-b border-slate-200 bg-white px-8 dark:border-slate-800 dark:bg-slate-900 lg:flex">
            <div>
              <p className="text-sm font-medium text-slate-400">
                Workspace
              </p>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Analytics
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/settings"
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Settings size={16} />
                Settings
              </Link>

              <Link
                href="/analyzer"
                className="flex items-center gap-2 rounded-xl bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500"
              >
                <Sparkles size={16} />
                Analyze email
              </Link>
            </div>
          </div>

          {/* PAGE */}

          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

            {/* HEADING */}

            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                <BarChart3 size={16} />
                Email intelligence
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                Analytics
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
                Understand how you use MailBrief and where your
                time is being saved.
              </p>
            </div>

            {/* DATE FILTER */}

            <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                <CalendarDays size={16} />
                Last 7 days
              </div>

              <p className="text-xs text-slate-400">
                Live database analytics
              </p>
            </div>

            {/* LOADING */}

            {loading ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                  />
                ))}
              </div>
            ) : error ? (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                {error}
              </div>
            ) : (
              <>
                {/* STAT CARDS */}

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <StatCard
                    icon={<Mail size={19} />}
                    label="Emails analyzed"
                    value={String(totalEmails)}
                  />

                  <StatCard
                    icon={<Clock3 size={19} />}
                    label="Time saved"
                    value={timeSaved}
                  />

                  <StatCard
                    icon={<TrendingUp size={19} />}
                    label="Avg. reading time"
                    value={averageReadingTime}
                  />

                  <StatCard
                    icon={<Brain size={19} />}
                    label="AI insights"
                    value={String(aiInsights)}
                  />
                </div>

                {/* CHARTS ROW */}

                <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">

                  {/* WEEKLY ACTIVITY */}

                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          Analysis activity
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          Emails analyzed during the last 7 days
                        </p>
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                        <BarChart3 size={17} />
                      </div>
                    </div>

                    {/* BAR CHART */}

                    <div className="mt-8 flex h-64 items-end justify-between gap-3 border-b border-slate-100 px-2 dark:border-slate-800">
                      {weeklyData.map((item) => {
                        const height =
                          (item.value / maxValue) * 100;

                        return (
                          <div
                            key={item.day}
                            className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                          >
                            <div className="flex w-full flex-1 items-end justify-center">
                              <div
                                className="w-full max-w-10 rounded-t-lg bg-indigo-500/90 transition hover:bg-indigo-600"
                                style={{
                                  height: `${height}%`,
                                  minHeight:
                                    item.value > 0
                                      ? "8px"
                                      : "0px",
                                }}
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

                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {weeklyData.reduce(
                          (sum, item) => sum + item.value,
                          0
                        )}{" "}
                        emails
                      </span>
                    </div>
                  </div>

                  {/* PRIORITY */}

                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          Priority breakdown
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          How your emails were classified
                        </p>
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
                        <TrendingUp size={17} />
                      </div>
                    </div>

                    <div className="mt-7 space-y-5">
                      {priorities.map((item) => {
                        const percentage =
                          totalEmails > 0
                            ? (item.count / totalEmails) * 100
                            : 0;

                        return (
                          <div key={item.name}>
                            <div className="mb-2 flex justify-between text-xs">
                              <span className="font-semibold text-slate-600 dark:text-slate-300">
                                {item.name}
                              </span>

                              <span className="text-slate-400">
                                {item.count}
                              </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                              <div
                                className="h-full rounded-full bg-indigo-500 transition-all"
                                style={{
                                  width: `${percentage}%`,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* CATEGORY + AI INSIGHT */}

                <div className="mt-6 grid gap-6 xl:grid-cols-2">

                  {/* CATEGORIES */}

                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          Email categories
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          Where your analyzed emails come from
                        </p>
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                        <Mail size={17} />
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      {categories.length === 0 ? (
                        <p className="py-6 text-center text-sm text-slate-400">
                          No analyzed emails yet.
                        </p>
                      ) : (
                        categories.map((category) => (
                          <div key={category.name}>
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                                {category.name}
                              </span>

                              <span className="text-xs text-slate-400">
                                {category.count} ·{" "}
                                {category.percentage}%
                              </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                              <div
                                className="h-full rounded-full bg-indigo-400 transition-all"
                                style={{
                                  width: `${category.percentage}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* AI INSIGHT */}

                  <div className="rounded-3xl bg-[#111827] p-6 text-white shadow-sm dark:bg-slate-900 dark:ring-1 dark:ring-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                        <Sparkles size={19} />
                      </div>

                      <div>
                        <p className="font-bold">
                          AI productivity insight
                        </p>

                        <p className="text-xs text-slate-400">
                          Based on your recent analyses
                        </p>
                      </div>
                    </div>

                    <p className="mt-6 text-lg font-semibold leading-7">
                      {totalEmails === 0
                        ? "Analyze your first email to start building your productivity insights."
                        : `MailBrief has analyzed ${totalEmails} email${
                            totalEmails === 1 ? "" : "s"
                          } and extracted ${aiInsights} useful AI insight${
                            aiInsights === 1 ? "" : "s"
                          }.`}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-xs text-slate-400">
                          Estimated time saved
                        </p>

                        <p className="mt-1 text-xl font-bold">
                          {timeSaved}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-xs text-slate-400">
                          Avg. email
                        </p>

                        <p className="mt-1 text-xl font-bold">
                          {averageReadingTime}
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

                {/* SETTINGS SHORTCUT */}

                <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <Settings size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        Manage your workspace
                      </p>

                      <p className="text-xs text-slate-400">
                        Update your profile, preferences and security
                        settings.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/settings"
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Settings size={16} />
                    Open Settings
                  </Link>
                </div>

                {/* BOTTOM NOTE */}

                <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-4 text-center dark:border-slate-700 dark:bg-slate-900/40">
                  <p className="text-xs leading-5 text-slate-400">
                    Analytics are calculated from your MailBrief
                    database and update automatically when new
                    emails are analyzed.
                  </p>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

/* ========================= */
/* STAT CARD */
/* ========================= */

function StatCard({
  icon,
  label,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
          {icon}
        </div>
      </div>

      <p className="mt-5 text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
        {value}
      </p>
    </div>
  );
}