const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies() {
  const token = process.env.TMDB_ACCESS_TOKEN;

  if (!token) {
    throw new Error("TMDB_ACCESS_TOKEN is not configured.");
  }

  const url = new URL(`${TMDB_BASE_URL}/movie/popular`);

  url.searchParams.set("language", "pt-PT");
  url.searchParams.set("page", "1");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(`TMDB request failed (${response.status}): ${errorBody}`);
  }

  return response.json();
}
