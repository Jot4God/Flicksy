import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "node:path";
import profileRoutes from "./routes/profile.routes.js";
import { initializeFirebaseAdmin } from "./lib/firebaseAdmin.js";
import fs from "fs";

initializeFirebaseAdmin();

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const app = express();
const port = Number(process.env.PORT || 3000);
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: frontendOrigin,
    credentials: true,
  }),
);

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/profile", profileRoutes);

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(error);

    const message =
      error instanceof Error ? error.message : "Unexpected server error.";
    res.status(400).json({ message });
  },
);

app.listen(port, () => {
  console.log(`Flicksy backend running at http://localhost:${port}`);
});
