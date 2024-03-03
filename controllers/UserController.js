import { userService } from '../services/UserService.js'

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password, name } = req.body
            const userData = await userService.registration(email, password, name)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 90 * 24 * 60 * 60 * 1000})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    
    async login(req, res, next) {
        try {
            // получаем email и пароль пользователя из тела запроса
            const { email, password } = req.body
            // передаем эти данные в объект userService в функцию login
            const userData = await userService.login(email, password)
            // устанавливаем в cookie пользователя REFRESH токен
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 90 * 24 * 60 * 60 * 1000})
            // возвращаем полученные данные пользователя
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            // достаем из куки REFRESH токен
            const { refreshToken } = req.cookies
            // вызовем функцию logout у объекта userService
            const token = await userService.logout(refreshToken)
            // очистим cookie по ключу refreshToken
            res.clearCookie('refreshToken')
            // функция возвращает 
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }
    
    async getUsers(req, res, next) {
        try {
            
        } catch (e) {
            next(e)
        }
    }
}

export const userController = new UserController()
