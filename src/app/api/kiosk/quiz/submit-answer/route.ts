import { recoverQuizCookie, attachQuizCookie } from "@/lib/quizSessionCookie";
import { NextRequest, NextResponse } from "next/server";
import { submitQuizAnswer } from "@/lib/quizEngine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const attemptId = (body.attemptId || "").trim();
    const questionId = (body.questionId || "").trim();
    const selectedOptionIndex = body.selectedOptionIndex;

    if (!attemptId || !questionId || !Number.isInteger(selectedOptionIndex)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields: attemptId, questionId, selectedOptionIndex.",
        },
        { status: 400 }
      );
    }

    // -1 is a valid "timed-out / skipped" index — treated as wrong answer
    if (selectedOptionIndex < -1 || selectedOptionIndex > 3) {
      return NextResponse.json(
        { success: false, message: "selectedOptionIndex must be between -1 and 3." },
        { status: 400 }
      );
    }

    recoverQuizCookie(req, attemptId);
    const response = submitQuizAnswer(
      attemptId,
      questionId,
      selectedOptionIndex
    );

    return attachQuizCookie(NextResponse.json({
      result: response,
      ...response,
    }), attemptId);
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to process answer submission.";
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 400 }
    );
  }
}
