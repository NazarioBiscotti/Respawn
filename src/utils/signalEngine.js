export function buildSignals(posts = [], followedGames = []) {
  const map = {};

  // 🎮 strong signal (followed)
  followedGames.forEach((id) => {
    map[id] = {
      id,
      score: 5,
      source: "followed",
    };
  });

  // 🧠 content-based signal
  posts.forEach((post) => {
    post.games?.forEach((g) => {
      if (!map[g.id]) {
        map[g.id] = {
          id: g.id,
          score: 1,
          source: "content",
        };
      } else {
        map[g.id].score += 1;
      }
    });
  });

  return Object.values(map).sort((a, b) => b.score - a.score);
}


export function rankFeedBySignals(posts, followedGames = []) {
  if (!Array.isArray(posts)) return [];

  const followedSet = new Set(followedGames);

  return posts
    .map((post) => {
      let score = 0;
      const matchedGames = [];

      post.games?.forEach((g) => {
        if (followedSet.has(g.id)) {
          score += 5; // follow signal (forte ma non assoluto)
          matchedGames.push(g);
        }
      });

      // bonus leggero per contenuti multi-game
      if (post.games?.length > 1) {
        score += 1;
      }

      return {
        ...post,
        signalScore: score,
        signalGames: matchedGames, // 👈 importante per UX futura
      };
    })
    .sort((a, b) => b.signalScore - a.signalScore);
}