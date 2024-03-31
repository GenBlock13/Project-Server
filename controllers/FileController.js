import { ApiError } from '../exceptions/ApiError.js'
import { fileService } from '../services/FileService.js'

class FileController {
    // метод для загрузки одной фотографии
    uploadImage(req, res) {
        try {
           const url = fileService.uploadImage(req.file.filename)
           return res.json(url)
        } catch (e) {
           throw ApiError.badRequest('Ошибка в загрузке файла', e) 
        }
    }
    
    // метод для загрузки нескольких фотографии
    uploadImages(req, res) {
        try {
            const thumb = req.files.thumbnail[0]
            const gallery = req.files.gallery
            const urls = fileService.uploadImages(thumb, gallery)
            return res.json(urls)
        } catch (e) {
            throw ApiError.badRequest('Ошибка в загрузке файлов', e)
        }
    }
}

export const fileController = new FileController()
