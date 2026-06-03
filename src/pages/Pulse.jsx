import { useEffect, useState } from "react";
import HeroCard from "../components/pulse/HeroCard";
import PulseCard from "../components/pulse/PulseCard";
import TrendingSidebar from "../components/pulse/TrendingSidebar";
import Container from "../components/ui/Container";

import { getPulseFeed } from "../services/api";
import { getUserState } from "../services/userStore";
import { rankFeedBySignals } from "../utils/signalEngine";
import { buildFeed } from "../utils/feedEngine";

export default function Pulse() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getPulseFeed().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-6 text-white/50">Loading Pulse...</div>;
  }

  // 🧠 BASE FEED (all / saved / base logic)
  const baseFeed = buildFeed(data, filter);

  // 🔥 SIGNALS SOLO PER FOR YOU
  const feed =
    filter === "forYou"
      ? rankFeedBySignals(baseFeed, getUserState().followedGames)
      : baseFeed;

  const hero = feed[0];
  const featured = feed.slice(1, 5);

  return (
    <main className="min-h-screen py-8">
      <Container>

        {/* HERO */}
        {hero && <HeroCard post={hero} />}

        {/* FILTERS */}
        <div className="mb-8 flex gap-2 flex-wrap">
          {["all", "forYou", "saved"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 rounded-full text-sm border transition ${
                filter === t
                  ? "bg-white text-black"
                  : "border-border text-white/70"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

          {/* MAIN FEED */}
          <section>

            {featured.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                {featured.map((post) => (
                  <PulseCard key={post.id} {...post} />
                ))}
              </div>
            )}

          </section>

          {/* SIDEBAR */}
          <aside className="space-y-6 lg:sticky lg:top-8">
            <TrendingSidebar posts={feed} />
          </aside>

        </div>
      </Container>
    </main>
  );
}