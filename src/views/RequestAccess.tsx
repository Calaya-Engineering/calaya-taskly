"use client";
// pages/RequestAccess.jsx
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

type DepartmentOption = {
  id: number;
  name: string;
};

type RoleOption = {
  id: number;
  name: string;
  dashboardRoute: string;
};

type HodOption = {
  id: number;
  name: string;
  email: string;
  departments: string[];
  label: string;
};

export default function RequestAccess() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    jobTitle: "",
    hodId: "",
    reason: "",
    agreeTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [departments, setDepartments] = useState<DepartmentOption[]>([]);
  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [hods, setHods] = useState<HodOption[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const response = await fetch("/api/request-access/options", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Failed to load access request options");
        }

        setDepartments(Array.isArray(data?.departments) ? data.departments : []);
        setRoles(Array.isArray(data?.roles) ? data.roles : []);
        setHods(Array.isArray(data?.hods) ? data.hods : []);
      } catch (error) {
        console.error("Failed to load request access options:", error);
        toast.error("Failed to load access request options");
      } finally {
        setOptionsLoading(false);
      }
    };

    loadOptions();
  }, []);

  const filteredHods = useMemo(() => {
    if (!formData.department) return hods;
    return hods.filter((hod) => Array.isArray(hod.departments) && hod.departments.includes(formData.department));
  }, [formData.department, hods]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      if (name === "department") {
        const nextDepartment = type === "checkbox" ? checked : value;
        const nextHodId = hods.some(
          (hod) =>
            String(hod.id) === String(prev.hodId) &&
            Array.isArray(hod.departments) &&
            hod.departments.includes(String(nextDepartment)),
        )
          ? prev.hodId
          : "";

        return {
          ...prev,
          department: String(nextDepartment),
          hodId: nextHodId,
        };
      }

      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.agreeTerms) {
      toast.warning("You must agree to the terms and conditions");
      return;
    }

    if (!formData.hodId) {
      toast.warning("Please select an HOD");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          role: formData.role,
          jobTitle: formData.jobTitle,
          hodId: formData.hodId,
          reason: formData.reason,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error || "Failed to submit request");
      }

      // Show success message
      setSubmitSuccess(true);

      // Reset form after 3 seconds and redirect
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          department: "",
          role: "",
          jobTitle: "",
          hodId: "",
          reason: "",
          agreeTerms: false,
        });
        setIsSubmitting(false);
        router.push("/login?success=true");
      }, 3000);

    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error(error instanceof Error ? error.message : "There was an error submitting your request. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#2C4B9B" }}>
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold" style={{ color: "#2C4B9B" }}>
              Request Submitted Successfully!
            </h2>
            <p className="text-gray-600 mt-2">
              Your access request has been sent to the administrator for review.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 text-left">
              <p className="text-sm text-gray-700">
                <strong>What happens next:</strong>
              </p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Administrator will review your request
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  You'll receive an email with login credentials
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Account setup typically takes 1-2 business days
                </li>
              </ul>
            </div>

            <p className="text-sm text-gray-500">
              Redirecting to login page...
            </p>

            <div className="pt-4">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-green-500 animate-progress"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#2C4B9B" }}>
      {/* Decorative Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #2C4B9B 2%, transparent 0%), 
                          radial-gradient(circle at 75px 75px, #ED3237 2%, transparent 0%)`,
          backgroundSize: '100px 100px',
        }}></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden z-10">
        <div className="h-2 bg-[#2C4B9B]"></div>

        <div className="p-8 md:p-10">
          {/* Header with Back Button */}
          <div className="mb-8">
            <Link
              href="/login"
              className="inline-flex items-center text-sm font-medium hover:underline mb-6"
              style={{ color: "#2C4B9B" }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Login
            </Link>

            <div className="text-center">
              <div className="inline-flex items-center justify-center mb-4">
                <Image
                  src="/calaya-logo.png"
                  alt="Calaya Engineering Services"
                  width={140}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold" style={{ color: "#2C4B9B" }}>
                Request Access
              </h1>
              <p className="text-gray-600 mt-2">
                Fill out this form to request access to Calaya
              </p>
            </div>
          </div>

          {/* Information Box */}
          <div className="mb-8 p-6 rounded-xl"
            style={{ backgroundColor: "rgba(109, 198, 223, 0.1)" }}>
            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 flex-shrink-0" style={{ color: "#2C4B9B" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold" style={{ color: "#2C4B9B" }}>Important Information</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Your request will be reviewed by an administrator. Once approved, you'll receive login credentials via email.
                  Please ensure all information provided is accurate.
                </p>
              </div>
            </div>
          </div>

          {/* Request Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: "#2C4B9B" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200"
                  style={{
                    borderColor: "#6DC6DF",
                    backgroundColor: "#f8fafc",
                  }}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: "#2C4B9B" }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@calaya.com"
                  className="w-full rounded-xl border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200"
                  style={{
                    borderColor: "#6DC6DF",
                    backgroundColor: "#f8fafc",
                  }}
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: "#2C4B9B" }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 800 000 0000"
                  className="w-full rounded-xl border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200"
                  style={{
                    borderColor: "#6DC6DF",
                    backgroundColor: "#f8fafc",
                  }}
                  required
                />
              </div>

              {/* Department */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: "#2C4B9B" }}>
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 appearance-none"
                  style={{
                    borderColor: "#6DC6DF",
                    backgroundColor: "#f8fafc",
                  }}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: "#2C4B9B" }}>
                  Requested Role *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 appearance-none"
                  style={{
                    borderColor: "#6DC6DF",
                    backgroundColor: "#f8fafc",
                  }}
                  required
                  disabled={optionsLoading || roles.length === 0}
                >
                  <option value="">
                    {optionsLoading
                      ? "Loading roles..."
                      : roles.length > 0
                        ? "Select Role"
                        : "No requestable roles available"}
                  </option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Title */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: "#2C4B9B" }}>
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g., Safety Officer, Engineer"
                  className="w-full rounded-xl border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200"
                  style={{
                    borderColor: "#6DC6DF",
                    backgroundColor: "#f8fafc",
                  }}
                />
              </div>
            </div>

            {/* HOD */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold" style={{ color: "#2C4B9B" }}>
                HOD *
              </label>
              <select
                name="hodId"
                value={formData.hodId}
                onChange={handleChange}
                className="w-full rounded-xl border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 appearance-none"
                style={{
                  borderColor: "#6DC6DF",
                  backgroundColor: "#f8fafc",
                }}
                required
                disabled={optionsLoading || filteredHods.length === 0}
              >
                <option value="">
                  {optionsLoading
                    ? "Loading HODs..."
                    : formData.department
                      ? "Select HOD"
                      : "Select department first"}
                </option>
                {filteredHods.map((hod) => (
                  <option key={hod.id} value={hod.id}>
                    {hod.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reason for Access */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold" style={{ color: "#2C4B9B" }}>
                Reason for Access Request *
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Please explain why you need access to Calaya..."
                rows={4}
                className="w-full rounded-xl border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200"
                style={{
                  borderColor: "#6DC6DF",
                  backgroundColor: "#f8fafc",
                }}
                required
              ></textarea>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-5 w-5 rounded mt-1"
                  style={{ borderColor: "#6DC6DF", accentColor: "#2C4B9B" }}
                  required
                />
                <label htmlFor="agreeTerms" className="ml-3 text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="font-semibold hover:underline" style={{ color: "#2C4B9B" }}>
                    Terms and Conditions
                  </a>{" "}
                  and confirm that all information provided is accurate. I understand that access will be
                  granted only after administrative approval.
                </label>
              </div>

              <div className="p-4 rounded-xl border-2" style={{ borderColor: "#6DC6DF" }}>
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> HOD, MD, and SuperAdmin roles cannot be requested through this form.
                  Please contact the system administrator directly for these roles.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white font-semibold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "#ED3237",
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Request...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">Submit Access Request</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#c6282d] to-[#ED3237] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold hover:underline" style={{ color: "#2C4B9B" }}>
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
            <div>
              <p>© {new Date().getFullYear()} Calaya Engineering Services Ltd.</p>
            </div>
            <div className="mt-2 md:mt-0">
              <p>For urgent access requests, contact: <strong>admin@calaya.com</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
