import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { sequelize } from './config/db.js'
import { SERVER_PORT } from './utils/secrets.js'
import { router } from './routes/router.js'
import errorMiddleware from './middleware/errorMiddleware.js'

const PORT = SERVER_PORT || 5000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.use(errorMiddleware) // всегда последний

const startApp = async () => {
  try {
    await sequelize.authenticate()
    console.log('Соединение с базой данных установлено')
    await sequelize.sync()
    // метод drop() удаляет все созданные таблицы в базе данных
    // await sequelize.drop()
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
