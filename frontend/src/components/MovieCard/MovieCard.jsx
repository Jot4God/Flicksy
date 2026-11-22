import './MovieCard.css'

function MovieCard({ title, year, rating, posterPath }) {
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : null

  return (
    <article className="movie-card">
      <div className="movie-poster">
        {posterUrl ? <img src={posterUrl} alt={title} /> : <span>Poster</span>}
      </div>

      <div className="movie-info">
        <h3>{title}</h3>

        <p>{year}</p>

        <span>⭐ {rating}</span>
      </div>
    </article>
  )
}

export default MovieCard
