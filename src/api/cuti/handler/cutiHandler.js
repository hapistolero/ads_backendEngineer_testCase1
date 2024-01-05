/* eslint-disable no-console */
const InvariantError = require('../../../exceptions/InvariantError')
const ClientError = require('../../../exceptions/ClientError')
const NotFoundError = require('../../../exceptions/NotFoundError')
class CutiHandler{
  constructor(validator,Cuti){
    this._validator = validator
    this._cuti = new Cuti()
        
    this.getCutiDataHandler = this.getCutiDataHandler.bind(this)
    this.postDataCutihandler = this.postDataCutihandler.bind(this)
    this.updateDataCutiHandler = this.updateDataCutiHandler.bind(this)
    this.deleteDataCutiHandler = this.deleteDataCutiHandler.bind(this)
  }

  async getCutiDataHandler(req,res){
    try {
      const{sortBy} = req.query

      let fieldName
      if(sortBy ==='Tanggal Cuti'){
        fieldName = sortBy
      }else{
        fieldName = 'Nomor Induk'
      }

      const allCutiData = await this._cuti.getAllCuti(fieldName)

      res.status(200).json(
        {
          cuti:allCutiData
        }
      )
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

  async postDataCutihandler(req,res){
    try {
      const {nomor_induk} = req.params
      const {tanggal_cuti, lama_cuti, keterangan } = req.body
      console.log('oke')
      const validateError = this._validator(req)
            
      if(!validateError.isEmpty()){
        res.status(400).json({
          status:"fail",
          errors:validateError.array()
        })
      }
            
      const newCuti = await this._cuti.insertDataCuti(
        nomor_induk, tanggal_cuti, lama_cuti,keterangan
      )
    
      res.status(200).json({ newCuti })
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

  async updateDataCutiHandler(req,res){
    try {
      const { lama_cuti, keterangan } = req.body
      const {nomor_induk,tanggal_cuti} = req.params

      const validateError = this._validator(req)
      if(!validateError.isEmpty()){
        res.status(400).json({
          status:"fail",
          errors:validateError.array()
        })
      }
      await this._cuti.updateDataCuti(
        nomor_induk,new Date(tanggal_cuti),lama_cuti,keterangan
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

  async deleteDataCutiHandler(req,res){
    try {
      const {nomor_induk,tanggal_cuti} = req.params
      await this._cuti.deleteDataCuti(nomor_induk,tanggal_cuti)
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

module.exports = CutiHandler