import React, { useState } from "react";
import { ArrowLeft, LogIn, UserPlus, Lock, Mail, User as UserIcon } from "lucide-react";
import LogoImg from "../../assets/logot.png";
import { BRANCHES, signupUser, loginUser } from "./authUtils";

const AuthCard = ({ onAuthSuccess }) => {
  const [view, setView] = useState("landing"); // "landing" | "login" | "signup"
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
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
    <div className="flex min-h-[78vh] w-full items-center justify-center px-4 py-8 select-none">
      <div className="relative w-full max-w-[430px] overflow-hidden rounded-3xl bg-[#0b1220]/80 border border-white/10 p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md text-slate-100">
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
            className="absolute left-6 top-6 flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}

        {/* Header Section with Brand Logo and Gradient Title */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-[#111c30] to-[#070c18] p-2.5 border border-white/10 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
            <img
              src={LogoImg}
              alt="EduMinerva"
              className="h-full w-full object-contain"
            />
          </div>

          <h1 className="bg-gradient-to-r from-[#0CF996] via-cyan-400 to-[#E61AA1] bg-clip-text text-transparent font-bold text-2xl tracking-tight">
            {view === "landing"
              ? "Skill Circle"
              : view === "login"
                ? "Login"
                : "Register"}
          </h1>
        </div>

        {/* View 1: Landing (Login / Signup Selection) */}
        {view === "landing" && (
          <div className="w-full flex flex-col gap-3">
            <button
              id="auth-login-btn"
              type="button"
              onClick={() => {
                setError("");
                setView("login");
              }}
              className="group flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-[#0CF996] to-teal-400 hover:from-[#0ae68a] hover:to-teal-300 px-5 py-3.5 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_4px_20px_rgba(12,249,150,0.25)] active:scale-[0.99]"
            >
              <span className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </span>
              <span className="text-[11px] opacity-70 group-hover:translate-x-0.5 transition-transform">
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
              className="group flex w-full items-center justify-between rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#E61AA1]/40 px-5 py-3.5 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-[0.99]"
            >
              <span className="flex items-center gap-2 text-slate-200 group-hover:text-white">
                <UserPlus className="h-4 w-4 text-pink-400" />
                Register
              </span>
              <span className="text-[11px] text-slate-400 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </button>
          </div>
        )}

        {/* View 2: Signup Form */}
        {view === "signup" && (
          <div className="w-full">
            {error && (
              <div className="mb-4 rounded-xl bg-red-950/40 border border-red-500/30 px-3.5 py-2.5 text-xs text-red-300 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="w-full space-y-3">
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-white/10 bg-[#070c16]/80 pl-10 pr-4 py-2.5 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all focus:border-[#0CF996]/60 focus:bg-[#091120] focus:shadow-[0_0_15px_rgba(12,249,150,0.15)]"
                />
              </div>

              <div className="relative">
                <select
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-[#070c16] px-4 py-2.5 text-xs text-slate-300 outline-none transition-all focus:border-[#0CF996]/60 focus:bg-[#091120] cursor-pointer"
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
                <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs">
                  ▼
                </div>
              </div>

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full rounded-xl border border-white/10 bg-[#070c16]/80 pl-10 pr-4 py-2.5 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all focus:border-[#0CF996]/60 focus:bg-[#091120] focus:shadow-[0_0_15px_rgba(12,249,150,0.15)]"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full rounded-xl border border-white/10 bg-[#070c16]/80 pl-10 pr-4 py-2.5 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all focus:border-[#0CF996]/60 focus:bg-[#091120] focus:shadow-[0_0_15px_rgba(12,249,150,0.15)]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-3 w-full rounded-xl bg-gradient-to-r from-[#0CF996] to-teal-400 hover:from-[#0ae68a] hover:to-teal-300 py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-950 transition-all shadow-[0_4px_20px_rgba(12,249,150,0.25)] active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? "Registering..." : "Register"}
              </button>

              <div className="pt-2 text-center text-[11px] text-slate-400">
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setView("login");
                  }}
                  className="font-bold text-[#0CF996] hover:underline"
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
              <div className="mb-4 rounded-xl bg-red-950/40 border border-red-500/30 px-3.5 py-2.5 text-xs text-red-300 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-3.5">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full rounded-xl border border-white/10 bg-[#070c16]/80 pl-10 pr-4 py-2.5 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all focus:border-[#0CF996]/60 focus:bg-[#091120] focus:shadow-[0_0_15px_rgba(12,249,150,0.15)]"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full rounded-xl border border-white/10 bg-[#070c16]/80 pl-10 pr-4 py-2.5 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all focus:border-[#0CF996]/60 focus:bg-[#091120] focus:shadow-[0_0_15px_rgba(12,249,150,0.15)]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-3 w-full rounded-xl bg-gradient-to-r from-[#0CF996] to-teal-400 hover:from-[#0ae68a] hover:to-teal-300 py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-950 transition-all shadow-[0_4px_20px_rgba(12,249,150,0.25)] active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="pt-2 text-center text-[11px] text-slate-400">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setView("signup");
                  }}
                  className="font-bold text-[#E61AA1] hover:underline"
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




