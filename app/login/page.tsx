"use client";

import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111827] text-white">
              <Mail size={20} />
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight">
                MailBrief<span className="text-indigo-600"> AI</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Understand every email
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </header>

      {/* Login */}
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <LockKeyhole size={24} />
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">
              Welcome back
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Sign in to continue to your MailBrief workspace.
            </p>
          </div>

          {/* Card */}
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 sm:p-8">
            {/* Google / Microsoft */}
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <span className="text-base font-bold">G</span>
                Google
              </button>

              <button
                type="button"
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <span className="text-base font-bold">M</span>
                Microsoft
              </button>
            </div>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium text-slate-400">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Work email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Sign in */}
            <button
              type="button"
              className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#111827] text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Sign in
              <ArrowRight size={17} />
            </button>

            {/* Register */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Create one
              </Link>
            </p>
          </div>

          {/* Security */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={15} />
            Your information is protected with secure authentication.
          </div>
        </div>
      </section>
    </main>
  );
}