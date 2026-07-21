import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export function Protected({ children }) {
  const { user, loading } = useUser();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}