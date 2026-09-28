import { applicationDefault, getApps, initializeApp } from 'firebase-admin/app'

export function initializeFirebaseAdmin() {
  if (getApps().length > 0) return

  const projectId = process.env.FIREBASE_PROJECT_ID

  if (!projectId) {
    throw new Error('FIREBASE_PROJECT_ID is missing from backend/.env')
  }

  initializeApp({
    credential: applicationDefault(),
    projectId,
  })
}
