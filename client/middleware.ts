import { NextResponse, type NextRequest } from "next/server";
import { hasAuth } from "./lib/data-service";
import { cookies } from "next/headers";
import { decrypt } from "./lib/auth/session";

export async function middleware(request: NextRequest) {
  // 1. Check if route is protected
  const protectedRoutes = ["/app"];

  const currentPath = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    // 2. Check for valid session
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);

    // 3. Redirect unauthed users
    if (!session?.userId) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  //  4. Render route
  NextResponse.next();
}

export const config = {
  matcher: ["/app", "/login", "/"],
};
