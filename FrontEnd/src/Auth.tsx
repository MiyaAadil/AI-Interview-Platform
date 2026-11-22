import { useState } from "react";
import { api } from "./api";
import type { User } from "./types";

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth = ({ onLogin }: AuthProps) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      if (isSignUp) {
        await api("/api/register", {
          method: "POST",
          body: JSON.stringify({ username, email, password }),
        });
        setInfo("Account created! Please log in.");
        setIsSignUp(false);
        setPassword("");
      } else {
        const data = await api<{ token: string; user: User }>("/api/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        onLogin(data.user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reach the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">{isSignUp ? "Create account" : "Log in"}</h1>

        {isSignUp && (
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          className="w-full border rounded px-3 py-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full border rounded px-3 py-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {info && <p className="text-green-600 text-sm">{info}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white rounded py-2 disabled:opacity-50"
        >
          {loading ? "Please wait..." : isSignUp ? "Sign up" : "Log in"}
        </button>

        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError("");
            setInfo("");
          }}
          className="w-full text-sm text-gray-600"
        >
          {isSignUp ? "Already have an account? Log in" : "No account? Sign up"}
        </button>
      </form>
    </div>
  );
};

export default Auth;