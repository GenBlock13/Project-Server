import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

class Comment extends Model {}

Comment.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        username: {type: DataTypes.STRING},
        text: {type: DataTypes.TEXT, allowNull: false},
    },
    {
        sequelize,
        modelName: 'comment',
        tableName: 'comments',
    }
)

export { Comment }
