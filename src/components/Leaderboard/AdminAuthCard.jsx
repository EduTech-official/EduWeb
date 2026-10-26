import React, { useState } from "react";
import { ArrowLeft, Shield, LogIn } from "lucide-react";
import LogoImg from "../../assets/logot.png";
import { loginAdmin } from "./authUtils";

const AdminAuthCard = ({ onAuthSuccess, onCancel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter admin email and password.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const admin = await loginAdmin({ email, password });
      onAuthSuccess(admin);
    } catch (err) {
      setError(err.message || "Admin login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center py-8 px-4 select-none">
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-3xl bg-[#0b1220]/90 border border-amber-500/20 p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md text-slate-100">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            title="Back"
            className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}

        <div className="mb-7 flex flex-col items-center text-center">
          <div className="mb-3.5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-amber-950/80 to-[#070c18] p-3 border border-amber-500/30">
            <img src={LogoImg} alt="EduMinerva" className="h-full w-full object-contain" />
          </div>
          <h1 className="font-bold text-2xl text-amber-400 mb-1.5 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Admin Portal
          </h1>
          <p className="text-xs text-slate-400 max-w-xs">
            Upload quizzes and study resources for each Skill Circle domain.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-950/40 border border-red-500/30 px-4 py-3 text-xs text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            className="w-full rounded-xl border border-white/10 bg-[#070c16]/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/60"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-white/10 bg-[#070c16]/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/60"
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              color: "#050811",
              background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
              padding: "12px 24px",
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl text-sm font-bold text-slate-950 shadow-[0_4px_18px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_24px_rgba(245,158,11,0.45)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer transition-all"
          >
            <LogIn className="h-4 w-4" />
            <span>{loading ? "Signing in..." : "Admin Login"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuthCard;
