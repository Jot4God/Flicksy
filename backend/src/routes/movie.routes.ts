import { Router } from "express";

import { getPopularMovies } from "../services/tmdb.service.js";

const router = Router();

router.get("/popular", async (_req, res) => {
  try {
    const movies = await getPopularMovies();

    res.json(movies);
  } catch (error) {
    console.error("TMDB error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch popular movies.";

    res.status(500).json({
      message,
    });
  }
});

export default router;
