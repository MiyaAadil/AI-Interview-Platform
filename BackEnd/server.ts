import "dotenv/config";
import express from "express";
import cors from "cors";
import chalk from "chalk";
import { log } from "node:console";
import authRoutes from "./routes/auth.routes";
import applicationsRoutes from "./routes/applications.routes"
// import { authMiddleware, AuthRequest } from "./middlewares/authMiddleware";
import sessionRoutes from "./routes/session.routes"; 

const app = express();
app.set("trust proxy", 1);

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my server" })
})

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/sessions", sessionRoutes);

app.use("/api", authRoutes);
// app.use("/api/applications", applicationsRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.green.bold(`✓ Server running on http://localhost:${PORT}`));
});