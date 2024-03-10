import dotenv from 'dotenv'
import fs from 'fs'

if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' })
} else {
  console.error('Файл .env не найден')
}

export const DB_HOST = process.env.DB_HOST
export const DB_NAME = process.env.DB_NAME
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_PORT = Number(process.env.DB_PORT)
export const SECRET_KEY = process.env.SECRET_KEY
export const SECRET_KEY2 = process.env.SECRET_KEY2
export const SERVER_PORT = process.env.SERVER_PORT
