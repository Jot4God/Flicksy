import './Navbar.css';
import { IconHome } from '@tabler/icons-react';

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Flicksy</h2>

      <div className="navbar-links">
        <div className="navbar-item">
          <IconHome stroke={2} />
          <a href="#">Home</a>
        </div>
        <a href="#popular">Movies</a>
        <a href="#">Search</a>
      </div>
    </nav>
  );
}

export default Navbar;
