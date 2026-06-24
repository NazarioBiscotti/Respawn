import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { signUp } from "../services/authService";
import { signIn } from "../services/authService";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const isSignup = location.pathname === "/register";

  const login = signIn();
  const signup = signUp();

  const mutation = isSignup ? signup : login;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (isSignup) {
      signup.mutate({
        email,
        password,
        username,
      });
    } else {
      login.mutate({
        email,
        password,
      });
    }
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
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="border-2 rounded-2xl p-3"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="border-2 rounded-2xl p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="border-2 rounded-2xl p-3"
        />

        {/* ERROR */}
        {mutation.isError && (
          <p className="text-red-500 text-sm">
            {mutation.error.message}
          </p>
        )}

        {/* SUCCESS */}
        {mutation.isSuccess && (
          <p className="text-green-500 text-sm">
            {isSignup
              ? "Account creato!"
              : "Login effettuato!"}
          </p>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="border rounded p-2"
        >
          {mutation.isPending
            ? "Loading..."
            : isSignup
            ? "Sign Up"
            : "Login"}
        </button>

        {/* SWITCH CTA (in-page) */}
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