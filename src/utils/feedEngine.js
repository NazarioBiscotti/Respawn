  import { rankFeedBySignals } from "./signalEngine";


  export function buildFeed(posts, mode = "all", savedPosts = []) {
    switch (mode) {
      case "saved":
        return posts.filter((p) => savedPosts.includes(p.id));

      default:
        return posts;
    }
  }