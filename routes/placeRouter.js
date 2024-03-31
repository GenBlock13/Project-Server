import { Router } from 'express'
import { placeController } from '../controllers/PlaceController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'
import validationMiddleware from '../middleware/validationMiddleware.js'
import { placeValidation } from '../utils/validations.js'

const router = new Router()

router.get('/', placeController.getPlaces)
router.get('/:placeId', placeController.getPlace)
router.post(
  '/',
  authMiddleware,
  checkRoleMiddleware('ADMIN'),
  placeValidation,
  validationMiddleware,
  placeController.createPlace
)
router.delete(
  '/:placeId',
  authMiddleware,
  checkRoleMiddleware('ADMIN'),
  placeController.deletePlace
)
router.patch(
  '/:placeId',
  authMiddleware,
  checkRoleMiddleware('ADMIN'),
  placeValidation,
  validationMiddleware,
  placeController.updatePlace
)

export { router }
