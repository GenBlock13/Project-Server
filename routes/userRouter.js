import { Router } from 'express'
import { userController } from '../controllers/UserController.js'
import { registerValidation } from '../utils/validations.js'
import validationMiddleware from '../middleware/validationMiddleware.js'

const router = new Router()

router.post('/registration', registerValidation, validationMiddleware, userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
// тестовый роутер на получение всех юзеров из базы данных
router.get('/users', userController.getUsers)

export { router }
