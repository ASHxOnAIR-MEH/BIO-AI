import { NextRequest, NextResponse } from "next/server";
import { startQuizAttempt } from "@/lib/quizEngine";
import { KioskLanguage } from "@/components/kiosk/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const registrationId = (body.registrationId || "").trim();
    const language: KioskLanguage = body.language === "ml" ? "ml" : "en";

    // In production, registrationId is required from Step 3 registration.
    // In dev preview, fallback to an auto-assigned registration ID if not present.
    const effectiveRegId =
      registrationId ||
      `BIOAI-DEV-${Date.now().toString(36).toUpperCase()}`;

    const { attemptId, questions } = startQuizAttempt(
      effectiveRegId,
      language
    );

    return NextResponse.json({
      success: true,
      attemptId,
      totalQuestions: questions.length,
      questions,
      language,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to initialize quiz.";
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}
