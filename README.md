# InterviewPrep AI

Practice interviews with AI. Paste your resume and a job description, get tailored interview questions, answer them, and receive a score with specific feedback. Every session is saved.

**Live demo:** <https://ai-interviewhelper-platform.vercel.app/>
(Click **Try demo** to explore without signing up. The backend runs on a free server that sleeps when idle, so the first load can take up to a minute.)

<screenshot of the questions page> <screenshot of the feedback view>

## Features
- Register and log in with JWT authentication
- Create a practice session from your resume and an optional job description
- AI-generated interview questions (5 per session, mixing technical and behavioral)
- Submit answers and get a 1 to 10 score with written feedback
- Saved history of sessions, questions, answers and feedback
- One-click demo guest account

## Tech stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Auth and validation:** JWT, bcrypt, Zod
- **AI:** Groq API
- **Hosting:** Vercel (frontend), Render (backend), Neon (database)

## Architecture
```
React (Vercel)  →  Express API (Render)  →  Prisma  →  PostgreSQL (Neon)
                          ↓
                      Groq API
```
The browser never talks to the AI provider. The API key lives only on the server.

## API overview
| Method | Endpoint | What it does |
|---|---|---|
| POST | `/api/register`, `/api/login` | Create an account, get a JWT |
| POST | `/api/demo` | Create a temporary guest account with sample data |
| GET, POST | `/api/sessions` | List my sessions, create a session |
| GET | `/api/sessions/:id` | One session with its questions and answers |
| POST | `/api/sessions/:id/questions` | Generate questions with AI |
| POST | `/api/sessions/:sessionId/questions/:questionId/answer` | Submit an answer, get AI feedback |

All session routes require `Authorization: Bearer <token>`.

## Key decisions
- **The user id always comes from the JWT, never from the request body.** A client can't create or read data as someone else.
- **Ownership is checked inside the database query** (`where: { id, userId }`). Another user's record returns 404, so the API doesn't reveal that the id exists.
- **AI output is validated with Zod before it's saved.** Models sometimes return the wrong shape, so nothing unvalidated reaches the database.
- **The AI is called before any database write.** If the provider fails, nothing is half-saved, and the client gets a 502 it can retry.
- **User text is treated as data in prompts**, with an instruction to ignore instructions inside resumes and answers, to reduce prompt injection.
- **AI endpoints are rate limited**, since each call costs money.
- **The model name lives in one constant.** Providers retire models, and this project has already outlived two of them.
- **Passwords are hashed with bcrypt**, and login returns the same error for an unknown email and a wrong password, so emails can't be enumerated.

## Run it locally
```bash
# Backend
cd BackEnd
npm install
cp .env.example .env      # then fill in the values
npx prisma migrate dev
npm run dev

# Frontend (new terminal)
cd FrontEnd
npm install
npm run dev
```

**Backend `.env`:** `DATABASE_URL`, `JWT_SECRET`, `GROQ_API_KEY`, `FRONTEND_URL`
**Frontend `.env`:** `VITE_API_URL`

## Limitations and next steps
- Feedback quality depends on the AI model and isn't a substitute for a human interviewer.
- The free backend host sleeps when idle, so the first request after a quiet period is slow.