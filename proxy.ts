import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value, options }) => {
              request.cookies.set(name, value);

              response = NextResponse.next({
                request,
              });

              response.cookies.set(
                name,
                value,
                options
              );
            }
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const protectedRoutes = [
    "/analyzer",
    "/history",
    "/analytics",
    "/settings",
  ];

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  );

  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/verify-otp";

  // Not logged in → protect dashboard
  if (isProtectedRoute && !user) {
    const loginUrl = request.nextUrl.clone();

    loginUrl.pathname = "/login";
    loginUrl.searchParams.set(
      "redirect",
      pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  // Already logged in → don't show auth pages
  if (isAuthRoute && user) {
    return NextResponse.redirect(
      new URL("/analyzer", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/analyzer/:path*",
    "/history/:path*",
    "/analytics/:path*",
    "/settings/:path*",
    "/login",
    "/register",
    "/verify-otp",
  ],
};