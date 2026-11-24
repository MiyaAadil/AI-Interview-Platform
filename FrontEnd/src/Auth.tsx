import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "./api";
import type { User } from "./types";

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth = ({ onLogin }: AuthProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState<boolean>(location.pathname === "/signup");
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
        navigate("/login", { replace: true });
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
    <main className="auth-page">
      <form onSubmit={handleSubmit} className="auth-panel">
        <div className="auth-kicker">{isSignUp ? "A FRESH START" : "WELCOME BACK"}</div>
        <h1>{isSignUp ? "Create your account" : "Good to see you again."}</h1>
        <p className="auth-intro">{isSignUp ? "Set up your space and start practicing with purpose." : "Pick up where your interview preparation left off."}</p>

        {isSignUp && (
          <input
            className="auth-input"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="auth-message auth-error" role="alert">{error}</p>}
        {info && <p className="auth-message auth-success" role="status">{info}</p>}

        <button
          type="submit"
          disabled={loading}
          className="button button-dark auth-submit"
        >
          {loading ? "Please wait..." : isSignUp ? "Sign up" : "Log in"}
        </button>

        <button
          type="button"
          onClick={() => {
            setError("");
            setInfo("");
            const nextIsSignUp = !isSignUp;
            setIsSignUp(nextIsSignUp);
            navigate(nextIsSignUp ? "/signup" : "/login");
          }}
          className="auth-switch"
        >
          {isSignUp ? "Already have an account? Log in" : "No account? Sign up"}
        </button>
      </form>
    </main>
  );
};

export default Auth;
