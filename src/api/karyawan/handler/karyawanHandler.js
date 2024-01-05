/* eslint-disable no-console */
const NotFoundError = require('../../../exceptions/NotFoundError')
const InvariantError = require('../../../exceptions/InvariantError')
const ClientError = require('../../../exceptions/ClientError')
class KaryawanHandler{
  constructor(validator,Karyawan){
    this._validator = validator
    this._karyawan = new Karyawan()
    this.getDataKaryawanHandler = this.getDataKaryawanHandler.bind(this)
    this.getDataKaryawanByNomorIndukHandler = this.getDataKaryawanByNomorIndukHandler.bind(this)
    this.postDataKaryawanHandler = this.postDataKaryawanHandler.bind(this)
    this.updateDataKaryawanHandler = this.updateDataKaryawanHandler.bind(this)
    this.deleteDataKaryawanHandler = this.deleteDataKaryawanHandler.bind(this)
  }
  async getDataKaryawanHandler (req,res){
    try {
      const{sortBy} = req.query
      console.log(sortBy)

      let fieldName
      if(sortBy ==='Tanggal Lahir'|| sortBy==='Nama'){
        fieldName = sortBy
      }else{
        fieldName = 'Nomor Induk'
      }
      const allKaryawan = await this._karyawan.getAllKaryawan(fieldName)
      res.status(200).json({
        status:'success',
        karyawan:allKaryawan})
    } catch (error) {
      if (error instanceof InvariantError) {
        return res.status(400).json({
          status: "fail",
          errors: [{ msg: error.message }]
        })
      }else if (error instanceof NotFoundError){
        return res.status(404).json({
          status: "fail",
          errors: [{ msg: error.message }]
        })
      } else if(error instanceof ClientError){
        return res.status(400).json({
          status: "fail",
          errors: [{ msg: error.message }]
        })
      }else {

        console.error('Unexpected error:', error)
        return res.status(500).json({ message: "Internal Server Error" })
      }
    }
            
  }

  async getDataKaryawanByNomorIndukHandler (req,res){
    try {
      const {nomor_induk} = req.params
      const karyawan = await this._karyawan.getKaryawanAndCutiByNomorInduk(nomor_induk)
      res.status(200).json({
        status:'success',
        karyawan})
    } catch (error) {
      if (error instanceof InvariantError) {
        return res.status(400).json({
          status: "fail",
          errors: [{ msg: error.message }]
        })
      }else if (error instanceof NotFoundError){
        return res.status(404).json({
          status: "fail",
          errors: [{ msg: error.message }]
        })
      } else if(error instanceof ClientError){
        return res.status(400).json({
          status: "fail",
          errors: [{ msg: error.message }]
        })
      }else {

        console.error('Unexpected error:', error)
        return res.status(500).json({ message: "Internal Server Error" })
      }
    }
            
  }
    
  async postDataKaryawanHandler(req, res) {
    try {
      const { nama, alamat, tanggal_lahir, tanggal_bergabung } = req.body
            
      const validateError = this._validator(req)
      if(!validateError.isEmpty()){
        res.status(400).json({
          status:"fail",
          errors:validateError.array()
        })
      }
      const newKaryawan = await this._karyawan.insertDatakaryawan(
        nama, alamat, tanggal_lahir, tanggal_bergabung
      )
    
      res.status(200).json({ 
        status:'success',
        newKaryawan })
    } catch (error) {
      if (error instanceof InvariantError) {
        return res.status(400).json({
          status: "fail",
          errors: [{ msg: error.message }]
        })
      }else if (error instanceof NotFoundError){
        return res.status(404).json({
          status: "fail",
          errors: [{ msg: error.message }]
        })
      } else if(error instanceof ClientError){
        return res.status(400).json({
          status: "fail",
          errors: [{ msg: error.message }]
        })
      }else {

        console.error('Unexpected error:', error)
        return res.status(500).json({ message: "Internal Server Error" })
      }
    }
  }
   
  async updateDataKaryawanHandler(req,res){
    try {
      const { nama, alamat, tanggal_lahir, tanggal_bergabung } = req.body
      const {nomor_induk} = req.params

      const validateError = this._validator(req)
      if(!validateError.isEmpty()){
        res.status(400).json({
          status:"fail",
          errors:validateError.array()
        })
      }
      await this._karyawan.updateDataKaryawan(
        nomor_induk,nama, alamat, tanggal_lahir, tanggal_bergabung
      )
    
      res.status(200).json({ status:"success",
        message:"Data Berhasil Diperbarui" })
    } catch (error) {
      if (error instanceof InvariantError) {
        return res.status(400).json({
          status: "fail",
          errors: [{ msg: error.message }]
        })
      }else if (error instanceof NotFoundError){
        return res.status(404).json({
          status: "fail",
          errors: [{ msg: error.message }]
        })
      } else if(error instanceof ClientError){
        return res.status(400).json({
          status: "fail",
          errors: [{ msg: error.message }]
        })
      }else {

        console.error('Unexpected error:', error)
        return res.status(500).json({ message: "Internal Server Error" })
      }
    }
  }

  async deleteDataKaryawanHandler(req,res){
    try {
      const {nomor_induk} = req.params
      await this._karyawan.deleteDataKaryawan(nomor_induk)
      res.status(200).json({ status:"success",
        message:"Data Berhasil Dihapus" })
    } catch (error) {
      if (error instanceof InvariantError) {
        return res.status(400).json({
          status: "fail",
          errors: [{ msg: error.message }]
        })
      }else if (error instanceof NotFoundError){
        return res.status(404).json({
          status: "fail",
          errors: [{ msg: error.message }]
        })
      } else if(error instanceof ClientError){
        return res.status(400).json({
          status: "fail",
          errors: [{ msg: error.message }]
        })
      }else {

        console.error('Unexpected error:', error)
        return res.status(500).json({ message: "Internal Server Error" })
      }
    }
  }

}





module.exports =KaryawanHandler