import { useEffect, useState } from "react";

import HeroCard from "../components/pulse/HeroCard";
import PulseCard from "../components/pulse/PulseCard";
import TrendingSidebar from "../components/pulse/TrendingSidebar";

import { getPulseFeed } from "../services/api";

export default function Pulse() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getPulseFeed()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const filteredData =
  filter === "All"
    ? data
    : data.filter((item) => item.category === filter);

  return (
    <main className="min-h-screen bg-bg px-6 py-8 text-text">
      <HeroCard />

      <div className="mb-6 flex gap-2 flex-wrap">
  {["All", "Community Opinion", "Trending Discussion", "Indie Spotlight"].map((cat) => (
    <button
      key={cat}
      onClick={() => setFilter(cat)}
      className={`px-3 py-1 rounded-full text-sm border transition duration-200 ${
  filter === cat
    ? "bg-white text-black border-white"
    : "border-border text-text-muted hover:text-white hover:border-white/40"
}`}
    >
      {cat}
    </button>
  ))}
</div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* FEED */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              Latest Pulse
            </h2>

            <button className="text-sm text-text-muted transition hover:text-text">
              View all
            </button>
          </div>

          {/* ERROR STATE */}
          {error && (
            <div className="rounded-2xl bg-red-500/10 p-4 text-red-400">
              Error loading feed
            </div>
          )}

          {/* LOADING STATE */}
          {loading ? (
            <div className="space-y-4">
              <div className="h-40 animate-pulse rounded-2xl bg-surface" />
              <div className="h-40 animate-pulse rounded-2xl bg-surface" />
              <div className="h-40 animate-pulse rounded-2xl bg-surface" />
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredData.map((post, index) => (
                <PulseCard
                  key={post.id}
                  id={post.id}   // 👈 IMPORTANTISSIMO per /pulse/:id
                  category={post.category}
                  title={post.title}
                  description={post.description}
                  image={post.image}
                  variant={index === 0 ? "default" : "compact"}
                />
              ))}
            </div>
          )}
        </section>

        <TrendingSidebar />
      </div>
    </main>
  );
}