import { supabase } from "./supabase";

export async function toggleFollowGame(userId, gameId) {
  const { data, error } = await supabase
    .from("followed_games")
    .select("*")
    .eq("user_id", userId)
    .eq("game_id", gameId)
    .maybeSingle();

  if (error) return { error };

  // already following → unfollow
  if (data) {
    const res = await supabase
      .from("followed_games")
      .delete()
      .eq("user_id", userId)
      .eq("game_id", gameId);

    return { action: "unfollowed", ...res };
  }

  // follow
  const res = await supabase.from("followed_games").insert({
    user_id: userId,
    game_id: gameId,
  });

  return { action: "followed", ...res };
}