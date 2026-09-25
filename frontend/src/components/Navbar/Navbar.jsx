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

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-logo-container">
        <div className="navbar-symbol">
          ◆
        </div>

        <h2 className="navbar-logo">
          Flicksy
        </h2>
      </div>


      <div className="navbar-main-menu">

        <button className="navbar-item active">
          <IconHome size={20} stroke={2} />
          <span>Home</span>
        </button>

        <button className="navbar-item">
          <IconMovie size={20} stroke={2} />
          <span>Movies</span>
        </button>

        <button className="navbar-item">
          <IconDeviceDesktop size={20} stroke={2} />
          <span>TV Shows</span>
        </button>

        <button className="navbar-item">
          <IconPin size={20} stroke={2} />
          <span>Reviews</span>
        </button>

        <button className="navbar-item">
          <IconList size={20} stroke={2} />
          <span>Lists</span>
        </button>

        <button className="navbar-item">
          <IconUsers size={20} stroke={2} />
          <span>Friends</span>
        </button>

        <button className="navbar-item">
          <IconQuestionMark size={20} stroke={2} />
          <span>Quiz</span>
        </button>

      </div>


      <div className="navbar-divider" />


      <div className="navbar-library">

        <p className="navbar-section-title">
          YOUR LIBRARY
        </p>

        <button className="navbar-item">
          <IconBookmark size={20} stroke={2} />

          <span>Watchlist</span>

          <span className="navbar-count">
            42
          </span>
        </button>

        <button className="navbar-item">
          <IconPlayerPlayFilled size={20} />

          <span>Watched</span>

          <span className="navbar-count">
            188
          </span>
        </button>

        <button className="navbar-item">
          <IconMessage size={20} stroke={2} />

          <span>Rated</span>

          <span className="navbar-count">
            156
          </span>
        </button>

        <button className="navbar-item">
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


        <button className="navbar-item settings-item">
          <IconSettings size={20} stroke={2} />
          <span>Settings</span>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;