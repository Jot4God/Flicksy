import './LoginButton.css'

import { IconUser, IconChevronDown, IconLogout } from '@tabler/icons-react'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { onAuthStateChanged, signOut } from 'firebase/auth'

import { auth } from '../../firebase/firebase'

function LoginButton() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)

      // Se fizer logout fecha o menu
      if (!currentUser) {
        setMenuOpen(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)

      setMenuOpen(false)

      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const goToProfile = () => {
    setMenuOpen(false)

    navigate('/profile')
  }

  return (
    <div className="login-button">
      {user ? (
        <>
          {/* BOTÃO DO PERFIL */}
          <button
            className="profile-trigger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="profile-image"
              />
            ) : (
              <IconUser size={30} stroke={2} />
            )}

            <span className="profile-name">
              {user.displayName || 'Profile'}
            </span>

            <IconChevronDown
              size={18}
              stroke={2}
              className={menuOpen ? 'profile-arrow open' : 'profile-arrow'}
            />
          </button>

          {/* MENU DROPDOWN */}
          {menuOpen && (
            <div className="profile-dropdown">
              <button className="profile-menu-item" onClick={goToProfile}>
                <IconUser size={19} stroke={2} />

                <span>Profile</span>
              </button>

              <div className="profile-menu-divider" />

              <button
                className="profile-menu-item sign-out"
                onClick={handleSignOut}
              >
                <IconLogout size={19} stroke={2} />

                <span>Sign Out</span>
              </button>
            </div>
          )}
        </>
      ) : (
        /* SE NÃO ESTIVER LOGGED IN */
        <button className="profile-trigger" onClick={() => navigate('/login')}>
          <IconUser size={30} stroke={2} />
        </button>
      )}
    </div>
  )
}

export default LoginButton
