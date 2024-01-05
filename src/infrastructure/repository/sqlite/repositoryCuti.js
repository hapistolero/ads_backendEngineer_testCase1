const {pool} = require('../../database/sequelize')
const {formatDate} = require('../../../util/formatDate')
const NotFoundError = require('../../../exceptions/NotFoundError')
const InvariantError = require('../../../exceptions/InvariantError')
const ClientError = require('../../../exceptions/ClientError')
const {Karyawan} = require('../../../model/karyawan')
const {Cuti} = require('../../../model/cuti')
class CutiRepository {
  constructor(){
    this._sequelize = pool.sequelize
    this._formatDate = formatDate
    this._Cuti = Cuti
    this._Karyawan = Karyawan
    this._sequelize.sync()
        
  }

  async getAllCuti(fieldName,ordering){
    const allCuti = await this._Cuti.findAll({
      order:[[fieldName,`${ordering}`]]
    })

    const formattedDataCuti = allCuti.map((c)=>({
      "No.":c['No'],
      "Nomor Induk":c['Nomor Induk'],
      "Tanggal Cuti":formatDate(c["Tanggal Cuti"]),
      "Lama Cuti":c["Lama Cuti"],
      "Keterangan":c["Keterangan"]
    }))
       
    return formattedDataCuti
  }

  async insertDataCuti(nomor_induk, tanggal_cuti, lama_cuti, keterangan){
    try {
        
      await this._validateExistedNomorInduk(nomor_induk)
      await this._validateExistedTanggalCuti(nomor_induk,tanggal_cuti) 
           
      const newDataCuti = await this._Cuti.create({
        'Nomor Induk': nomor_induk,
        'Tanggal Cuti':this._formatDate(tanggal_cuti),
        'Lama Cuti':lama_cuti,
        'Keterangan':keterangan
      })
    
      const formattedDataCuti = {
        "No.":newDataCuti['No'],
        'Nomor Induk':newDataCuti['Nomor Induk'],
        'Tanggal Cuti':this._formatDate(newDataCuti['Tanggal Cuti']),
        'Lama Cuti':newDataCuti['Lama Cuti'],
        'Keterangan':newDataCuti['Keterangan']
      }
    
      return formattedDataCuti 
    } catch (error) {
      throw new InvariantError(`Gagal Insert Data ${error}`)
    }
  }

  async updateDataCuti (nomor_induk,tanggal_cuti, lama_cuti, keterangan){
    try {
        
      const updatedDataCuti = await this._Cuti.update({
        "Tanggal Cuti":tanggal_cuti,
        "Lama Cuti":lama_cuti,
        "Keterangan":keterangan,
                
      },{
        where:{
          "Nomor Induk":nomor_induk,
          "Tanggal Cuti":tanggal_cuti
        }
      })
      if(updatedDataCuti[0] <= 0){
        throw new InvariantError('Gagal Memperbarui Data')
      }
    
      return true
    } catch (error) {
      throw new InvariantError("Gagal Memperbarui Data")
    }
  }

  async deleteDataCuti(nomor_induk,tanggal_cuti){
    try {
            
      const deletedDataCuti = await this._Cuti.destroy({
        where:{
          "Nomor Induk":nomor_induk,
          "Tanggal Cuti":tanggal_cuti
        }
      })
    
    
    
      if(deletedDataCuti <= 0){
        throw new InvariantError('Gagal Menghapus Data Cuti')
      }
    
      return true
    } catch (error) {
      throw new InvariantError("Gagal Menghapus Data Cuti")
    }


  }

  async _validateExistedNomorInduk(nomor_induk){
    const isNomerIndukExist = await this._Karyawan.count({
      where:{
        "Nomor Induk": nomor_induk
      }
    })


    if (isNomerIndukExist === 0) {
      throw new NotFoundError('Karyawan Tidak Ditemukan!')
    }
  }

  async _validateExistedTanggalCuti(nomor_induk,tanggal_cuti){
    const isTanggalCutiExist = await this._Cuti.count({
      where:{
        "Nomor Induk": nomor_induk,
        "Tanggal Cuti":tanggal_cuti
      }
    })
       
    if (isTanggalCutiExist !== 0) {
      throw new ClientError('Kamu Tidak Boleh Menambah Cuti Di Tanggal Yang Sama!')
    }
       
  }
}



module.exports = CutiRepository