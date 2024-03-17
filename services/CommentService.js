import { ApiError } from '../exceptions/ApiError.js'
import { Comment } from '../models/Comment.js'
import getUsername from '../utils/getUsername.js'

class CommentService {
    async getAllComments() {
        const comments = await Comment.findAll()
        return comments
    }

    async createComment(userId, commentText) {
        // получение имени пользователя
        const username = await getUsername(userId)
        // создание комментария
        const comment = await Comment.create({username, userId, text: commentText})
        return comment
    }

    // поиск комментария по id
    async findComment(commentId) {
        const comment = await Comment.findOne({where: {id: commentId}})
        return comment
    }

    // функция удаления комментария по id
    async deleteComment(commentId) {
        const commentData = await Comment.destroy({where: {id: commentId}})
        return commentData
    }

    // функция изменения комментария
    async updateComment(commentId, newText) {
        const updateComment = await Comment.update(
          {text: newText},
          {where: {id: commentId}, returning: true}
        )
        if (!updateComment) {
            throw ApiError.badRequest('Не удалось изменить комментарий')
        }
        const commentDataUpdated = updateComment[1][0].get()
        return commentDataUpdated
    }
}

export const commentService = new CommentService() 
