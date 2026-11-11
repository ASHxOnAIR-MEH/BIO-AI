import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase();
  const repoSlug = (process.env.VERCEL_GIT_REPO_SLUG || "").toLowerCase();
  const isKioskEnv =
    process.env.NEXT_PUBLIC_IS_KIOSK === "true" ||
    process.env.KIOSK_MODE === "true";

  const isKiosk =
    isKioskEnv ||
    repoSlug.includes("kiko") ||
    repoSlug.includes("kiosk") ||
    host.includes("kiko") ||
    host.includes("kiosk");

  if (request.nextUrl.pathname === "/" && isKiosk) {
    const url = request.nextUrl.clone();
    url.pathname = "/kiosk";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};

