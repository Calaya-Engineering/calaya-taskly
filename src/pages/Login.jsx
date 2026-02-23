// pages/Login.jsx 
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Demo login credentials
  const demoCredentials = [
    { email: "md@calaya.com", password: "demo123", role: "MD", route: "/md-dashboard" },
    { email: "hod@calaya.com", password: "demo123", role: "HOD", route: "/hod-dashboard" },
    { email: "staff@calaya.com", password: "demo123", role: "Staff", route: "/staff-dashboard" },
    { email: "personnel@calaya.com", password: "demo123", role: "Personnel", route: "/staff-dashboard" },
    { email: "corp@calaya.com", password: "demo123", role: "Corp Member", route: "/staff-dashboard" },
    { email: "secretary@calaya.com", password: "demo123", role: "Secretary", route: "/secretary-dashboard" },
   
  ];

  // Show success message if redirected from request access
  useState(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    if (success === 'true') {
      setShowSuccess(true);
      setSuccessMessage("Your access request has been submitted successfully! The admin will review and create your account.");
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, []);

  const handleDemoLogin = (demo) => {
    setEmail(demo.email);
    setPassword(demo.password);
    
    // Simulate login and redirect
    setTimeout(() => {
      navigate(demo.route);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if entered credentials match any demo
    const matchedDemo = demoCredentials.find(
      demo => demo.email === email && demo.password === password
    );
    
    if (matchedDemo) {
      navigate(matchedDemo.route);
    } else {
      alert("Invalid credentials. Use demo logins below.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
         style={{
           background: "linear-gradient(135deg, #2C4B9B 0%, #6DC6DF 100%)",
         }}>
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {successMessage}
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl flex flex-col md:flex-row">
        
        {/* Decorative Top Accent */}
        <div className="h-2 md:hidden bg-gradient-to-r from-[#ED3237] via-[#2C4B9B] to-[#6DC6DF]"></div>
        
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          
          {/* Logo Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                 style={{ background: "linear-gradient(135deg, #2C4B9B 0%, #6DC6DF 100%)" }}>
              <span className="text-white text-2xl font-bold">C</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#2C4B9B] to-[#6DC6DF] bg-clip-text text-transparent">
              CALAYA TASKLY
            </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Oil & Gas Task Management System
            </p>
          </div>

          {/* Form Section */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold"
                     style={{ color: "#2C4B9B" }}>
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@calaya.com"
                  className="w-full rounded-xl border-2 px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 hover:border-opacity-80"
                  style={{
                    borderColor: "#6DC6DF",
                    backgroundColor: "#f8fafc",
                    focusRingColor: "#2C4B9B",
                  }}
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2"
                     style={{ color: "#6DC6DF" }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold"
                       style={{ color: "#2C4B9B" }}>
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm hover:underline transition-colors"
                      style={{ color: "#6DC6DF" }}>
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border-2 px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 hover:border-opacity-80"
                  style={{
                    borderColor: "#6DC6DF",
                    backgroundColor: "#f8fafc",
                    focusRingColor: "#2C4B9B",
                  }}
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2"
                     style={{ color: "#6DC6DF" }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded"
                style={{ borderColor: "#6DC6DF", accentColor: "#2C4B9B" }}
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full text-white font-semibold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl relative overflow-hidden group"
              style={{
                backgroundColor: "#ED3237",
              }}
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#c6282d] to-[#ED3237] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/request-access" className="font-semibold hover:underline transition-colors"
                 style={{ color: "#2C4B9B" }}>
                Request access
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Demo Logins */}
        <div className="w-full md:w-1/2 p-8 md:p-10"
             style={{
               background: "linear-gradient(135deg, #2C4B9B 0%, #1a2c66 100%)",
             }}>
          <div className="h-full flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Demo Access
            </h2>
            <p className="text-gray-300 mb-8 text-center">
              Click any role below to instantly login and explore the dashboard
            </p>
            
            <div className="space-y-4">
              {demoCredentials.map((demo, index) => (
                <button
                  key={index}
                  onClick={() => handleDemoLogin(demo)}
                  className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-4 transition-all duration-300 transform hover:scale-[1.02] group"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                         style={{
                           background: "linear-gradient(135deg, #ED3237 0%, #ff6b6b 100%)"
                         }}>
                      <span className="text-white font-bold">
                        {demo.role.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="text-white font-semibold">{demo.role}</h3>
                      <p className="text-gray-300 text-sm">{demo.email}</p>
                    </div>
                    <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 p-4 bg-black/20 rounded-xl">
              <p className="text-gray-300 text-sm text-center">
                <strong>Password for all demo accounts:</strong> demo123
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 w-full text-center">
        <p className="text-white/80 text-sm">
          © {new Date().getFullYear()} Calaya Engineering Services Ltd. • All rights reserved.
        </p>
      </div>
    </div>
  );
}