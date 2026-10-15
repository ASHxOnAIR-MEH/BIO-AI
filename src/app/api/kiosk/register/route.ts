import { NextRequest, NextResponse } from "next/server";
import { saveVisitorRegistration } from "@/lib/quizEngine";

interface RegistrationRequestBody {
  fullName?: string;
  mobile?: string;
  email?: string;
  designation?: string;
  organisation?: string;
  consent?: boolean;
  language?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RegistrationRequestBody = await req.json();

    const errors: Record<string, string> = {};

    // 1. Full Name Validation (Required)
    const fullName = (body.fullName || "").trim();
    if (!fullName) {
      errors.fullName = "Full name is required.";
    } else if (fullName.length < 2) {
      errors.fullName = "Please enter a valid full name.";
    } else if (fullName.length > 100) {
      errors.fullName = "Full name exceeds maximum length.";
    }

    // 2. Mobile Number Validation (Required: 10-digit Indian mobile)
    const mobile = (body.mobile || "").trim().replace(/\D/g, "");
    if (!mobile) {
      errors.mobile = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
      errors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    // 3. Email Address Validation (Required)
    const email = (body.email || "").trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // 4. Designation & Organisation (Optional, sanitized)
    const designation = (body.designation || "").trim().slice(0, 100);
    const organisation = (body.organisation || "").trim().slice(0, 100);

    // 5. Consent Validation (Strictly Required)
    if (body.consent !== true) {
      errors.consent = "Consent is required to continue.";
    }

    // Return validation errors if any
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors,
        },
        { status: 400 }
      );
    }

    // Generate unique, opaque registration identifier
    const timestampPart = Date.now().toString(36).toUpperCase();
    const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
    const registrationId = `BIOAI-${timestampPart}-${randomPart}`;

    // Securely associate visitor registration for result delivery (without console PII leaks)
    saveVisitorRegistration({
      registrationId,
      fullName,
      mobile,
      email,
      designation,
      organisation,
      consent: true,
      language: body.language === "ml" ? "ml" : "en",
      registeredAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        registrationId,
        mode: "development-preview",
        consentRecorded: {
          timestamp: new Date().toISOString(),
          privacyNoticeVersion: "ksum-coe-v1.0",
        },
        message:
          "Registration validated and registered successfully in development boundary.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing registration.",
      },
      { status: 500 }
    );
  }
}
