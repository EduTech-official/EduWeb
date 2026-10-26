import { supabase, isSupabaseConfigured } from "./supabaseClient";

const mapQuizRow = (row) => ({
  id: row.id,
  domain: row.domain,
  title: row.title,
  category: row.category || "Quiz",
  description: row.description || "",
  questions: row.questions ?? 0,
  duration: row.duration || "—",
  points: row.points ?? 50,
  level: row.level || "All Levels",
  status: row.status || "draft",
  quizUrl: row.quiz_url || "",
});

const mapResourceRow = (row) => ({
  id: row.id,
  domain: row.domain,
  title: row.title,
  category: row.category || "Resource",
  description: row.description || "",
  format: row.format || "Link",
  topics: row.topics || "",
  fileUrl: row.file_url || "",
  size: row.file_size || "",
  status: row.status || "draft",
});

export const fetchPublishedQuizzes = async (domain) => {
  if (!isSupabaseConfigured() || !supabase) return [];
  let query = supabase
    .from("skill_circle_quizzes")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (domain) query = query.eq("domain", domain);
  const { data, error } = await query;
  if (error) {
    console.warn("fetchPublishedQuizzes:", error.message);
    return [];
  }
  return (data || []).map(mapQuizRow);
};

export const fetchAllQuizzes = async () => {
  if (!isSupabaseConfigured() || !supabase) return [];
  const { data, error } = await supabase
    .from("skill_circle_quizzes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.warn("fetchAllQuizzes:", error.message);
    return [];
  }
  return (data || []).map(mapQuizRow);
};

export const fetchPublishedResources = async (domain) => {
  if (!isSupabaseConfigured() || !supabase) return [];
  let query = supabase
    .from("skill_circle_resources")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (domain) query = query.eq("domain", domain);
  const { data, error } = await query;
  if (error) {
    console.warn("fetchPublishedResources:", error.message);
    return [];
  }
  return (data || []).map(mapResourceRow);
};

export const fetchAllResources = async () => {
  if (!isSupabaseConfigured() || !supabase) return [];
  const { data, error } = await supabase
    .from("skill_circle_resources")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.warn("fetchAllResources:", error.message);
    return [];
  }
  return (data || []).map(mapResourceRow);
};

export const createQuiz = async (payload) => {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error("Supabase is not configured.");
  }
  const { data, error } = await supabase
    .from("skill_circle_quizzes")
    .insert([
      {
        domain: payload.domain,
        title: payload.title.trim(),
        category: payload.category || null,
        description: payload.description || null,
        questions: Number(payload.questions) || 0,
        duration: payload.duration || null,
        points: Number(payload.points) || 50,
        level: payload.level || null,
        status: payload.status || "draft",
        quiz_url: payload.quizUrl || null,
      },
    ])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapQuizRow(data);
};

export const updateQuiz = async (id, payload) => {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error("Supabase is not configured.");
  }
  const { data, error } = await supabase
    .from("skill_circle_quizzes")
    .update({
      domain: payload.domain,
      title: payload.title.trim(),
      category: payload.category || null,
      description: payload.description || null,
      questions: Number(payload.questions) || 0,
      duration: payload.duration || null,
      points: Number(payload.points) || 50,
      level: payload.level || null,
      status: payload.status || "draft",
      quiz_url: payload.quizUrl || null,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapQuizRow(data);
};

export const deleteQuiz = async (id) => {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error("Supabase is not configured.");
  }
  const { error } = await supabase.from("skill_circle_quizzes").delete().eq("id", id);
  if (error) throw new Error(error.message);
};

export const createResource = async (payload) => {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error("Supabase is not configured.");
  }
  const { data, error } = await supabase
    .from("skill_circle_resources")
    .insert([
      {
        domain: payload.domain,
        title: payload.title.trim(),
        category: payload.category || null,
        description: payload.description || null,
        format: payload.format || null,
        topics: payload.topics || null,
        file_url: payload.fileUrl || null,
        file_size: payload.fileSize || null,
        status: payload.status || "draft",
      },
    ])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapResourceRow(data);
};

export const updateResource = async (id, payload) => {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error("Supabase is not configured.");
  }
  const { data, error } = await supabase
    .from("skill_circle_resources")
    .update({
      domain: payload.domain,
      title: payload.title.trim(),
      category: payload.category || null,
      description: payload.description || null,
      format: payload.format || null,
      topics: payload.topics || null,
      file_url: payload.fileUrl || null,
      file_size: payload.fileSize || null,
      status: payload.status || "draft",
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapResourceRow(data);
};

export const deleteResource = async (id) => {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error("Supabase is not configured.");
  }
  const { error } = await supabase.from("skill_circle_resources").delete().eq("id", id);
  if (error) throw new Error(error.message);
};

export const uploadResourceFile = async (file) => {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error("Supabase is not configured.");
  }
  const safeName = file.name.replace(/[^\w.-]+/g, "_");
  const path = `${Date.now()}-${safeName}`;
  const { error } = await supabase.storage
    .from("skill-circle-resources")
    .upload(path, file, { upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from("skill-circle-resources").getPublicUrl(path);
  return { publicUrl: data.publicUrl, path };
};
