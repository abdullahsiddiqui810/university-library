
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  const isAuthPage =
    pathname === "/sign-in" ||
    pathname === "/sign-up";

  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(
      new URL("/sign-in", req.url)
    );
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
