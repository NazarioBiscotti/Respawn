  import { useEffect, useState } from "react";
  import { getPulseFeed } from "../services/api";
  import { useNavigate } from "react-router-dom";
  import { searchGames } from "../services/gamesApi";

  export default function Discover() {
    const [query, setQuery] = useState("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [gameResults, setGameResults] = useState([]);

    const navigate = useNavigate();

    // 📦 LOAD POSTS
    useEffect(() => {
      getPulseFeed().then((data) => {
        setPosts(data);
        setLoading(false);
      });
    }, []);

    // 🔍 normalised query
    const q = query.toLowerCase().trim();
    const hasQuery = q.length > 0;

    // 🎮 GAMES SEARCH (RAWG API)
    useEffect(() => {
      if (!hasQuery) {
        setGameResults([]);
        return;
      }

      const timeout = setTimeout(() => {
        searchGames(q).then(setGameResults);
      }, 300);
      console.log(gameResults);
      
      return () => clearTimeout(timeout);
    }, [q, hasQuery]);

    // 📰 POSTS SEARCH
    const postsResults = hasQuery
      ? posts.filter((item) => {
          return (
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.type.toLowerCase().includes(q) ||
            item.tags?.some((t) => t.toLowerCase().includes(q))
          );
        })
      : [];

    return (
      <main className=" min-h-screen bg-bg text-text px-6 py-8">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Discover
          </h1>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games, posts, trends..."
            className="w-full p-3 rounded-xl bg-surface border border-border outline-none"
          />
        </div>

        {/* LOADING */}

        <div className="flex m-auto justify-evenly ">

        {loading ? (
          <div className="text-white/60">Loading...</div>
        ) : !hasQuery ? (
          <div className="text-white/40">
            Start typing to explore games and articles...
          </div>
        ) : (
          <>
            {/* 🎮 GAMES */}
            {gameResults.length > 0 && (
              <section className=" w-1/3">
                <h2 className="text-white/60 mb-2">
                  Games
                </h2>

                <div className="grid gap-3">
                  {gameResults.map((game) => (
                    <div
                      key={game.id}
                      onClick={() =>
                        navigate(`/games/${game.id}`)
                      }
                      className="p-4 rounded-xl border border-white/10 hover:border-white/30 cursor-pointer transition"
                    >
                      🎮 {game.name}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 📰 ARTICLES */}
            <section className=" w-1/3">
              <h2 className="text-white/60 mb-2">
                Articles
              </h2>

              <div className="grid gap-4">
                {postsResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      navigate(`/pulse/${item.id}`)
                    }
                    className="p-4 rounded-xl border border-white/10 hover:border-white/30 cursor-pointer transition"
                  >
                    <p className="text-xs text-primary">
                      {item.type}
                    </p>

                    <p className="font-semibold">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
        </div>
      </main>
    );
  }