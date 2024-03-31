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

export const commentValidation = [
   body(
      'text',
      'Текст комментария должен быть не менее 5 и не более 500 символов'
   ).isLength({
    min: 5,
    max: 500,
   }),
]

export const factValidation = [
   body('title', 'Заголовок должен быть не менее 10 символов').isLength({
    min: 10,
   }),
   body(
      'text',
      'Текст описания факта должен быть не менее 150 символов'
   ).isLength({
    min: 150,
   }),
]


export const placeValidation = [
   body('title', 'Заголовок должен быть не менее 10 символов').isLength({
    min: 10,
   }),
   body(
      'text',
      'Текст описания достопримечательности должен быть не менее 150 символов'
   ).isLength({
    min: 150,
   }),
]
