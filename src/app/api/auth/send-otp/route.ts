import { NextRequest, NextResponse } from "next/server";
import { DEMO_CREDENTIALS, getRouteForRole, ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { resend } from "@/lib/resend";
import { saveOtp } from "../otp-store";
import { signAuthToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const emailLower = email.toLowerCase().trim();

    // Admin login: no OTP required
    if (emailLower === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const dbAdmin = await prisma.user.findUnique({
        where: { email: emailLower },
      });
      if (dbAdmin && verifyPassword(password, dbAdmin.password)) {
        const token = await signAuthToken({ email: dbAdmin.email, role: dbAdmin.role });
        return NextResponse.json({
          success: true,
          skipOtp: true,
          token,
          route: getRouteForRole(dbAdmin.role),
        });
      }
    }

    // 1. Check User database first
    const dbUser = await prisma.user.findUnique({
      where: { email: emailLower },
    });

    if (dbUser) {
      if (!verifyPassword(password, dbUser.password)) {
        return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
      }

      const userInfo = {
        email: dbUser.email,
        role: dbUser.role,
        route: getRouteForRole(dbUser.role),
      };

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      saveOtp(userInfo.email, otp, userInfo);

      if (!process.env.RESEND_API_KEY) {
        // eslint-disable-next-line no-console
        console.log(`OTP for ${userInfo.email}: ${otp} (RESEND_API_KEY not set, email not sent)`);
      } else {
        const { data, error } = await resend.emails.send({
          from: "Calaya Taskly <noreply@calayaengineering.com>",
          to: [userInfo.email],
          subject: "Your Calaya Taskly verification code",
          text: `Your one-time verification code is ${otp}. It expires in 5 minutes.`,
        });
        if (error) {
          // eslint-disable-next-line no-console
          console.error("Resend error:", error);
          return NextResponse.json(
            { error: `Email failed: ${error.message}. Check Resend dashboard and domain verification.` },
            { status: 500 }
          );
        }
      }

      return NextResponse.json({
        success: true,
        role: userInfo.role,
        route: userInfo.route,
      });
    }

    // 2. Fall back to demo credentials
    const demoUser = DEMO_CREDENTIALS.find(
      (demo) => demo.email.toLowerCase() === emailLower && demo.password === password
    );

    if (!demoUser) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const userInfo = {
      email: demoUser.email,
      role: demoUser.role,
      route: demoUser.route,
    };

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    saveOtp(userInfo.email, otp, userInfo);

    if (!process.env.RESEND_API_KEY) {
      // eslint-disable-next-line no-console
      console.log(`OTP for ${userInfo.email}: ${otp} (RESEND_API_KEY not set, email not sent)`);
    } else {
      const { data, error } = await resend.emails.send({
        from: "Calaya Taskly <noreply@calayaengineering.com>",
        to: [userInfo.email],
        subject: "Your Calaya Taskly verification code",
        text: `Your one-time verification code is ${otp}. It expires in 5 minutes.`,
      });
      if (error) {
        // eslint-disable-next-line no-console
        console.error("Resend error:", error);
        return NextResponse.json(
          { error: `Email failed: ${error.message}. Check Resend dashboard and domain verification.` },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      role: userInfo.role,
      route: userInfo.route,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in send-otp route:", error);
    return NextResponse.json({ error: "Failed to send OTP." }, { status: 500 });
  }
}

