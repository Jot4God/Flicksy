import type { DecodedIdToken } from 'firebase-admin/auth'
import { prisma } from '../lib/prisma.js'

function normaliseUsername(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, '')
    .slice(0, 24)
}

async function buildUniqueUsername(baseValue: string, uid: string) {
  const base = normaliseUsername(baseValue) || `user${uid.slice(0, 6)}`
  let candidate = base
  let suffix = 1

  while (await prisma.userProfile.findUnique({ where: { username: candidate } })) {
    const suffixText = String(suffix++)
    candidate = `${base.slice(0, 24 - suffixText.length)}${suffixText}`
  }

  return candidate
}

export async function getOrCreateProfile(firebaseUser: DecodedIdToken) {
  const existing = await prisma.userProfile.findUnique({
    where: { firebaseUid: firebaseUser.uid },
  })

  if (existing) return existing

  const baseUsername =
    firebaseUser.email?.split('@')[0] || firebaseUser.name || 'user'

  const username = await buildUniqueUsername(baseUsername, firebaseUser.uid)

  return prisma.userProfile.create({
    data: {
      firebaseUid: firebaseUser.uid,
      email: firebaseUser.email ?? null,
      username,
      displayName: firebaseUser.name ?? null,
      photoURL: firebaseUser.picture ?? null,
    },
  })
}

export async function updateProfileData(
  firebaseUser: DecodedIdToken,
  data: {
    displayName?: string
    username?: string
    bio?: string
  },
) {
  const current = await getOrCreateProfile(firebaseUser)

  const displayName = data.displayName?.trim()
  const bio = data.bio?.trim()
  const username = data.username
    ? normaliseUsername(data.username)
    : current.username

  if (!username || username.length < 3) {
    throw new Error('USERNAME_INVALID')
  }

  if (username.length > 24) {
    throw new Error('USERNAME_INVALID')
  }

  if (displayName && displayName.length > 50) {
    throw new Error('DISPLAY_NAME_TOO_LONG')
  }

  if (bio && bio.length > 250) {
    throw new Error('BIO_TOO_LONG')
  }

  const usernameOwner = await prisma.userProfile.findUnique({
    where: { username },
  })

  if (usernameOwner && usernameOwner.firebaseUid !== firebaseUser.uid) {
    throw new Error('USERNAME_TAKEN')
  }

  return prisma.userProfile.update({
    where: { firebaseUid: firebaseUser.uid },
    data: {
      username,
      displayName: displayName ?? null,
      bio: bio ?? '',
      email: firebaseUser.email ?? current.email,
    },
  })
}

export async function updateProfilePhoto(firebaseUid: string, photoURL: string) {
  return prisma.userProfile.update({
    where: { firebaseUid },
    data: { photoURL },
  })
}
