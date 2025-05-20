import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Redirect root path based on session
  if (pathname === "/") {
    if (!token) {
      console.log("REDIREEEEEEEEEEEECT: ", "/sign-in");
      return NextResponse.redirect(new URL("/sign-in", request.url));
    } else {
      console.log("REDIREEEEEEEEEEEECT: ", "/transactions/daily");
      return NextResponse.redirect(new URL("/transactions/daily", request.url));
    }
  }

  const protectedPaths = [/^\/transactions/, /^\/accounts/];
  const isProtected = protectedPaths.some((regex) => regex.test(pathname));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (pathname === "/sign-in" && token) {
    return NextResponse.redirect(new URL("/transactions/daily", request.url));
  }

  return NextResponse.next();
}
