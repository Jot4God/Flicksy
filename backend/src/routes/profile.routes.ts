import { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import {
  getProfile,
  updateProfile,
  uploadProfilePhoto,
} from '../controllers/profile.controller.js'
import { requireAuth } from '../middleware/auth.middleware.js'

const router = Router()

const uploadDirectory = path.resolve('uploads')

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDirectory),
  filename: (req, file, cb) => {
    const uid = req.firebaseUser?.uid ?? 'user'
    const extensionByMime: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
      'image/gif': '.gif',
    }

    const extension = extensionByMime[file.mimetype] ?? '.img'
    cb(null, `${uid}-${Date.now()}${extension}`)
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only JPG, PNG, WEBP and GIF images are allowed.'))
    }
  },
})

router.use(requireAuth)

router.get('/', getProfile)
router.put('/', updateProfile)
router.post('/photo', upload.single('photo'), uploadProfilePhoto)

export default router
