import { rankFeedBySignals } from "./signalEngine";
import { getUserState } from "../services/userStore";

export function buildFeed(posts, mode = "all") {
  const state = getUserState();

  switch (mode) {
    case "forYou":
      return rankFeedBySignals(posts, state.followedGames);

    case "saved":
      return posts.filter((p) =>
        state.savedPosts.includes(p.id)
      );

    case "all":
    default:
      return posts;
  }
}