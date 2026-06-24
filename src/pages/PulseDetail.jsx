import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getPulseFeed } from "../services/api";
import { useUser } from "../context/UserContext";
import { useToggleActions } from "../hooks/useToggleActions";

export default function PulseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user, savedPosts } = useUser();
  const { savePost } = useToggleActions();

    const { data: feed = [], isLoading } = useQuery({
    queryKey: ["pulse_feed"],
    queryFn: getPulseFeed,
  });

    const post = feed.find(
    (item) => String(item.id) === String(id)
  );

  const related = post
  ? feed.filter(
      (item) =>
        item.id !== post.id &&
        item.games?.some((g) =>
          post.games?.some((pg) => pg.id === g.id)
        )
    )
  : [];

    if (isLoading) {
    return <div className="p-6 text-white/50">Loading...</div>;
  }

  if (!post) {
    return <div className="p-6 text-white/50">Pulse not found</div>;
  }

    const isSaved = (savedPosts ?? []).includes(post.id);

      return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* HERO */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-white/10">
        <img
          src={post.image}
          alt={post.title}
          className="h-96 w-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="space-y-5">

        <p className="text-xs text-primary uppercase tracking-wide">
          {post.type}
        </p>

        <h1 className="text-4xl font-bold">
          {post.title}
        </h1>

        <p className="text-white/70 text-lg leading-relaxed">
          {post.description}
        </p>

        {/* ACTION */}
        <div className="flex items-center gap-3 pt-2">

          <button
            onClick={() => savePost(post.id)}
            className={`
              px-4 py-2 rounded-xl border transition
              ${isSaved
                ? "bg-primary text-black border-primary"
                : "border-white/10 hover:border-white/30 text-white"
              }
            `}
          >
            {isSaved ? "Saved ✓" : "Save article"}
          </button>

        </div>

        {/* GAMES */}
        {post.games?.length > 0 && (
          <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/5">

            <p className="text-xs text-white/40 mb-3">
              Related games
            </p>

            <div className="flex flex-wrap gap-3">
              {post.games.map((game) => (
                <span
                  key={game.id}
                  onClick={() => navigate(`/games/${game.id}`)}
                  className="cursor-pointer text-primary hover:underline"
                >
                  {game.name}
                </span>
              ))}
            </div>

          </div>
        )}
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className="mt-14">

          <h2 className="text-xl font-semibold mb-4">
            Related posts
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/pulse/${item.id}`)}
                className="cursor-pointer rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition"
              >
                <img
                  src={item.image}
                  className="h-32 w-full object-cover"
                  alt={item.title}
                />

                <div className="p-3">
                  <p className="text-xs text-primary">
                    {item.type}
                  </p>

                  <p className="font-semibold">
                    {item.title}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}