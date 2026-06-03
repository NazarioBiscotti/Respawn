import { useNavigate } from "react-router-dom";
import { useSavePost } from "../../hooks/useSavePost";

export default function PulseCard({
  id,
  title,
  description,
  image,
  type,
  games = [],
  variant = "review",
  signalScore, // ✅ IMPORTANTISSIMO
}) {
  const navigate = useNavigate();
  const { savePost, isSaved } = useSavePost();
  const emptyStar = <i className="fa-regular fa-star"></i>
  const fullStar = <i className="fa-solid fa-star"></i>

  const sizeStyles =
    variant === "spotlight"
      ? "md:col-span-2"
      : variant === "trend"
      ? "opacity-95"
      : "";



  return (
    <article
      onClick={() => navigate(`/pulse/${id}`)}
      className={`
        rounded-2xl border border-border bg-surface p-4 cursor-pointer
        hover:border-primary transition
        ${sizeStyles}
      `}
    >
      <img
        src={image}
        className="h-48 w-full object-cover rounded-xl mb-3"
      />

      <p className="text-xs text-primary mb-1">
        {type}
      </p>

      <h3 className="font-semibold text-lg mb-2">
        {title}
      </h3>

      {/* 🔥 SIGNAL BADGE */}
      {signalScore >= 3 && (
        <span className="text-xs text-primary mb-2 block">
          🔥 Relevant for you
        </span>
      )}

      <p className="text-sm text-white/60 mb-3">
        {description}
      </p>

      

      {/* GAMES */}

      <div className="flex justify-between items-center">

      {games.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {games.map((game) => (
            <span
              key={game.id}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/games/${game.id}`);
              }}
              className="text-xs text-primary hover:underline"
            >
              🎮 {game.name}
            </span>
          ))}
        </div>
      )}
      <button
  onClick={(e) => {
    e.stopPropagation();
    savePost(id);
  }}
  className="text-2xl text-yellow-300 hover:text-white transition  "
>
  {isSaved(id) ? fullStar : emptyStar}
</button>
      </div>

    </article>
  );
}