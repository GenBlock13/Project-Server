import { Sequelize } from 'sequelize'
import {
  DB_NAME, 
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from '../utils/secrets.js'

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD, 
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'postgres'
    }
)

export { sequelize }
