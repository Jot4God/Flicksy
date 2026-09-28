import type { Request, Response } from 'express'
import {
  getOrCreateProfile,
  updateProfileData,
  updateProfilePhoto,
} from '../services/profile.service.js'

export async function getProfile(req: Request, res: Response) {
  if (!req.firebaseUser) {
    return res.status(401).json({ message: 'Not authenticated.' })
  }

  const profile = await getOrCreateProfile(req.firebaseUser)
  return res.json(profile)
}

export async function updateProfile(req: Request, res: Response) {
  if (!req.firebaseUser) {
    return res.status(401).json({ message: 'Not authenticated.' })
  }

  try {
    const profile = await updateProfileData(req.firebaseUser, {
      displayName: req.body.displayName,
      username: req.body.username,
      bio: req.body.bio,
    })

    return res.json(profile)
  } catch (error) {
    const code = error instanceof Error ? error.message : 'UNKNOWN'

    if (code === 'USERNAME_TAKEN') {
      return res.status(409).json({ message: 'That username is already in use.' })
    }

    if (code === 'USERNAME_INVALID') {
      return res.status(400).json({
        message: 'Username must have 3-24 characters using letters, numbers, . or _.',
      })
    }

    if (code === 'DISPLAY_NAME_TOO_LONG') {
      return res.status(400).json({ message: 'Display name is too long.' })
    }

    if (code === 'BIO_TOO_LONG') {
      return res.status(400).json({ message: 'Bio can have at most 250 characters.' })
    }

    console.error(error)
    return res.status(500).json({ message: 'Could not update profile.' })
  }
}

export async function uploadProfilePhoto(req: Request, res: Response) {
  if (!req.firebaseUser) {
    return res.status(401).json({ message: 'Not authenticated.' })
  }

  if (!req.file) {
    return res.status(400).json({ message: 'Choose an image first.' })
  }

  const photoURL = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  const profile = await updateProfilePhoto(req.firebaseUser.uid, photoURL)

  return res.json(profile)
}
