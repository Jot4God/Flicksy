const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export async function getPopularMovies() {
  const response = await fetch(`${API_URL}/movies/popular`)

  if (!response.ok) {
    throw new Error('Failed to fetch popular movies')
  }

  return response.json()
}
