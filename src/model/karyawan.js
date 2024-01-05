const {pool} = require('../infrastructure/database/sequelize')
const {Cuti} = require('../model/cuti')

const Karyawan = pool.sequelize.define('Karyawan',{
  "No": {
    type:pool.DataTypes.INTEGER,
    allowNull: false,
    unique:true,
  },
  // Nomor induk (unique,not null,fk,varchar2(10))
  "Nomor Induk":{
    type:pool.DataTypes.UUID,
    allowNull:false,
    primaryKey:true,
    unique:true,
  },
  // Nama (not null, varchar2(10)),
  "Nama":{
    type:pool.DataTypes.STRING,
    allowNull:false
  },
  // Alamat (not null, varchar2(50))
  "Alamat":{
    type:pool.DataTypes.STRING,
    allowNull:false
  },
  // Tanggal Lahir (not null, date),
  "Tanggal Lahir":{
    type:pool.DataTypes.DATE,
    allowNull:false
  },
  // Tanggal Bergabung (not null, date)
  "Tanggal Bergabung":{type:pool.DataTypes.DATE,
    allowNull:false
  }
})

Karyawan.hasMany(Cuti,{
  foreignKey:'Nomor Induk'
})

module.exports = {Karyawan}