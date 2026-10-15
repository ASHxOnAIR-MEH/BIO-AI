import { NextRequest, NextResponse } from "next/server";
import { submitQuizAnswer } from "@/lib/quizEngine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const attemptId = (body.attemptId || "").trim();
    const questionId = (body.questionId || "").trim();
    const selectedOptionIndex = Number(body.selectedOptionIndex);

    if (!attemptId || !questionId || isNaN(selectedOptionIndex)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields: attemptId, questionId, selectedOptionIndex.",
        },
        { status: 400 }
      );
    }

    const response = submitQuizAnswer(
      attemptId,
      questionId,
      selectedOptionIndex
    );

    return NextResponse.json({
      result: response,
      ...response,
    });
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
