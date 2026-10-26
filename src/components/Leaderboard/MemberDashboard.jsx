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
  Sparkles,
  FileText,
  Download,
  ArrowRight,
  CheckCircle2,
  Shield,
} from "lucide-react";
import {
  BRANCHES,
  DOMAINS,
  getLeaderboardList,
  fetchLiveLeaderboard,
  rankLeaderboardEntries,
} from "./authUtils";
import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { fetchPublishedQuizzes, fetchPublishedResources } from "./contentApi";

const MemberDashboard = ({ user, onLogout, onOpenAuth, onOpenAdmin }) => {
  const [activeTab, setActiveTab] = useState("leaderboard"); // "leaderboard" | "quiz" | "resources"
  const [selectedDomain, setSelectedDomain] = useState(
    () => user?.domain || DOMAINS[0]
  );
  const [selectedBranch, setSelectedBranch] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showHowPointsWork, setShowHowPointsWork] = useState(false);
  const [domainQuizzes, setDomainQuizzes] = useState([]);
  const [domainResources, setDomainResources] = useState([]);
  const [contentLoading, setContentLoading] = useState(false);

  const [fullLeaderboard, setFullLeaderboard] = useState(() => getLeaderboardList());

  useEffect(() => {
    if (user?.domain) {
      setSelectedDomain(user.domain);
    }
  }, [user?.domain]);

  // Fetch live Supabase data on mount and listen to realtime updates
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const liveData = await fetchLiveLeaderboard();
        if (isMounted) {
          if (isSupabaseConfigured() && supabase) {
            setFullLeaderboard(liveData || []);
          } else if (liveData?.length > 0) {
            setFullLeaderboard(liveData);
          }
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

  useEffect(() => {
    let cancelled = false;
    const loadContent = async () => {
      setContentLoading(true);
      try {
        const [quizzes, resources] = await Promise.all([
          fetchPublishedQuizzes(selectedDomain),
          fetchPublishedResources(selectedDomain),
        ]);
        if (!cancelled) {
          setDomainQuizzes(quizzes);
          setDomainResources(resources);
        }
      } catch (err) {
        console.warn("Error loading domain content:", err);
      } finally {
        if (!cancelled) setContentLoading(false);
      }
    };
    loadContent();
    return () => {
      cancelled = true;
    };
  }, [selectedDomain]);

  const domainLeaderboard = useMemo(() => {
    const inDomain = fullLeaderboard.filter(
      (item) => (item.domain || "Web Development") === selectedDomain
    );
    return rankLeaderboardEntries(inDomain);
  }, [fullLeaderboard, selectedDomain]);

  // Filtered members by branch and search (within selected domain)
  const filteredList = useMemo(() => {
    return domainLeaderboard.filter((item) => {
      const matchBranch =
        selectedBranch === "ALL" || item.branch === selectedBranch;
      const matchQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.contribution &&
          item.contribution.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchBranch && matchQuery;
    });
  }, [domainLeaderboard, selectedBranch, searchQuery]);

  // Current user's index and rank info (within domain)
  const userRankIndex = useMemo(() => {
    if (!user) return -1;
    return domainLeaderboard.findIndex(
      (item) => item.email?.toLowerCase() === user.email?.toLowerCase()
    );
  }, [domainLeaderboard, user]);

  const userRank =
    userRankIndex >= 0 ? domainLeaderboard[userRankIndex].rank : "-";
  const userScore =
    userRankIndex >= 0
      ? domainLeaderboard[userRankIndex].score
      : user?.score ?? 0;

  // Calculate difference to previous position or tie status
  const rankDeltaInfo = useMemo(() => {
    if (!user) return "Complete weekly quizzes to earn challenge points";
    if (userRankIndex === 0) {
      const nextUser = domainLeaderboard[1];
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
      const prevUser = domainLeaderboard[userRankIndex - 1];
      if (prevUser.score === userScore) {
        return `Tied for #${prevUser.rank}`;
      }
      const diff = (prevUser.score || 0) - userScore;
      return `${diff} point${diff === 1 ? "" : "s"} behind #${prevUser.rank}`;
    }
    return "Complete weekly quizzes to earn challenge points";
  }, [domainLeaderboard, userRankIndex, userScore, user]);

  // Get two-letter initials
  const getInitials = (name) => {
    if (!name) return "SC";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="w-full text-slate-100 font-sans select-none">
      {/* 1. Header: Left-aligned and specific to Skill Circle */}
      <header className="mb-5 border-b border-white/[0.08] pb-4 text-left">
        <span className="text-left text-xs font-mono uppercase tracking-wider text-[#0CF996] block mb-1">
          Skill Circle Member Portal
        </span>
        <h1 className="text-left bg-gradient-to-r from-[#0CF996] via-cyan-400 to-[#E61AA1] bg-clip-text text-transparent font-bold text-2xl sm:text-3xl tracking-tight">
          {activeTab === "leaderboard"
            ? "Leaderboard"
            : activeTab === "quiz"
              ? "Quizzes & Challenges"
              : "Study Resources"}
        </h1>
        <p className="text-left mt-1.5 text-xs text-slate-400 max-w-2xl">
          {activeTab === "leaderboard"
            ? "Points are earned by completing weekly Skill Circle technical quizzes and domain challenges."
            : activeTab === "quiz"
              ? "Attempt upcoming domain quizzes, speed sprints, and challenge rounds to climb the leaderboard."
              : "Access curated notes, cheat sheets, roadmaps, and interview preparation materials."}
        </p>
      </header>

      {/* 2. User Position Section / Guest Banner */}
      {user ? (
        <section className="mb-5 w-full rounded-xl bg-[#090e1a]/90 border border-white/10 px-4 py-3 text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-left">
            <div className="flex items-center gap-3 text-left">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-mono font-medium text-slate-200 border border-white/10">
                {getInitials(user.name)}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{user.name}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-400">{user.branch || "CSE"}</span>
                  {user.domain && (
                    <>
                      <span className="text-slate-500">·</span>
                      <span className="text-cyan-400/90">{user.domain}</span>
                    </>
                  )}
                </div>
                <div className="text-slate-400 mt-0.5">
                  <span className="text-slate-300 font-mono font-semibold">
                    #{userRank}
                  </span>{" "}
                  of {domainLeaderboard.length} in {selectedDomain}{" "}
                  <span className="text-slate-500">·</span>{" "}
                  <span className="text-[#0CF996]/90">{rankDeltaInfo}</span>
                </div>
              </div>
            </div>

            <div className="border-l border-white/10 pl-4 text-left">
              <span className="text-[10px] font-mono uppercase text-slate-500 block leading-none">
                Your points
              </span>
              <span className="font-mono text-sm font-semibold text-white">
                {userScore}
              </span>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Sign out"
            style={{ padding: "8px 16px" }}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium transition-all border border-white/10 self-end sm:self-auto shrink-0 cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign out</span>
          </button>
        </section>
      ) : (
        <section className="mb-6 rounded-2xl bg-gradient-to-r from-[#0CF996]/10 via-[#090e1a]/95 to-[#E61AA1]/10 border border-white/10 p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-left shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3 text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0CF996]/15 text-[#0CF996] border border-[#0CF996]/30">
              <Trophy className="h-4 w-4" />
            </div>
            <div>
              <div className="font-semibold text-white text-xs sm:text-sm">
                Participate in weekly domain quizzes & technical challenges
              </div>
              <div className="text-slate-400 text-[11px] sm:text-xs mt-0.5">
                Earn points, level up your rank, and claim the #1 spot on your domain leaderboard.
              </div>
            </div>
          </div>
          {onOpenAuth && (
            <button
              type="button"
              onClick={onOpenAuth}
              style={{
                color: "#050811",
                background: "linear-gradient(135deg, #0CF996 0%, #00d2ef 100%)",
                padding: "10px 22px",
              }}
              className="shrink-0 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 transition-all shadow-[0_4px_18px_rgba(12,249,150,0.35)] hover:shadow-[0_6px_24px_rgba(12,249,150,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Member Login / Register
            </button>
          )}
        </section>
      )}

      {/* 3. Navigation Tabs: Leaderboard | Quizzes | Study Resources */}
      <nav aria-label="Portal Navigation" className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3 rounded-2xl bg-[#070c18]/90 p-2 border border-white/10 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setActiveTab("leaderboard")}
          style={{ padding: "10px 20px" }}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${activeTab === "leaderboard"
            ? "bg-gradient-to-r from-[#0CF996]/20 to-teal-500/20 text-[#0CF996] border border-[#0CF996]/50 shadow-[0_0_16px_rgba(12,249,150,0.25)]"
            : "text-slate-400 hover:text-white hover:bg-white/[0.05] border border-transparent"
            }`}
        >
          <Trophy className="h-4 w-4" />
          <span>Leaderboard</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("quiz")}
          style={{ padding: "10px 20px" }}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${activeTab === "quiz"
            ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-400/50 shadow-[0_0_16px_rgba(56,189,248,0.25)]"
            : "text-slate-400 hover:text-white hover:bg-white/[0.05] border border-transparent"
            }`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>Quizzes</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("resources")}
          style={{ padding: "10px 20px" }}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${activeTab === "resources"
            ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-[#E61AA1] border border-[#E61AA1]/50 shadow-[0_0_16px_rgba(230,26,161,0.25)]"
            : "text-slate-400 hover:text-white hover:bg-white/[0.05] border border-transparent"
            }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Study Resources</span>
        </button>

        {/* Admin Portal button — pushed to the far right */}
        {onOpenAdmin && (
          <button
            type="button"
            onClick={onOpenAdmin}
            style={{ padding: "8px 16px" }}
            className="ml-auto flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-mono font-medium text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/60 transition-all cursor-pointer"
            title="Admin Portal"
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Admin Portal</span>
          </button>
        )}
      </nav>

      {/* TAB 1: LEADERBOARD CONTENT */}
      {activeTab === "leaderboard" && (
        <div>
          {/* Search and Branch Filter Strip */}
          <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search member, branch, or track..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: "10px 14px 10px 38px" }}
                className="w-full rounded-xl border border-white/10 bg-[#090e1a]/80 py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-[#0CF996]/50 focus:bg-[#0c1424]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <label className="text-xs text-slate-400 font-mono">Domain:</label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                style={{ padding: "8px 14px" }}
                className="rounded-xl border border-white/10 bg-[#090e1a] px-3.5 py-2 text-xs font-mono text-slate-200 outline-none transition-all focus:border-[#0CF996]/50 cursor-pointer"
              >
                {DOMAINS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <label className="text-xs text-slate-400 font-mono ml-1">Branch:</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                style={{ padding: "8px 14px" }}
                className="rounded-xl border border-white/10 bg-[#090e1a] px-3.5 py-2 text-xs font-mono text-slate-200 outline-none transition-all focus:border-[#0CF996]/50 cursor-pointer"
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
          <main className="overflow-hidden rounded-2xl bg-[#090e1a]/80 border border-white/10 shadow-xl">
            {/* Table Header Row */}
            <div className="grid grid-cols-[50px_1fr_80px] sm:grid-cols-[64px_1.4fr_1fr_100px] items-center border-b border-white/[0.08] px-5 sm:px-6 py-3.5 sm:py-4 text-xs font-mono uppercase tracking-wider text-slate-400 border-l-2 border-l-transparent">
              <div className="text-left">Rank</div>
              <div className="text-left">Member</div>
              <div className="hidden sm:block text-left">Quizzes & Challenges</div>
              <div className="text-right">Points</div>
            </div>

            {/* Table Body Rows */}
            {filteredList.length === 0 ? (
              <div className="py-20 px-4 flex flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 text-slate-500 shadow-inner">
                  <Trophy className="h-6 w-6 text-[#0CF996]/70" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1.5">
                  No participants on the {selectedDomain} leaderboard yet
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed">
                  Be the first to complete weekly skill quizzes and technical domain challenges to claim the #1 rank!
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("quiz")}
                  style={{
                    color: "#050811",
                    background: "linear-gradient(135deg, #0CF996 0%, #00d2ef 100%)",
                    padding: "8px 20px",
                  }}
                  className="inline-flex items-center gap-2 rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(12,249,150,0.25)] hover:shadow-[0_6px_20px_rgba(12,249,150,0.4)] cursor-pointer"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>View Domain Quizzes</span>
                </button>
              </div>
            ) : (
              filteredList.map((item) => {
                const isSelf =
                  user &&
                  item.email?.toLowerCase() === user.email?.toLowerCase();
                const rankNum = item.rank < 10 ? `0${item.rank}` : `${item.rank}`;

                // Restrained rank styling
                let rankClass = "text-slate-500 font-medium";
                if (item.rank === 1) rankClass = "text-[#0CF996] font-bold";
                else if (item.rank === 2) rankClass = "text-slate-200 font-semibold";
                else if (item.rank === 3) rankClass = "text-pink-300 font-semibold";

                // Left 2px accent rule only for rank 1
                const rank1Border =
                  item.rank === 1
                    ? "border-l-2 border-l-[#0CF996]"
                    : "border-l-2 border-l-transparent";

                return (
                  <div
                    key={item.id || item.email}
                    className={`grid grid-cols-[50px_1fr_80px] sm:grid-cols-[64px_1.4fr_1fr_100px] items-center px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.06] last:border-b-0 transition-colors duration-150 ${isSelf
                      ? "bg-[#0CF996]/[0.05]"
                      : "hover:bg-white/[0.03]"
                      } ${rank1Border}`}
                  >
                    {/* Column 1: Rank */}
                    <div className="font-mono text-sm tabular-nums text-left">
                      <span className={rankClass}>{rankNum}</span>
                    </div>

                    {/* Column 2: Member Info */}
                    <div className="flex items-center gap-3.5 min-w-0 pr-3 text-left">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-mono font-semibold text-slate-200 border border-white/10">
                        {getInitials(item.name)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className="text-sm sm:text-base font-semibold text-white truncate"
                            title={item.name}
                          >
                            {item.name}
                          </span>
                          {isSelf && (
                            <span className="text-xs text-[#0CF996] font-medium">
                              (You)
                            </span>
                          )}
                        </div>
                        {/* Quizzes & Track beneath name on mobile */}
                        <div className="block sm:hidden text-xs text-slate-400 truncate mt-1">
                          {item.contribution || `${item.branch} · Member`}
                        </div>
                      </div>
                    </div>

                    {/* Column 3: Quizzes & Challenges (Desktop) */}
                    <div className="hidden sm:block text-xs sm:text-sm text-slate-300 truncate text-left">
                      <span className="text-slate-400 font-mono text-xs mr-2 px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/10">
                        {item.branch}
                      </span>
                      <span>{item.contribution || "Weekly Quiz Participant"}</span>
                    </div>

                    {/* Column 4: Points */}
                    <div className="text-right font-mono text-sm sm:text-base font-bold text-slate-100 tabular-nums">
                      {item.score?.toLocaleString()}
                    </div>
                  </div>
                );
              })
            )}
          </main>

          {/* How points work & Support */}
          <footer className="mt-8 space-y-4">
            <div className="rounded-2xl border border-white/[0.08] bg-[#090e1a]/60 p-4 sm:p-5 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setShowHowPointsWork(!showHowPointsWork)}
                className="flex w-full items-center justify-between text-slate-300 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm">
                  <HelpCircle className="h-4 w-4 text-slate-400" />
                  <span>How points are earned in Skill Circle</span>
                </div>
                {showHowPointsWork ? (
                  <ChevronUp className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                )}
              </button>

              {showHowPointsWork && (
                <div className="mt-3.5 pt-3.5 border-t border-white/[0.06] text-slate-400 font-mono text-xs space-y-2">
                  <div className="flex flex-wrap gap-y-1.5 gap-x-4">
                    <span>• Weekly Quiz Completion: 50 pts</span>
                    <span>• High Score Bonus: +30 pts</span>
                    <span>• Rapid Solver Bonus: +20 pts</span>
                    <span>• Domain Challenge Lead: 100 pts</span>
                    <span>• Domain track enrollment: 0 pts (earn via quizzes)</span>
                  </div>
                  <p className="text-slate-500 font-sans text-xs pt-1.5">
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
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <label className="text-xs text-slate-400 font-mono">Domain:</label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="rounded-lg border border-white/10 bg-[#090e1a] px-3 py-2 text-xs font-mono text-slate-300 outline-none focus:border-cyan-400/50 cursor-pointer"
            >
              {DOMAINS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          {/* Top Notice Banner */}
          <div className="flex items-center gap-3 rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 via-[#090e1a] to-blue-950/30 p-3 text-xs">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">
                Upcoming Quiz Challenges & Assessments
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Published quizzes for {selectedDomain}. Complete them to earn points on this domain&apos;s leaderboard.
              </div>
            </div>
          </div>

          {/* Quiz Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contentLoading && (
              <div className="col-span-full py-8 text-center text-sm text-slate-500 font-mono">
                Loading quizzes…
              </div>
            )}
            {!contentLoading && domainQuizzes.length === 0 && (
              <div className="col-span-full py-12 text-center text-sm text-slate-400 font-mono rounded-xl border border-white/10 bg-[#090e1a]/60">
                No quizzes published for {selectedDomain} yet. Check back after admins upload content.
              </div>
            )}
            {domainQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-[#090e1a]/80 p-4 transition-all duration-200 hover:border-cyan-500/40 hover:bg-[#0c1424]"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-400 border border-cyan-500/20">
                    {quiz.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="h-3 w-3" />
                    Live
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white mb-1">
                  {quiz.title}
                </h3>
                <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                  {quiz.description}
                </p>

                <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono text-slate-400 border-t border-white/[0.06] pt-2.5">
                  <span>{quiz.questions} Questions</span>
                  <span>·</span>
                  <span>{quiz.duration}</span>
                  <span>·</span>
                  <span className="text-[#0CF996] font-semibold">+{quiz.points} pts</span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">
                    Level: {quiz.level}
                  </span>
                  {quiz.quizUrl ? (
                    <a
                      href={quiz.quizUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-cyan-500/20 px-3 py-1.5 text-xs font-medium text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30"
                    >
                      <ArrowRight className="h-3 w-3" />
                      Start quiz
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500">Link coming soon</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STUDY RESOURCES CONTENT */}
      {activeTab === "resources" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <label className="text-xs text-slate-400 font-mono">Domain:</label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="rounded-lg border border-white/10 bg-[#090e1a] px-3 py-2 text-xs font-mono text-slate-300 outline-none focus:border-pink-400/50 cursor-pointer"
            >
              {DOMAINS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          {/* Top Notice Banner */}
          <div className="flex items-center gap-3 rounded-xl border border-pink-500/20 bg-gradient-to-r from-pink-950/40 via-[#090e1a] to-purple-950/30 p-3 text-xs">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <FileText className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">
                Curated Study Resources & Roadmaps
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Study materials for {selectedDomain}, uploaded by Skill Circle admins.
              </div>
            </div>
          </div>

          {/* Resources Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contentLoading && (
              <div className="col-span-full py-8 text-center text-sm text-slate-500 font-mono">
                Loading resources…
              </div>
            )}
            {!contentLoading && domainResources.length === 0 && (
              <div className="col-span-full py-12 text-center text-sm text-slate-400 font-mono rounded-xl border border-white/10 bg-[#090e1a]/60">
                No study resources for {selectedDomain} yet.
              </div>
            )}
            {domainResources.map((res) => (
              <div
                key={res.id}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-[#090e1a]/80 p-4 transition-all duration-200 hover:border-pink-500/40 hover:bg-[#0c1424]"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="rounded-md bg-pink-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-pink-400 border border-pink-500/20">
                    {res.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="h-3 w-3" />
                    Available
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white mb-1">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                  {res.description}
                </p>

                <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono text-slate-400 border-t border-white/[0.06] pt-2.5">
                  <span>Format: {res.format}</span>
                  <span>·</span>
                  <span>Topics: {res.topics}</span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">
                    {res.size}
                  </span>
                  {res.fileUrl ? (
                    <a
                      href={res.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-pink-500/20 px-3 py-1.5 text-xs font-medium text-pink-300 border border-pink-500/30 hover:bg-pink-500/30"
                    >
                      <Download className="h-3 w-3" />
                      Open
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500">No file link</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {onOpenAdmin && (
        <footer className="mt-10 pt-4 border-t border-white/[0.06] text-center">
          <button
            type="button"
            onClick={onOpenAdmin}
            className="text-[10px] font-mono uppercase tracking-wider text-slate-600 hover:text-amber-500/80 transition-colors"
          >
            Admin login
          </button>
        </footer>
      )}
    </div>
  );
};

export default MemberDashboard;
