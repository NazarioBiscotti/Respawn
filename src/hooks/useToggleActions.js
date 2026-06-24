import { useUser } from "../context/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleSavePost } from "../services/toggleSavePost";
import { toggleFollowGame } from "../services/toggleFollowGame";

export function useToggleActions() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const savePostMutation = useMutation({
    mutationFn: (postId) => {
      if (!user) throw new Error("User not logged");
      return toggleSavePost(user.id, postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["saved_posts", user.id],
      });
    },
  });

  const followGameMutation = useMutation({
    mutationFn: (gameId) => {
      if (!user) throw new Error("User not logged");
      return toggleFollowGame(user.id, gameId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["followed_games", user.id],
      });
    },
  });

  return {
    savePost: savePostMutation.mutate,
    followGame: followGameMutation.mutate,
  };
}