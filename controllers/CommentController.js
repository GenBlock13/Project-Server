import { commentService } from '../services/CommentService.js'
import { ApiError } from '../exceptions/ApiError.js'

class CommentController {
    // получение всех комментариев
    async getComments(req, res, next) {
        try {
           const comments = await commentService.getAllComments()
           return res.json(comments)
        } catch (e) {
            next(e)
        }
    }

    // получение комментария по id
    async getComment(req, res, next) {
        try {
            // из параметра запроса достаем id комментария
            const { commentId } = req.params
            // находим такой комментарий
            const comment = await commentService.findComment(commentId)
            // возвращаем найденный комментарий на клиент
            return res.json(comment)
        } catch (e) {
            next(e)
        }
    }

    // создание комментария
    async createComment(req, res, next) {
        try {
            // из тела запроса получаем текст комментария
            const { text } = req.body
            // из авторизации получаем id пользователя
            const { id } = req.user
            // вызываем функцию создания комментария м передаем в нее id пользователя и текст
            const commentData = await commentService.createComment(id, text)
            // возвращаем на клиент созданный комментарий
            return res.json(commentData)            
        } catch (e) {
            next(e)
        }
    }

    // удаление комментария по id
    async deleteComment(req, res, next) {
        try {
            // получаем id пользователя из авторизации
            const { id } = req.user
            // получаем id комментария из параметров запроса
            const { commentId } = req.params
            // находим комментарий в БД по id
            const comment = await commentService.findComment(commentId)
            // если id авторизованного пользователя не совпадает
            // с полем userId комментария, то прокидываем ошибку, что прав недостаточно
            if (comment.userId !== id) {
                throw ApiError.forbidden()
            }
            // если id пользователя совпадает с userId комментария
            // то удаляем комментарий
            const commentData = await commentService.deleteComment(commentId)
            return res.json(commentData)
        } catch (e) {
            next(e)
        }
    }

    // изменение комментария по id
    async updateComment(req, res, next) {
        try {
           const { text } = req.body
            const { id } = req.user
            const { commentId } = req.params
            const comment = await commentService.findComment(commentId)
            if (comment.userId !== id) {
                throw ApiError.forbidden()
            }
            const commentData = await commentService.updateComment(commentId, text)
            return res.json(commentData)
        } catch (e) {
            next(e)
        }
    }
}

export const commentController = new CommentController()
