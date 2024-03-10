import { ApiError } from '../exceptions/ApiError.js'
import { tokenService } from '../services/TokenService.js'

export default function(req, res, next) {
    try {
        // достаем из запроса нужный нам заголовок
        const authorizationHeader = req.headers.authorization
        // если он не находится, то пробрасываем ошибку
        if (!authorizationHeader) {
            return next(ApiError.unauthorizedError())
        }
        // вынимаем только значение токена, отбрасываем Bearer
        const accessToken = authorizationHeader.split(' ')[1]
        // если токена нет, то пробрасываем ошибку
        if (!accessToken) {
            return next(ApiError.unauthorizedError())
        } 
        // если токен получен, то надо его провалидировать
        const userData = tokenService.validateAccessToken(accessToken)  
        // если токен не прошел валидацию, пробрасываем ошибку
        if (!userData) {
            return next(ApiError.unauthorizedError())
        }
        // если токен прошел валидацию, то устанавливаем полученные данные
        // в поле user запроса
        req.user = userData
        // вызываем next(), чтобы передать управление следующей функции 
        next()
    } catch (e) {
        return next(ApiError.unauthorizedError())
    }
}
