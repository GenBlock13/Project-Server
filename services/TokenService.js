import jwt from 'jsonwebtoken'
import { SECRET_KEY, SECRET_KEY2 } from '../utils/secrets.js'
import { Token } from '../models/Token.js'

class TokenSevice {
    // функция, которая принимает в качестве аргумента данные пользователя с клиента
    generateTokens(payload) {
        // генерируем ACCESS токен
        const accessToken = jwt.sign(payload, SECRET_KEY, {expiresIn: '30m'})
        // генерируем REFRESH токен
        const refreshToken = jwt.sign(payload, SECRET_KEY2, {expiresIn: '90d'})
        // функция возвращает два сгенерированных токена
        return {
            accessToken,
            refreshToken
        }
    }

    // функция, которая сохраняет REFRESH токен в базе данных
    async saveToken(userId, refreshToken) {
        // ищем токен по id пользователя
        const tokenData = await Token.findOne({where: {userId}})
        // если токен найден,
        if (tokenData) {
            // то поле refreshToken перезаписывается у данного пользователя
            tokenData.refreshToken = refreshToken
            // и сохраняется в базе данных
            return tokenData.save()
        }
        // если по id пользователь с токеном не найден, то создаем новую запись в базе данных,
        // в которой сохраняется id нового пользователя и сгенерированный REFRESH токен
        const token = await Token.create({userId, refreshToken})
        return token
    }
}

export const tokenSevice = new TokenSevice()
