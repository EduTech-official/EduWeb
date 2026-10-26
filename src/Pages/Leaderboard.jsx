import React, { useState, useEffect } from "react";
import AuthCard from "../components/Leaderboard/AuthCard";
import AdminAuthCard from "../components/Leaderboard/AdminAuthCard";
import AdminDashboard from "../components/Leaderboard/AdminDashboard";
import MemberDashboard from "../components/Leaderboard/MemberDashboard";
import {
  getCurrentUser,
  clearCurrentUser,
  getCurrentAdmin,
  clearCurrentAdmin,
} from "../components/Leaderboard/authUtils";

const Leaderboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    const admin = getCurrentAdmin();
    if (user) setCurrentUser(user);
    if (admin) setCurrentAdmin(admin);
    setIsInitializing(false);
  }, []);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setShowAuth(false);
  };

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser(null);
  };

  const handleAdminLogout = () => {
    clearCurrentAdmin();
    setCurrentAdmin(null);
    setShowAdminAuth(false);
  };

  const handleAdminAuthSuccess = (admin) => {
    setCurrentAdmin(admin);
    setShowAdminAuth(false);
  };

  if (isInitializing) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/20 border-t-cyan-400" />
      </div>
    );
  }

  return (
    <div className="relative min-h-[85vh] w-full max-w-5xl mx-auto py-6 sm:py-8 px-4 sm:px-6">
      {currentAdmin ? (
        <AdminDashboard admin={currentAdmin} onLogout={handleAdminLogout} />
      ) : showAdminAuth ? (
        <AdminAuthCard
          onAuthSuccess={handleAdminAuthSuccess}
          onCancel={() => setShowAdminAuth(false)}
        />
      ) : showAuth ? (
        <AuthCard
          onAuthSuccess={handleAuthSuccess}
          onCancel={() => setShowAuth(false)}
        />
      ) : (
        <MemberDashboard
          user={currentUser}
          onLogout={handleLogout}
          onOpenAuth={() => setShowAuth(true)}
          onOpenAdmin={() => setShowAdminAuth(true)}
        />
      )}
    </div>
  );
};

export default Leaderboard;
