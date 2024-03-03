import jwt from 'jsonwebtoken'
import { SECRET_KEY, SECRET_KEY2 } from '../utils/secrets.js'
import { Token } from '../models/Token.js'

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, SECRET_KEY, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, SECRET_KEY2, {expiresIn: '90d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({where: {userId}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({userId, refreshToken})
        return token
    }

    // функция удаления токена
    async removeToken(refreshToken) {
        // находим запись с токеном и удаляем ее
        const tokenData = await Token.destroy({where: {refreshToken}})
        // возвращается 1, если удаление прошло успешно и 0, если нет
        return tokenData
    }
}

export const tokenService = new TokenService()
