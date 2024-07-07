import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/server/auth/session";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://next-invoice-app-vert.vercel.app"
    : "";

// 1. Specify protected and public routes with BASE_URL prepended
const protectedRoutes = ["/app", "/profile"].map((route) => BASE_URL + route);
const publicRoutes = ["/login", "/signup", "/"].map(
  (route) => BASE_URL + route,
);

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  // 4. Redirect
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/app")
  ) {
    return NextResponse.redirect(new URL("/app", req.nextUrl));
  }

  return NextResponse.next();
}
