import { Router } from 'express'
import { userController } from '../controllers/UserController.js'

const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
// тестовый роутер на получение всех юзеров из базы данных
router.get('/users', userController.getUsers)

export { router }
