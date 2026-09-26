"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function VerifyOtpContent() {
  const supabase = createClient();

  const router = useRouter();
  const searchParams = useSearchParams();

  const emailFromUrl = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromUrl);
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (emailFromUrl) {
      setEmail(emailFromUrl);
      return;
    }

    const storedEmail = sessionStorage.getItem("mailbrief_email");

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, [emailFromUrl]);

  // --------------------------------
  // Verify OTP
  // --------------------------------

  const handleVerify = async () => {
    setError("");
    setMessage("");

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedOtp = otp.trim();

    if (!trimmedEmail) {
      setError("Email address is missing.");
      return;
    }

    if (!/^\d{6}$/.test(trimmedOtp)) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const { error: verifyError } =
        await supabase.auth.verifyOtp({
          email: trimmedEmail,
          token: trimmedOtp,
          type: "email",
        });

      if (verifyError) {
        throw verifyError;
      }

      setVerified(true);
      setMessage("Email verified successfully!");

      setTimeout(() => {
        router.push("/analyzer");
      }, 1200);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Unable to verify the OTP.";

      const lower = errorMessage.toLowerCase();

      if (
        lower.includes("expired") ||
        lower.includes("invalid")
      ) {
        setError(
          "This OTP is invalid or expired. Please request a new OTP."
        );
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Resend OTP
  // --------------------------------

  const handleResend = async () => {
    setError("");
    setMessage("");

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setError("Email address is missing.");
      return;
    }

    try {
      setResending(true);

      const { error: resendError } =
        await supabase.auth.resend({
          type: "signup",
          email: trimmedEmail,
        });

      if (resendError) {
        throw resendError;
      }

      setOtp("");
      setMessage(
        "A new verification code has been sent."
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Unable to resend the OTP.";

      setError(errorMessage);
    } finally {
      setResending(false);
    }
  };

  // --------------------------------
  // Success Screen
  // --------------------------------

  if (verified) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4 text-white">

        {/* Aurora background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="absolute right-[-120px] top-20 h-[28rem] w-[28rem] rounded-full bg-cyan-400/15 blur-3xl" />

          <div className="absolute bottom-[-180px] left-1/3 h-[28rem] w-[28rem] rounded-full bg-fuchsia-600/15 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md">

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-2xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-400/20">
              <CheckCircle2 className="h-9 w-9 text-emerald-400" />
            </div>

            <h1 className="mt-6 text-2xl font-bold">
              Email verified!
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Your MailBrief account is ready.
              <br />
              Taking you to your dashboard...
            </p>

            <div className="mx-auto mt-6 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
            </div>

          </div>
        </div>
      </main>
    );
  }

  // --------------------------------
  // Main OTP Page
  // --------------------------------

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Aurora */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="absolute right-[-120px] top-10 h-[30rem] w-[30rem] rounded-full bg-cyan-400/15 blur-3xl" />

        <div className="absolute bottom-[-180px] left-1/3 h-[30rem] w-[30rem] rounded-full bg-fuchsia-600/15 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Back button */}
      <div className="absolute left-5 top-5 z-20 sm:left-8 sm:top-8">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-xl transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24">

        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-8 text-center">

            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 shadow-lg shadow-violet-500/25">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>

              <span className="text-2xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  Mail
                </span>
                Brief
              </span>
            </Link>

          </div>

          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">

            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 ring-1 ring-violet-400/20">
              <Mail className="h-7 w-7 text-violet-400" />
            </div>

            <div className="text-center">

              <h1 className="mt-5 text-2xl font-bold">
                Verify your email
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Enter the 6-digit verification code
                sent to
              </p>

              <p className="mt-1 break-all text-sm font-semibold text-slate-200">
                {email || "your email address"}
              </p>

            </div>

            {/* Email */}
            <div className="mt-7">

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email address
              </label>

              <div className="relative">

                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  disabled={
                    loading || resending
                  }
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/60 focus:ring-4 focus:ring-violet-500/10 disabled:opacity-50"
                />

              </div>

            </div>

            {/* OTP */}
            <div className="mt-5">

              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-medium text-slate-200"
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
                onChange={(e) => {
                  const value =
                    e.target.value.replace(
                      /\D/g,
                      ""
                    );

                  setOtp(value);
                }}
                disabled={
                  loading || resending
                }
                placeholder="000000"
                className="h-14 w-full rounded-xl border border-white/10 bg-white/[0.04] text-center text-2xl font-semibold tracking-[0.45em] text-white outline-none transition placeholder:text-slate-700 focus:border-violet-400/60 focus:ring-4 focus:ring-violet-500/10 disabled:opacity-50"
              />

              <p className="mt-2 text-center text-xs text-slate-500">
                Enter the 6-digit code from your email.
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-left text-sm text-red-300">
                {error}
              </div>
            )}

            {/* Success message */}
            {message && !error && (
              <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-left text-sm text-emerald-300">
                {message}
              </div>
            )}

            {/* Verify */}
            <button
              type="button"
              onClick={handleVerify}
              disabled={
                loading ||
                resending ||
                otp.length !== 6
              }
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.01] hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Verify email
                </>
              )}
            </button>

            {/* Resend */}
            <button
              type="button"
              onClick={handleResend}
              disabled={
                loading || resending
              }
              className="mx-auto mt-5 flex items-center gap-2 text-sm font-medium text-violet-400 transition hover:text-violet-300 hover:underline disabled:opacity-50"
            >
              {resending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Resend OTP
                </>
              )}
            </button>

            {/* Help */}
            <div className="mt-6 border-t border-white/10 pt-5">

              <p className="text-center text-xs leading-5 text-slate-500">
                Didn't receive the code?
                <br />
                Check your Spam or Junk folder.
              </p>

            </div>

          </div>

          {/* Security */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5" />
            Your account is protected by Supabase Auth.
          </div>

        </div>
      </div>
    </main>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#050816]">
          <Loader2 className="h-7 w-7 animate-spin text-violet-400" />
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}