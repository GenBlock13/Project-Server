import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

class Fact extends Model {}

Fact.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING, unique: true, allowNull: false},
        text: {type: DataTypes.STRING, allowNull: false},
        img: {type: DataTypes.STRING}
    },
    {
        sequelize,
        modelName: 'fact',
        tableName: 'facts',
    }
)

export { Fact }
