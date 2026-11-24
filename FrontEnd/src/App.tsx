import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SessionPage from "./SessionPage";
import SessionsPage from "./SessionsPage";
import type { User } from "./types";
import "./App.css";

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

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<SessionsPage user={user} />} />
            <Route path="/sessions/:id" element={<SessionPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth onLogin={setUser} />} />
            <Route path="/signup" element={<Auth onLogin={setUser} />} />
            <Route path="/sessions/:id" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
