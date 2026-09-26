import './Navbar.css';

import {
  IconHome,
  IconMovie,
  IconDeviceDesktop,
  IconPin,
  IconList,
  IconUsers,
  IconQuestionMark,
  IconBookmark,
  IconPlayerPlayFilled,
  IconMessage,
  IconStarFilled,
  IconSettings,
  IconUserPlus,
  IconChevronRight
} from '@tabler/icons-react';

import { useLocation, useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar">

      <div className="navbar-logo-container">
        <img
          src="/flicksy-favicon.png"
          alt="Flicksy logo"
          className="navbar-logo-image"
        />

        <h2 className="navbar-logo">
          Flicksy
        </h2>
      </div>


      <div className="navbar-main-menu">

        <button
          className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          <IconHome size={20} stroke={2} />
          <span>Home</span>
        </button>


        <button
          className={`navbar-item ${location.pathname === '/movies' ? 'active' : ''}`}
          onClick={() => navigate('/movies')}
        >
          <IconMovie size={20} stroke={2} />
          <span>Movies</span>
        </button>


        <button
          className={`navbar-item ${location.pathname === '/tv-shows' ? 'active' : ''}`}
          onClick={() => navigate('/tv-shows')}
        >
          <IconDeviceDesktop size={20} stroke={2} />
          <span>TV Shows</span>
        </button>


        <button
          className={`navbar-item ${location.pathname === '/reviews' ? 'active' : ''}`}
          onClick={() => navigate('/reviews')}
        >
          <IconPin size={20} stroke={2} />
          <span>Reviews</span>
        </button>


        <button
          className={`navbar-item ${location.pathname === '/lists' ? 'active' : ''}`}
          onClick={() => navigate('/lists')}
        >
          <IconList size={20} stroke={2} />
          <span>Lists</span>
        </button>


        <button
          className={`navbar-item ${location.pathname === '/friends' ? 'active' : ''}`}
          onClick={() => navigate('/friends')}
        >
          <IconUsers size={20} stroke={2} />
          <span>Friends</span>
        </button>


        <button
          className={`navbar-item ${location.pathname === '/quiz' ? 'active' : ''}`}
          onClick={() => navigate('/quiz')}
        >
          <IconQuestionMark size={20} stroke={2} />
          <span>Quiz</span>
        </button>

      </div>


      <div className="navbar-divider" />


      <div className="navbar-library">

        <p className="navbar-section-title">
          YOUR LIBRARY
        </p>


        <button
          className={`navbar-item ${location.pathname === '/watchlist' ? 'active' : ''}`}
          onClick={() => navigate('/watchlist')}
        >
          <IconBookmark size={20} stroke={2} />

          <span>Watchlist</span>

          <span className="navbar-count">
            42
          </span>
        </button>


        <button
          className={`navbar-item ${location.pathname === '/watched' ? 'active' : ''}`}
          onClick={() => navigate('/watched')}
        >
          <IconPlayerPlayFilled size={20} />

          <span>Watched</span>

          <span className="navbar-count">
            188
          </span>
        </button>


        <button
          className={`navbar-item ${location.pathname === '/rated' ? 'active' : ''}`}
          onClick={() => navigate('/rated')}
        >
          <IconMessage size={20} stroke={2} />

          <span>Rated</span>

          <span className="navbar-count">
            156
          </span>
        </button>


        <button
          className={`navbar-item ${location.pathname === '/favorites' ? 'active' : ''}`}
          onClick={() => navigate('/favorites')}
        >
          <IconStarFilled size={20} />

          <span>Favorites</span>

          <span className="navbar-count">
            23
          </span>
        </button>

      </div>


      <div className="navbar-bottom">

        <div className="invite-card">

          <div className="invite-card-top">

            <div className="invite-icon">
              <IconUserPlus size={20} stroke={2} />
            </div>

            <IconChevronRight
              size={20}
              className="invite-arrow"
            />

          </div>

          <h3>
            Invite friends
          </h3>

          <p>
            See what your friends are watching and rated.
          </p>

        </div>


        <button
          className={`navbar-item settings-item ${location.pathname === '/settings' ? 'active' : ''}`}
          onClick={() => navigate('/settings')}
        >
          <IconSettings size={20} stroke={2} />
          <span>Settings</span>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;