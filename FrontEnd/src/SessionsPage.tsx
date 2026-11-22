import { useEffect, useState } from "react";
import { api } from "./api";
import type { SessionSummary, User } from "./types";
import { Link } from "react-router-dom";

interface SessionsPageProps {
  user: User;
  onLogout: () => void;
}

const SessionsPage = ({ user, onLogout }: SessionsPageProps) => {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(true);

  const [title, setTitle] = useState<string>("");
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  const loadSessions = async () => {
    try {
      const data = await api<{ sessions: SessionSummary[] }>("/api/sessions");
      setSessions(data.sessions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load sessions");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      await api("/api/sessions", {
        method: "POST",
        body: JSON.stringify({
          title,
          resumeText,
          ...(jobDescription.trim() ? { jobDescription } : {}),
        }),
      });
      setTitle("");
      setResumeText("");
      setJobDescription("");
      await loadSessions();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create session");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hi, {user.username}</h1>
        <button onClick={onLogout} className="text-sm underline">Log out</button>
      </header>

      <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow space-y-3">
        <h2 className="text-lg font-semibold">New practice session</h2>

        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Title (e.g. Backend intern at Leapfrog)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border rounded px-3 py-2 h-40"
          placeholder="Paste your resume text here"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          required
        />
        <textarea
          className="w-full border rounded px-3 py-2 h-24"
          placeholder="Paste the job description (optional)"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white rounded px-4 py-2 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Create session"}
        </button>
      </form>

      <section>
        <h2 className="text-lg font-semibold mb-3">Your sessions</h2>
        {loadingList ? (
          <p>Loading...</p>
        ) : sessions.length === 0 ? (
          <p className="text-gray-500">No sessions yet. Create your first one above.</p>
        ) : (
          <ul className="space-y-2">
            {sessions.map((s) => (
              <li key={s.id} className="bg-white p-4 rounded shadow flex justify-between">
                <Link to={`/sessions/${s.id}`} className="font-medium hover:underline">{s.title}</Link>
                <span className="text-sm text-gray-500">
                  {new Date(s.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default SessionsPage;