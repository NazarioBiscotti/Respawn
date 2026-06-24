import { supabase } from "./supabase";

//  get profile
export async function getProfile(userId) {
  if (!userId) return { data: null };

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle(); 

  return { data, error };
}

//  get followed games
export async function getFollowedGames(userId) {
  const { data } = await supabase
    .from("followed_games")
    .select("game_id")
    .eq("user_id", userId);

  return data?.map((g) => g.game_id) || [];
}

//  get saved posts
export async function getSavedPosts(userId) {
  const { data } = await supabase
    .from("saved_posts")
    .select("post_id")
    .eq("user_id", userId);

  return data?.map((p) => p.post_id) || [];
}