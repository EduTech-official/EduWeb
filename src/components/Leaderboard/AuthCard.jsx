import React, { useState } from "react";
import { ArrowLeft, LogIn, UserPlus, Lock, Mail, User as UserIcon } from "lucide-react";
import LogoImg from "../../assets/logot.png";
import { BRANCHES, DOMAINS, signupUser, loginUser } from "./authUtils";

const AuthCard = ({ onAuthSuccess, onCancel }) => {
  const [view, setView] = useState("landing"); // "landing" | "login" | "signup"
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    domain: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!formData.branch) {
      setError("Please select your branch.");
      return;
    }
    if (!formData.domain) {
      setError("Please select your domain.");
      return;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      const user = await signupUser(formData);
      onAuthSuccess(user);
    } catch (err) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);
      const user = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      onAuthSuccess(user);
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center py-8 px-4 select-none">
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-3xl bg-[#0b1220]/90 border border-white/10 p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md text-slate-100">
        {/* Soft Ambient Glows */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[#0CF996]/10 blur-3xl" />

        {/* Top-Left Back Button */}
        {view !== "landing" && (
          <button
            type="button"
            onClick={() => {
              setError("");
              setView("landing");
            }}
            title="Go back"
            className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}

        {/* Top-Right Cancel/Close Button */}
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            title="Back to Leaderboard"
            className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/10 transition-all duration-200 active:scale-95 text-xs font-bold"
          >
            ✕
          </button>
        )}

        {/* Header Section with Brand Logo and Gradient Title */}
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="mb-3.5 relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-[#111c30] to-[#070c18] p-3 border border-white/10 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
            <img
              src={LogoImg}
              alt="EduMinerva"
              className="h-full w-full object-contain"
            />
          </div>

          <h1 className="bg-gradient-to-r from-[#0CF996] via-cyan-400 to-[#E61AA1] bg-clip-text text-transparent font-bold text-2xl tracking-tight mb-1.5">
            {view === "landing"
              ? "Skill Circle"
              : view === "login"
                ? "Login"
                : "Register"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xs leading-normal">
            {view === "landing"
              ? "Compete, earn points & climb the leaderboard"
              : view === "login"
                ? "Enter your credentials to access your portal"
                : "Create an account to join the competition"}
          </p>
        </div>

        {/* View 1: Landing (Login / Signup Selection) */}
        {view === "landing" && (
          <div className="w-full flex flex-col gap-3.5">
            <button
              id="auth-login-btn"
              type="button"
              onClick={() => {
                setError("");
                setView("login");
              }}
              style={{
                color: "#050811",
                background: "linear-gradient(135deg, #0CF996 0%, #00d2ef 100%)",
                padding: "12px 20px",
              }}
              className="group flex w-full items-center justify-between rounded-xl font-semibold text-sm transition-all duration-200 shadow-[0_4px_18px_rgba(12,249,150,0.3)] hover:shadow-[0_6px_24px_rgba(12,249,150,0.45)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </span>
              <span className="text-xs opacity-75 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>

            <button
              id="auth-signup-btn"
              type="button"
              onClick={() => {
                setError("");
                setView("signup");
              }}
              style={{ padding: "12px 20px" }}
              className="group flex w-full items-center justify-between rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#E61AA1]/40 text-white font-semibold text-sm transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <span className="flex items-center gap-2.5 text-slate-200 group-hover:text-white">
                <UserPlus className="h-4 w-4 text-pink-400" />
                <span>Register</span>
              </span>
              <span className="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        )}
        {/* View 2: Signup Form */}
        {view === "signup" && (
          <div className="w-full">
            {error && (
              <div className="mb-4 rounded-xl bg-red-950/40 border border-red-500/30 px-4 py-3 text-xs text-red-300 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="w-full space-y-4">

              <div className="relative w-full">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="block w-full box-border rounded-full border border-white/10 bg-[#070c16]/80 pl-11 pr-4 py-2.5 text-base sm:text-lg font-medium text-white placeholder:text-slate-500 placeholder:opacity-100 outline-none transition-all focus:border-[#0CF996]/60 focus:bg-[#091120] focus:shadow-[0_0_15px_rgba(12,249,150,0.15)]"
                />
              </div>


              <div className="relative">
                <select
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-[#070c16] pl-3 py-3 text-xs sm:text-sm text-slate-300 outline-none transition-all focus:border-[#0CF996]/60 focus:bg-[#091120] cursor-pointer"
                >
                  <option value="" disabled className="text-slate-500">
                    Select Branch
                  </option>
                  {BRANCHES.map((b) => (
                    <option key={b} value={b} className="bg-[#0b1220] text-white">
                      {b}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  ▼
                </div>
              </div>

              <div className="relative">
                <select
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleInputChange}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-[#070c16] pl-3 py-3 text-xs sm:text-sm text-slate-300 outline-none transition-all focus:border-[#0CF996]/60 focus:bg-[#091120] cursor-pointer"
                >
                  <option value="" disabled className="text-slate-500">
                    Select Domain
                  </option>
                  {DOMAINS.map((d) => (
                    <option key={d} value={d} className="bg-[#0b1220] text-white">
                      {d}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  ▼
                </div>
              </div>

              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full rounded-xl border border-white/10 bg-[#070c16]/80 pl-11 pr-4 py-3 text-xs sm:text-sm font-medium text-white placeholder-slate-500 outline-none transition-all focus:border-[#0CF996]/60 focus:bg-[#091120] focus:shadow-[0_0_15px_rgba(12,249,150,0.15)]"
                />
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full rounded-xl border border-white/10 bg-[#070c16]/80 pl-11 pr-4 py-3 text-xs sm:text-sm font-medium text-white placeholder-slate-500 outline-none transition-all focus:border-[#0CF996]/60 focus:bg-[#091120] focus:shadow-[0_0_15px_rgba(12,249,150,0.15)]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  color: "#050811",
                  background: "linear-gradient(135deg, #0CF996 0%, #00d2ef 100%)",
                  padding: "12px 24px",
                }}
                className="mt-4 w-full flex items-center justify-center rounded-xl text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 transition-all shadow-[0_4px_18px_rgba(12,249,150,0.3)] hover:shadow-[0_6px_24px_rgba(12,249,150,0.45)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Registering..." : "Register"}
              </button>

              <div className="pt-3 text-center text-xs text-slate-400">
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setView("login");
                  }}
                  className="px-1.5 py-0.5 font-bold text-[#0CF996] hover:underline"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        )}


        {/* View 3: Login Form */}
        {view === "login" && (
          <div className="w-full">
            {error && (
              <div className="mb-4 rounded-xl bg-red-950/40 border border-red-500/30 px-4 py-3 text-xs text-red-300 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative">
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full rounded-xl border border-white/10 bg-[#070c16]/80 pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-[#0CF996]/60 focus:bg-[#091120] focus:shadow-[0_0_15px_rgba(12,249,150,0.15)]"
                />
              </div>

              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full rounded-xl border border-white/10 bg-[#070c16]/80 pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-[#0CF996]/60 focus:bg-[#091120] focus:shadow-[0_0_15px_rgba(12,249,150,0.15)]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  color: "#050811",
                  background: "linear-gradient(135deg, #0CF996 0%, #00d2ef 100%)",
                  padding: "12px 24px",
                }}
                className="mt-4 w-full flex items-center justify-center rounded-xl text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 transition-all shadow-[0_4px_18px_rgba(12,249,150,0.3)] hover:shadow-[0_6px_24px_rgba(12,249,150,0.45)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="pt-3 text-center text-xs text-slate-400">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setView("signup");
                  }}
                  className="px-1.5 py-0.5 font-bold text-[#E61AA1] hover:underline"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCard;




