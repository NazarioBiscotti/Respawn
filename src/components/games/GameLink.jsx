// components/games/GameLink.jsx
import { Link } from "react-router-dom";

export default function GameLink({ game }) {
  if (!game) return null;

  return (
    <Link
      to={`/games/${game.id}`}
      className="
        inline-flex
        items-center
        gap-1
        text-sm
        text-primary
        hover:underline
        transition
      "
    >
      🎮 {game.name}
    </Link>
  );
}