import { User } from '../models/User.js'

export default async (email) => {
    const user = await User.findOne({where: {email}})
    return user
}