import { supabase } from "./supabase";

export async function getSavedPosts(userId) {
  const { data, error } = await supabase
    .from("saved_posts")
    .select("post_id")
    .eq("user_id", userId);

  if (error) return [];

  return data.map((item) => item.post_id);
}

export async function getFollowedGames(userId) {
  const { data, error } = await supabase
    .from("followed_games")
    .select("game_id")
    .eq("user_id", userId);

  if (error) return [];

  return data.map((item) => item.game_id);
}