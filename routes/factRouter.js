import { Router } from 'express'
import { factController } from '../controllers/FactController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'
import validationMiddleware from '../middleware/validationMiddleware.js'
import { factValidation } from '../utils/validations.js'

const router = new Router()

// получение всех фактов
router.get('/', factController.getFacts)
// получение одного факта по id
router.get('/:factId', factController.getFact)
// создание факта
router.post(
    '/',
    authMiddleware,
    checkRoleMiddleware('ADMIN'),
    factValidation,
    validationMiddleware,
    factController.createFact
)
// удаление факта по id
router.delete(
    '/:factId',
    authMiddleware,
    checkRoleMiddleware('ADMIN'),
    factController.deleteFact
)
// изменение факта
router.patch(
    '/:factId',
    authMiddleware,
    checkRoleMiddleware('ADMIN'),
    factValidation,
    validationMiddleware,
    factController.updateFact
)

export { router }
