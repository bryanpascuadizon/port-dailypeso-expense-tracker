import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow auth and API routes to pass through without auth check
  if (pathname.startsWith("/api/auth") || pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // ✅ Ensure secure cookies are handled correctly (important on Vercel)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: true,
  });

  console.log("Middleware token:", token);

  // Redirect root route based on token
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(token ? "/transactions/daily" : "/sign-in", request.url)
    );
  }

  const publicRoutes = ["/sign-in"];
  const isPublicRoute = publicRoutes.includes(pathname);

  const protectedPaths = [
    /^\/transactions(\/.*)?$/,
    /^\/accounts(\/.*)?$/,
    /^\/summary(\/.*)?$/,
    /^\/profile(\/.*)?$/,
  ];
  const isProtected = protectedPaths.some((regex) => regex.test(pathname));

  // Redirect to sign-in if not authenticated
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Redirect to dashboard if already logged in and on public route
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/transactions/daily", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to these paths
export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/transactions/:path*",
    "/accounts/:path*",
    "/summary/:path*",
    "/profile/:path*",
  ],
};
