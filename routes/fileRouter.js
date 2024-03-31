import { Router } from 'express'
import { fileController } from '../controllers/FileController.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'
import authMiddleware from '../middleware/authMiddleware.js'
import { upload } from '../utils/storage.js'

const router = new Router()

router.post(
    '/image',
    authMiddleware,
    checkRoleMiddleware('ADMIN'),
    upload.single('image'),
    fileController.uploadImage
)

router.post(
    '/images',
    authMiddleware,
    checkRoleMiddleware('ADMIN'),
    upload.fields([
        {
           name: 'thumbnail',
           maxCount: 1
        }, 
        {
           name: 'gallery',
           maxCount: 10
        }
    ]),
    fileController.uploadImages
)

export { router }
