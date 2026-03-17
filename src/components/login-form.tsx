"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import OtpInput from "react-otp-input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { DEMO_CREDENTIALS } from "@/lib/auth-config";
import { useAuth } from "@/contexts/AuthContext";

type LoginStep = "credentials" | "otp";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const { setSession, clearSession } = useAuth();
  const [step, setStep] = useState<LoginStep>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [pendingUserEmail, setPendingUserEmail] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDemoDropdown, setShowDemoDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const verificationAttemptRef = useRef<string | null>(null);

  const filteredDemos = DEMO_CREDENTIALS.filter(
    (d) =>
      d.email.toLowerCase().includes(email.toLowerCase()) ||
      d.role.toLowerCase().includes(email.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDemoDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setShowSuccess(true);
      setSuccessMessage(
        "Your access request has been submitted successfully! The admin will review and create your account."
      );
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    verificationAttemptRef.current = null;
    clearSession(); // End any existing session before starting fresh login

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Unable to send verification code. Please check your credentials.");
        return;
      }

      // Admin login: no OTP, set session and redirect
      if (data.skipOtp && data.token && data.route) {
        setSession(data.token);
        router.push(data.route);
        return;
      }

      setPendingUserEmail(email);
      setStep("otp");
      setOtp("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = async (code: string) => {
    setOtp(code);
    setError(null);

    if (code.length !== 6 || !pendingUserEmail || isVerifying) return;

    const verificationKey = `${pendingUserEmail.trim().toLowerCase()}:${code}`;
    if (verificationAttemptRef.current === verificationKey) return;

    verificationAttemptRef.current = verificationKey;
    setIsVerifying(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: pendingUserEmail?.trim().toLowerCase(), otp: code }),
      });

      const data = await res.json();

      if (!res.ok) {
        verificationAttemptRef.current = null;
        clearSession(); // End any existing session on OTP failure so user can retry cleanly
        setError(data?.error || "Invalid or expired code. Please request a new one.");
        return;
      }

      if (data.token) {
        setSession(data.token);
      }

      const routeFromServer: string | undefined = data.route;
      if (routeFromServer) {
        router.push(routeFromServer);
      } else {
        router.push("/md-dashboard");
      }
    } catch {
      verificationAttemptRef.current = null;
      clearSession();
      setError("Something went wrong. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleBackToCredentials = () => {
    clearSession();
    verificationAttemptRef.current = null;
    setStep("credentials");
    setPendingUserEmail(null);
    setOtp("");
    setError(null);
  };

  const handleDemoSelect = (demo: (typeof DEMO_CREDENTIALS)[0]) => {
    setEmail(demo.email);
    setPassword(demo.password);
    setShowDemoDropdown(false);
  };

  return (
    <>
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 rounded-lg bg-green-500 px-6 py-3 text-white animate-fade-in">
          <div className="flex items-center">
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {successMessage}
          </div>
        </div>
      )}

      <div className="grid min-h-svh lg:grid-cols-2">
        {/* Left: Form */}
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/login" className="flex items-center gap-2 font-medium">
              <Image
                src="/calaya-logo.png"
                alt="Calaya Engineering Services"
                width={160}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            <div className="w-full max-w-xs">
              {step === "credentials" ? (
                <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
                  {error && (
                    <div className="w-full max-w-xs mb-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700 border border-red-200">
                      {error}
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                      Oil & Gas Task Management System
                    </p>
                  </div>
                  <div className="grid gap-6">
                    <div className="grid gap-2 relative" ref={dropdownRef}>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@calaya.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setShowDemoDropdown(true)}
                        required
                      />
                      {showDemoDropdown && (
                        <div
                          className="absolute top-full left-0 right-0 z-50 mt-1 max-h-56 overflow-auto rounded-xl border border-gray-200 bg-white shadow-none"
                          style={{ borderColor: "rgba(44,75,155,0.2)" }}
                        >
                          {filteredDemos.length > 0 ? (
                            filteredDemos.map((demo) => (
                              <button
                                key={demo.email}
                                type="button"
                                onClick={() => handleDemoSelect(demo)}
                                className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 transition-colors"
                                style={{ color: "#2C4B9B" }}
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold" style={{ backgroundColor: "rgba(237,50,55,0.15)", color: "#ED3237" }}>
                                  {demo.role.charAt(0)}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-semibold truncate">{demo.role}</p>
                                  <p className="text-xs text-gray-600 truncate">{demo.email}</p>
                                </div>
                                <span className="text-xs text-gray-500">demo123</span>
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-6 text-center text-sm text-gray-500">
                              No demo accounts match
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          href="/request-access"
                          className="ml-auto text-sm text-primary underline-offset-4 hover:underline"
                          style={{ color: "#2C4B9B" }}
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <PasswordInput
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      style={{ backgroundColor: "#ED3237" }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending code..." : "Sign In"}
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/request-access" className="underline underline-offset-4" style={{ color: "#2C4B9B" }}>
                      Request access
                    </Link>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col gap-6">
                  {error && (
                    <div className="w-full max-w-xs mb-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700 border border-red-200">
                      {error}
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Enter verification code</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                      We sent a 6-digit code to {pendingUserEmail}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <OtpInput
                      value={otp}
                      onChange={handleOtpChange}
                      numInputs={6}
                      renderSeparator={<span style={{ width: "8px" }} />}
                      inputType="tel"
                      shouldAutoFocus
                      inputStyle={{
                        border: "1px solid #CFD3DB",
                        borderRadius: "8px",
                        width: "54px",
                        height: "54px",
                        fontSize: "18px",
                        color: "#000",
                        fontWeight: "400",
                        caretColor: "#2C4B9B",
                      }}
                      renderInput={(props) => <input {...props} />}
                    />
                    {isVerifying && (
                      <p className="text-xs text-muted-foreground">Verifying code...</p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBackToCredentials}
                    className="w-full"
                    style={{ color: "#2C4B9B" }}
                  >
                    Back to login
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Oil rig image */}
        <div className="relative hidden lg:block overflow-hidden bg-gray-900">
          <Image
            src="/rig_image.jpeg"
            alt="Offshore oil rig"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
        </div>
      </div>
    </>
  );
}
