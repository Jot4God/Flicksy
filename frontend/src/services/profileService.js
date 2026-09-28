import { auth } from '../firebase/firebase'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

async function getAuthHeaders() {
  const user = auth.currentUser

  if (!user) {
    throw new Error('You must be signed in.')
  }

  const token = await user.getIdToken()

  return {
    Authorization: `Bearer ${token}`,
  }
}

async function readJson(response) {
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.')
  }

  return data
}

export async function getProfile() {
  const headers = await getAuthHeaders()

  const response = await fetch(`${API_URL}/profile`, {
    headers,
  })

  return readJson(response)
}

export async function saveProfile({ displayName, username, bio }) {
  const authHeaders = await getAuthHeaders()

  const response = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ displayName, username, bio }),
  })

  return readJson(response)
}

export async function uploadProfilePhoto(file) {
  const headers = await getAuthHeaders()
  const formData = new FormData()
  formData.append('photo', file)

  const response = await fetch(`${API_URL}/profile/photo`, {
    method: 'POST',
    headers,
    body: formData,
  })

  return readJson(response)
}
