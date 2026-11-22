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

  if (loading) return <p className="p-6">Loading...</p>;

  if (!session) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error || "Session not found"}</p>
        <Link to="/" className="underline">Back to sessions</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Link to="/" className="text-sm underline">← Back to sessions</Link>
      <h1 className="text-2xl font-bold">{session.title}</h1>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {session.questions.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow space-y-3">
          <p>No questions yet. Generate 5 questions based on your resume.</p>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="bg-black text-white rounded px-4 py-2 disabled:opacity-50"
          >
            {generating ? "Generating... (this can take a few seconds)" : "Generate questions"}
          </button>
        </div>
      ) : (
                <ol className="space-y-3">
          {session.questions.map((q) => (
            <QuestionCard
              key={q.id}
              sessionId={id!}
              question={q}
              onAnswered={loadSession}
            />
          ))}
        </ol>
      )}
    </div>
  );
};

export default SessionPage;