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
    <li className="bg-white p-4 rounded shadow space-y-3">
      <p className="font-medium">
        {question.order}. {question.text}
      </p>

      {question.answer ? (
        <div className="space-y-2">
          <div>
            <p className="text-xs uppercase text-gray-500">Your answer</p>
            <p className="whitespace-pre-wrap">{question.answer.text}</p>
          </div>
          <div className="bg-gray-50 rounded p-3">
            <p className="font-semibold">Score: {question.answer.score}/10</p>
            <p className="text-sm mt-1 whitespace-pre-wrap"><span
             className="font-bold text-amber-300">AI feedback: </span>{question.answer.feedback}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
            className="w-full border rounded px-3 py-2 h-28"
            placeholder="Type your answer..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={5000}
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="bg-black text-white rounded px-4 py-2 disabled:opacity-50"
          >
            {submitting ? "Evaluating... (a few seconds)" : "Submit answer"}
          </button>
        </form>
      )}
    </li>
  );
};

export default QuestionCard;