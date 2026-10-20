import React, { useState, useEffect } from "react";
import AuthCard from "../components/Leaderboard/AuthCard";
import MemberDashboard from "../components/Leaderboard/MemberDashboard";
import { getCurrentUser, clearCurrentUser } from "../components/Leaderboard/authUtils";

const Leaderboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Check if user session already exists in localStorage
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setIsInitializing(false);
  }, []);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser(null);
  };

  if (isInitializing) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-cyan-400" />
      </div>
    );
  }

  return (
    <div className="relative min-h-[85vh] w-full py-6">
      {currentUser ? (
        <MemberDashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <AuthCard onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
};

export default Leaderboard;
