import './EditProfileModal.css'
import { IconCamera, IconX } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { updateProfile as updateFirebaseProfile } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { saveProfile, uploadProfilePhoto } from '../../services/profileService'

function EditProfileModal({
  user,
  profile,
  visible = false,
  onClose,
  onSaved,
}) {
  const fileInputRef = useRef(null)

  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [photoFile, setPhotoFile] = useState(null)
  const [previewURL, setPreviewURL] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!visible) return

    setDisplayName(profile?.displayName || user?.displayName || '')
    setUsername(profile?.username || '')
    setBio(profile?.bio || '')
    setPhotoFile(null)
    setPreviewURL(profile?.photoURL || user?.photoURL || '/default-avatar.svg')
    setError('')
  }, [visible, profile, user])

  useEffect(() => {
    return () => {
      if (previewURL?.startsWith('blob:')) {
        URL.revokeObjectURL(previewURL)
      }
    }
  }, [previewURL])

  if (!visible) return null

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('The profile photo must be 5 MB or smaller.')
      return
    }

    if (previewURL?.startsWith('blob:')) {
      URL.revokeObjectURL(previewURL)
    }

    setPhotoFile(file)
    setPreviewURL(URL.createObjectURL(file))
    setError('')
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError('')

      let updatedProfile = await saveProfile({
        displayName,
        username,
        bio,
      })

      if (photoFile) {
        updatedProfile = await uploadProfilePhoto(photoFile)
      }

      if (auth.currentUser) {
        await updateFirebaseProfile(auth.currentUser, {
          displayName: updatedProfile.displayName || displayName || null,
          photoURL:
            updatedProfile.photoURL || auth.currentUser.photoURL || null,
        })
      }

      onSaved?.(updatedProfile)
      onClose()
    } catch (saveError) {
      setError(saveError.message || 'Could not save your profile.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="edit-profile-overlay">
      <div className="edit-profile-modal">
        <button className="edit-profile-close" onClick={onClose}>
          <IconX size={22} />
        </button>

        <h2>Edit Profile</h2>

        <p className="edit-profile-subtitle">
          Update your profile information.
        </p>

        <div className="edit-profile-picture">
          <img src={previewURL || '/default-avatar.svg'} alt="Profile" />

          <div className="edit-profile-photo-actions">
            <button
              className="change-photo-button"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <IconCamera size={18} />
              Change Photo
            </button>

            <span>JPG, PNG, WEBP or GIF · max 5 MB</span>
          </div>

          <input
            ref={fileInputRef}
            className="profile-photo-input"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handlePhotoChange}
          />
        </div>

        <div className="edit-profile-fields">
          <label htmlFor="display-name">Display Name</label>
          <input
            id="display-name"
            type="text"
            value={displayName}
            maxLength={50}
            onChange={(event) => setDisplayName(event.target.value)}
          />

          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            maxLength={24}
            onChange={(event) => setUsername(event.target.value)}
          />

          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            placeholder="Tell us something about yourself..."
            value={bio}
            maxLength={250}
            onChange={(event) => setBio(event.target.value)}
          />

          <span className="bio-counter">{bio.length}/250</span>
        </div>

        {error && <p className="edit-profile-error">{error}</p>}

        <button
          className="save-profile-button"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

export default EditProfileModal
