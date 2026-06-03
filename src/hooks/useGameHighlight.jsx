import { useNavigate } from "react-router-dom";

export default function useGameHighlight(games = []) {
  const navigate = useNavigate();

  const renderText = (text) => {
    if (!text || !games.length) return text;

    // costruisco regex con tutti i giochi
    const pattern = games
      .map((g) => g.name)
      .join("|");

    const regex = new RegExp(`(${pattern})`, "gi");

    const parts = text.split(regex);

    return parts.map((part, i) => {
      const match = games.find(
        (g) =>
          g.name.toLowerCase() === part.toLowerCase()
      );

      if (match) {
        return (
          <span
            key={i}
            onClick={() =>
              navigate(`/games/${match.id}`)
            }
            className="text-primary cursor-pointer hover:underline"
          >
            🎮 {part}
          </span>
        );
      }

      return part;
    });
  };

  return renderText;
}   