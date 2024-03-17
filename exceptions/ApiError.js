export class ApiError extends Error {
    // статус-коды ошибок 401, 400 и т.д. 
    status
    // непосредственно сами ошибки
    errors

    constructor(status, message, errors = []) {
        // вызываем родительский конструктор при помощи super()
        // в который передаем сообщение
        super(message)
        this.status = status
        this.errors = errors
    }

    static unauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static badRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }

    // функция прокидывает ошибку о недостаточности прав
    static forbidden() {
        return new ApiError(403, 'Вам не хватает прав. Доступ запрещен')
    }
}
