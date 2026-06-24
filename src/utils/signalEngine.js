export function rankFeedBySignals(posts, followedGames = [], savedPosts = []) {
  const savedSet = new Set(savedPosts);

  return posts
    .map((post) => {
      let score = 0;

      // 🎮 1. giochi seguiti
      post.games?.forEach((g) => {
        if (followedGames.includes(g.id)) {
          score += 5;
        }
      });

      // ⭐ 2. post salvati
      if (savedSet.has(post.id)) {
        score += 10;
      }

      // ⏳ 3. freschezza contenuto (semplice)
      const idFactor = post.id; 
      score += 1 / idFactor; // solo per dare leggero boost ai nuovi

      return {
        ...post,
        signalScore: score,
      };
    })
    .sort((a, b) => b.signalScore - a.signalScore);
}

export function buildSignals(posts, followedGames = []) {
  const gameMap = new Map();

  posts.forEach((post) => {
    post.games?.forEach((g) => {
      if (!gameMap.has(g.id)) {
        gameMap.set(g.id, 0);
      }

      // base score
      let score = gameMap.get(g.id);

      // boost se follow
      if (followedGames.includes(g.id)) {
        score += 5;
      } else {
        score += 1;
      }

      gameMap.set(g.id, score);
    });
  });

  return Array.from(gameMap.entries())
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score);
}