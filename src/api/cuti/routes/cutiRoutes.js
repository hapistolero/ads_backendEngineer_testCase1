const express = require("express")
const {validationResult} = require('express-validator')
const CutiHandler  = require("../handler/cutiHandler")
const {postDataCutiPayloadValidator, putDataCutiPayloadValidator} = require('../validator/validate')
const Cuti = require('../../../infrastructure/repository/sqlite/repositoryCuti')

const cutiRoutes = express.Router()
const cutiHandler = new CutiHandler(validationResult, Cuti)

cutiRoutes.get('/karyawan/cuti/all', cutiHandler.getCutiDataHandler)
cutiRoutes.post('/karyawan/:nomor_induk/cuti', postDataCutiPayloadValidator, cutiHandler.postDataCutihandler)
cutiRoutes.put('/karyawan/:nomor_induk/cuti/:tanggal_cuti', putDataCutiPayloadValidator, cutiHandler.updateDataCutiHandler)
cutiRoutes.delete('/karyawan/:nomor_induk/cuti/:tanggal_cuti', cutiHandler.deleteDataCutiHandler)

module.exports = cutiRoutes
