import express from 'express'
import multer from 'multer'

import SlideController from '../controllers/SlideController'
import { verifyAccessToken } from '../middlewares/AuthMiddleware'

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/')
  },
  filename: function (req, file, cb) {
    cb(null, 'latestSlides.md')
  }
})

const upload = multer({ storage: storage })
router.post(
  '/',
  verifyAccessToken,
  upload.single('File'),
  SlideController.createSlide
)

router.get('/:id', SlideController.getSlide)
router.delete('/:id', SlideController.deletePresentation)
router.put('/:id', verifyAccessToken, SlideController.updateSlide)
router.delete('/:id', verifyAccessToken, SlideController.deletePresentation)

export default router
