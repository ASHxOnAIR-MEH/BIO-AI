import { NextRequest, NextResponse } from "next/server";
import { resendResultEmailByToken } from "@/lib/quizEngine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const accessToken = (body.accessToken || "").trim();

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "Missing required accessToken." },
        { status: 400 }
      );
    }

    const emailDelivery = await resendResultEmailByToken(accessToken);

    return NextResponse.json({
      success: true,
      emailDelivery,
      message: emailDelivery.message || "Email retry processed.",
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to retry email delivery.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
