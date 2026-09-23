import './MovieCard.css';

function MovieCard({ title, year, rating }) {
  return (
    <article className="movie-card">
      <div className="movie-poster">
        <span>Poster</span>
      </div>

      <div className="movie-info">
        <h3>{title}</h3>
        <p>{year}</p>
        <span>⭐ {rating}</span>
      </div>
    </article>
  );
}

export default MovieCard;
