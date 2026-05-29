import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGameDetails } from "../services/gamesApi";
import { getPulseFeed } from "../services/api";

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [gameData, pulse] = await Promise.all([
        getGameDetails(id),
        getPulseFeed(),
      ]);

      setGame(gameData);
      setPosts(pulse);
      setLoading(false);
    }

    load();
  }, [id]);

  const relatedPosts = useMemo(() => {
    return posts.filter((p) => p.gameId === id);
  }, [posts, id]);

  const tags = useMemo(() => {
    const allTags = relatedPosts.flatMap((p) => p.tags || []);
    return [...new Set(allTags)];
  }, [relatedPosts]);

  if (loading) {
    return <div className="p-6 text-white/60">Loading game...</div>;
  }

  if (!game) {
    return <div className="p-6 text-white">Game not found</div>;
  }

  return (
    <main className="min-h-screen bg-bg text-text">

      {/* 🔥 HERO */}
      <div className="relative h-[420px] overflow-hidden">
        <img
          src={game.background_image}
          className="h-full w-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-bg via-black/40 to-transparent" />

        <div className="absolute bottom-0 p-8 max-w-5xl">
          <h1 className="text-4xl font-bold">{game.name}</h1>

          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-white/10 text-sm">
              ⭐ {game.rating}
            </span>

            {game.genres?.slice(0, 5).map((g) => (
              <span
                key={g.id}
                className="px-3 py-1 rounded-full border border-white/10 text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 📦 CONTENT GRID */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-[2fr_1fr] gap-10">

        {/* LEFT */}
        <div>

          {/* ABOUT */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-3">
              About
            </h2>

            <p className="text-white/70 leading-relaxed">
              {game.description_raw}
            </p>
          </section>

          {/* 📰 COMMUNITY */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">
              Community Pulse ({relatedPosts.length})
            </h2>

            {relatedPosts.length === 0 ? (
              <p className="text-white/40">
                No discussions yet
              </p>
            ) : (
              <div className="grid gap-4">
                {relatedPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => navigate(`/pulse/${post.id}`)}
                    className="p-4 rounded-xl border border-white/10 hover:border-white/30 cursor-pointer transition"
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

          {/* 🧠 TAGS */}
          {tags.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-3">
                Trending tags
              </h2>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full border border-white/10 text-white/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside>

          {/* 🎬 TRAILER */}
          {game.clip?.clip && (
            <section className="mb-6">
              <h3 className="text-sm text-white/60 mb-2">
                Trailer
              </h3>

              <video
                controls
                className="rounded-xl w-full"
                src={game.clip.clip}
              />
            </section>
          )}

          {/* 📊 QUICK STATS */}
          <section className="p-4 rounded-xl border border-white/10">
            <h3 className="text-sm text-white/60 mb-3">
              Quick info
            </h3>

            <div className="space-y-2 text-sm text-white/70">
              <p>Rating: {game.rating}</p>
              <p>Reviews: {game.ratings_count}</p>
              <p>Released: {game.released}</p>
            </div>
          </section>

          {/* BACK */}
          <button
            onClick={() => navigate(-1)}
            className="mt-6 text-white/60 hover:text-white"
          >
            ← Back
          </button>
        </aside>
      </div>
    </main>
  );
}