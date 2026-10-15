import { KioskLanguage, EmailDeliveryInfo } from "@/components/kiosk/types";

/**
 * Masks an email address for privacy-safe display on kiosk screens.
 * E.g., "john.doe@example.com" -> "j***e@example.com"
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return "visitor@***";
  const [local, domain] = email.split("@");
  if (local.length <= 2) {
    return `${local[0]}***@${domain}`;
  }
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
}

interface SendEmailParams {
  toEmail: string;
  visitorName: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  resultUrl: string;
  qrCodeDataUrl: string;
  language?: KioskLanguage;
}

/**
 * Generates responsive bilingual HTML email body for quiz result delivery
 */
export function generateResultEmailHtml({
  visitorName,
  score,
  correctCount,
  totalQuestions,
  resultUrl,
  qrCodeDataUrl,
  language = "en",
}: SendEmailParams): { html: string; text: string } {
  const isMl = language === "ml";

  const greeting = isMl ? `പ്രിയ ${visitorName || "സന്ദർശകരെ"},` : `Hello ${visitorName || "Explorer"},`;
  const subject = "Your Arogyamithran Bio-AI Challenge Result | Bio-AI CoE";

  const heading = isMl
    ? "ആരോഗ്യ മിത്രൻ ബയോ-എഐ ചലഞ്ച് ഫലം"
    : "Arogyamithran Bio-AI Challenge Result";

  const introText = isMl
    ? "കേരള സ്റ്റാർട്ടപ്പ് മിഷൻ (KSUM), ഡിജിറ്റൽ ഹബ്ബ്, കൊച്ചിയിലെ ബയോ-എഐ സെന്റർ ഓഫ് എക്സലൻസ് ചലഞ്ചിൽ പങ്കെടുത്തതിന് നന്ദി. നിങ്ങളുടെ വ്യക്തിഗത ഫലം താഴെ നൽകുന്നു."
    : "Thank you for participating in the Arogyamithran Bio-AI Challenge at the Bio-AI Centre of Excellence, Kerala Startup Mission (KSUM), Digital Hub, Kochi. Your personal challenge result is ready.";

  const scoreLabel = isMl ? "നിങ്ങളുടെ സ്കോർ" : "YOUR SCORE";
  const correctLabel = isMl ? "ശരിയുത്തരങ്ങൾ" : "Correct Answers";
  const viewButtonText = isMl ? "നിങ്ങളുടെ ഫലം ഓൺലൈനിൽ കാണുക →" : "VIEW YOUR PERSONAL RESULT ONLINE →";
  const scanNotice = isMl
    ? "നിങ്ങളുടെ മൊബൈൽ ഫോണിൽ ഫലം തുറക്കാൻ താഴെയുള്ള QR കോഡ് സ്കാൻ ചെയ്യുക:"
    : "Scan this QR code with your phone camera to view your result:";

  const html = `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAFAF7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #132E27;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FAFAF7; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" max-width="600" style="max-width: 600px; background-color: #FFFFFF; border-radius: 20px; border: 2px solid #E2EADF; overflow: hidden; box-shadow: 0 4px 20px rgba(11,93,70,0.06);">
          <!-- Top Kasavu & Emerald Strip -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, #0B5D46 0%, #D4AF37 50%, #55B96A 100%);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 28px 28px 20px 28px; text-align: center; background-color: #F0F7F1;">
              <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #0B5D46;">
                Bio-AI Centre of Excellence · KSUM Digital Hub
              </p>
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #073B30; line-height: 1.3;">
                ${heading}
              </h1>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 28px;">
              <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #073B30;">
                ${greeting}
              </p>
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #244B3F;">
                ${introText}
              </p>

              <!-- Score Card -->
              <table role="presentation" width="100%" style="background-color: #F0F7F1; border-radius: 16px; border: 2px solid #55B96A; margin-bottom: 24px; text-align: center;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #0B5D46;">
                      ${scoreLabel}
                    </p>
                    <div style="font-size: 48px; font-weight: 900; color: #073B30; line-height: 1;">
                      ${score} <span style="font-size: 22px; font-weight: 600; color: #0B5D46;">/ 100</span>
                    </div>
                    <p style="margin: 12px 0 0 0; font-size: 14px; font-weight: 700; color: #0B5D46;">
                      ★ ${correctCount} / ${totalQuestions} ${correctLabel}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- QR Code & Instructions -->
              <table role="presentation" width="100%" style="margin-bottom: 24px; text-align: center;">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 600; color: #244B3F;">
                      ${scanNotice}
                    </p>
                    <div style="display: inline-block; padding: 12px; background-color: #FFFFFF; border-radius: 16px; border: 2px solid #0B5D46;">
                      <img src="${qrCodeDataUrl}" alt="Bio-AI Quiz Result QR" width="180" height="180" style="display: block; border-radius: 8px;">
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Action Button -->
              <table role="presentation" width="100%" style="margin-bottom: 24px; text-align: center;">
                <tr>
                  <td align="center">
                    <a href="${resultUrl}" target="_blank" style="display: inline-block; min-height: 48px; padding: 14px 28px; background-color: #073B30; color: #FAFAF7; text-decoration: none; font-size: 15px; font-weight: 800; border-radius: 12px; box-shadow: 0 4px 12px rgba(7,59,48,0.2);">
                      ${viewButtonText}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 10px;">
                    <p style="margin: 0; font-size: 11px; color: #527A6E;">
                      Direct Link: <a href="${resultUrl}" style="color: #0B5D46; word-break: break-all;">${resultUrl}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Arogyamithran Signoff Note -->
              <div style="padding: 16px; background-color: #FAFAF7; border-radius: 12px; border-left: 4px solid #55B96A; font-size: 12px; line-height: 1.5; color: #244B3F;">
                <p style="margin: 0 0 4px 0; font-weight: 700; color: #073B30;">
                  🌿 Arogyamithran · AI Botanical Guide
                </p>
                <p style="margin: 0;">
                  "May your curiosity for Kerala's rich biodiversity and modern Bio-AI continue to flourish!"
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 28px; background-color: #F8FAF8; border-top: 1px solid #E2EADF; text-align: center; font-size: 11px; color: #527A6E; line-height: 1.5;">
              <p style="margin: 0 0 4px 0;">
                Kerala Startup Mission (KSUM) · Digital Hub, Kalamassery, Kochi
              </p>
              <p style="margin: 0;">
                This email was sent as part of your interactive challenge participation at Huddle Global.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Arogyamithran Bio-AI Challenge Result
Bio-AI Centre of Excellence · Kerala Startup Mission (KSUM), Digital Hub, Kochi

${greeting}

${introText}

YOUR SCORE: ${score} / 100 (${correctCount} of ${totalQuestions} Correct Answers)

View your personal result link online:
${resultUrl}

Arogyamithran: "May your curiosity for Kerala's rich biodiversity and modern Bio-AI continue to flourish!"

Kerala Startup Mission (KSUM) · Digital Hub, Kochi`;

  return { html, text };
}

