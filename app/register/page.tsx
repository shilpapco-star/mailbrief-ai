"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms and Privacy Policy.");
      return;
    }

    try {
      setLoading(true);

      /*
       * Create a normal email/password account.
       * Supabase sends the confirmation email.
       *
       * Our Confirm signup template contains
       * {{ .Token }}, so the email contains the OTP.
       */
      const { data, error: signUpError } =
        await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: {
            data: {
              full_name: trimmedName,
            },
          },
        });

      if (signUpError) {
        throw signUpError;
      }

      sessionStorage.setItem(
        "mailbrief_full_name",
        trimmedName
      );

      sessionStorage.setItem(
        "mailbrief_email",
        trimmedEmail
      );

      /*
       * If Supabase immediately gives a session,
       * email confirmation is disabled.
       */
      if (data.session) {
        window.location.href = "/analyzer";
        return;
      }

      /*
       * Email confirmation is required.
       * Show our OTP page.
       */
      window.location.href =
        `/verify-otp?email=${encodeURIComponent(
          trimmedEmail
        )}`;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong while creating your account.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] px-5 py-8 text-white sm:px-6">

      {/* =====================================================
          Aurora Background
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-[-250px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[145px]" />

        <div className="absolute right-[-150px] top-[25%] h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-[135px]" />

        <div className="absolute bottom-[-180px] left-[-100px] h-[430px] w-[430px] rounded-full bg-cyan-500/10 blur-[135px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.08),transparent_38%)]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:48px_48px]" />

      </div>

      {/* =====================================================
          Top Navigation
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-6xl">

        <div className="flex items-center justify-between">

          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />

            Back to home
          </Link>

          <Link
            href="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            Already have an account?
          </Link>

        </div>

      </div>

      {/* =====================================================
          Main
      ====================================================== */}

      <div className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center justify-center py-10">

        <div className="w-full max-w-md">

          {/* =================================================
              Brand
          ================================================== */}

          <div className="mb-7 text-center">

            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] shadow-lg shadow-violet-950/20">
                <Sparkles
                  size={18}
                  className="text-violet-300"
                />
              </div>

              <span className="text-xl font-bold tracking-tight">
                Mail
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  Brief
                </span>
              </span>

            </Link>

          </div>

          {/* =================================================
              Register Card
          ================================================== */}

          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.10] bg-white/[0.055] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">

            {/* Card glow */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative">

              {/* =================================================
                  Heading
              ================================================== */}

              <div className="text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300 shadow-lg shadow-violet-950/20">
                  <Sparkles size={25} />
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300/80">
                  Get started
                </p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-[28px]">
                  Create your account
                </h1>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
                  Start understanding your emails in seconds.
                </p>

              </div>

              {/* =================================================
                  Form
              ================================================== */}

              <form
                onSubmit={handleRegister}
                className="mt-7 space-y-5"
              >

                {/* Full Name */}

                <div>

                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Full name
                  </label>

                  <div className="relative">

                    <User
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) =>
                        setFullName(e.target.value)
                      }
                      placeholder="Your full name"
                      autoComplete="name"
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-white/[0.10] bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/[0.16] focus:border-violet-400/50 focus:bg-white/[0.045] focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                  </div>

                </div>

                {/* Email */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Email address
                  </label>

                  <div className="relative">

                    <Mail
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-white/[0.10] bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/[0.16] focus:border-violet-400/50 focus:bg-white/[0.045] focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                  </div>

                </div>

                {/* Password */}

                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <LockKeyhole
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-white/[0.10] bg-black/20 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/[0.16] focus:border-violet-400/50 focus:bg-white/[0.045] focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
                      }
                      disabled={loading}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-white/[0.06] hover:text-slate-200 disabled:opacity-50"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                  <p className="mt-2 text-xs text-slate-600">
                    Use at least 6 characters.
                  </p>

                </div>

                {/* Confirm Password */}

                <div>

                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Confirm password
                  </label>

                  <div className="relative">

                    <LockKeyhole
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-white/[0.10] bg-black/20 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/[0.16] focus:border-violet-400/50 focus:bg-white/[0.045] focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                      disabled={loading}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-white/[0.06] hover:text-slate-200 disabled:opacity-50"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>

                {/* =================================================
                    Terms
                ================================================== */}

                <label className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-slate-500">

                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) =>
                      setAcceptedTerms(
                        e.target.checked
                      )
                    }
                    disabled={loading}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-violet-600"
                  />

                  <span>
                    I agree to the{" "}

                    <Link
                      href="/security"
                      className="font-medium text-violet-300 transition hover:text-violet-200 hover:underline"
                    >
                      Terms and Privacy Policy
                    </Link>
                    .
                  </span>

                </label>

                {/* =================================================
                    Error
                ================================================== */}

                {error && (
                  <div className="rounded-xl border border-red-400/15 bg-red-500/[0.08] px-4 py-3 text-sm leading-5 text-red-300">
                    {error}
                  </div>
                )}

                {/* =================================================
                    Create Account
                ================================================== */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:scale-[1.01] hover:shadow-violet-900/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account

                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </>
                  )}

                </button>

              </form>

              {/* =================================================
                  Login Link
              ================================================== */}

              <p className="mt-6 text-center text-sm text-slate-500">

                Already have an account?{" "}

                <Link
                  href="/login"
                  className="font-semibold text-violet-300 transition hover:text-violet-200"
                >
                  Sign in
                </Link>

              </p>

            </div>

          </div>

          {/* =================================================
              Security
          ================================================== */}

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-600">

            <ShieldCheck
              size={15}
              className="text-emerald-400"
            />

            Your account is protected by Supabase Auth.

          </div>

          <p className="mt-4 text-center text-xs text-slate-700">
            MailBrief AI · Your email, understood.
          </p>

        </div>

      </div>

    </main>
  );
}