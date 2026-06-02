import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const publicRoutes = ["/", "/signin", "/signup"];
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthPage = pathname === "/signin" || pathname === "/signup";
  const isProtectedRoute = pathname.startsWith("/dashboard");

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
