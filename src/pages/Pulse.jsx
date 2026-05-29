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
      : data.filter((item) => item.type === filter);

  return (
    <main className="w-2/3 m-auto min-h-screen bg-bg px-6 py-8 text-text">
      <HeroCard />

      {/* FILTERS */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {["All", "review", "trend", "spotlight", "news"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1 rounded-full text-sm border transition duration-200 ${
              filter === t
                ? "bg-white text-black border-white"
                : "border-border text-text-muted hover:text-white hover:border-white/40"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              Latest Pulse
            </h2>
          </div>

          {error && (
            <div className="rounded-2xl bg-red-500/10 p-4 text-red-400">
              Error loading feed
            </div>
          )}

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
                  id={post.id}
                  category={post.type}
                  title={post.title}
                  description={post.description}
                  image={post.image}
                  game={post.game}
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