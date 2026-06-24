import Badge from "../ui/Badge";
import { useNavigate } from "react-router-dom";

export default function HeroCard({ post }) {
  const navigate = useNavigate();

  if (!post) return null;

  return (
    <section className="mb-10">
      <div
        onClick={() => navigate(`/pulse/${post.id}`)}
        className="relative overflow-hidden rounded-3xl border border-border cursor-pointer group"
      >

        {/* IMAGE */}
        <img
          src={post.image}
          alt={post.title}
          className="h-105 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

        {/* CONTENT */}
        <div className="absolute bottom-0 left-0 p-8">

          {/* TAGS */}
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge>{post.type}</Badge>

            {post.tags?.slice(0, 2).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          {/* TITLE */}
          <h1 className="mb-3 max-w-3xl text-4xl md:text-5xl font-bold tracking-tight text-white">
            {post.title}
          </h1>

          {/* DESCRIPTION */}
          <p className="max-w-2xl text-sm md:text-base text-gray-300">
            {post.description}
          </p>




          {/* CTA */}
          <div className="mt-6 flex items-center gap-3">

            <div className="inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white">
              Read article
            </div>

            {post.games?.slice(0, 2).map((game) => (
              <span
                key={game.id}
                onClick={(e) => {
                  e.stopPropagation(); //   se non c'è il click dato che è sull'intera card ne attiva 2, questo li separa
                  navigate(`/games/${game.id}`);
                }}
                className="
      rounded-2xl border border-border bg-surface p-4 cursor-pointer
      hover:border-primary hover:bg-white/5 transition
    "
              >
                {game.name}
              </span>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}