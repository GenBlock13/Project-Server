import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import { tokenService } from './TokenService.js'
import { ApiError } from '../exceptions/ApiError.js'
import getUser from '../utils/getUser.js'
import setTokens from '../utils/setTokens.js'
import { ADMIN_EMAIL } from '../utils/secrets.js'

class UserService {
    async registration(email, password, name) {
        const candidate = await getUser(email)
        if (candidate) {
            throw ApiError.badRequest(`Пользователь с адресом ${email} уже существует`)
        }
        // если при регистрации указан email администратора, 
        // то устанавливаем ему роль ADMIN 
        let role
        if (email === ADMIN_EMAIL) {
            role = 'ADMIN'
        }
        const salt = await bcrypt.genSalt(5)
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
          email,
          password: hashPassword,
          name,
          role,
        })
        return setTokens(user)
    }

    async login(email, password) {
        const user = await getUser(email)
        if (!user) {
            throw ApiError.badRequest('Неверный логин или пароль')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.badRequest('Неверный логин или пароль')
        }
        return setTokens(user)
    }

    async logout(refreshToken) {
       const token = await tokenService.removeToken(refreshToken) 
       return token
    }

    // функция обновления токена
    async refresh(refreshToken) {
        // если токена нет (null или undefined) значит пользователь не авторизован
        if(!refreshToken) {
            // поэтому пробрасываем ошибку, что пользователь не авторизован
            throw new ApiError.unauthorizedError()
        }
        // проверяем REFERESH токен
        const tokenData = tokenService.validateRefreshToken(refreshToken)
        // теперь этот токен надо найти в базе данных
        const tokenFromDb = await tokenService.findToken(refreshToken)
        // убеждаемся, что и валидация токена и его поиск в базе данных прошли успешно
        // если не пройдена валидация или нет токена в базе данных, то пробрасываем ошибку
        if (!tokenData || !tokenFromDb) {
            throw ApiError.unauthorizedError()
        }
        // если все в порядке, то мы получаем пользователя в функции getUser()
        // и генерируем новую пару токенов в функции setTokens() и возвращаем ответ на клиент
        const user = await getUser(tokenData.email)
        return setTokens(user)
    }

    async getAllUsers() {
        // получаем всех пользователей из БД и возвращаем их
        const users = await User.findAll()
        return users
    }
}

export const userService = new UserService()
