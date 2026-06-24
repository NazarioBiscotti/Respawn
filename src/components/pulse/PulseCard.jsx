import { useNavigate } from "react-router-dom";
import { useToggleActions } from "../../hooks/useToggleActions";
import { useUser } from "../../context/UserContext";
import { useState } from "react";

export default function PulseCard({
  id,
  title,
  description,
  image,
  type,
  games = [],
  variant = "review",
  signalScore,
}) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { savePost } = useToggleActions();

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const emptyStar = <i className="fa-regular fa-star"></i>;
  const fullStar = <i className="fa-solid fa-star"></i>;

  const sizeStyles =
    variant === "spotlight"
      ? "md:col-span-2"
      : variant === "trend"
        ? "opacity-95"
        : "";

  const handleSave = async (e) => {
    e.stopPropagation();

    if (!user || saving) return;

    setSaving(true);
    setSaved((prev) => !prev);

    const res = await savePost(id);

    if (res?.error) {
      setSaved((prev) => !prev);
    }

    setSaving(false);
  };

  const handleGameClick = (e, gameId) => {
    e.stopPropagation();
    navigate(`/games/${gameId}`);
  };

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
        alt={title}
      />

      <p className="text-xs text-primary mb-1">{type}</p>

      <h3 className="font-semibold text-lg mb-2">{title}</h3>

      {/*  SIGNAL BADGE */}
      {signalScore >= 3 && (
        <span className="text-xs text-primary mb-2 block">
          🔥 Relevant for you
        </span>
      )}

      <p className="text-sm text-white/60 mb-3">{description}</p>

      {/* FOOTER */}
      <div className="flex justify-between items-center">
        {/* GAMES */}
        {games.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {games.map((game) => (
              <span
                key={game.id}
                onClick={(e) => handleGameClick(e, game.id)}
                className="text-xs text-primary hover:underline"
              >
                {game.name}
              </span>
            ))}
          </div>
        )}

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={saving}
          className={`
            text-2xl transition
            ${saved ? "text-yellow-300" : "text-white/40 hover:text-white"}
          `}
        >
          {saved ? fullStar : emptyStar}
        </button>
      </div>
    </article>
  );
}