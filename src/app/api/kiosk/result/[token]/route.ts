import { NextRequest, NextResponse } from "next/server";
import { getPublicResultByToken } from "@/lib/quizEngine";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Missing token parameter." },
        { status: 400 }
      );
    }

    const result = getPublicResultByToken(token);

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This quiz result was not found, has expired, or access has been revoked.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error retrieving result.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
