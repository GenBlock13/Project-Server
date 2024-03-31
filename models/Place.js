import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

class Place extends Model {}

Place.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING, unique: true, allowNull: false},
        text: {type: DataTypes.TEXT, allowNull: false},
        gallery: {type: DataTypes.ARRAY(DataTypes.STRING)},
        thumbnail: {type: DataTypes.STRING}
    },
    {
        sequelize,
        modelName: 'place',
        tableName: 'places',
    }
)

export { Place }
