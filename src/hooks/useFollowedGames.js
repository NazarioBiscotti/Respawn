import { useQuery } from "@tanstack/react-query";
import { getFollowedGames } from "../services/profileService";

export const useFollowedGames = (userId) => {
  return useQuery({
    queryKey: ["followed_games", userId],
    queryFn: () => getFollowedGames(userId),
    enabled: !!userId,
    staleTime: Infinity,
  });
};