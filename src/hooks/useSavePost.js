import { useState } from "react";
import { getUserState, toggleSavePost } from "../services/userStore";

export function useSavePost() {
  const [state, setState] = useState(getUserState());

  const savePost = (postId) => {
    const updated = toggleSavePost(postId);
    setState(updated);
  };

  const isSaved = (postId) => {
    return state.savedPosts.includes(postId);
  };

  return {
    savePost,
    isSaved,
    savedPosts: state.savedPosts, // opzionale ma utile
  };
}