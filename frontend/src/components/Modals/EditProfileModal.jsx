import './EditProfileModal.css'
import { IconX } from '@tabler/icons-react'

function EditProfileModal({ user, visible = false, onClose }) {
  if (!visible) return null

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
          <img src={user?.photoURL || '/default-avatar.png'} alt="Profile" />

          <button>Change Photo</button>
        </div>

        <div className="edit-profile-fields">
          <label>Display Name</label>

          <input type="text" defaultValue={user?.displayName || ''} />

          <label>Username</label>

          <input type="text" defaultValue={user?.displayName || ''} />

          <label>Bio</label>

          <textarea placeholder="Tell us something about yourself..." />
        </div>

        <button className="save-profile-button">Save Changes</button>
      </div>
    </div>
  )
}

export default EditProfileModal
