export interface User {
  id: number;
  username: string;
  email: string;
}

export interface SessionSummary {
  id: number;
  title: string;
  createdAt: string;
}

export interface Answer {
  id: number;
  text: string;
  score: number | null;
  feedback: string | null;
}

export interface Question {
  id: number;
  text: string;
  order: number;
  answer: Answer | null;
}

export interface SessionDetail {
  id: number;
  title: string;
  resumeText: string;
  jobDescription: string | null;
  questions: Question[];
}