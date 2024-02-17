// импортируем модуль dotenv
import dotenv from 'dotenv'
// импортируем модуль работы с файлами
import fs from 'fs'

// проверка, существует ли файл .env
if (fs.existsSync('.env')) {
    // если существует, то вызываем метод config() с путем к нашему файлу
  dotenv.config({ path: '.env' })
} else {
    // если нет, то выводим ошибку
  console.error('Файл .env не найден')
}

// экспортируем переменные окружения как обычные константы
// теперь можно обращаться к ним просто через имя в любом месте приложения
export const DB_HOST = process.env.DB_HOST
export const DB_NAME = process.env.DB_NAME
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_PORT = Number(process.env.DB_PORT)
export const SECRET_KEY = process.env.SECRET_KEY
export const SERVER_PORT = process.env.SERVER_PORT
