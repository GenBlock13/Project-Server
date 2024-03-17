import { Router } from 'express'
import { commentController } from '../controllers/CommentController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import validationMiddleware from '../middleware/validationMiddleware.js'
import { commentValidation } from '../utils/validations.js'

const router = new Router()

// GET-запрос на получение всех комментариев
router.get('/', commentController.getComments)
// POST-запрос на создание комментария
router.post(
    '/',
    authMiddleware,
    commentValidation,
    validationMiddleware,
    commentController.createComment
)
// GET-запрос на получение одного комментария по id
router.get('/:commentId', commentController.getComment)
// DELETE-запрос на удаление комментария по id
router.delete('/:commentId', authMiddleware, commentController.deleteComment)
// PATCH-запрос на изменение комментария по id
router.patch('/:commentId', authMiddleware, commentController.updateComment)

export { router }
