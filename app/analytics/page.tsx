"use client";

import DashboardShell from "../components/dashboard/DashboardShell";
import {
  BarChart3,
  Brain,
  CalendarDays,
  Clock3,
  Mail,
  Settings,
  Sparkles,
  TrendingUp,
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

    const priorityNames = ["LOW", "MEDIUM", "HIGH", "URGENT"];

    const priorityData: Priority[] = priorityNames.map((priority) => ({
      name: priority.charAt(0) + priority.slice(1).toLowerCase(),
      count: emailList.filter((email) => email.priority === priority).length,
    }));

    setPriorities(priorityData);

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

    const averageSeconds =
      total > 0
        ? Math.round(totalOriginalReadingSeconds / total)
        : 0;

    setAverageReadingTime(`${averageSeconds} sec`);

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
    <DashboardShell>
      <div className="relative min-h-screen overflow-hidden bg-[#f6f7fb] text-slate-900 transition-colors duration-300 dark:bg-[#050816] dark:text-slate-100">

        {/* Ambient Aurora Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-600/10" />

          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10" />

          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-fuchsia-300/10 blur-3xl dark:bg-fuchsia-600/10" />
        </div>

        {/* Desktop Top Bar */}
        <div className="relative hidden h-20 items-center justify-between border-b border-white/70 bg-white/65 px-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/40 lg:flex">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Workspace
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              Analytics
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/settings"
              className="flex items-center gap-2 rounded-xl border border-white/80 bg-white/60 px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            >
              <Settings size={16} />
              Settings
            </Link>

            <Link
              href="/analyzer"
              className="group flex items-center gap-2 rounded-xl border border-white/70 bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/10 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:border-white/10 dark:bg-white dark:text-slate-950"
            >
              <Sparkles
                size={16}
                className="transition-transform group-hover:rotate-12"
              />
              Analyze email
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <div className="relative mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

          {/* Heading */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/70 px-3 py-1.5 text-xs font-bold text-violet-600 shadow-sm backdrop-blur-xl dark:border-violet-400/10 dark:bg-white/5 dark:text-violet-300">
              <BarChart3 size={14} />
              Email intelligence
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Analytics
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
              Understand how you use MailBrief and where your
              time is being saved.
            </p>
          </div>

          {/* Date Filter */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/80 bg-white/65 px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <CalendarDays size={16} />
              Last 7 days
            </div>

            <p className="text-xs text-slate-400">
              Live database analytics
            </p>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-32 animate-pulse rounded-2xl border border-white/80 bg-white/60 dark:border-white/10 dark:bg-white/[0.04]"
                />
              ))}
            </div>
          ) : error ? (
            <div className="mt-6 rounded-3xl border border-red-200/70 bg-red-50/80 p-5 text-sm text-red-600 shadow-sm backdrop-blur-xl dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400">
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
                <div className="rounded-3xl border border-white/80 bg-white/65 p-6 shadow-sm backdrop-blur-xl transition hover:shadow-xl hover:shadow-violet-500/5 dark:border-white/10 dark:bg-white/[0.045]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        Analysis activity
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Emails analyzed during the last 7 days
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-200/60 bg-violet-50/70 text-violet-600 dark:border-violet-400/10 dark:bg-violet-500/10 dark:text-violet-400">
                      <BarChart3 size={17} />
                    </div>
                  </div>

                  {/* BAR CHART */}
                  <div className="mt-8 flex h-64 items-end justify-between gap-3 border-b border-slate-200/70 px-2 dark:border-white/10">
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
                              className="w-full max-w-10 rounded-t-xl bg-gradient-to-t from-violet-600 to-cyan-400 shadow-lg shadow-violet-500/10 transition-all duration-300 hover:from-violet-500 hover:to-cyan-300"
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
                <div className="rounded-3xl border border-white/80 bg-white/65 p-6 shadow-sm backdrop-blur-xl transition hover:shadow-xl hover:shadow-violet-500/5 dark:border-white/10 dark:bg-white/[0.045]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        Priority breakdown
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        How your emails were classified
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-200/60 bg-orange-50/70 text-orange-500 dark:border-orange-400/10 dark:bg-orange-500/10 dark:text-orange-400">
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

                          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-400 transition-all duration-500"
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
                <div className="rounded-3xl border border-white/80 bg-white/65 p-6 shadow-sm backdrop-blur-xl transition hover:shadow-xl hover:shadow-violet-500/5 dark:border-white/10 dark:bg-white/[0.045]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        Email categories
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Where your analyzed emails come from
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-200/60 bg-cyan-50/70 text-cyan-600 dark:border-cyan-400/10 dark:bg-cyan-500/10 dark:text-cyan-400">
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

                          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500"
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
                <div className="relative overflow-hidden rounded-3xl border border-violet-300/20 bg-gradient-to-br from-[#17122d] via-[#11152c] to-[#071c2b] p-6 text-white shadow-xl shadow-violet-900/10">
                  <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />

                  <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10">
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
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                        <p className="text-xs text-slate-400">
                          Estimated time saved
                        </p>

                        <p className="mt-1 text-xl font-bold">
                          {timeSaved}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
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
                      className="mt-6 flex h-11 items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
                    >
                      Analyze another email
                      <Sparkles size={16} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* SETTINGS SHORTCUT */}
              <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-white/80 bg-white/65 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/70 bg-slate-100/70 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
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
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/80 bg-white/60 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                >
                  <Settings size={16} />
                  Open Settings
                </Link>
              </div>

              {/* BOTTOM NOTE */}
              <div className="mt-6 rounded-2xl border border-dashed border-slate-300/80 bg-white/50 p-4 text-center backdrop-blur-xl dark:border-slate-700 dark:bg-white/[0.02]">
                <p className="text-xs leading-5 text-slate-400">
                  Analytics are calculated from your MailBrief
                  database and update automatically when new
                  emails are analyzed.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

function StatCard({
  icon,
  label,
  value,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/65 p-5 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/5 dark:border-white/10 dark:bg-white/[0.045]">
      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-violet-400/10 blur-2xl transition group-hover:bg-violet-400/20" />

      <div className="relative flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-200/60 bg-violet-50/70 text-violet-600 dark:border-violet-400/10 dark:bg-violet-500/10 dark:text-violet-400">
          {icon}
        </div>
      </div>

      <p className="relative mt-5 text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="relative mt-1 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
        {value}
      </p>
    </div>
  );
}