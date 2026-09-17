"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Bot,
  Check,
  ChevronRight,
  Lock,
  LogOut,
  Mail,
  Menu,
  Moon,
  Shield,
  User,
  X,
} from "lucide-react";

export default function SettingsPage() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyInsights, setWeeklyInsights] = useState(true);
  const [autoAnalyze, setAutoAnalyze] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 bg-white p-6 lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              MailBrief
            </Link>

            <button
              onClick={() => setMobileMenu(false)}
              className="rounded-xl p-2 hover:bg-slate-100"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="mt-10 space-y-2">
            <Link
              href="/analyzer"
              className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-100"
            >
              Email Analyzer
            </Link>

            <Link
              href="/history"
              className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-100"
            >
              Email History
            </Link>

            <Link
              href="/analytics"
              className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-100"
            >
              Analytics
            </Link>

            <Link
              href="/settings"
              className="block rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold"
            >
              Settings
            </Link>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-slate-100 px-6 py-6">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Mail<span className="text-indigo-600">Brief</span>
            </Link>

            <p className="mt-1 text-xs text-slate-400">
              Understand every email in seconds.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            <SidebarLink
              href="/analyzer"
              icon={<Mail size={18} />}
              label="Email Analyzer"
            />

            <SidebarLink
              href="/history"
              icon={<Mail size={18} />}
              label="Email History"
            />

            <SidebarLink
              href="/analytics"
              icon={<Bot size={18} />}
              label="Analytics"
            />

            <SidebarLink
              href="/settings"
              icon={<User size={18} />}
              label="Settings"
              active
            />
          </nav>

          {/* Bottom */}
          <div className="border-t border-slate-100 p-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-500 hover:bg-slate-50"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <section className="lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-5 sm:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenu(true)}
                className="rounded-xl p-2 hover:bg-slate-100 lg:hidden"
              >
                <Menu size={22} />
              </button>

              <div>
                <h1 className="text-lg font-semibold">Settings</h1>
                <p className="hidden text-xs text-slate-400 sm:block">
                  Manage your MailBrief preferences
                </p>
              </div>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
              SP
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 lg:py-10">
          {/* Page Heading */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-medium text-indigo-600">
              Account preferences
            </p>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Settings
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Customize your profile, notifications, AI behavior and account
              security.
            </p>
          </div>

          {/* Profile */}
          <SettingsSection
            icon={<User size={19} />}
            title="Profile information"
            description="Your basic account information"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField label="Full name" value="Shilpa" />
              <InputField
                label="Email address"
                value="shilpa.p.co@gmail.com"
                disabled
              />
            </div>

            <button className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
              Save changes
            </button>
          </SettingsSection>

          {/* Notifications */}
          <SettingsSection
            icon={<Bell size={19} />}
            title="Notifications"
            description="Choose how MailBrief keeps you updated"
          >
            <ToggleRow
              title="Email notifications"
              description="Receive important account and analysis notifications."
              enabled={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
            />

            <ToggleRow
              title="Weekly productivity insights"
              description="Get a weekly summary of your email activity."
              enabled={weeklyInsights}
              onChange={() => setWeeklyInsights(!weeklyInsights)}
            />
          </SettingsSection>

          {/* AI Preferences */}
          <SettingsSection
            icon={<Bot size={19} />}
            title="AI preferences"
            description="Control how MailBrief analyzes your emails"
          >
            <ToggleRow
              title="Automatic analysis"
              description="Automatically analyze emails when they are added."
              enabled={autoAnalyze}
              onChange={() => setAutoAnalyze(!autoAnalyze)}
            />

            <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                  <Bot size={19} />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    MailBrief Gemini AI Engine
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Your emails are analyzed for summaries, key points,
                    action items, important dates, priority and suggested
                    replies.
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-600">
                    <Check size={14} />
                    AI analysis enabled
                  </div>
                </div>
              </div>
            </div>
          </SettingsSection>

          {/* Security */}
          <SettingsSection
            icon={<Shield size={19} />}
            title="Security"
            description="Manage your account protection"
          >
            <div className="divide-y divide-slate-100">
              <SecurityRow
                icon={<Lock size={18} />}
                title="Password"
                description="Change your account password"
                action="Change"
              />

              <SecurityRow
                icon={<Mail size={18} />}
                title="Email verification"
                description="Your email address is verified"
                action="Verified"
                verified
              />
            </div>
          </SettingsSection>

          {/* Appearance */}
          <SettingsSection
            icon={<Moon size={19} />}
            title="Appearance"
            description="Customize the way MailBrief looks"
          >
            <ToggleRow
              title="Dark mode"
              description="Use a darker interface throughout the application."
              enabled={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />

            {!darkMode && (
              <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
                Light mode is currently active.
              </p>
            )}
          </SettingsSection>

          {/* Sign Out */}
          <section className="mt-6 rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-semibold text-slate-900">Sign out</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Sign out of your MailBrief account on this device.
                </p>
              </div>

              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50">
                <LogOut size={17} />
                Sign out
              </button>
            </div>
          </section>

          {/* Footer */}
          <div className="py-10 text-center text-xs text-slate-400">
            MailBrief AI · Your email, understood.
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- Components ---------------- */

function SidebarLink({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
        active
          ? "bg-indigo-50 font-semibold text-indigo-700"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function SettingsSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            {icon}
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>
        </div>
      </div>

      <div className="p-6">{children}</div>
    </section>
  );
}

function InputField({
  label,
  value,
  disabled = false,
}: {
  label: string;
  value: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <input
        defaultValue={value}
        disabled={disabled}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
            : "border-slate-200 bg-white text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        }`}
      />
    </label>
  );
}

function ToggleRow({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-2">
      <div>
        <h4 className="text-sm font-semibold text-slate-900">{title}</h4>

        <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      <button
        onClick={onChange}
        aria-label={`Toggle ${title}`}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-indigo-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function SecurityRow({
  icon,
  title,
  description,
  action,
  verified = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  verified?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-5 first:pt-0 last:pb-0">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          {icon}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>
      </div>

      {verified ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
          <Check size={13} />
          {action}
        </span>
      ) : (
        <button className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          {action}
          <ChevronRight size={15} />
        </button>
      )}
    </div>
  );
}