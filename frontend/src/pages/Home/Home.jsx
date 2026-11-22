import { useEffect, useState } from 'react'

import Navbar from '../../components/Navbar/Navbar.jsx'
import Searchbar from '../../components/Searchbar/Searchbar.jsx'
import MovieGrid from '../../components/MovieGrid/MovieGrid.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import LoginButton from '../../components/Buttons/LoginButton.jsx'

import { getPopularMovies } from '../../services/movieService.js'

import './Home.css'

function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadPopularMovies() {
      try {
        const data = await getPopularMovies()

        const formattedMovies = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date ? movie.release_date.slice(0, 4) : 'N/A',
          rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
          poster_path: movie.poster_path,
        }))

        setMovies(formattedMovies)
      } catch (err) {
        console.error('Failed to load popular movies:', err)
        setError('Failed to load popular movies.')
      } finally {
        setLoading(false)
      }
    }

    loadPopularMovies()
  }, [])

  return (
    <>
      <Navbar />

      <LoginButton />

      <Searchbar />

      <main className="home">
        <section className="hero">
          <p className="hero-eyebrow">Movie discovery, ratings and reviews</p>

          <h1>Flicksy</h1>

          <p className="hero-subtitle">Discover, rate and review movies.</p>
        </section>

        <section className="movies-section" id="popular">
          <h2>Popular Movies</h2>

          {loading && <p>Loading popular movies...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && <MovieGrid movies={movies} />}
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Home
