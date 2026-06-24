import Card from "../ui/Card";
import { useMemo } from "react";

export default function TrendingSidebar({ posts = [] }) {

  //  TOP GAMES
  const topGames = useMemo(() => {
    const gameCount = {};

    posts.forEach((post) => {
      post.games?.forEach((game) => {
        if (!gameCount[game.id]) {
          gameCount[game.id] = {
            ...game,
            count: 0,
          };
        }

        gameCount[game.id].count += 1;
      });
    });

    return Object.values(gameCount)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [posts]);

  //  TOP TAGS
  const topTags = useMemo(() => {
    const tagCount = {};

    posts.forEach((post) => {
      post.tags?.forEach((tag) => {
        const key = tag.toLowerCase();

        if (!tagCount[key]) {
          tagCount[key] = {
            name: tag,
            count: 0,
          };
        }

        tagCount[key].count += 1;
      });
    });

    return Object.values(tagCount)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [posts]);

  return (
    <aside className="space-y-6">

      {/* 🎮 TRENDING GAMES */}
      <Card className="p-5">
        <h3 className="mb-4 text-sm font-semibold text-white/60">
          Trending Games
        </h3>

        <div className="space-y-2">
          {topGames.map((game, index) => (
            <div
              key={game.id}
              className="flex items-center justify-between rounded-xl p-2 hover:bg-white/5 transition"
            >
              <span className="text-sm text-white">
                #{index + 1} {game.name}
              </span>

              <span className="text-xs text-white/40">
                {game.count}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/*  TRENDING TAGS */}
      <Card className="p-5">
        <h3 className="mb-4 text-sm font-semibold text-white/60">
          Trending Tags
        </h3>

        <div className="flex flex-wrap gap-2">
          {topTags.map((tag) => (
            <span
              key={tag.name}
              className="
                text-xs
                px-3 py-1
                rounded-full
                border border-white/10
                bg-white/5
                text-white/70
              "
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </Card>

    </aside>
  );
}