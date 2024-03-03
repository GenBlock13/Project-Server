import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import { tokenService } from './TokenService.js'
import { ApiError } from '../exceptions/ApiError.js'
import getUser from '../utils/getUser.js'
import setTokens from '../utils/setTokens.js'

class UserService {
    async registration(email, password, name) {
        // const candidate = await User.findOne({where: {email}})
        const candidate = await getUser(email)
        if (candidate) {
            throw ApiError.badRequest(`Пользователь с адресом ${email} уже существует`)
        }
        const salt = await bcrypt.genSalt(5)
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await User.create({email, password: hashPassword, name})
        // const userDto = new UserDto(user)
        // const tokens = await setTokens({...userDto})
        // const tokens = tokenService.generateTokens({...userDto})
        // await tokenService.saveToken(userDto.id, tokens.refreshToken)
        // return {
        //     ...tokens,
        //     user: userDto
        // }
        return setTokens(user)
    }

    async login(email, password) {
        // делаем поиск по полю email
        // const user = await User.findOne({where: {email}})
        const user = await getUser(email)
        // если данный пользователь не найден
        if (!user) {
            // пробрасываем ошибку
            throw ApiError.badRequest('Неверный логин или пароль')
        }
        // а если пользователь найден, то сравниваем его пароль, который он ввел
        // с паролем в хешированном виде, который хранится в базе данных
        const isPassEquals = await bcrypt.compare(password, user.password)
        // если хешированные пароли не равны
        if (!isPassEquals) {
            // пробрасываем ошибку
            throw ApiError.badRequest('Неверный логин или пароль')
        }
        // если же пароли равны, то генерируем ограниченные данные пользователя
        // при помощи dto
        // const userDto = new UserDto(user)
        // // снова генерируем пару токенов и возвращаем токены и ограниченные данные пользователя
        // const tokens = tokenService.generateTokens({...userDto})
        // await tokenService.saveToken(userDto.id, tokens.refreshToken)
        // return {
        //     ...tokens,
        //     user: userDto
        // }
        return setTokens(user)
    }

    // функция выхода
    async logout(refreshToken) {
       const token = await tokenService.removeToken(refreshToken) 
       return token
    }
}

export const userService = new UserService()
