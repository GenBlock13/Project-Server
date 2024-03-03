import { validationResult } from 'express-validator'
import { ApiError } from '../exceptions/ApiError.js'

export default function (req, res, next) {
  // создаем массив ошибок, в который помещаются ошибки,
  // найденные функцией validationResult() в запросе с клиента
  const errors = validationResult(req)
  // если ошибки найдены (массив ошибок не пустой)
  if (!errors.isEmpty()) {
    // вызывается функция next(), в которой вызываем статичный метод badRequest
    // созданного нами ApiError и передаем в него сообщение и массив ошибок
    return next(ApiError.badRequest('Ошибка при валидации', errors.array()))
  }
  // если массив ошибок пуст, то вызываем следующую функцию
  next()
}
