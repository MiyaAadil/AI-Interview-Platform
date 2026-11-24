import { useState } from "react";
import { api } from "./api";
import type { Question } from "./types";

interface QuestionCardProps {
  sessionId: string;
  question: Question;
  onAnswered: () => void;
}

const QuestionCard = ({ sessionId, question, onAnswered }: QuestionCardProps) => {
  const [text, setText] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await api(`/api/sessions/${sessionId}/questions/${question.id}/answer`, {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      onAnswered();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit answer");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <li className="question-card">
      <div className="question-meta">
        <span>QUESTION {String(question.order).padStart(2, "0")}</span>
        <span className={question.answer ? "question-status is-done" : "question-status"}>
          {question.answer ? "Answered" : "Your turn"}
        </span>
      </div>
      <h2 className="question-prompt">{question.text}</h2>

      {question.answer ? (
        <div className="answer-review">
          <div className="answer-copy">
            <p className="answer-label">YOUR ANSWER</p>
            <p>{question.answer.text}</p>
          </div>
          <div className="feedback-card">
            <div className="feedback-heading">
              <p className="answer-label">FEEDBACK</p>
              <span className="score-pill">{question.answer.score}/10</span>
            </div>
            <p>{question.answer.feedback}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="answer-form">
          <textarea
            className="answer-input"
            placeholder="Write your answer here..."
            aria-label={`Your answer to question ${question.order}`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={5000}
            required
          />
          <div className="answer-form-footer">
            <span className="answer-count">{text.length}/5000</span>
            <button type="submit" disabled={submitting} className="button button-dark answer-submit">
              {submitting ? "Reviewing..." : "Submit answer"}<span aria-hidden="true">→</span>
            </button>
          </div>
          {error && <p className="session-error" role="alert">{error}</p>}
        </form>
      )}
    </li>
  );
};

export default QuestionCard;
