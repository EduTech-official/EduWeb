import { supabase, isSupabaseConfigured } from "./supabaseClient";

export const BRANCHES = [
  "CSE",
  "CSE AIML",
  "IT",
  "ECE",
  "EEE",
  "AI DS",
  "CS BS",
];

export const DOMAINS = [
  "Data Structure",
  "Web Development",
  "Data Engineering",
];

const STORAGE_USERS_KEY = "eduminerva_skillcircle_users";
const STORAGE_CURRENT_USER_KEY = "eduminerva_skillcircle_current_user";
const STORAGE_ADMIN_KEY = "eduminerva_skillcircle_admin";

export const rankLeaderboardEntries = (list) => {
  const sorted = [...list].sort((a, b) => (b.score || 0) - (a.score || 0));
  let currentRank = 1;
  return sorted.map((user, index) => {
    if (index > 0 && (user.score || 0) < (sorted[index - 1].score || 0)) {
      currentRank = index + 1;
    }
    return { ...user, rank: currentRank };
  });
};

export const getCurrentAdmin = () => {
  try {
    const raw = localStorage.getItem(STORAGE_ADMIN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Error reading admin session:", err);
    return null;
  }
};

export const setCurrentAdmin = (admin) => {
  try {
    if (!admin) {
      localStorage.removeItem(STORAGE_ADMIN_KEY);
    } else {
      localStorage.setItem(STORAGE_ADMIN_KEY, JSON.stringify(admin));
    }
  } catch (err) {
    console.error("Error saving admin session:", err);
  }
};

export const clearCurrentAdmin = () => {
  try {
    localStorage.removeItem(STORAGE_ADMIN_KEY);
  } catch (err) {
    console.error("Error clearing admin session:", err);
  }
};

export const loginAdmin = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  if (!isSupabaseConfigured() || !supabase) {
    throw new Error("Admin login requires Supabase. Run supabase/skill_circle_schema.sql and add an admin row.");
  }

  const { data: admin, error } = await supabase
    .from("skill_circle_admins")
    .select("*")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (error) {
    throw new Error(error.message || "Failed to verify admin credentials.");
  }

  if (!admin || admin.password !== password) {
    throw new Error("Invalid admin email or password.");
  }

  const session = {
    id: admin.id,
    email: admin.email,
    name: admin.name || "Admin",
    role: "admin",
  };
  setCurrentAdmin(session);
  return session;
};

export const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error reading stored users:", err);
    return [];
  }
};

export const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Error reading current user:", err);
    return null;
  }
};

export const setCurrentUser = (user) => {
  try {
    if (!user) {
      localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    } else {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
    }
  } catch (err) {
    console.error("Error saving current user:", err);
  }
};

export const clearCurrentUser = () => {
  try {
    localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
  } catch (err) {
    console.error("Error clearing current user:", err);
  }
};

// Signup: Stores in Supabase database and local session
export const signupUser = async ({ name, branch, domain, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  // If Supabase is connected, interact with the remote database
  if (isSupabaseConfigured() && supabase) {
    // 1. Check if user with this email already exists
    const { data: existing, error: checkError } = await supabase
      .from("leaderboard_users")
      .select("id, email")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (checkError) {
      console.warn("Supabase check error:", checkError.message);
    }

    if (existing) {
      throw new Error("An account with this email already exists.");
    }

    const newUserPayload = {
      name: name.trim(),
      branch,
      domain: domain || "Web Development",
      email: normalizedEmail,
      password, // Stored for verification
      score: 0,
      contribution: domain ? `${domain} Track` : "Skill Circle Member",
      quizzes_completed: 0,
    };

    const { data: insertedUser, error: insertError } = await supabase
      .from("leaderboard_users")
      .insert([newUserPayload])
      .select()
      .single();

    if (insertError) {
      throw new Error(insertError.message || "Failed to register in Supabase database.");
    }

    const formattedUser = {
      id: insertedUser.id,
      name: insertedUser.name,
      branch: insertedUser.branch,
      domain: insertedUser.domain || domain,
      email: insertedUser.email,
      score: insertedUser.score,
      contribution: insertedUser.contribution || (domain ? `${domain} Track` : "Skill Circle Member"),
      quizzesCompleted: insertedUser.quizzes_completed || 0,
      createdAt: insertedUser.created_at,
    };

    setCurrentUser(formattedUser);
    return formattedUser;
  }

  // Fallback: LocalStorage mode
  const users = getStoredUsers();
  const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    branch,
    domain: domain || "Web Development",
    email: normalizedEmail,
    password,
    score: 0,
    contribution: domain ? `${domain} Track` : "Skill Circle Member",
    quizzesCompleted: 0,
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [...users, newUser];
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(updatedUsers));
  setCurrentUser(newUser);

  return newUser;
};

// Login: Authenticates with Supabase or fallback
export const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  // If Supabase is connected
  if (isSupabaseConfigured() && supabase) {
    const { data: user, error } = await supabase
      .from("leaderboard_users")
      .select("*")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (error) {
      throw new Error(error.message || "Failed to query database.");
    }

    if (user) {
      if (user.password && user.password !== password) {
        throw new Error("Invalid password. Please try again.");
      }

      const formattedUser = {
        id: user.id,
        name: user.name,
        branch: user.branch,
        domain: user.domain || "Web Development",
        email: user.email,
        score: user.score ?? 0,
        contribution: user.contribution,
        quizzesCompleted: user.quizzes_completed || 0,
        createdAt: user.created_at,
      };

      setCurrentUser(formattedUser);
      return formattedUser;
    }

    throw new Error("No account found with this email. Please register first.");
  }

  // Fallback LocalStorage check
  const users = getStoredUsers();
  const foundUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (foundUser) {
    if (foundUser.password !== password) {
      throw new Error("Invalid email or password.");
    }
    setCurrentUser(foundUser);
    return foundUser;
  }

  throw new Error("No account found with this email. Please register first.");
};

// Fetch live Leaderboard list from Supabase with ranked ordering
export const fetchLiveLeaderboard = async () => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("leaderboard_users")
        .select("*")
        .order("score", { ascending: false });

      if (error) {
        console.warn("Could not fetch from Supabase:", error.message);
        return [];
      }

      if (!data || data.length === 0) {
        return [];
      }

      const mapped = data.map((item) => ({
        id: item.id,
        name: item.name,
        branch: item.branch,
        domain: item.domain || "Web Development",
        email: item.email,
        score: item.score || 0,
        contribution: item.contribution || "Skill Circle Member",
        quizzesCompleted: item.quizzes_completed || 0,
      }));

      return rankLeaderboardEntries(mapped);
    } catch (err) {
      console.warn("Could not fetch from Supabase:", err);
      return [];
    }
  }

  return getLeaderboardList();
};

export const getLeaderboardList = () => {
  const customUsers = getStoredUsers();
  return rankLeaderboardEntries(customUsers);
};
