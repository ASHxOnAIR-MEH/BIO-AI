import { NextRequest, NextResponse } from "next/server";
import { finalizeAndPersistResult, getOngoingAttemptState } from "@/lib/quizEngine";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const attemptId = (searchParams.get("attemptId") || "").trim();
    const action = searchParams.get("action");

    if (!attemptId) {
      return NextResponse.json(
        { success: false, message: "Missing attemptId parameter." },
        { status: 400 }
      );
    }

    if (action === "recover") {
      const state = getOngoingAttemptState(attemptId);
      if (!state) {
        return NextResponse.json(
          { success: false, message: "Attempt not found for recovery." },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, ...state });
    }

    const host =
      req.headers.get("x-forwarded-host") ||
      req.headers.get("host") ||
      "localhost:3001";
    const proto = req.headers.get("x-forwarded-proto") || "http";
    const originUrl = `${proto}://${host}`;

    const result = await finalizeAndPersistResult(attemptId, originUrl);
    return NextResponse.json({ success: true, result });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to load quiz result.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
