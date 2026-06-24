import Container from "../components/ui/Container";
import { useUser } from "../context/UserContext";

import { useQuery } from "@tanstack/react-query";

import { getPulseFeed } from "../services/api";
import { buildSignals } from "../utils/signalEngine";

import { useSavedPosts } from "../hooks/useSavedPosts";
import { useFollowedGames } from "../hooks/useFollowedGames";

export default function Signals() {
  const { user } = useUser();

  const {
    data: posts = [],
    isLoading,
  } = useQuery({
    queryKey: ["pulse_feed"],
    queryFn: getPulseFeed,
  });

  const { data: savedPosts = [] } = useSavedPosts(user?.id);
  const { data: followedGames = [] } = useFollowedGames(user?.id);


    if (isLoading) {
    return (
      <div className="p-6 text-white/50">
        Loading signals...
      </div>
    );
  }

    const topGames = buildSignals(posts, followedGames);

      return (
    <main className="py-10">
      <Container>

        <h1 className="text-3xl font-bold mb-8">
          Signals
        </h1>

        {/*  FOLLOWED GAMES */}
        <section className="mb-10">
          <h2 className="text-white/60 mb-3">
            🎮 Followed Games
          </h2>

          {followedGames.length === 0 ? (
            <p className="text-white/40">
              No games followed yet
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {followedGames.map((id) => (
                <span
                  key={id}
                  className="px-3 py-1 rounded-full border border-white/10 bg-white/5"
                >
                   {id}
                </span>
              ))}
            </div>
          )}
        </section>

        {/*  SAVED POSTS */}
        <section className="mb-10">
          <h2 className="text-white/60 mb-3">
            ⭐ Saved Posts
          </h2>

          {savedPosts.length === 0 ? (
            <p className="text-white/40">
              No saved articles yet
            </p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {posts
                .filter((p) => savedPosts.includes(p.id))
                .map((post) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-xl border border-white/10 hover:border-white/30 transition"
                  >
                    <p className="text-xs text-primary">
                      {post.type}
                    </p>
                    <p className="font-semibold">
                      {post.title}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/*  TOP SIGNALS */}
        <section className="mb-10">
          <h2 className="text-white/60 mb-3">
            🧠 Top Signals
          </h2>

          {topGames.length === 0 ? (
            <p className="text-white/40">
              No signals detected yet
            </p>
          ) : (
            <div className="space-y-2">
              {topGames.map((game) => (
                <div
                  key={game.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-white/10"
                >
                  <span>🎮 {game.id}</span>

                  <span className="text-xs text-white/40">
                    score {game.score}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

      </Container>
    </main>
  );
}