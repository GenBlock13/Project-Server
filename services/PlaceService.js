import { Place } from '../models/Place.js'

class PlaceService {
    async getAllPlaces() {
        const places = await Place.findAll()
        return places
    }

    async getPlace(placeId) {
        const place = await Place.findOne({ where: { id: placeId } })
        return place
    }

    async createPlace(
            userId, 
            title,
            text,
            gallery,
            thumbnail
        ) 
        {
        const newPlace = await Place.create({
            userId,
            title,
            text,
            gallery,
            thumbnail})
        return newPlace
    }

    async deletePlace(placeId) {
        const placeData = await Place.destroy({where: {id: placeId}})
        return placeData
    }

    async updatePlace(placeId, title, text, gallery, thumbnail) {
        const updatedPlace = await Place.update(
          { title, text, gallery, thumbnail },
          { where: { id: placeId }, returning: true }
        )

        const placeUpdated = updatedPlace[1][0].get()
        return placeUpdated
    }
}

export const placeService = new PlaceService()
