import { supabase } from "./supabase";

export async function toggleSavePost(userId, postId) {
  // 🔍 check se esiste già
  const { data, error } = await supabase
    .from("saved_posts")
    .select("*")
    .eq("user_id", userId)
    .eq("post_id", postId)
    .maybeSingle();

  if (error) return { error };

  // 🟢 se esiste → remove
  if (data) {
    const res = await supabase
      .from("saved_posts")
      .delete()
      .eq("user_id", userId)
      .eq("post_id", postId);

    return { action: "removed", ...res };
  }

  // 🔵 se non esiste → add
  const res = await supabase.from("saved_posts").insert({
    user_id: userId,
    post_id: postId,
  });

  return { action: "added", ...res };
}