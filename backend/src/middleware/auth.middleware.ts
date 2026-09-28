import type { NextFunction, Request, Response } from 'express'
import { getAuth } from 'firebase-admin/auth'

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing Firebase ID token.' })
  }

  const token = authHeader.slice('Bearer '.length)

  try {
    req.firebaseUser = await getAuth().verifyIdToken(token)
    return next()
  } catch (error) {
    console.error('Firebase token verification failed:', error)
    return res.status(401).json({ message: 'Invalid or expired Firebase ID token.' })
  }
}
