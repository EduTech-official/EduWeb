import React, { useCallback, useEffect, useState } from "react";
import {
  LogOut,
  Plus,
  Trash2,
  BookOpen,
  GraduationCap,
  RefreshCw,
} from "lucide-react";
import { DOMAINS } from "./authUtils";
import {
  fetchAllQuizzes,
  fetchAllResources,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  createResource,
  updateResource,
  deleteResource,
  uploadResourceFile,
} from "./contentApi";

const emptyQuiz = {
  domain: DOMAINS[0],
  title: "",
  category: "",
  description: "",
  questions: "",
  duration: "",
  points: "50",
  level: "",
  status: "draft",
  quizUrl: "",
};

const emptyResource = {
  domain: DOMAINS[0],
  title: "",
  category: "",
  description: "",
  format: "",
  topics: "",
  fileUrl: "",
  fileSize: "",
  status: "draft",
};

const AdminDashboard = ({ admin, onLogout }) => {
  const [tab, setTab] = useState("quizzes");
  const [quizzes, setQuizzes] = useState([]);
  const [resources, setResources] = useState([]);
  const [quizForm, setQuizForm] = useState(emptyQuiz);
  const [resourceForm, setResourceForm] = useState(emptyResource);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [editingResourceId, setEditingResourceId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [q, r] = await Promise.all([fetchAllQuizzes(), fetchAllResources()]);
      setQuizzes(q);
      setResources(r);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const resetQuizForm = () => {
    setQuizForm(emptyQuiz);
    setEditingQuizId(null);
  };

  const resetResourceForm = () => {
    setResourceForm(emptyResource);
    setEditingResourceId(null);
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!quizForm.title.trim()) {
      setError("Quiz title is required.");
      return;
    }
    try {
      if (editingQuizId) {
        await updateQuiz(editingQuizId, quizForm);
        setMessage("Quiz updated.");
      } else {
        await createQuiz(quizForm);
        setMessage("Quiz created.");
      }
      resetQuizForm();
      await loadAll();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!resourceForm.title.trim()) {
      setError("Resource title is required.");
      return;
    }
    try {
      if (editingResourceId) {
        await updateResource(editingResourceId, resourceForm);
        setMessage("Resource updated.");
      } else {
        await createResource(resourceForm);
        setMessage("Resource created.");
      }
      resetResourceForm();
      await loadAll();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { publicUrl } = await uploadResourceFile(file);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setResourceForm((prev) => ({
        ...prev,
        fileUrl: publicUrl,
        fileSize: `${sizeMb} MB`,
        format: prev.format || file.type || "File",
      }));
      setMessage("File uploaded. Save the resource to publish.");
    } catch (err) {
      setError(
        err.message +
          " — Create a public bucket named skill-circle-resources in Supabase Storage, or paste a file URL manually."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full text-slate-100 font-sans">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono uppercase text-amber-400">Skill Circle Admin</span>
          <h1 className="text-2xl font-bold text-white">Content Manager</h1>
          <p className="text-xs text-slate-400 mt-1">
            Signed in as {admin?.name || admin?.email}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={loadAll}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </header>

      {(message || error) && (
        <div
          className={`mb-4 rounded-xl px-4 py-3 text-xs border ${
            error
              ? "bg-red-950/40 border-red-500/30 text-red-300"
              : "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
          }`}
        >
          {error || message}
        </div>
      )}

      <nav className="mb-6 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("quizzes")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
            tab === "quizzes"
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
              : "text-slate-400 border border-transparent"
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          Quizzes
        </button>
        <button
          type="button"
          onClick={() => setTab("resources")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
            tab === "resources"
              ? "bg-pink-500/20 text-pink-400 border border-pink-500/40"
              : "text-slate-400 border border-transparent"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          Resources
        </button>
      </nav>

      {tab === "quizzes" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={handleQuizSubmit}
            className="rounded-2xl border border-white/10 bg-[#090e1a]/80 p-5 space-y-3 text-sm"
          >
            <h2 className="font-semibold text-white flex items-center gap-2">
              <Plus className="h-4 w-4 text-cyan-400" />
              {editingQuizId ? "Edit quiz" : "Add quiz"}
            </h2>
            <select
              value={quizForm.domain}
              onChange={(e) => setQuizForm({ ...quizForm, domain: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-slate-200"
            >
              {DOMAINS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <input
              placeholder="Title *"
              value={quizForm.title}
              onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-white"
            />
            <input
              placeholder="Category"
              value={quizForm.category}
              onChange={(e) => setQuizForm({ ...quizForm, category: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-white"
            />
            <textarea
              placeholder="Description"
              rows={3}
              value={quizForm.description}
              onChange={(e) => setQuizForm({ ...quizForm, description: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-white"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="Questions"
                type="number"
                value={quizForm.questions}
                onChange={(e) => setQuizForm({ ...quizForm, questions: e.target.value })}
                className="rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-white"
              />
              <input
                placeholder="Duration (e.g. 30 Mins)"
                value={quizForm.duration}
                onChange={(e) => setQuizForm({ ...quizForm, duration: e.target.value })}
                className="rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-white"
              />
              <input
                placeholder="Points"
                type="number"
                value={quizForm.points}
                onChange={(e) => setQuizForm({ ...quizForm, points: e.target.value })}
                className="rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-white"
              />
              <input
                placeholder="Level"
                value={quizForm.level}
                onChange={(e) => setQuizForm({ ...quizForm, level: e.target.value })}
                className="rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-white"
              />
            </div>
            <input
              placeholder="Quiz link (Google Form, etc.)"
              value={quizForm.quizUrl}
              onChange={(e) => setQuizForm({ ...quizForm, quizUrl: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-white"
            />
            <select
              value={quizForm.status}
              onChange={(e) => setQuizForm({ ...quizForm, status: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-slate-200"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-cyan-500 py-2 font-bold text-slate-950"
              >
                {editingQuizId ? "Save changes" : "Create quiz"}
              </button>
              {editingQuizId && (
                <button
                  type="button"
                  onClick={resetQuizForm}
                  className="rounded-lg border border-white/10 px-4 py-2 text-slate-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="space-y-2 max-h-[70vh] overflow-y-auto">
            {quizzes.length === 0 ? (
              <p className="text-sm text-slate-500 font-mono">No quizzes yet.</p>
            ) : (
              quizzes.map((q) => (
                <div
                  key={q.id}
                  className="rounded-xl border border-white/10 bg-[#090e1a]/60 p-3 text-xs flex justify-between gap-2"
                >
                  <div>
                    <div className="font-semibold text-white">{q.title}</div>
                    <div className="text-slate-400 mt-1">
                      {q.domain} · {q.status} · +{q.points} pts
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingQuizId(q.id);
                        setQuizForm({
                          domain: q.domain,
                          title: q.title,
                          category: q.category || "",
                          description: q.description || "",
                          questions: String(q.questions ?? ""),
                          duration: q.duration || "",
                          points: String(q.points ?? ""),
                          level: q.level || "",
                          status: q.status,
                          quizUrl: q.quizUrl || "",
                        });
                      }}
                      className="rounded px-2 py-1 border border-white/10 text-slate-300"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!window.confirm("Delete this quiz?")) return;
                        await deleteQuiz(q.id);
                        await loadAll();
                      }}
                      className="rounded p-1.5 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {tab === "resources" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={handleResourceSubmit}
            className="rounded-2xl border border-white/10 bg-[#090e1a]/80 p-5 space-y-3 text-sm"
          >
            <h2 className="font-semibold text-white flex items-center gap-2">
              <Plus className="h-4 w-4 text-pink-400" />
              {editingResourceId ? "Edit resource" : "Add resource"}
            </h2>
            <select
              value={resourceForm.domain}
              onChange={(e) => setResourceForm({ ...resourceForm, domain: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-slate-200"
            >
              {DOMAINS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <input
              placeholder="Title *"
              value={resourceForm.title}
              onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-white"
            />
            <input
              placeholder="Category"
              value={resourceForm.category}
              onChange={(e) => setResourceForm({ ...resourceForm, category: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-white"
            />
            <textarea
              placeholder="Description"
              rows={3}
              value={resourceForm.description}
              onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-white"
            />
            <input
              placeholder="Format (PDF, Notes, …)"
              value={resourceForm.format}
              onChange={(e) => setResourceForm({ ...resourceForm, format: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-white"
            />
            <input
              placeholder="Topics"
              value={resourceForm.topics}
              onChange={(e) => setResourceForm({ ...resourceForm, topics: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-white"
            />
            <input
              placeholder="File URL"
              value={resourceForm.fileUrl}
              onChange={(e) => setResourceForm({ ...resourceForm, fileUrl: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-white"
            />
            <label className="block text-xs text-slate-400">
              Or upload file to Supabase Storage
              <input
                type="file"
                onChange={handleFileUpload}
                disabled={uploading}
                className="mt-1 block w-full text-xs text-slate-400"
              />
            </label>
            <select
              value={resourceForm.status}
              onChange={(e) => setResourceForm({ ...resourceForm, status: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#070c16] px-3 py-2 text-slate-200"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-pink-500 py-2 font-bold text-slate-950"
              >
                {editingResourceId ? "Save changes" : "Create resource"}
              </button>
              {editingResourceId && (
                <button
                  type="button"
                  onClick={resetResourceForm}
                  className="rounded-lg border border-white/10 px-4 py-2 text-slate-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="space-y-2 max-h-[70vh] overflow-y-auto">
            {resources.length === 0 ? (
              <p className="text-sm text-slate-500 font-mono">No resources yet.</p>
            ) : (
              resources.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl border border-white/10 bg-[#090e1a]/60 p-3 text-xs flex justify-between gap-2"
                >
                  <div>
                    <div className="font-semibold text-white">{r.title}</div>
                    <div className="text-slate-400 mt-1">
                      {r.domain} · {r.status}
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingResourceId(r.id);
                        setResourceForm({
                          domain: r.domain,
                          title: r.title,
                          category: r.category || "",
                          description: r.description || "",
                          format: r.format || "",
                          topics: r.topics || "",
                          fileUrl: r.fileUrl || "",
                          fileSize: r.size || "",
                          status: r.status,
                        });
                      }}
                      className="rounded px-2 py-1 border border-white/10 text-slate-300"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!window.confirm("Delete this resource?")) return;
                        await deleteResource(r.id);
                        await loadAll();
                      }}
                      className="rounded p-1.5 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
