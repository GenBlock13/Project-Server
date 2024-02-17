import express from 'express'
import jwt from 'jsonwebtoken'
import { sequelize } from './config/db.js'
import { SERVER_PORT } from './utils/secrets.js'

// объявляем номер порта
const PORT = SERVER_PORT || 4444
// создаем приложение
const app = express()
// указываем, что приложение должно распознавать данные в формате JSON
app.use(express.json())

// создадим POST-запрос
app.post('/auth/login', (req, res) => {
  // создаем токен, который зашифрует данные, полученные с клиента
  const token = jwt.sign({
    email: req.body.email,
    username: req.body.username
  }, 'secret')
  // сервер вернет уже зашифрованные данные в переменной token
  res.json({
    success: 'Ok',
    token
  })
})

// создаем функцию запуска приложения, в которой запускается сервер и происходит соединение с БД 
const startApp = async () => {
  try {
    await sequelize.authenticate()
    console.log('Соединение с базой данных установлено')
    // переносим запуск сервера в блок try {}
    app.listen(PORT, (err) => {
            if (err) {
              return console.log('Ошибка', err)
            }
            console.log(`Сервер запущен на порту ${PORT}`)
        })
  } catch (err) {
    console.log('Невозможно соединиться с базой данных: ', err)
  }
}

startApp()
