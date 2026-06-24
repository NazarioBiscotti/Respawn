import { useState } from "react";

// VIEWS
import HeroCard from "../components/pulse/HeroCard";
import PulseCard from "../components/pulse/PulseCard";
import TrendingSidebar from "../components/pulse/TrendingSidebar";
import Container from "../components/ui/Container";


// HOOKS
import { getPulseFeed } from "../services/api";
import { useUser } from "../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { useSavedPosts } from "../hooks/useSavedPosts";
import { useFollowedGames } from "../hooks/useFollowedGames";
import { buildFeed } from "../utils/feedEngine";
import { rankFeedBySignals } from "../utils/signalEngine";



export default function Pulse() {

  const [filter, setFilter] = useState("all");
  const { user, loading: userLoading } = useUser();

  //  React Query: FEED
  const {
    data: feedData = [],
    isLoading: feedLoading,
  } = useQuery({
    queryKey: ["pulse_feed"],
    queryFn: getPulseFeed,
  });

  // React Query: saved posts
  const { data: savedPosts = [] } = useSavedPosts(user?.id);

  //  React Query: followed games
  const { data: followedGames = [] } = useFollowedGames(user?.id);


  if (feedLoading || userLoading) {
    return (
      <div className="p-6 text-white/50">
        Loading Pulse...
      </div>
    );
  }


  const baseFeed = buildFeed(feedData, filter, savedPosts);

  const feed =
    filter === "forYou"
      ? rankFeedBySignals(baseFeed, followedGames, savedPosts)
      : baseFeed;

  const hero = feed[0];
  const featured = feed.slice(1, 5);


  return (
    <main className="min-h-screen py-8">


      <Container>



        {hero && <HeroCard post={hero} />}

        <div className="mb-8 flex gap-2 flex-wrap">
          {["all", "forYou", "saved"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 rounded-full text-sm border transition ${filter === t
                  ? "bg-white text-black"
                  : "border-border text-white/70"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

          <section>
            {featured.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                {featured.map((post) => (
                  <PulseCard key={post.id} {...post} />
                ))}
              </div>
            )}
          </section>

          <aside className="space-y-6 lg:sticky lg:top-8">
            <TrendingSidebar posts={feed} />
          </aside>

        </div>
      </Container>
    </main>
  );
}