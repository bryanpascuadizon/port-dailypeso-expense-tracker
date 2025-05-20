import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = ["/sign-in"];
  const isPublicRoute = publicRoutes.includes(pathname);

  console.log("PATHNAME: ", pathname);
  console.log("ISPUBLIC ROUTE: ", isPublicRoute);
  console.log("TOKEN: ", token?.name);

  // Root redirect based on auth
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(token ? "/transactions/daily" : "/sign-in", request.url)
    );
  }

  // Redirect protected routes if no token
  const protectedPaths = [/^\/transactions(\/.*)?$/];
  const isProtected = protectedPaths.some((regex) => regex.test(pathname));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Prevent signed-in users from accessing /sign-in
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/transactions/daily", request.url));
  }

  return NextResponse.next();
}
