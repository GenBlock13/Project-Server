import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

class Token extends Model {}

Token.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        refreshToken: {type: DataTypes.STRING, allowNull: false}
    },
    {
        sequelize,
        modelName: 'token',
        tableName: 'tokens',
    }
)

export { Token }
