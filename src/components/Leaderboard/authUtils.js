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

const STORAGE_USERS_KEY = "eduminerva_skillcircle_users";
const STORAGE_CURRENT_USER_KEY = "eduminerva_skillcircle_current_user";

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
export const signupUser = async ({ name, branch, email, password }) => {
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
      email: normalizedEmail,
      password, // Stored for verification
      score: 150, // Initial welcome points
      contribution: "1 quiz · Skill Circle Starter",
      quizzes_completed: 1,
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
      email: insertedUser.email,
      score: insertedUser.score,
      contribution: insertedUser.contribution,
      quizzesCompleted: insertedUser.quizzes_completed || 1,
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
    email: normalizedEmail,
    password,
    score: 150,
    contribution: "1 quiz · Skill Circle Starter",
    quizzesCompleted: 1,
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
        email: user.email,
        score: user.score,
        contribution: user.contribution,
        quizzesCompleted: user.quizzes_completed || 1,
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
        email: item.email,
        score: item.score || 0,
        contribution: item.contribution || "Skill Circle Member",
        quizzesCompleted: item.quizzes_completed || 1,
      }));

      // Sort descending by score
      mapped.sort((a, b) => (b.score || 0) - (a.score || 0));

      let currentRank = 1;
      return mapped.map((user, index) => {
        if (index > 0 && (user.score || 0) < (mapped[index - 1].score || 0)) {
          currentRank = index + 1;
        }
        return {
          ...user,
          rank: currentRank,
        };
      });
    } catch (err) {
      console.warn("Could not fetch from Supabase:", err);
      return [];
    }
  }

  return getLeaderboardList();
};

export const getLeaderboardList = () => {
  const customUsers = getStoredUsers();
  const list = [...customUsers];

  list.sort((a, b) => (b.score || 0) - (a.score || 0));

  let currentRank = 1;
  return list.map((user, index) => {
    if (index > 0 && (user.score || 0) < (list[index - 1].score || 0)) {
      currentRank = index + 1;
    }
    return {
      ...user,
      rank: currentRank,
    };
  });
};
