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

    // функция валидации ACCESS токена
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, SECRET_KEY)
            return userData
        } catch (e) {
            return null
        }
    }
    
    // функция валидации REFRESH токена
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, SECRET_KEY2)
            return userData
        } catch (e) {
            return null
        }
    }

    // функция поиска токена в БД
    async findToken(refreshToken) {
        // находим запись с токеном
        const tokenData = await Token.findOne({where: {refreshToken}})
        return tokenData
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

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({where: {refreshToken}})
        return tokenData
    }
}

export const tokenService = new TokenService()
