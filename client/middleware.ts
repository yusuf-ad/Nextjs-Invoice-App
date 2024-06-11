import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("request", request.nextUrl.pathname);

  NextResponse.next();
}

export const config = {
  matcher: "/app",
};
