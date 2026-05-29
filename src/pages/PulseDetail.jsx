import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPulseFeed } from "../services/api";

export default function PulseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPulseFeed().then((data) => {
      const found = data.find((item) => String(item.id) === String(id));
      setPost(found);

      if (found) {
        setRelated(
          data.filter(
            (item) =>
              item.type === found.type &&
              item.id !== found.id
          )
        );
      }

      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-6 text-white">Loading...</div>;

  if (!post) return <div className="p-6 text-white">Pulse not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-white">

      {/* BREADCRUMB */}
      <div className="mb-6 text-sm text-white/60">
        <span
          className="cursor-pointer hover:text-white"
          onClick={() => navigate("/")}
        >
          Pulse
        </span>

        <span className="mx-2">/</span>

        <span className="text-white/80">
          {post.type}
        </span>
      </div>

      {/* HERO */}
      <div className="mb-8 overflow-hidden rounded-2xl">
        <img
          src={post.image}
          alt={post.title}
          className="h-105 w-full object-cover"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{post.title}</h1>

        <p className="text-white/70 text-lg">
          {post.description}
        </p>

        {/* GAME LINK */}
        {post.game && (
          <div className="mt-4">
            <span className="text-white/40">Game: </span>

            <span
              onClick={() => navigate(`/games/${post.game.id}`)}
              className="text-primary cursor-pointer hover:underline"
            >
              {post.game.name}
            </span>
          </div>
        )}
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-4">
            More in {post.type}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/pulse/${item.id}`)}
                className="cursor-pointer rounded-xl overflow-hidden border border-white/10 hover:border-white/30"
              >
                <img
                  src={item.image}
                  className="h-32 w-full object-cover"
                />
                <div className="p-3">
                  <p className="text-xs text-primary">{item.type}</p>
                  <p className="font-semibold">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}