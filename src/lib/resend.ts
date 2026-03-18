import { Resend } from "resend";

let cachedClient: Resend | null = null;
let warnedMissingKey = false;

/**
 * Build-safe lazy Resend client.
 * Avoid creating the client at module load time, which can fail during CI builds.
 */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    if (!warnedMissingKey) {
      // eslint-disable-next-line no-console
      console.warn("RESEND_API_KEY is not set. Email notifications will not be sent.");
      warnedMissingKey = true;
    }
    return null;
  }

  if (!cachedClient) {
    cachedClient = new Resend(apiKey);
  }
  return cachedClient;
}
