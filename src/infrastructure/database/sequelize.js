const {Sequelize,DataTypes,Model} = require('sequelize')

const environment = process.env.NODE_ENV || 'development'
const isProduction = environment === 'production'

const storagePath = isProduction
  ? 'src/infrastructure/database/sqlite/production.db'
  : 'src/infrastructure/database/sqlite/development.db'

const sequelize = new Sequelize({ 
  dialect: 'sqlite',
  storage: `${storagePath}`
})



const pool = {
  sequelize,
  DataTypes,
  Model
}

module.exports = {pool}