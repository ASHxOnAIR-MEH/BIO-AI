import { NextRequest, NextResponse } from "next/server";
import { exportQuizSession, restoreQuizSession } from "./quizEngine";
const COOKIE = "bioai_quiz_session";

export function recoverQuizCookie(req: NextRequest, attemptId: string) {
  restoreQuizSession(req.cookies.get(COOKIE)?.value, attemptId);
}

export function attachQuizCookie(response: NextResponse, attemptId: string) {
  response.cookies.set(COOKIE, exportQuizSession(attemptId), {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "lax", path: "/api/kiosk/quiz", maxAge: 2 * 60 * 60,
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
