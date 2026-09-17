"use client";

import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Clock3,
  Filter,
  History as HistoryIcon,
  Mail,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const emails = [
  {
    sender: "Sarah Johnson",
    email: "sarah@acme.com",
    subject: "Project proposal — next steps",
    preview:
      "Thanks for reviewing the proposal. Please share your feedback before Friday...",
    priority: "HIGH",
    category: "Work",
    date: "Today, 10:42 AM",
    takeaway: "Feedback is required before Friday.",
  },
  {
    sender: "HR Team",
    email: "hr@company.com",
    subject: "Annual performance review",
    preview:
      "Your performance review has been scheduled for next Tuesday at 11:00 AM...",
    priority: "MEDIUM",
    category: "HR",
    date: "Yesterday, 4:18 PM",
    takeaway: "Performance review scheduled for next Tuesday.",
  },
  {
    sender: "David Wilson",
    email: "david@startup.io",
    subject: "Meeting follow-up",
    preview:
      "It was great speaking with you today. I've attached the documents we discussed...",
    priority: "LOW",
    category: "Work",
    date: "Sep 15, 2:35 PM",
    takeaway: "Review the attached documents.",
  },
  {
    sender: "Finance Department",
    email: "finance@company.com",
    subject: "Invoice payment reminder",
    preview:
      "This is a reminder that invoice #4821 is due for payment by September 20...",
    priority: "URGENT",
    category: "Finance",
    date: "Sep 14, 9:12 AM",
    takeaway: "Invoice #4821 needs attention before September 20.",
  },
];

export default function HistoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("ALL");

  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      email.sender.toLowerCase().includes(search.toLowerCase()) ||
      email.subject.toLowerCase().includes(search.toLowerCase()) ||
      email.preview.toLowerCase().includes(search.toLowerCase());

    const matchesPriority =
      priority === "ALL" || email.priority === priority;

    return matchesSearch && matchesPriority;
  });

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
                className="flex items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700"
              >
                <HistoryIcon size={18} />
                Email History
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

        {/* Main */}
        <section className="min-w-0 flex-1">
          {/* Desktop Top Bar */}
          <div className="hidden h-20 items-center justify-between border-b border-slate-200 bg-white px-8 lg:flex">
            <div>
              <p className="text-sm font-medium text-slate-400">
                Workspace
              </p>

              <h2 className="text-lg font-bold text-slate-900">
                Email History
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

          {/* Content */}
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {/* Heading */}
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
                <HistoryIcon size={16} />
                Your analyzed emails
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Email History
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Review your previous email analyses and AI takeaways.
              </p>
            </div>

            {/* Search + Filter */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search emails, senders or subjects..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              <div className="relative sm:w-48">
                <Filter
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-600 outline-none focus:border-indigo-500"
                >
                  <option value="ALL">All priorities</option>
                  <option value="URGENT">Urgent</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard
                label="Total analyzed"
                value={emails.length.toString()}
              />
              <StatCard
                label="Urgent"
                value={emails.filter((e) => e.priority === "URGENT").length.toString()}
              />
              <StatCard
                label="High priority"
                value={emails.filter((e) => e.priority === "HIGH").length.toString()}
              />
              <StatCard label="This week" value="4" />
            </div>

            {/* Email List */}
            <div className="mt-6 space-y-4">
              {filteredEmails.length > 0 ? (
                filteredEmails.map((email) => (
                  <EmailCard key={email.subject} email={email} />
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                  <Search
                    size={28}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-4 font-bold text-slate-800">
                    No emails found
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Try changing your search or priority filter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* Stat Card */
function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-400">{label}</p>

      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

/* Email Card */
function EmailCard({
  email,
}: {
  email: {
    sender: string;
    email: string;
    subject: string;
    preview: string;
    priority: string;
    category: string;
    date: string;
    takeaway: string;
  };
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        {/* Main */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-4">
            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:flex">
              <Mail size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-slate-900">
                  {email.subject}
                </h3>

                <PriorityBadge priority={email.priority} />
              </div>

              <p className="mt-1 text-xs font-medium text-slate-500">
                {email.sender} · {email.email}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {email.preview}
              </p>
            </div>
          </div>

          {/* AI Takeaway */}
          <div className="mt-5 rounded-2xl bg-indigo-50/60 p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-indigo-600">
              <Sparkles size={14} />
              AI takeaway
            </div>

            <p className="mt-2 text-sm font-medium text-slate-700">
              {email.takeaway}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex shrink-0 flex-row items-center justify-between gap-4 lg:w-40 lg:flex-col lg:items-end">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Calendar size={14} />
            {email.date}
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Clock3 size={14} />
            {email.category}
          </div>

          <button
            type="button"
            className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* Priority Badge */
function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    URGENT: "bg-red-50 text-red-600",
    HIGH: "bg-orange-50 text-orange-600",
    MEDIUM: "bg-yellow-50 text-yellow-700",
    LOW: "bg-emerald-50 text-emerald-600",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
        styles[priority] || "bg-slate-100 text-slate-500"
      }`}
    >
      {priority}
    </span>
  );
}