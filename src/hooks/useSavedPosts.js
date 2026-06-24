import { useQuery } from "@tanstack/react-query";
import { getSavedPosts } from "../services/profileService";

export const useSavedPosts = (userId) => {
  return useQuery({
    queryKey: ["saved_posts", userId],
    queryFn: () => getSavedPosts(userId),
    enabled: !!userId,
    staleTime: Infinity,
  });
};