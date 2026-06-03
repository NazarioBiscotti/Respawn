import { useEffect, useState } from "react";
import { subscribe } from "../services/userStore";

export function useUserState() {
  const [state, setState] = useState(subscribe);

  useEffect(() => {
    const unsubscribe = subscribe(setState);
    return unsubscribe;
  }, []);

  return state;
}