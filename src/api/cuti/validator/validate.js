const { body } = require('express-validator')

const postDataCutiPayloadValidator = [
  body('tanggal_cuti','tanggal cuti  tidak boleh kosong').not().isEmpty(),
  body('lama_cuti','lama cuti  tidak boleh kosong').not().isEmpty(),
  body('lama_cuti','lama cuti harus integer').isInt(),
  body('keterangan','keterangan tidak boleh kosong').not().isEmpty(),
  body('keterangan','keterangan  harus string').isString().isLength({max:50}),
]
const putDataCutiPayloadValidator = [
  body('lama_cuti','lama cuti  tidak boleh kosong').not().isEmpty(),
  body('lama_cuti','lama cuti harus integer').isInt(),
  body('keterangan','keterangan tidak boleh kosong').not().isEmpty(),
  body('keterangan','keterangan  harus string').isString().isLength({max:50}),
]


module.exports = { postDataCutiPayloadValidator,putDataCutiPayloadValidator }
