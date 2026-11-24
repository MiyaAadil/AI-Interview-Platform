import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "./api";
import type { SessionDetail } from "./types";
import QuestionCard from "./QuestionCard";

const SessionPage = () => {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<SessionDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [generating, setGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const loadSession = async () => {
    try {
      const data = await api<SessionDetail>(`/api/sessions/${id}`);
      setSession(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load session");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSession();
  }, [id]);

  const handleGenerate = async () => {
    setError("");
    setGenerating(true);
    try {
      await api(`/api/sessions/${id}/questions`, { method: "POST" });
      await loadSession();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate questions");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <main className="session-page"><p className="session-muted">Loading your session...</p></main>;
  }

  if (!session) {
    return (
      <main className="session-page">
        <Link to="/" className="session-back">← Your sessions</Link>
        <div className="session-empty"><p className="session-error">{error || "Session not found"}</p></div>
      </main>
    );
  }

  return (
    <main className="session-page">
      <Link to="/" className="session-back">← Your sessions</Link>
      <header className="session-heading">
        <p className="session-eyebrow">PRACTICE SESSION</p>
        <h1>{session.title}</h1>
        <p>{session.questions.length} {session.questions.length === 1 ? "question" : "questions"} to work through at your pace.</p>
      </header>

      {error && <p className="session-error" role="alert">{error}</p>}

      {session.questions.length === 0 ? (
        <section className="session-empty">
          <span className="empty-icon" aria-hidden="true">✳</span>
          <p className="session-eyebrow">READY WHEN YOU ARE</p>
          <h2>Build your question set</h2>
          <p>Generate five interview questions based on your resume and the role.</p>
          <button onClick={handleGenerate} disabled={generating} className="button button-dark session-generate">
            {generating ? "Preparing questions..." : "Generate questions"}<span aria-hidden="true">→</span>
          </button>
        </section>
      ) : (
        <ol className="session-question-list">
          {session.questions.map((question) => (
            <QuestionCard
              key={question.id}
              sessionId={id!}
              question={question}
              onAnswered={loadSession}
            />
          ))}
        </ol>
      )}
    </main>
  );
};

export default SessionPage;
