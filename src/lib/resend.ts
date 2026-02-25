import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  // In dev we log a warning; in production this should be configured properly.
  // eslint-disable-next-line no-console
  console.warn("RESEND_API_KEY is not set. OTP emails will not be sent.");
}

export const resend = new Resend(process.env.RESEND_API_KEY || "");

