import Navbar from '../../components/Navbar/Navbar.jsx';
import Searchbar from '../../components/Searchbar/Searchbar.jsx';
import LoginButton from '../../components/LoginButton/LoginButton.jsx';
import './Profile.css';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

function Profile() {

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');

  const navigate = useNavigate();

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        if (currentUser) {
          setUser(currentUser);
        } else {
          navigate('/login');
        }

      }
    );

    return () => unsubscribe();

  }, [navigate]);


  const username =
    user?.displayName
      ?.toLowerCase()
      .replace(/\s+/g, '') || 'user';


  const favoriteMovies = [
    {
      id: 1,
      title: 'Interstellar',
      image: '/interstellar.jpg'
    },
    {
      id: 2,
      title: 'The Batman',
      image: '/batman.jpg'
    },
    {
      id: 3,
      title: 'Inception',
      image: '/inception.jpg'
    },
    {
      id: 4,
      title: 'Parasite',
      image: '/parasite.jpg'
    }
  ];


  const recentActivity = [
    {
      id: 1,
      title: 'Dune: Part Two',
      rating: '5.0',
      image: '/dune.jpg'
    },
    {
      id: 2,
      title: 'The Batman',
      rating: '4.5',
      image: '/batman.jpg'
    },
    {
      id: 3,
      title: 'Poor Things',
      rating: '4.0',
      image: '/poor-things.jpg'
    },
    {
      id: 4,
      title: 'Fight Club',
      rating: '4.5',
      image: '/fight-club.jpg'
    }
  ];


  return (
    <>
      <Navbar />
      <LoginButton />
      <Searchbar />

      <main className="profile">

        {/* PROFILE HEADER */}
        <section className="profile-header">

          <div className="profile-user">

            <div className="profile-avatar">

              <img
                src={user?.photoURL || '/default-avatar.png'}
                alt="Profile"
              />

            </div>


            <div className="profile-info">

              <h1>
                {user?.displayName || 'User'}
              </h1>

              <span className="profile-username">
                @{username}
              </span>

              <p className="profile-bio">
                Good movies, better moments.
              </p>

            </div>

          </div>


          <button className="edit-profile-button">
            Edit Profile
          </button>

        </section>


        {/* STATS */}
        <section className="profile-stats">

          <div className="profile-stat">
            <strong>342</strong>
            <span>Films Watched</span>
          </div>

          <div className="profile-stat">
            <strong>87</strong>
            <span>Reviews</span>
          </div>

          <div className="profile-stat">
            <strong>48</strong>
            <span>Lists</span>
          </div>

          <div className="profile-stat">
            <strong>126</strong>
            <span>Followers</span>
          </div>

          <div className="profile-stat">
            <strong>98</strong>
            <span>Following</span>
          </div>

        </section>


        {/* TABS */}
        <section className="profile-tabs">

          {[
            'Overview',
            'Activity',
            'Reviews',
            'Lists',
            'Stats',
            'Friends'
          ].map((tab) => (

            <button
              key={tab}
              className={
                activeTab === tab
                  ? 'profile-tab active'
                  : 'profile-tab'
              }
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>

          ))}

        </section>


        {/* OVERVIEW */}
        {activeTab === 'Overview' && (

          <div className="profile-overview">


            {/* FAVORITE FILMS */}
            <section className="profile-section">

              <h2>Favorite Films</h2>

              <div className="favorite-films">

                {favoriteMovies.map((movie) => (

                  <div
                    className="favorite-movie-card"
                    key={movie.id}
                  >

                    <img
                      src={movie.image}
                      alt={movie.title}
                    />

                  </div>

                ))}

              </div>

            </section>


            {/* RECENT ACTIVITY */}
            <section className="profile-section">

              <h2>Recent Activity</h2>

              <div className="recent-activity">

                {recentActivity.map((movie) => (

                  <div
                    className="activity-card"
                    key={movie.id}
                  >

                    <img
                      src={movie.image}
                      alt={movie.title}
                    />

                    <div className="activity-info">

                      <h3>
                        {movie.title}
                      </h3>

                      <span>
                        ★ {movie.rating}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </section>

          </div>

        )}


        {/* OUTRAS TABS */}
        {activeTab !== 'Overview' && (

          <div className="profile-empty-tab">

            <h2>{activeTab}</h2>

            <p>
              This section will be added soon.
            </p>

          </div>

        )}

      </main>
    </>
  );
}

export default Profile;