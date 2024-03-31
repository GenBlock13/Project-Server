import { ApiError } from '../exceptions/ApiError.js'

// middleware проверяет информацию о роли юзера из запроса
export default function(userRole) {
    return function (req, res, next) {
        try {
            const { role } = req.user
               if (userRole !== role) {
                throw ApiError.forbidden()
            }
            next()
        } catch (e) {
            throw ApiError.forbidden()
        }
    }
}
