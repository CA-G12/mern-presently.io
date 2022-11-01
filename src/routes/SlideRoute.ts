import express from 'express'
import SlideController from '../controllers/SlideController'
import multer from 'multer'
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

router.delete('/:id', SlideController.deletePresentation)

export default router
