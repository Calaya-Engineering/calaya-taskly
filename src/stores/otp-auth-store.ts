"use client";

import { create } from "zustand";

type VerificationStatus = "idle" | "verifying" | "success" | "error";

type OtpAuthStore = {
  otpInput: string;
  isSubmitting: boolean;
  isVerifying: boolean;
  error: string;
  resendTimer: number;
  verificationStatus: VerificationStatus;
  setOtpInput: (otp: string) => void;
  setSubmitting: (value: boolean) => void;
  setVerifying: (value: boolean) => void;
  setError: (message: string) => void;
  clearError: () => void;
  setResendTimer: (time: number) => void;
  tickResendTimer: () => void;
  setVerificationStatus: (status: VerificationStatus) => void;
  resetOtpFlow: () => void;
};

export const useOtpAuthStore = create<OtpAuthStore>((set) => ({
  otpInput: "",
  isSubmitting: false,
  isVerifying: false,
  error: "",
  resendTimer: 0,
  verificationStatus: "idle",
  setOtpInput: (otp) => set({ otpInput: otp }),
  setSubmitting: (value) => set({ isSubmitting: value }),
  setVerifying: (value) => set({ isVerifying: value }),
  setError: (message) => set({ error: message, verificationStatus: message ? "error" : "idle" }),
  clearError: () => set({ error: "", verificationStatus: "idle" }),
  setResendTimer: (time) => set({ resendTimer: Math.max(0, time) }),
  tickResendTimer: () =>
    set((state) => ({
      resendTimer: Math.max(0, state.resendTimer - 1),
    })),
  setVerificationStatus: (status) => set({ verificationStatus: status }),
  resetOtpFlow: () =>
    set({
      otpInput: "",
      isSubmitting: false,
      isVerifying: false,
      error: "",
      resendTimer: 0,
      verificationStatus: "idle",
    }),
}));

