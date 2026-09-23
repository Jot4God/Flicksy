import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Flicksy</h2>

      <div className="navbar-links">
        <a href="#">Home</a>
        <a href="#popular">Movies</a>
        <a href="#">Search</a>
      </div>
    </nav>
  );
}

export default Navbar;
