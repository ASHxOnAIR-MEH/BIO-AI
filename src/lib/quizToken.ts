import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

function key() {
  const secret = process.env.QUIZ_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("Quiz session configuration is unavailable. Please contact the kiosk team.");
  return createHash("sha256").update(secret).digest();
}

export function sealQuizToken(value: unknown, purpose: "session" | "result", expiresAt: number): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  cipher.setAAD(Buffer.from(purpose));
  const encrypted = Buffer.concat([cipher.update(JSON.stringify({ value, expiresAt }), "utf8"), cipher.final()]);
  return "v1." + Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64url");
}

export function openQuizToken<T>(token: string, purpose: "session" | "result"): T {
  if (!token.startsWith("v1.") || token.length > 3800) throw new Error("Invalid quiz session. Please start a new challenge.");
  try {
    const raw = Buffer.from(token.slice(3), "base64url");
    const decipher = createDecipheriv("aes-256-gcm", key(), raw.subarray(0, 12));
    decipher.setAAD(Buffer.from(purpose));
    decipher.setAuthTag(raw.subarray(12, 28));
    const data = JSON.parse(Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]).toString("utf8"));
    if (!Number.isFinite(data.expiresAt) || data.expiresAt <= Date.now()) throw new Error("Expired");
    return data.value as T;
  } catch {
    throw new Error("Your quiz session has expired or is invalid. Please start a new challenge.");
  }
}
