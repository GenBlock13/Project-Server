import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import { tokenSevice } from './TokenService.js'
import { UserDto } from '../dtos/UserDto.js'

class UserSevice {
    // функция регистрации пользователя
    async registration(email, password, name) {
        // проверяем, есть ли в БД пользователь с таким email
        const candidate = await User.findOne({where: {email}})
        // если пользователь с таким email существует, то пробрасываем ошибку
        if (candidate) {
            throw new Error(`Пользователь с адресом ${email} уже существует`)
        }
        // генерируем соль для хеширования пароля
        const salt = await bcrypt.genSalt(5)
        // хешируем пароль с добавлением сгенерированной соли
        const hashPassword = await bcrypt.hash(password, salt)
        // TODO: установить роль админа
        // если же пользователь не найден, то создаем нового пользователя и сохраняем его в БД
        const user = await User.create({email, password: hashPassword, name})
        // создаем объект класса UserDto и в конструктор в качестве параметра передаем объект только что созданного user
        const userDto = new UserDto(user) // в объекте userDto три поля: id, email, role
        // функция генерации generateTokens(payload) ожидает в качестве параметра объект
        // передадим объект userDto при помощи SPRED-оператора ...
        const tokens = tokenSevice.generateTokens({...userDto})
        // вызываем функцию saveToken() и передаем в качестве параметров
        // id пользователя и REFRESH токен, который только что сгенерировали
        await tokenSevice.saveToken(userDto.id, tokens.refreshToken)

        // возвращаем из функции пару токенов и информацию о пользователе без пароля и имени (поле user со значением userDto)
        return {
            ...tokens,
            user: userDto
        }
        
    }
}

export const userService = new UserSevice()
