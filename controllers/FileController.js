import { ApiError } from '../exceptions/ApiError.js'
import { fileService } from '../services/FileService.js'

class FileController {
    uploadImage(req, res) {
        try {
           const img = req.file ? req.file.filename : ''
           if (!req.file) {
            const imgUrl = img ? fileService.uploadImage(img) : ''
            const url = { img: imgUrl }
            return res.json(url)
           }
           const url = fileService.uploadImage(img)
           return res.json(url)
        } catch (e) {
           throw ApiError.badRequest('Ошибка в загрузке файла', e) 
        }
    }
    
    uploadImages(req, res) {
        try {
            const thumb = req.files.thumbnail
              ? req.files.thumbnail[0]
              : ''
            const gallery = req.files.gallery ? req.files.gallery : []
            if (!req.files.thumbnail || !req.files.gallery) {
                const urlTumb = thumb
                  ? fileService.uploadImage(req.files.thumbnail[0].filename)
                  : ''
                const urlsGallery = gallery.length > 0 ? fileService.uploadMultiImg(gallery) : undefined
                const urls = { thumbUrl: urlTumb.url, galleryUrl: urlsGallery }
                return res.json(urls)
            }
            const urls = fileService.uploadImages(thumb, gallery)
            return res.json(urls)
        } catch (e) {
            throw ApiError.badRequest('Ошибка в загрузке файлов', e)
        }
    }
}

export const fileController = new FileController()
