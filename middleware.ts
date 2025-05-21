import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Middleware token:", token?.name);
  console.log(
    "Middleware secret:",
    process.env.NEXTAUTH_SECRET?.substring(0, 5)
  );

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
    // Only run middleware on these app routes
    "/",
    "/sign-in",
    "/transactions/:path*",
    "/accounts/:path*",
    "/summary/:path*",
    "/profile/:path*",
  ],
};
