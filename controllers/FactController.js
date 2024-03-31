import { factService } from '../services/FactService.js'
import { ApiError } from '../exceptions/ApiError.js'

class FactController {
    async getFacts(req, res, next) {
        try {
           const facts = await factService.getAllFacts()
           return res.json(facts)
        } catch (e) {
            next(e)
        }
    }

    async getFact(req, res, next) {
        try {
            // берем id факта из параметров запроса
            const { factId } = req.params
            // передаем id в сервис для запроса к БД
            const fact = await factService.getFact(factId)
            // возвращаем найденный факт на клиент
            return res.json(fact)
        } catch (e) {
            next(e)
        }
    }

    async createFact(req, res, next) {
        try {
            const { title, text, img } = req.body
            const { id } = req.user
            const factData = await factService.createFact(
                id,
                title,
                text,
                img
            )
            return res.json(factData)
        } catch (e) {
            next(e)
        }
    }

    async deleteFact(req, res, next) {
        try {
            const { factId } = req.params
            const { id } = req.user
            const fact = await factService.getFact(factId)
            if (fact.userId !== id) {
              throw ApiError.forbidden()
            }
            const factData = await factService.deleteFact(factId)
            return res.json(factData)
        } catch (e) {
            next(e)
        }
    }

    async updateFact(req, res, next) {
        try {
            const { title, text, img } = req.body
            const { id } = req.user
            const { factId } = req.params
            const fact = await factService.getFact(factId)
            if (fact.userId !== id) {
                throw ApiError.forbidden()
            }
            const factData = await factService.updateFact(
                factId,
                title,
                text,
                img
            )
            return res.json(factData)
        } catch (e) {
            next(e)
        }
    }
}

export const factController = new FactController()
