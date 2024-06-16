import { ApiError } from '../exceptions/ApiError.js'

export default function(err, req, res, next) {
    if(err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(500).json({message: 'Заголовок должен быть уникальным'})
    }
    return res.status(500).json({message: 'Произошла непредвиденная ошибка сервера', errors: err})
}
