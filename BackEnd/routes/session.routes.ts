import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware, AuthRequest } from "../middlewares/authMiddleware";
import { sessionSchema } from "../schemas/session.schema";
import { generateQuestions, evaluateAnswer  } from "../services/ai.services";
import { answerSchema } from "../schemas/answer.schema";
import { aiLimiter } from "../middlewares/rateLimit";

const router = Router();

router.use(authMiddleware);

// Create a session
router.post("/", async (req: AuthRequest, res) => {
  const result = sessionSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }

  const { title, resumeText, jobDescription } = result.data;
  const session = await prisma.interviewSession.create({
    data: {
      title,
      resumeText,
      jobDescription,
      userId: req.user!.id,
    },
  });

  res.status(201).json(session);
});

// List my sessions
router.get("/", async (req: AuthRequest, res) => {
  const sessions = await prisma.interviewSession.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, createdAt: true },
  });

  res.json({ sessions });
});

// Get one session, with its questions and answers
router.get("/:id", async (req: AuthRequest, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const session = await prisma.interviewSession.findFirst({
    where: { id, userId: req.user!.id },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: { answer: true },
      },
    },
  });

  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }

  res.json(session);
});

// Delete one of my sessions and its related questions and answers
router.delete("/:id", async (req: AuthRequest, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const result = await prisma.interviewSession.deleteMany({
    where: { id, userId: req.user!.id },
  });

  if (result.count === 0) {
    return res.status(404).json({ error: "Session not found" });
  }

  return res.status(204).end();
});



router.post("/:id/questions", aiLimiter, async (req: AuthRequest, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const session = await prisma.interviewSession.findFirst({
    where: { id, userId: req.user!.id },
    include: { questions: true },
  });
  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }

  if (session.questions.length > 0) {
    return res.status(409).json({ error: "Questions already generated" });
  }

  
  let questions: string[];
  try {
    questions = await generateQuestions(session.resumeText, session.jobDescription ?? undefined);
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: "AI service failed, try again" });
  }

  await prisma.question.createMany({
    data: questions.map((text, i) => ({ text, order: i + 1, sessionId: id })),
  });

  const savedQuestions = await prisma.question.findMany({
    where: { sessionId: id },
    orderBy: { order: "asc" },
  });
  return res.status(201).json({ questions: savedQuestions });
});


router.post("/:sessionId/questions/:questionId/answer", aiLimiter, async (req: AuthRequest, res) => {
  const sessionId = parseInt(req.params.sessionId);
  const questionId = parseInt(req.params.questionId);
  if (isNaN(sessionId) || isNaN(questionId)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const result = answerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }


  const question = await prisma.question.findFirst({
    where: {
      id: questionId,
      sessionId,
      session: { userId: req.user!.id },
    },
    include: { answer: true },
  });
  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }
  if (question.answer) {
    return res.status(409).json({ error: "Already answered" });
  }

  
  let evaluation: { score: number; feedback: string };
  try {
    evaluation = await evaluateAnswer(question.text, result.data.text);
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: "AI service failed, try again" });
  }

  const answer = await prisma.answer.create({
    data: {
      text: result.data.text,
      score: evaluation.score,
      feedback: evaluation.feedback,
      questionId,
    },
  });

  return res.status(201).json(answer);
});

export default router;
