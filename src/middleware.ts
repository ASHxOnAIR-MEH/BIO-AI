import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only redirect to /kiosk if explicitly configured via environment variable
  const isKioskEnv =
    process.env.NEXT_PUBLIC_IS_KIOSK === "true" ||
    process.env.KIOSK_MODE === "true";

  if (request.nextUrl.pathname === "/" && isKioskEnv) {
    const url = request.nextUrl.clone();
    url.pathname = "/kiosk";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};

