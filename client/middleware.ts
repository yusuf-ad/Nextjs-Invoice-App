import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { decrypt, deleteSession } from "./lib/auth/session";

export async function middleware(request: NextRequest) {
  // 1. Check if route is protected
  const protectedRoutes = ["/app"];

  const currentPath = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(currentPath);

  // 2. Check for valid session
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (Date.now() > session?.expiresAt) {
    return await deleteSession();
  }

  if (isProtectedRoute) {
    // 3. Redirect unauthed users
    if (!session?.userId) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  // Define an array of paths that require session validation
  const authRequiredPaths = ["/", "/login", "/signup"];

  if (authRequiredPaths.includes(currentPath)) {
    console.log(session);
    console.log(session?.userId);

    // If a valid session exists, redirect authenticated users to the /app page
    if (session?.userId) {
      return NextResponse.redirect(new URL("/app", request.nextUrl));
    }
  }

  //  4. Render route
  NextResponse.next();
}

export const config = {
  matcher: ["/app", "/login", "/"],
};
