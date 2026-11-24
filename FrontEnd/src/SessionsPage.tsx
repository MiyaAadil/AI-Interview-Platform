import { useEffect, useState } from "react";
import { api } from "./api";
import type { SessionSummary, User } from "./types";
import { Link } from "react-router-dom";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

interface SessionsPageProps {
  user: User;
}

const SessionsPage = ({ user }: SessionsPageProps) => {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(true);

  const [title, setTitle] = useState<string>("");
  const [resumeText, setResumeText] = useState<string>("");
  const [resumeFileName, setResumeFileName] = useState<string>("");
  const [extractingResume, setExtractingResume] = useState<boolean>(false);
  const [resumeError, setResumeError] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [sessionToDelete, setSessionToDelete] = useState<SessionSummary | null>(null);
  const [deleteError, setDeleteError] = useState<string>("");
  const [deleting, setDeleting] = useState<boolean>(false);

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
    if (resumeText.trim().length < 50) {
      setError("Resume text must contain at least 50 characters. Check the extracted text or upload another PDF.");
      return;
    }
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
      setResumeFileName("");
      setResumeError("");
      setJobDescription("");
      await loadSessions();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create session");
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (file?: File) => {
    if (!file) return;
    setResumeError("");
    setError("");

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setResumeError("Choose a PDF file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setResumeError("PDF must be 10 MB or smaller.");
      return;
    }

    setExtractingResume(true);
    setResumeText("");
    setResumeFileName("");
    try {
      const loadingTask = getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
      try {
        const pdf = await loadingTask.promise;
        const pages: string[] = [];
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber);
          const content = await page.getTextContent();
          pages.push(content.items.map((item) => "str" in item ? `${item.str}${item.hasEOL ? "\n" : " "}` : "").join(""));
        }

        const extractedText = pages.join("\n\n").replace(/[ \t]+\n/g, "\n").trim();
        if (!extractedText) {
          setResumeError("No selectable text found. This PDF may be scanned or image-only.");
          return;
        }
        setResumeText(extractedText);
        setResumeFileName(file.name);
      } finally {
        await loadingTask.destroy();
      }
    } catch {
      setResumeError("Could not read this PDF. It may be damaged or password-protected.");
    } finally {
      setExtractingResume(false);
    }
  };

  const handleDelete = async () => {
    if (!sessionToDelete) return;

    setDeleting(true);
    setDeleteError("");
    try {
      await api(`/api/sessions/${sessionToDelete.id}`, { method: "DELETE" });
      setSessions((current) => current.filter((session) => session.id !== sessionToDelete.id));
      setSessionToDelete(null);
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Could not delete session");
    } finally {
      setDeleting(false);
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
        <div className="resume-upload-section">
          <label className="resume-upload-control" htmlFor="resume-pdf">
            <span className="resume-upload-icon" aria-hidden="true">↑</span>
            <span className="resume-upload-copy">
              <strong>{extractingResume ? "Extracting resume text..." : resumeFileName ? "Resume uploaded" : "Upload your resume"}</strong>
              <small>{resumeFileName || "PDF only · up to 10 MB · selectable text required"}</small>
            </span>
            <span className="resume-upload-action">{resumeFileName ? "Replace" : "Choose PDF"}</span>
            <input
              id="resume-pdf"
              className="resume-upload-input"
              type="file"
              accept="application/pdf,.pdf"
              disabled={extractingResume}
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                event.currentTarget.value = "";
                void handleResumeUpload(file);
              }}
            />
          </label>
          {resumeError && <p className="session-error" role="alert">{resumeError}</p>}
          {resumeText && (
            <div className="resume-extracted">
              <label htmlFor="resume-text">Extracted text <span>You can edit it before creating the session.</span></label>
              <textarea
                id="resume-text"
                className="session-field session-resume"
                value={resumeText}
                onChange={(event) => setResumeText(event.target.value)}
                required
              />
            </div>
          )}
        </div>
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
          disabled={saving || extractingResume}
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
              <li key={s.id} className="flex items-center gap-2">
                <Link to={`/sessions/${s.id}`} className="session-list-link">
                  <span className="session-list-icon" aria-hidden="true">↗</span>
                  <span className="session-list-copy"><strong>{s.title}</strong><small>{new Date(s.createdAt).toLocaleDateString()}</small></span>
                  <span className="session-list-arrow" aria-hidden="true">→</span>
                </Link>
                <button
                  type="button"
                  className="session-delete-action"
                  onClick={() => {
                    setDeleteError("");
                    setSessionToDelete(s);
                  }}
                  aria-label={`Delete ${s.title}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {sessionToDelete && (
        <div className="delete-dialog-backdrop">
          <section
            className="delete-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
          >
            <p className="session-eyebrow">DELETE SESSION</p>
            <h2 id="delete-dialog-title">Delete this session?</h2>
            <p id="delete-dialog-description">
              “{sessionToDelete.title}” and its questions and answers will be permanently deleted.
            </p>
            {deleteError && <p className="session-error" role="alert">{deleteError}</p>}
            <div className="delete-dialog-actions">
              <button
                type="button"
                className="delete-cancel-button"
                onClick={() => setSessionToDelete(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="delete-confirm-button"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete session"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default SessionsPage;
