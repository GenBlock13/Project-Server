class FileService {
    uploadImage(filename) {
        // возвращает адрес расположения файла
        // при загрузке одной фотографии
        return {
            url: `uploads/${filename}`,
        }
    }

    uploadImages(thumb, gallery) {
        // адрес расположения миниатюры
        const thumbUrl = `uploads/${thumb.filename}`
        // адреса расположения всех загруженных фотографий
        // с полем gallery
        const galleryUrl = gallery.map((img) => `uploads/${img.filename}`)
        return {
            thumbUrl,
            galleryUrl
        }
    }
}

export const fileService = new FileService()
