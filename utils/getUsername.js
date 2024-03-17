import { User } from '../models/User.js'

export default async (id) => {
    const user = await User.findOne({where: {id}})
    return user.dataValues.name
}