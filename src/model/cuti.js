const {pool} = require('../infrastructure/database/sequelize')

const Cuti = pool.sequelize.define('Cuti',{
  "Nomor Induk": {
    type: pool.DataTypes.UUID,
    allowNull: false
  },
  "Tanggal Cuti": {
    type: pool.DataTypes.DATE,
    allowNull: false
  },
  "Lama Cuti": {
    type: pool.DataTypes.INTEGER,
    allowNull: false
  },
  "Keterangan": {
    type: pool.DataTypes.STRING(50),
    allowNull: false
  },
},
{
  sequelize: pool.sequelize,
  modelName: 'Cuti',
  tableName: 'cuti'
})

module.exports = {Cuti}