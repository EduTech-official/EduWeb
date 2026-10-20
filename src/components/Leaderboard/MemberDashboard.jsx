import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  LogOut,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Trophy,
  GraduationCap,
  BookOpen,
  Clock,
  Sparkles,
  FileText,
  Lock,
  Download,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { BRANCHES, getLeaderboardList, fetchLiveLeaderboard } from "./authUtils";
import { supabase, isSupabaseConfigured } from "./supabaseClient";

const UPCOMING_QUIZZES = [
  {
    id: "quiz-1",
    title: "Weekly DSA Speed Sprint #04",
    category: "Coding Sprint",
    questions: 15,
    duration: "30 Mins",
    points: 100,
    level: "Intermediate",
    status: "Uploading Soon",
    description: "Arrays, Two Pointers, and Binary Search fast-paced problem solving.",
  },
  {
    id: "quiz-2",
    title: "Web Development Mastery Test",
    category: "Domain Specific",
    questions: 20,
    duration: "40 Mins",
    points: 120,
    level: "All Levels",
    status: "Uploading Soon",
    description: "React hooks, DOM lifecycle, CSS architecture, and async JS patterns.",
  },
  {
    id: "quiz-3",
    title: "Core CS: Operating Systems & DBMS",
    category: "CS Fundamentals",
    questions: 25,
    duration: "45 Mins",
    points: 150,
    level: "Core",
    status: "Uploading Soon",
    description: "Deadlocks, CPU Scheduling, SQL normalization, indexing, and ACID transactions.",
  },
  {
    id: "quiz-4",
    title: "AI / ML Foundations Sprint",
    category: "Domain Specific",
    questions: 15,
    duration: "30 Mins",
    points: 100,
    level: "Beginner/Intermediate",
    status: "Uploading Soon",
    description: "Loss functions, regression, neural network basics, and model evaluation metrics.",
  },
];

const STUDY_RESOURCES = [
  {
    id: "res-1",
    title: "Complete DSA Pattern & Cheat Sheet",
    category: "Cheat Sheets",
    format: "PDF Guide",
    size: "4.2 MB",
    topics: "Sliding Window, Trees, Graphs, DP",
    status: "Upload Pending",
    description: "Curated collection of 15 essential algorithmic patterns with C++ & Python solutions.",
  },
  {
    id: "res-2",
    title: "Computer Networks & OS Quick Revision Notes",
    category: "Notes & PDFs",
    format: "Handwritten Notes",
    size: "8.5 MB",
    topics: "OSI Model, TCP/IP, Processes, Memory",
    status: "Upload Pending",
    description: "High-yield summary notes specifically prepared for technical rounds and semester exams.",
  },
  {
    id: "res-3",
    title: "Full-Stack Web Dev Step-by-Step Roadmap",
    category: "Roadmaps",
    format: "Curated Roadmap",
    size: "PDF & Web Link",
    topics: "Frontend, Backend, Databases, System Design",
    status: "Upload Pending",
    description: "Comprehensive step-by-step roadmap from frontend basics to full-stack deployment.",
  },
  {
    id: "res-4",
    title: "Top 100 Technical Interview Questions & Answers",
    category: "Interview Prep",
    format: "Interview Bank",
    size: "6.1 MB",
    topics: "OOPs, DBMS, System Design, Coding",
    status: "Upload Pending",
    description: "Frequently asked technical interview questions across top tier companies.",
  },
];

const MemberDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("leaderboard"); // "leaderboard" | "quiz" | "resources"
  const [selectedBranch, setSelectedBranch] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showHowPointsWork, setShowHowPointsWork] = useState(false);

  const [fullLeaderboard, setFullLeaderboard] = useState(() => getLeaderboardList());

  // Fetch live Supabase data on mount and listen to realtime updates
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const liveData = await fetchLiveLeaderboard();
        if (isMounted && liveData && liveData.length > 0) {
          setFullLeaderboard(liveData);
        }
      } catch (err) {
        console.warn("Error fetching live leaderboard:", err);
      }
    };

    loadData();

    // Supabase Realtime Subscription if configured
    let subscription = null;
    if (isSupabaseConfigured() && supabase) {
      try {
        const channel = supabase
          .channel("public:leaderboard_users")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "leaderboard_users" },
            () => {
              loadData();
            }
          )
          .subscribe();

        subscription = channel;
      } catch (err) {
        console.warn("Supabase realtime subscription failed:", err);
      }
    }

    return () => {
      isMounted = false;
      if (subscription && supabase) {
        supabase.removeChannel(subscription);
      }
    };
  }, []);

  // Filtered members by branch and search
  const filteredList = useMemo(() => {
    return fullLeaderboard.filter((item) => {
      const matchBranch =
        selectedBranch === "ALL" || item.branch === selectedBranch;
      const matchQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.contribution &&
          item.contribution.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchBranch && matchQuery;
    });
  }, [fullLeaderboard, selectedBranch, searchQuery]);

  // Current user's index and rank info
  const userRankIndex = useMemo(() => {
    if (!user) return -1;
    return fullLeaderboard.findIndex(
      (item) => item.email?.toLowerCase() === user.email?.toLowerCase()
    );
  }, [fullLeaderboard, user]);

  const userRank =
    userRankIndex >= 0 ? fullLeaderboard[userRankIndex].rank : "-";
  const userScore =
    userRankIndex >= 0
      ? fullLeaderboard[userRankIndex].score
      : user.score ?? 150;

  // Calculate difference to previous position or tie status
  const rankDeltaInfo = useMemo(() => {
    if (userRankIndex === 0) {
      const nextUser = fullLeaderboard[1];
      if (nextUser) {
        if (nextUser.score === userScore) {
          return "Tied for #1 lead";
        }
        const lead = userScore - (nextUser.score || 0);
        return `Leading by ${lead} point${lead === 1 ? "" : "s"}`;
      }
      return "Current quiz leader";
    }
    if (userRankIndex > 0) {
      const prevUser = fullLeaderboard[userRankIndex - 1];
      if (prevUser.score === userScore) {
        return `Tied for #${prevUser.rank}`;
      }
      const diff = (prevUser.score || 0) - userScore;
      return `${diff} point${diff === 1 ? "" : "s"} behind #${prevUser.rank}`;
    }
    return "Complete weekly quizzes to earn challenge points";
  }, [fullLeaderboard, userRankIndex, userScore]);

  // Get two-letter initials
  const getInitials = (name) => {
    if (!name) return "SC";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 text-slate-100 font-sans select-none">
      {/* 1. Header: Left-aligned and specific to Skill Circle */}
      <header className="mb-6 border-b border-white/[0.08] pb-6 text-left">
        <span className="text-left text-xs font-mono uppercase tracking-wider text-[#0CF996] block mb-1">
          Skill Circle Member Portal
        </span>
        <h1 className="text-left bg-gradient-to-r from-[#0CF996] via-cyan-400 to-[#E61AA1] bg-clip-text text-transparent font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight">
          {activeTab === "leaderboard"
            ? "Leaderboard"
            : activeTab === "quiz"
            ? "Quizzes & Challenges"
            : "Study Resources"}
        </h1>
        <p className="text-left mt-1.5 text-xs sm:text-sm text-slate-400 max-w-2xl">
          {activeTab === "leaderboard"
            ? "Points are earned by completing weekly Skill Circle technical quizzes and domain challenges."
            : activeTab === "quiz"
            ? "Attempt upcoming domain quizzes, speed sprints, and challenge rounds to climb the leaderboard."
            : "Access curated notes, cheat sheets, roadmaps, and interview preparation materials."}
        </p>
      </header>

      {/* 2. User Position Section: Profile & Points */}
      <section className="mb-6 rounded-xl bg-[#090e1a]/90 border border-white/10 px-5 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-mono font-medium text-slate-200">
            {getInitials(user.name)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{user.name}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-400">{user.branch || "CSE"}</span>
            </div>
            <div className="text-slate-400 mt-0.5">
              <span className="text-slate-300 font-mono font-semibold">
                #{userRank}
              </span>{" "}
              of {fullLeaderboard.length} members{" "}
              <span className="text-slate-500">·</span>{" "}
              <span className="text-[#0CF996]/90">{rankDeltaInfo}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-slate-500 block leading-none">
              Your points
            </span>
            <span className="font-mono text-sm font-semibold text-white">
              {userScore}
            </span>
          </div>

          <button
            onClick={onLogout}
            title="Sign out"
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 text-xs transition-colors pl-2 border-l border-white/10"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign out</span>
          </button>
        </div>
      </section>

      {/* 3. Navigation Tabs: Leaderboard | Quizzes | Study Resources */}
      <nav aria-label="Portal Navigation" className="mb-6 flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("leaderboard")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            activeTab === "leaderboard"
              ? "bg-gradient-to-r from-[#0CF996]/20 to-teal-500/20 text-[#0CF996] border border-[#0CF996]/40 shadow-[0_0_15px_rgba(12,249,150,0.15)]"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
          }`}
        >
          <Trophy className="h-4 w-4" />
          <span>Leaderboard</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("quiz")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            activeTab === "quiz"
              ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-400/40 shadow-[0_0_15px_rgba(56,189,248,0.15)]"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>Quizzes</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("resources")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            activeTab === "resources"
              ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-[#E61AA1] border border-[#E61AA1]/40 shadow-[0_0_15px_rgba(230,26,161,0.15)]"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Study Resources</span>
        </button>
      </nav>

      {/* TAB 1: LEADERBOARD CONTENT */}
      {activeTab === "leaderboard" && (
        <div>
          {/* Search and Branch Filter Strip */}
          <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search member, branch, or quiz track..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#090e1a]/60 py-2 pl-8 pr-3 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-[#0CF996]/50"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-400 font-mono">Branch:</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="rounded-lg border border-white/10 bg-[#090e1a] px-3 py-2 text-xs font-mono text-slate-300 outline-none transition-all focus:border-[#0CF996]/50 cursor-pointer"
              >
                <option value="ALL">All branches</option>
                {BRANCHES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Main Ranking List: The Hero Surface with Exact Column Alignments */}
          <main className="overflow-hidden rounded-2xl bg-[#090e1a]/80 border border-white/10">
            {/* Table Header Row */}
            <div className="grid grid-cols-[44px_1fr_80px] sm:grid-cols-[52px_1.2fr_1fr_90px] items-center border-b border-white/[0.08] px-4 sm:px-6 py-3 text-[11px] font-mono uppercase tracking-wider text-slate-400 border-l-2 border-l-transparent">
              <div className="text-left">Rank</div>
              <div className="text-left">Member</div>
              <div className="hidden sm:block text-left">Quizzes & Challenges</div>
              <div className="text-right">Points</div>
            </div>

            {/* Table Body Rows */}
            {filteredList.length === 0 ? (
              <div className="py-16 text-center text-xs text-slate-400 font-mono">
                No participants on the leaderboard yet. Registered members will appear here live.
              </div>
            ) : (
              filteredList.map((item) => {
                const isSelf =
                  user &&
                  item.email?.toLowerCase() === user.email?.toLowerCase();
                const rankNum = item.rank < 10 ? `0${item.rank}` : `${item.rank}`;

                // Restrained rank styling
                let rankClass = "text-slate-500";
                if (item.rank === 1) rankClass = "text-[#0CF996] font-semibold";
                else if (item.rank === 2) rankClass = "text-slate-200 font-medium";
                else if (item.rank === 3) rankClass = "text-pink-300/80 font-medium";

                // Left 2px accent rule only for rank 1
                const rank1Border =
                  item.rank === 1
                    ? "border-l-2 border-l-[#0CF996]"
                    : "border-l-2 border-l-transparent";

                return (
                  <div
                    key={item.id || item.email}
                    className={`grid grid-cols-[44px_1fr_80px] sm:grid-cols-[52px_1.2fr_1fr_90px] items-center px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.04] last:border-b-0 transition-colors duration-150 ${
                      isSelf
                        ? "bg-[#0CF996]/[0.04]"
                        : "hover:bg-white/[0.03]"
                    } ${rank1Border}`}
                  >
                    {/* Column 1: Rank */}
                    <div className="font-mono text-xs tabular-nums text-left">
                      <span className={rankClass}>{rankNum}</span>
                    </div>

                    {/* Column 2: Member Info */}
                    <div className="flex items-center gap-3 min-w-0 pr-2 text-left">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.05] text-[11px] font-mono text-slate-300">
                        {getInitials(item.name)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className="text-xs sm:text-sm font-medium text-white truncate"
                            title={item.name}
                          >
                            {item.name}
                          </span>
                          {isSelf && (
                            <span className="text-[11px] text-slate-400 font-normal">
                              (You)
                            </span>
                          )}
                        </div>
                        {/* Quizzes & Track beneath name on mobile */}
                        <div className="block sm:hidden text-[11px] text-slate-400 truncate mt-0.5">
                          {item.contribution || `${item.branch} · Member`}
                        </div>
                      </div>
                    </div>

                    {/* Column 3: Quizzes & Challenges (Desktop) */}
                    <div className="hidden sm:block text-xs text-slate-400 truncate text-left">
                      <span className="text-slate-300 font-mono text-[11px] mr-1.5">
                        [{item.branch}]
                      </span>
                      <span>{item.contribution || "Weekly Quiz Participant"}</span>
                    </div>

                    {/* Column 4: Points */}
                    <div className="text-right font-mono text-xs sm:text-sm font-semibold text-slate-200 tabular-nums">
                      {item.score?.toLocaleString()}
                    </div>
                  </div>
                );
              })
            )}
          </main>

          {/* How points work & Support */}
          <footer className="mt-8 space-y-4">
            <div className="rounded-xl border border-white/[0.08] bg-[#090e1a]/60 p-4 text-xs">
              <button
                type="button"
                onClick={() => setShowHowPointsWork(!showHowPointsWork)}
                className="flex w-full items-center justify-between text-slate-300 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2 font-mono text-xs">
                  <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                  <span>How points are earned in Skill Circle</span>
                </div>
                {showHowPointsWork ? (
                  <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                )}
              </button>

              {showHowPointsWork && (
                <div className="mt-3 pt-3 border-t border-white/[0.06] text-slate-400 font-mono text-[11px] space-y-2">
                  <div className="flex flex-wrap gap-y-1.5 gap-x-4">
                    <span>• Weekly Quiz Completion: 50 pts</span>
                    <span>• High Score Bonus: +30 pts</span>
                    <span>• Rapid Solver Bonus: +20 pts</span>
                    <span>• Domain Challenge Lead: 100 pts</span>
                    <span>• Welcome Quiz: 150 pts</span>
                  </div>
                  <p className="text-slate-500 font-sans text-xs pt-1">
                    Points are calculated automatically upon quiz submission and updated on the leaderboard.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500 px-1">
              <span>
                Rankings reflect verified Skill Circle quiz scores and challenge completions.
              </span>
              <a
                href="mailto:support@eduminerva.org?subject=Skill%20Circle%20Leaderboard%20Points%20Query"
                className="text-slate-400 hover:text-[#0CF996] transition-colors underline underline-offset-4"
              >
                Report a scoring issue
              </a>
            </div>
          </footer>
        </div>
      )}

      {/* TAB 2: QUIZZES CONTENT */}
      {activeTab === "quiz" && (
        <div className="space-y-6">
          {/* Top Notice Banner */}
          <div className="flex items-center gap-3 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 via-[#090e1a] to-blue-950/30 p-4 text-xs">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">
                Upcoming Quiz Challenges & Assessments
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                New quiz modules and live question papers will be uploaded here. Take challenges to earn points and boost your leaderboard rank.
              </div>
            </div>
          </div>

          {/* Quiz Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {UPCOMING_QUIZZES.map((quiz) => (
              <div
                key={quiz.id}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#090e1a]/80 p-5 transition-all duration-200 hover:border-cyan-500/40 hover:bg-[#0c1424]"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="rounded-md bg-cyan-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-400 border border-cyan-500/20">
                    {quiz.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    <Clock className="h-3 w-3" />
                    {quiz.status}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white mb-1.5">
                  {quiz.title}
                </h3>
                <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                  {quiz.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400 border-t border-white/[0.06] pt-3">
                  <span>{quiz.questions} Questions</span>
                  <span>·</span>
                  <span>{quiz.duration}</span>
                  <span>·</span>
                  <span className="text-[#0CF996] font-semibold">+{quiz.points} pts</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    Level: {quiz.level}
                  </span>
                  <button
                    disabled
                    className="flex items-center gap-1.5 rounded-lg bg-white/[0.05] px-3.5 py-1.5 text-xs font-medium text-slate-400 border border-white/10 cursor-not-allowed opacity-80"
                  >
                    <Lock className="h-3 w-3" />
                    <span>Upload Pending</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STUDY RESOURCES CONTENT */}
      {activeTab === "resources" && (
        <div className="space-y-6">
          {/* Top Notice Banner */}
          <div className="flex items-center gap-3 rounded-2xl border border-pink-500/20 bg-gradient-to-r from-pink-950/40 via-[#090e1a] to-purple-950/30 p-4 text-xs">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <FileText className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">
                Curated Study Resources & Roadmaps
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Technical notes, verified cheat sheets, and high-yield roadmaps will be uploaded directly to this repository.
              </div>
            </div>
          </div>

          {/* Resources Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STUDY_RESOURCES.map((res) => (
              <div
                key={res.id}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#090e1a]/80 p-5 transition-all duration-200 hover:border-pink-500/40 hover:bg-[#0c1424]"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="rounded-md bg-pink-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-pink-400 border border-pink-500/20">
                    {res.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    <Clock className="h-3 w-3" />
                    {res.status}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white mb-1.5">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                  {res.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400 border-t border-white/[0.06] pt-3">
                  <span>Format: {res.format}</span>
                  <span>·</span>
                  <span>Topics: {res.topics}</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    {res.size}
                  </span>
                  <button
                    disabled
                    className="flex items-center gap-1.5 rounded-lg bg-white/[0.05] px-3.5 py-1.5 text-xs font-medium text-slate-400 border border-white/10 cursor-not-allowed opacity-80"
                  >
                    <Download className="h-3 w-3" />
                    <span>Upload Pending</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDashboard;
