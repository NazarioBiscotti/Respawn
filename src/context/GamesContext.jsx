import { createContext, useContext, useEffect, useState } from "react";

// MOCK fetch (poi lo sostituiamo con RAWG)
async function fetchGames() {
  return [
    { id: "hades-2", name: "Hades II" },
    { id: "helldivers-2", name: "Helldivers 2" },
    { id: "stardew-valley", name: "Stardew Valley" },
  ];
}

const GamesContext = createContext(null);

export function GamesProvider({ children }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames().then((data) => {
      setGames(data);
      setLoading(false);

      
    });
  }, []);

  return (
    <GamesContext.Provider value={{ games, loading }}>
      {children}
    </GamesContext.Provider>
  );
}

export function useGames() {
  return useContext(GamesContext);
}