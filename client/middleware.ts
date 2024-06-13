import { NextResponse, type NextRequest } from "next/server";
import { hasAuth } from "./lib/data-service";

export async function middleware(request: NextRequest) {
  const cookies = request.headers.get("cookie");

  const { isAuthenticated, message } = await hasAuth(cookies || "");

  const { pathname } = request.nextUrl;

  if (pathname === "/app" && !isAuthenticated) {
    const response = NextResponse.redirect(new URL("/", request.url));

    response.cookies.set(
      "showToast",
      "ERR:You are not logged in! Please log in to get access to the app.",
      {
        path: "/",
        httpOnly: false,
        sameSite: "strict",
        expires: new Date(Date.now() + 5 * 1000),
      },
    );

    return response;
  }

  if ((pathname === "/" || pathname === "/login") && isAuthenticated) {
    const response = NextResponse.redirect(new URL("/app", request.url));

    response.cookies.set("showToast", `SUC:You are already logged in.`, {
      path: "/app",
      httpOnly: false,
      sameSite: "strict",
      expires: new Date(Date.now() + 5 * 1000),
    });

    return response;
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/app", "/login", "/"],
};
