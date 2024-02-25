import { userService } from '../services/UserService.js'

class UserController {
    // для каждого маршрута создаем свой метод
    // функция для создания аккаунта
    async registration(req, res, next) {
        try {
            // из тела запроса вытаскиваем данные пользователя
            const { email, password, name } = req.body
            // передаем эти данные в метод registration объекта userService,
            // которая вернет нам токены и информацию о пользователе
            const userData = await userService.registration(email, password, name)
            // устанавливаем в cookie REFRESH токен
            res.cookie('resfreshToken', userData.refreshToken, {maxAge: 90 * 24 * 60 * 60 * 1000})
            // отправляем эту информацию на клиент
            return res.json(userData)
        } catch (e) {
            // в случае ошибки выведем ее в логи
            console.log(e)
        }
    }
    
    // функция для авторизации
    async login(req, res, next) {
        try {
            
        } catch (e) {
            
        }
    }

    // функция для выхода из приложения
    async logout(req, res, next) {
        try {
            
        } catch (e) {
            
        }
    }

    // функция для обновления токена
    async refresh(req, res, next) {
        try {
            
        } catch (e) {
            
        }
    }
    
    // тестовая функция для получения всех пользователей с БД
    async getUsers(req, res, next) {
        try {
            
        } catch (e) {
            console.log(e)
        }
    }
}

export const userController = new UserController()
