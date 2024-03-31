import fs from 'fs'
import multer from 'multer'
import getExtFile from './getExtFile.js'
import { v4 as uuidv4 } from 'uuid'

// создаем объект для сохранения файлов
const storage = multer.diskStorage({
  // поле destination
  destination: (req, file, callback) => {
    // если папки uloads на сервере не существует,
    // то создадим ее
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads')
    }
    // файлы будут сохраняться в папку uploads
    callback(null, 'uploads')
  },
  // поле filename - это имя файла загружаемого, которое
  // мы будем преобразовывать в рандомную строку и прилеплять расширение
  filename: (req, file, callback) => {
    callback(null, `${uuidv4()}.${getExtFile(file.originalname)}`)
  },
})

export const upload = multer({ storage })
