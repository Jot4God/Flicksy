import Navbar from '../../components/Navbar/Navbar.jsx'
import Searchbar from '../../components/Searchbar/Searchbar.jsx'
import LoginButton from '../../components/Buttons/LoginButton.jsx'
import EditProfileModal from '../../components/Modals/EditProfileModal.jsx'
import './Profile.css'

import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase/firebase'
import { getProfile } from '../../services/profileService'

function Profile() {
  const [user, setUser] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Overview')
  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)

        try {
          const profileData = await getProfile()
          setProfile(profileData)
        } catch (error) {
          console.error('Error loading profile:', error)
        } finally {
          setProfileLoading(false)
        }
      } else {
        setProfile(null)
        setProfileLoading(false)
        navigate('/login')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const username = profile?.username ||
    user?.displayName?.toLowerCase().replace(/\s+/g, '') ||
    'user'

  const favoriteMovies = [
    {
      id: 1,
      title: 'Interstellar',
      image: '/interstellar.jpg',
    },
    {
      id: 2,
      title: 'The Batman',
      image: '/batman.jpg',
    },
    {
      id: 3,
      title: 'Inception',
      image: '/inception.jpg',
    },
    {
      id: 4,
      title: 'Parasite',
      image: '/parasite.jpg',
    },
  ]

  const recentActivity = [
    {
      id: 1,
      title: 'Dune: Part Two',
      rating: '5.0',
      image: '/dune.jpg',
    },
    {
      id: 2,
      title: 'The Batman',
      rating: '4.5',
      image: '/batman.jpg',
    },
    {
      id: 3,
      title: 'Poor Things',
      rating: '4.0',
      image: '/poor-things.jpg',
    },
    {
      id: 4,
      title: 'Fight Club',
      rating: '4.5',
      image: '/fight-club.jpg',
    },
  ]

  return (
    <>
      <Navbar />
      <LoginButton />
      <EditProfileModal
        user={user}
        profile={profile}
        visible={editOpen}
        onClose={() => setEditOpen(false)}
        onSaved={setProfile}
      />

      <main className="profile">
        {/* PROFILE HEADER */}
        <section className="profile-header">
          <div className="profile-user">
            <div className="profile-avatar">
              <img
                src={profile?.photoURL || user?.photoURL || '/default-avatar.svg'}
                alt="Profile"
              />
            </div>

            <div className="profile-info">
              <h1>{profile?.displayName || user?.displayName || 'User'}</h1>

              <span className="profile-username">@{username}</span>

              <p className="profile-bio">
                {profileLoading
                  ? 'Loading profile...'
                  : profile?.bio || 'Add a bio to tell people about yourself.'}
              </p>
            </div>
          </div>

          <button
            className="edit-profile-button"
            onClick={() => setEditOpen(true)}
          >
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
            'Watched',
            'Watchlist',
            'Reviews',
            'Lists',
            'Stats',
            'Friends',
          ].map((tab) => (
            <button
              key={tab}
              className={
                activeTab === tab ? 'profile-tab active' : 'profile-tab'
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
                  <div className="favorite-movie-card" key={movie.id}>
                    <img src={movie.image} alt={movie.title} />
                  </div>
                ))}
              </div>
            </section>

            {/* RECENT ACTIVITY */}
            <section className="profile-section">
              <h2>Recent Activity</h2>

              <div className="recent-activity">
                {recentActivity.map((movie) => (
                  <div className="activity-card" key={movie.id}>
                    <img src={movie.image} alt={movie.title} />

                    <div className="activity-info">
                      <h3>{movie.title}</h3>

                      <span>★ {movie.rating}</span>
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

            <p>This section will be added soon.</p>
          </div>
        )}
      </main>
    </>
  )
}

export default Profile
