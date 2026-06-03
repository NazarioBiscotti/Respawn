import { useState } from "react";
import { getUserState, toggleFollowGame } from "../services/userStore";

export function useFollowGame() {
  const [state, setState] = useState(getUserState());

  const followGame = (gameId) => {
    const updated = toggleFollowGame(gameId);
    setState(updated);
  };

  const isFollowing = (gameId) => {
    return state.followedGames.includes(gameId);
  };

  return {
    state,
    followGame,
    isFollowing,
  };
}