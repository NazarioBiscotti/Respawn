const STORAGE_KEY = "respawn_user";

const DEFAULT_STATE = {
  followedGames: [],
  savedPosts: [],
};

// 🔒 stato interno unico
let state = loadState();

// 👂 listeners per reattività globale
let listeners = [];

/* =========================
   LOAD / SAVE CORE
========================= */

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
    return DEFAULT_STATE;
  }

  try {
    return JSON.parse(raw);
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
    return DEFAULT_STATE;
  }
}

function saveState(newState) {
  state = newState;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  emit();
}

/* =========================
   REACTIVITY SYSTEM
========================= */

function emit() {
  listeners.forEach((fn) => fn(state));
}

export function subscribe(listener) {
  listeners.push(listener);

  // sync immediato
  listener(state);

  // cleanup
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

/* =========================
   READ API
========================= */

export function getUserState() {
  return state;
}

/* =========================
   SAVE POSTS
========================= */

export function toggleSavePost(postId) {
  const isSaved = state.savedPosts.includes(postId);

  const updated = {
    ...state,
    savedPosts: isSaved
      ? state.savedPosts.filter((id) => id !== postId)
      : [...state.savedPosts, postId],
  };

  saveState(updated);
  return updated;
}

/* =========================
   FOLLOW GAMES
========================= */

export function toggleFollowGame(gameId) {
  const isFollowing = state.followedGames.includes(gameId);

  const updated = {
    ...state,
    followedGames: isFollowing
      ? state.followedGames.filter((id) => id !== gameId)
      : [...state.followedGames, gameId],
  };

  saveState(updated);
  return updated;
}