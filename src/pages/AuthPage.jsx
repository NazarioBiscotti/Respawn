import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { signUp, signIn } from "../services/authService";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const isSignup = location.pathname === "/register";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
  e.preventDefault();

  setError(null);
  setLoading(true);

  const { error } = isSignup
    ? await signUp(email, password, { username })
    : await signIn(email, password);

  setLoading(false);

  if (error) {
    setError(error.message);
    return;
  }

  if (isSignup) {
    navigate("/login"); 
    return;
  }

  navigate("/"); 
}

  function switchMode() {
    navigate(isSignup ? "/login" : "/register");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-80 border-2 p-5 rounded"
      >
        <h1 className="text-xl font-bold text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h1>

        {isSignup && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 rounded-2xl p-3"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 rounded-2xl p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 rounded-2xl p-3"
        />

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="border rounded p-2"
        >
          {loading
            ? "Loading..."
            : isSignup
            ? "Sign Up"
            : "Login"}
        </button>

        {/* SWITCH */}
        <button
          type="button"
          onClick={switchMode}
          className="text-sm underline"
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign up"}
        </button>
      </form>
    </div>
  );
}