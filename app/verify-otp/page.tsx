"use client";

import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const emailFromUrl = searchParams.get("email");

    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [searchParams]);

  async function handleVerify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    const trimmedEmail = email.trim();
    const trimmedOtp = otp.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!trimmedOtp) {
      setError("Please enter the verification code.");
      return;
    }

    if (!/^\d{6}$/.test(trimmedOtp)) {
      setError("Please enter a valid 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);

      const supabase = createClient();

      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: trimmedEmail,
        token: trimmedOtp,
        type: "signup",
      });

      if (verifyError) {
        setError(verifyError.message);
        return;
      }

      setVerified(true);

      setMessage("Email verified successfully.");

      setTimeout(() => {
        router.push("/analyzer");
      }, 1000);
    } catch {
      setError("Something went wrong while verifying your email.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setMessage("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address first.");
      return;
    }

    try {
      setResending(true);

      const supabase = createClient();

      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: trimmedEmail,
      });

      if (resendError) {
        setError(resendError.message);
        return;
      }

      setMessage("A new verification code has been sent to your email.");
    } catch {
      setError("Unable to resend the verification code.");
    } finally {
      setResending(false);
    }
  }

  if (verified) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-900 dark:bg-slate-950 dark:text-white">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
            <CheckCircle2
              size={32}
              className="text-emerald-600 dark:text-emerald-400"
            />
          </div>

          <h1 className="text-2xl font-bold">
            Email verified
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Your email has been verified successfully. Redirecting you to
            MailBrief AI...
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
            <Loader2 size={16} className="animate-spin" />
            Opening your analyzer
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full">
          <Link
            href="/register"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to registration
          </Link>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#111827] text-white shadow-lg dark:bg-indigo-600">
                <span className="text-xl font-bold">M</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Verify your email
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                Enter the 6-digit verification code we sent to your email
                address.
              </p>
            </div>

            <div className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">
              <div className="flex gap-3">
                <Mail
                  size={20}
                  className="mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-400"
                />

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
                    Verification email
                  </p>

                  <p className="mt-1 break-all text-sm text-indigo-900 dark:text-indigo-100">
                    {email || "Enter your email below"}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                />
              </div>

              <div>
                <label
                  htmlFor="otp"
                  className="mb-2 block text-sm font-semibold"
                >
                  Verification code
                </label>

                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={otp}
                  onChange={(event) => {
                    const value = event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6);

                    setOtp(value);
                  }}
                  placeholder="000000"
                  className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-center text-xl font-semibold tracking-[0.4em] outline-none transition placeholder:text-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-700"
                />

                <p className="mt-2 text-center text-xs text-slate-400">
                  Enter the 6-digit code from Supabase Auth email.
                </p>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                  {error}
                </div>
              )}

              {message && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-5 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    Verify email
                  </>
                )}
              </button>
            </form>

            <div className="mt-7 border-t border-slate-100 pt-6 text-center dark:border-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Didn't receive the code?
              </p>

              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                {resending ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw size={15} />
                    Resend verification code
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={14} />
              <span>Your verification is securely handled by Supabase.</span>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            MailBrief AI · Understand every email in seconds.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Loader2 size={18} className="animate-spin" />
            Loading verification...
          </div>
        </main>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}