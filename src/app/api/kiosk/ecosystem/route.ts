import { NextRequest, NextResponse } from "next/server";

export interface EcosystemEnquiryBody {
  fullName?: string;
  email?: string;
  mobile?: string;
  category?: string;
  organisation?: string;
  message?: string;
  consent?: boolean;
  language?: string;
}

export const VALID_ECOSYSTEM_CATEGORIES = [
  "research_collaboration",
  "startup_incubation",
  "industry_partnerships",
  "academic_internships",
  "technology_enquiry",
  "general_enquiry",
] as const;

// In-memory persistent enquiry storage for kiosk deployment boundary
interface StoredEnquiry {
  enquiryId: string;
  fullName: string;
  email: string;
  mobile: string;
  category: string;
  organisation: string;
  message: string;
  consent: boolean;
  language: string;
  createdAt: string;
}

const ecosystemEnquiries: StoredEnquiry[] = [];

export async function POST(req: NextRequest) {
  try {
    const body: EcosystemEnquiryBody = await req.json();
    const errors: Record<string, string> = {};

    // 1. Full Name Validation
    const fullName = (body.fullName || "").trim();
    if (!fullName) {
      errors.fullName = "Full name is required.";
    } else if (fullName.length < 2) {
      errors.fullName = "Please enter a valid name (at least 2 characters).";
    }

    // 2. Email Address Validation
    const email = (body.email || "").trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // 3. Mobile Number Validation
    const mobile = (body.mobile || "").trim().replace(/\D/g, "");
    if (!mobile) {
      errors.mobile = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
      errors.mobile = "Please enter a valid 10-digit Indian mobile number.";
    }

    // 4. Category Validation (Must be one of the 6 mandatory categories)
    const category = (body.category || "").trim();
    if (!category) {
      errors.category = "Please select an interest category.";
    } else if (!VALID_ECOSYSTEM_CATEGORIES.includes(category as typeof VALID_ECOSYSTEM_CATEGORIES[number])) {
      errors.category = "Invalid interest category selected.";
    }

    // 5. Organisation (Optional, sanitized)
    const organisation = (body.organisation || "").trim().slice(0, 120);

    // 6. Message / Enquiry details (Optional, sanitized)
    const message = (body.message || "").trim().slice(0, 500);

    // 7. Explicit Consent
    if (body.consent !== true) {
      errors.consent = "You must provide consent for KSUM to contact you.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors,
        },
        { status: 400 }
      );
    }

    // Generate unique enquiry ID
    const timestampPart = Date.now().toString(36).toUpperCase();
    const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
    const enquiryId = `ECO-${timestampPart}-${randomPart}`;

    const newEnquiry: StoredEnquiry = {
      enquiryId,
      fullName,
      email,
      mobile,
      category,
      organisation,
      message,
      consent: true,
      language: body.language === "ml" ? "ml" : "en",
      createdAt: new Date().toISOString(),
    };

    ecosystemEnquiries.push(newEnquiry);

    return NextResponse.json(
      {
        success: true,
        enquiryId,
        category: newEnquiry.category,
        message:
          "Your enquiry has been successfully registered with the Bio-AI Centre of Excellence and KSUM Digital Hub team.",
        timestamp: newEnquiry.createdAt,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred while recording your enquiry.",
      },
      { status: 500 }
    );
  }
}
