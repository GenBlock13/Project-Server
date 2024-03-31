import { placeService } from '../services/PlaceService.js'
import { ApiError } from '../exceptions/ApiError.js'

class PlaceController {
    async getPlaces(req, res, next) {
        try {
            const places = await placeService.getAllPlaces()
            return res.json(places)
        } catch (e) {
            next(e)
        }
    }

    async getPlace(req, res, next) {
        try {
            const { placeId } = req.params
            const place = await placeService.getPlace(placeId)
            return res.json(place)
        } catch (e) {
            next(e)
        }
    }

    async createPlace(req, res, next) {
        try {
            const { title, text, gallery, thumbnail } = req.body
            const { id } = req.user
            const placeData = await placeService.createPlace(
                id,
                title,
                text,
                gallery,
                thumbnail
            )
            return res.json(placeData)
        } catch (e) {
            next(e)
        }
    }

    async deletePlace(req, res, next) {
        try {
            const { id } = req.user
            const { placeId } = req.params
            const place = await placeService.getPlace(placeId)
            if (place.userId !== id) {
              throw ApiError.forbidden()
            }
            const placeData = await placeService.deletePlace(placeId)
            return res.json(placeData)
        } catch (e) {
            next(e)
        }
    }

    async updatePlace(req, res, next) {
        try {
            const { title, text, gallery, thumbnail } = req.body
            const { id } = req.user
            const { placeId } = req.params
            const place = await placeService.getPlace(placeId)
            if (place.userId !== id) {
                throw ApiError.forbidden()
            }
            const placeData = await placeService.updatePlace(
                placeId,
                title,
                text,
                gallery,
                thumbnail
            )
            return res.json(placeData)
        } catch (e) {
            next(e)
        }
    }
}

export const placeController = new PlaceController()
