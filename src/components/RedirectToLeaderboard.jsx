import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToLeaderboard = () => {
  useEffect(() => {
    window.location.href = "https://edu-leaderboard.vercel.app";
  }, []);

  return <p>Redirecting to leaderboard...</p>;
};

export default RedirectToLeaderboard;
