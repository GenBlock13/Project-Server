import { body } from 'express-validator'

export const registerValidation = [
   body('email', 'Email некорректный').isEmail(),
   body('password', 'Пароль должен быть не менее 4 и не более 12 символов').isLength({
    min: 4,
    max: 12,
   }),
   body('name', 'Имя должен быть не менее 3 символов').isLength({
    min: 3,
   })
]
