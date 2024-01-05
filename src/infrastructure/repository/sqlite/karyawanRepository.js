const {pool} = require('../../database/sequelize')
const InvariantError = require('../../../exceptions/InvariantError')
const {Karyawan} = require('../../../model/karyawan')
const {Cuti} = require('../../../model/cuti')
const {formatDate} = require('../../../util/formatDate')
const NotFoundError = require('../../../exceptions/NotFoundError')


class KaryawanRepository {
    
  constructor(){
    this._sequelize = pool.sequelize
    this._formatDate = formatDate
    this._Karyawan = Karyawan
    this._Cuti = Cuti
    this._sequelize.sync()
  }

  async getAllKaryawan(fieldName,ordering) {

    try {
      
            
      await this._sequelize.authenticate()
      // eslint-disable-next-line no-console
      console.log('Connection has been established successfully.')
      const allKaryawan = await this._Karyawan.findAll({
        order:[[fieldName, `${ordering}`]]
      })
      const formattedKaryawan = allKaryawan.map((karyawan)=>({
        "No":karyawan["No"],
        "Nomor Induk":karyawan["Nomor Induk"],
        "Nama": karyawan['Nama'],
        "Alamat":karyawan['Alamat'],
        "Tanggal Lahir":this._formatDate(karyawan['Tanggal Lahir']),
        "Tanggal Bergabung":this._formatDate(karyawan['Tanggal Bergabung'])
      }))
      return formattedKaryawan
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Unable to connect to the database:', error)
      throw new InvariantError(`Gagal Mengambil Data ${error}`)
    }
     
  }
  async getKaryawanAndCutiByNomorInduk(nomor_induk) {

    
    await this._sequelize.authenticate()
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.')
    const karyawan = await this._Karyawan.findOne(
      {
        where:{
          "Nomor Induk":nomor_induk
        }  
      })

    if(karyawan === null){
      throw new NotFoundError(`Data Karyawan Tidak Ditemukan`)
    }
    const cutiKaryawan = await this._Cuti.findAll({
      where:{
        "Nomor Induk":nomor_induk
      }
    })
            
             
    const formattedKaryawan = {
      "Nomor Induk":karyawan["Nomor Induk"],
      "Nama": karyawan['Nama'],
      "Alamat":karyawan['Alamat'],
      "Tanggal Lahir":this._formatDate(karyawan['Tanggal Lahir']),
      "Tanggal Bergabung":this._formatDate(karyawan['Tanggal Bergabung']),
      cuti: cutiKaryawan.length ?cutiKaryawan.map((cuti)=>({
        "Tanggal Cuti":cuti["Tanggal Cuti"],
        "Lama Cuti":cuti["Lama Cuti"],
        "Keterangan":cuti["Keterangan"]
      })): []
    }
    return formattedKaryawan
  
     
  }

  async insertDatakaryawan(nama,alamat,tanggal_lahir,tanggal_bergabung){
    try {
      await this._sequelize.authenticate()
      // eslint-disable-next-line no-console
      console.log('Connection has been established successfully.')
      const {nomor_induk,nomor_urut} = await this.generateNomorInduk()
      const newKaryawan = await this._Karyawan.create({
        "No":nomor_urut,
        "Nomor Induk":nomor_induk,
        "Nama":nama,
        "Alamat":alamat,
        "Tanggal Lahir":this._formatDate(tanggal_lahir),
        "Tanggal Bergabung":this._formatDate(tanggal_bergabung)
      })

      const formattedNewKaryawan ={
        "No":newKaryawan["No"],
        "Nomor Induk":newKaryawan["Nomor Induk"],
        "Nama": newKaryawan['Nama'],
        "Alamat":newKaryawan['Alamat'],
        "Tanggal Lahir":this._formatDate(newKaryawan['Tanggal Lahir']),
        "Tanggal Bergabung":this._formatDate(newKaryawan['Tanggal Bergabung']),
      }

      return formattedNewKaryawan
    } catch (error) {
      throw new InvariantError(`Terjadi Kesalahan Dalam Input Data : ${error}`)
    }
 
  }

  async updateDataKaryawan (nomor_induk,nama,alamat,tanggal_lahir,tanggal_bergabung){
    const updatedKaryawan = await this._Karyawan.update({
      "Nama":nama,
      "Alamat":alamat,
      "Tanggal Lahir":tanggal_lahir,
      "Tanggal Bergabung":tanggal_bergabung
    },{
      where:{
        "Nomor Induk":nomor_induk
      }
    })
        
    if(updatedKaryawan[0] !== 1){
      throw new InvariantError('Gagal Memperbarui Data')
    }

    return true
  }

  async deleteDataKaryawan(nomor_induk){
    const deletedKaryawan = await this._Karyawan.destroy({
      where:{
        "Nomor Induk":nomor_induk
      }
    })


    if(deletedKaryawan !== 1){
      throw new InvariantError('Gagal Menghapus Data Karyawan')
    }

    return true


  }

  async generateNomorInduk(){
    try {
            
      const KaryawanCount = await this._Karyawan.findAndCountAll()
      if(KaryawanCount.count <= 0){
        const nomor = 6000 + 1
        const nomor_induk = `IP0${nomor}`
        const nomor_urut = 1
        return {nomor_induk ,nomor_urut}
      }else{
        const maxNomorInduk = await this._Karyawan.max('Nomor Induk')
        const maxNo = await this._Karyawan.max('No')
        const nomor = maxNomorInduk ? parseInt(maxNomorInduk.substring(3)) + 1 : 1
        const nomor_induk = `IP0${nomor}`
        const nomor_urut = maxNo +1
        return {nomor_induk, nomor_urut}
      }
    } catch (error) {
      throw new InvariantError(`Gagal Generate No Induk. ${error}`)
    }
    
  }
}




module.exports = KaryawanRepository