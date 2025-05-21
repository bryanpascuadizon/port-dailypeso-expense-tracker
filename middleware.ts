import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/auth") || pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

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

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/transactions/daily", request.url));
  }

  return NextResponse.next();
}

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
