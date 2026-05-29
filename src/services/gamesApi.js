const API_KEY = import.meta.env.VITE_RAWG_KEY;

export async function searchGames(query) {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}`
  );

  const data = await res.json();
  return data.results;
}

export async function getGameDetails(id) {
  const res = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    
  const data = await res.json();
  return data;
}

