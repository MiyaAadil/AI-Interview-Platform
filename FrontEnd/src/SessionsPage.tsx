import { useEffect, useState } from "react";
import { api } from "./api";
import type { SessionSummary, User } from "./types";
import { Link } from "react-router-dom";

interface SessionsPageProps {
  user: User;
}

const SessionsPage = ({ user }: SessionsPageProps) => {
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
    <main className="sessions-home">
      <header className="sessions-heading">
        <p className="session-eyebrow">YOUR PREPARATION SPACE</p>
        <h1>Good to see you, {user.username}.</h1>
        <p>Make a little time to practice. You’re closer than you think.</p>
      </header>

      <form onSubmit={handleCreate} className="new-session-form">
        <div className="form-heading">
          <div><p className="session-eyebrow">START SOMETHING NEW</p><h2>New practice session</h2></div>
          <span className="form-spark" aria-hidden="true">✳</span>
        </div>

        <input
          className="session-field"
          placeholder="Title (e.g. Backend intern at Leapfrog)"
          aria-label="Session title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="session-field session-resume"
          placeholder="Paste your resume text here"
          aria-label="Resume text"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          required
        />
        <textarea
          className="session-field session-job"
          placeholder="Paste the job description (optional)"
          aria-label="Job description (optional)"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        {error && <p className="session-error" role="alert">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="button button-dark create-session-button"
        >
          {saving ? "Creating session..." : "Create session"}<span aria-hidden="true">→</span>
        </button>
      </form>

      <section className="sessions-list-section">
        <div className="sessions-list-heading"><h2>Your sessions</h2><span>{sessions.length}</span></div>
        {loadingList ? (
          <p className="sessions-empty">Loading your sessions...</p>
        ) : sessions.length === 0 ? (
          <p className="sessions-empty">No sessions yet. Create your first one above.</p>
        ) : (
          <ul className="sessions-list">
            {sessions.map((s) => (
              <li key={s.id}>
                <Link to={`/sessions/${s.id}`} className="session-list-link">
                  <span className="session-list-icon" aria-hidden="true">↗</span>
                  <span className="session-list-copy"><strong>{s.title}</strong><small>{new Date(s.createdAt).toLocaleDateString()}</small></span>
                  <span className="session-list-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default SessionsPage;
