"use client";

import {
  ArrowLeft,
  BarChart3,
  History,
  Mail,
  Settings,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Sidebar() {
  const pathname = usePathname();

  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("Free workspace");
  const [initials, setInitials] = useState("U");

  const navigation = [
    {
      name: "Email Analyzer",
      href: "/analyzer",
      icon: Sparkles,
    },
    {
      name: "Email History",
      href: "/history",
      icon: History,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      const name =
        profile?.full_name ||
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "User";

      const email = user.email || "Free workspace";

      setUserName(name);
      setUserEmail(email);

      const nameParts = name.trim().split(/\s+/);

      let userInitials = "U";

      if (nameParts.length >= 2) {
        userInitials =
          nameParts[0][0].toUpperCase() +
          nameParts[nameParts.length - 1][0].toUpperCase();
      } else if (nameParts[0]) {
        userInitials = nameParts[0].slice(0, 2).toUpperCase();
      }

      setInitials(userInitials);
    }

    loadUser();
  }, []);

  return (
    <aside
      className="
        sticky top-0 hidden h-screen w-72 shrink-0
        border-r border-white/50
        bg-white/55 backdrop-blur-2xl
        dark:border-white/10
        dark:bg-[#070b1a]/65
        lg:block
      "
    >
      <div className="flex h-full flex-col">

        {/* Logo */}
        <div className="border-b border-white/50 px-6 py-6 dark:border-white/10">
          <Link href="/" className="group flex items-center gap-3">
            <div
              className="
                relative flex h-11 w-11 items-center justify-center
                overflow-hidden rounded-2xl
                bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400
                text-white shadow-lg shadow-violet-500/20
                transition duration-300
                group-hover:scale-105
              "
            >
              <div className="absolute inset-0 bg-white/20" />
              <Mail size={21} className="relative" />
            </div>

            <div>
              <p className="text-[17px] font-bold tracking-tight text-slate-900 dark:text-white">
                MailBrief<span className="text-violet-600 dark:text-cyan-400"> AI</span>
              </p>

              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                AI Email Intelligence
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            Workspace
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`
                  group relative flex items-center gap-3
                  overflow-hidden rounded-2xl px-4 py-3.5
                  text-sm transition-all duration-300
                  ${
                    active
                      ? `
                        border border-violet-300/50
                        bg-gradient-to-r
                        from-violet-500/15
                        via-fuchsia-500/10
                        to-cyan-400/10
                        font-semibold text-violet-700
                        shadow-lg shadow-violet-500/10
                        dark:border-violet-400/20
                        dark:text-white
                      `
                      : `
                        border border-transparent
                        font-medium text-slate-500
                        hover:border-white/60
                        hover:bg-white/50
                        hover:text-slate-900
                        dark:text-slate-400
                        dark:hover:border-white/10
                        dark:hover:bg-white/5
                        dark:hover:text-white
                      `
                  }
                `}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-violet-500 to-cyan-400" />
                )}

                <span
                  className={`
                    flex h-9 w-9 items-center justify-center rounded-xl
                    transition-all duration-300
                    ${
                      active
                        ? "bg-white/70 text-violet-600 shadow-sm dark:bg-white/10 dark:text-cyan-300"
                        : "bg-slate-100/70 text-slate-500 group-hover:bg-white group-hover:text-violet-600 dark:bg-white/5 dark:text-slate-400 dark:group-hover:text-cyan-300"
                    }
                  `}
                >
                  <Icon size={18} />
                </span>

                <span>{item.name}</span>

                {active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
                )}
              </Link>
            );
          })}

          <div className="my-5 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/10" />

          <Link
            href="/"
            className="
              group flex items-center gap-3 rounded-2xl
              border border-transparent px-4 py-3.5
              text-sm font-medium text-slate-500
              transition-all duration-300
              hover:border-white/60
              hover:bg-white/50
              hover:text-slate-900
              dark:text-slate-400
              dark:hover:border-white/10
              dark:hover:bg-white/5
              dark:hover:text-white
            "
          >
            <span
              className="
                flex h-9 w-9 items-center justify-center rounded-xl
                bg-slate-100/70
                text-slate-500
                transition
                group-hover:bg-white
                group-hover:text-violet-600
                dark:bg-white/5
                dark:text-slate-400
                dark:group-hover:text-cyan-300
              "
            >
              <ArrowLeft size={18} />
            </span>

            Back to Home
          </Link>
        </nav>

        {/* User Card */}
        <div className="border-t border-white/50 p-4 dark:border-white/10">
          <div
            className="
              relative overflow-hidden rounded-2xl
              border border-white/70
              bg-white/60 p-4
              shadow-lg shadow-slate-900/5
              backdrop-blur-xl
              dark:border-white/10
              dark:bg-white/[0.04]
              dark:shadow-black/20
            "
          >
            {/* Ambient glow */}
            <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-violet-500/15 blur-2xl dark:bg-violet-500/20" />
            <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-cyan-400/10 blur-2xl" />

            <div className="relative flex items-center gap-3">
              <div
                className="
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-full
                  bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400
                  text-sm font-bold text-white
                  shadow-lg shadow-violet-500/20
                "
              >
                {initials}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                  {userName}
                </p>

                <p className="truncate text-xs text-slate-400 dark:text-slate-500">
                  {userEmail}
                </p>

                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.8)]" />
                  <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                    AI workspace active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}