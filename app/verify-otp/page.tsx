"use client";

import {
  ArrowLeft,
  ArrowRight,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Header */}
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
            href="/login"
            className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to sign in
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Mail size={24} />
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">
              Check your email
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              We sent a 6-digit verification code to
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
              you@company.com
            </p>
          </div>

          {/* Card */}
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 sm:p-8">
            <p className="text-center text-sm font-semibold text-slate-700">
              Enter verification code
            </p>

            {/* OTP Inputs */}
            <div className="mt-5 flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="h-12 w-11 rounded-xl border border-slate-200 bg-white text-center text-lg font-bold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:h-14 sm:w-12"
                />
              ))}
            </div>

            {/* Verify */}
            <button
              type="button"
              className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#111827] text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Verify email
              <ArrowRight size={17} />
            </button>

            {/* Resend */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Didn't receive the code?
              </p>

              <button
                type="button"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
              >
                <RefreshCw size={15} />
                Resend code
              </button>
            </div>

            {/* Change email */}
            <div className="mt-6 border-t border-slate-100 pt-6 text-center">
              <Link
                href="/register"
                className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
              >
                Use a different email
              </Link>
            </div>
          </div>

          {/* Security */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={15} />
            Your verification code is secure and expires shortly.
          </div>
        </div>
      </section>
    </main>
  );
}