/**
 * Dispatches the personal result email through configured provider (Resend or SMTP),
 * or records a transparent development preview status if credentials are not yet set.
 */
export async function sendResultEmail(params: SendEmailParams): Promise<EmailDeliveryInfo> {
  const { toEmail, visitorName, score, correctCount, totalQuestions, resultUrl, qrCodeDataUrl, language } = params;
  const maskedEmail = maskEmail(toEmail);

  // Check if Resend API key is configured
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey && resendApiKey.trim().length > 0) {
    try {
      const emailContent = generateResultEmailHtml({
        toEmail,
        visitorName,
        score,
        correctCount,
        totalQuestions,
        resultUrl,
        qrCodeDataUrl,
        language,
      });

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey.trim()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "Bio-AI Kiosk <onboarding@resend.dev>",
          to: [toEmail],
          subject: "Your Arogyamithran Bio-AI Challenge Result | Bio-AI CoE",
          html: emailContent.html,
          text: emailContent.text,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          status: "failed",
          recipientEmailMasked: maskedEmail,
          lastAttemptAt: new Date().toISOString(),
          error: data.message || "Email provider rejected message.",
          attemptsCount: 1,
          message: "Failed to deliver email through configured provider.",
        };
      }

      return {
        status: "sent",
        recipientEmailMasked: maskedEmail,
        sentAt: new Date().toISOString(),
        attemptsCount: 1,
        message: "Email accepted for delivery by provider.",
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Network error during email dispatch.";
      return {
        status: "failed",
        recipientEmailMasked: maskedEmail,
        lastAttemptAt: new Date().toISOString(),
        error: errorMsg,
        attemptsCount: 1,
        message: "Email transmission failed.",
      };
    }
  }

  // Development environment status when no credentials are configured
  return {
    status: "not-configured",
    recipientEmailMasked: maskedEmail,
    lastAttemptAt: new Date().toISOString(),
    attemptsCount: 1,
    message: "Email provider (RESEND_API_KEY) is not yet configured in environment variables. Personal result link and on-screen QR code are active.",
  };
}
