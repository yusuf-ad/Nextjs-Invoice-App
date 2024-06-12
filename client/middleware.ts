import { NextResponse, type NextRequest } from "next/server";
import { hasAuth } from "./lib/data-service";

export async function middleware(request: NextRequest) {
  const cookies = request.headers.get("cookie");

  const { isAuthenticated, message } = await hasAuth(cookies || "");

  const { pathname } = request.nextUrl;

  if (pathname === "/app" && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if ((pathname === "/" || pathname === "/login") && isAuthenticated) {
    const response = NextResponse.redirect(new URL("/app", request.url));

    response.cookies.set("showToast", "true", {
      path: "/",
      httpOnly: false,
      sameSite: "strict",
    });

    return response;
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/app", "/login", "/"],
};
