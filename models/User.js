import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'
import { Token } from './Token.js'

// создаем класс пользователя, который наследует все поля и методы класса Model
class User extends Model {}

// инициализируем поля модели User и дополнительные настройки
User.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: {type: DataTypes.STRING, allowNull: false},
        role: {type: DataTypes.STRING, defaultValue: 'USER'},
    },
    {
        sequelize,
        modelName: 'user',
        tableName: 'users',
    }
)

User.hasOne(Token)
Token.belongsTo(User)

export { User }
