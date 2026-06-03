import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGameDetails } from "../services/gamesApi";
import { getPulseFeed } from "../services/api";
import { useFollowGame } from "../hooks/useFollowGame";

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { followGame, isFollowing } = useFollowGame();

  const [game, setGame] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getGameDetails(id), getPulseFeed()]).then(
      ([gameData, feed]) => {
        setGame(gameData);

        const relatedPosts = feed.filter((post) =>
          post.games?.some((game) => game.id === id)
        );

        setPosts(relatedPosts);

        setLoading(false);
      }
    );
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!game) return <div className="p-6">Game not found</div>;

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <div className="relative h-105 w-full">


        <img
          src={game.background_image}
          className="h-full w-full object-cover"
        />


        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />


        <div className="absolute bottom-0 left-0 w-full p-6">
          <h1 className="text-4xl font-bold text-white">
            Pulse around {game.name}
            <p className="text-white/40 text-sm">
              {posts.length} discussions in the Pulse
            </p>
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 lg:grid-cols-[1fr_320px]">

        {/* MAIN */}
        <section className="space-y-10">

          <button
  onClick={() => followGame(game.id)}
  className={`
    px-4 py-2 rounded-xl border transition
    ${isFollowing(game.id)
      ? "bg-white text-black"
      : "border-white/20 text-white hover:border-white"}
  `}
>
  {isFollowing(game.id) ? "Following" : "Follow game"}
</button>

          {/* DESCRIPTION */}
          <div className="p-5 rounded-2xl border border-white/10">
            <h2 className="text-sm text-white/50 mb-2">
              About
            </h2>
            <p className="text-white/80 leading-relaxed">
              {game.description_raw}
            </p>
          </div>

          {/* POSTS */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Active discussion on {game.name}
            </h2>

            {posts.length === 0 ? (
              <p className="text-white/40">
                No Pulse activity yet for this game
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => navigate(`/pulse/${post.id}`)}
                    className="cursor-pointer rounded-xl border border-white/10 hover:border-white/30 overflow-hidden"
                  >
                    <img
                      src={post.image}
                      className="h-32 w-full object-cover"
                    />
                    <div className="p-3">
                      <p className="text-xs text-primary">
                        {post.type}
                      </p>
                      <p className="font-semibold">
                        {post.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </section>

        {/* SIDEBAR */}
        <aside className="space-y-6">

          <div className="p-5 rounded-2xl border border-white/10">
            <h3 className="text-sm text-white/50 mb-3">
              Game Stats
            </h3>

            <div className="space-y-2 text-sm text-white/70">
              <p>⭐ Rating: {game.rating}</p>
              <p>📅 Released: {game.released}</p>
              <p>🔥 Metacritic: {game.metacritic}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10">
            <h3 className="text-sm text-white/50 mb-3">
              Community vibe
            </h3>

            <div className="space-y-2 text-sm text-white/70">
              <p>• Meta builds discussion</p>
              <p>• Co-op strategies</p>
              <p>• Patch reactions</p>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}