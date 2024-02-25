import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { sequelize } from './config/db.js'
import { SERVER_PORT } from './utils/secrets.js'
import { router } from './routes/router.js'

const PORT = SERVER_PORT || 5000

const app = express()

app.use(express.json())
// указываем, что приложение использует cookieParser
app.use(cookieParser())
// указываем, что приложение использует cors
app.use(cors())
// указываем путь через use ко всем роутерам, которые у нас будут
app.use('/api', router)

const startApp = async () => {
  try {
    await sequelize.authenticate()
    console.log('Соединение с базой данных установлено')
    // метод sync() создает таблицы в базе данных, которые мы описали в моделях
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
