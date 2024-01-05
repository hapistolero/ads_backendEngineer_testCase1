const express = require("express")
const {validationResult} = require('express-validator')
const KaryawanHandler  = require("../handler/karyawanHandler")
const {postDataKaryawanPayloadValidator,
  putDataKaryawanPayloadValidator} = require('../validator/validate')
const Karyawan = require('../../../infrastructure/repository/sqlite/karyawanRepository')

const karyawanRoutes = express.Router()
const karyawanHandler = new KaryawanHandler(validationResult,Karyawan)



karyawanRoutes.get('/karyawan', karyawanHandler.getDataKaryawanHandler)
karyawanRoutes.get('/karyawan/:nomor_induk', karyawanHandler.getDataKaryawanByNomorIndukHandler)
karyawanRoutes.post('/karyawan', postDataKaryawanPayloadValidator, karyawanHandler.postDataKaryawanHandler)
karyawanRoutes.put('/karyawan/:nomor_induk', putDataKaryawanPayloadValidator, karyawanHandler.updateDataKaryawanHandler)
karyawanRoutes.delete('/karyawan/:nomor_induk', karyawanHandler.deleteDataKaryawanHandler)

module.exports = karyawanRoutes
