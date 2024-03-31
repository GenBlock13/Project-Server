import { Fact } from '../models/Fact.js'

class FactService {
    // запрос к БД на получение всех фактов
    async getAllFacts() {
        const facts = await Fact.findAll()
        return facts
    }
    
    // запрос к БД на получение одного факта
    async getFact(factId) {
        const fact = await Fact.findOne({ where: { id: factId } })
        return fact
    }

    // создание факта в БД
    async createFact(userId, title, text, img) {
        const newFact = await Fact.create({
            userId,
            title,
            text,
            img
        })
        return newFact
    }

    // удаление факта из БД
    async deleteFact(factId) {
        const factData = await Fact.destroy({where: {id: factId}})
        return factData
    }
    
    // изменение факта в БД
    async updateFact(factId, title, text, img) {
        const updatedFact = await Fact.update(
          { title, text, img },
          { where: { id: factId }, returning: true }
        )
        const factUpdated = updatedFact[1][0].get()
        return factUpdated
    }
}

export const factService = new FactService()
