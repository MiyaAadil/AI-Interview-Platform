import { useState } from "react";
import Auth from "./Auth";
import type { User } from "./types";
import SessionsPage from "./SessionsPage";
import { Routes, Route } from "react-router-dom";
import SessionPage from "./SessionPage";

const App = () => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) return <Auth onLogin={setUser} />;

  return (
    <Routes>
      <Route path="/" element={<SessionsPage user={user} onLogout={handleLogout} />} />
      <Route path="/sessions/:id" element={<SessionPage />} />
    </Routes>
  );
};

export default App;