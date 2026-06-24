import { useUser } from "../context/UserContext";
import PulseCard from "../components/pulse/PulseCard";

import { useSavedPosts } from "../hooks/useSavedPosts";
import { useFollowedGames } from "../hooks/useFollowedGames";
import { useQuery } from "@tanstack/react-query";

import { getPulseFeed } from "../services/api";

export default function Profile() {
  const { user, profile } = useUser();

  const { data: savedPosts = [] } = useSavedPosts(user?.id);
  const { data: followedGames = [] } = useFollowedGames(user?.id);

    const { data: feed = [] } = useQuery({
    queryKey: ["pulse_feed"],
    queryFn: getPulseFeed,
  });

    const savedFeed = feed.filter((p) =>
    savedPosts.includes(p.id)
  );

    return (
    <div className="max-w-5xl mx-auto p-6 text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={profile?.avatar_url || "https://i.pravatar.cc/100"}
          className="w-16 h-16 rounded-full"
        />

        <div>
          <h1 className="text-xl font-bold">
            {profile?.username || user?.email}
          </h1>

          <p className="text-white/60 text-sm">
            {followedGames.length} games followed · {savedPosts.length} saved posts
          </p>
        </div>
      </div>

      {/* SAVED POSTS */}
      <h2 className="text-lg font-semibold mb-4">
        Saved Posts
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {savedFeed.map((post) => (
          <PulseCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}