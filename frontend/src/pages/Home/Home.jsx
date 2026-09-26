import Navbar from '../../components/Navbar/Navbar.jsx';
import Searchbar from '../../components/Searchbar/Searchbar.jsx';
import MovieGrid from '../../components/MovieGrid/MovieGrid.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import LoginButton from '../../components/LoginButton/LoginButton.jsx';
import './Home.css';

function Home() {
  const movies = [
    {
      id: 1,
      title: 'Interstellar',
      year: 2014,
      rating: 8.7,
    },
    {
      id: 2,
      title: 'Inception',
      year: 2010,
      rating: 8.8,
    },
    {
      id: 3,
      title: 'The Dark Knight',
      year: 2008,
      rating: 9.0,
    },
    {
      id: 4,
      title: 'Dune',
      year: 2021,
      rating: 8.0,
    },
  ];

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
          <MovieGrid movies={movies} />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
