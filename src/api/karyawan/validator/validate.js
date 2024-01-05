const { body } = require('express-validator')

const postDataKaryawanPayloadValidator = [
  body('nama','nama  tidak boleh kosong').not().isEmpty(),
  body('nama','nama  harus string').isString(),
  body('alamat','alamat  tidak boleh kosong').not().isEmpty(),
  body('alamat','alamat harus string').isString(),
  body('tanggal_lahir','tanggal_lahir  tidak boleh kosong').not().isEmpty(),
  body('tanggal_bergabung','tanggal_bergabung  tidak boleh kosong').not().isEmpty(),
]
const putDataKaryawanPayloadValidator = [
  body('nama','nama  tidak boleh kosong').not().isEmpty(),
  body('nama','nama  harus string').isString(),
  body('alamat','alamat  tidak boleh kosong').not().isEmpty(),
  body('alamat','alamat harus string').isString(),
  body('tanggal_lahir','tanggal_lahir  tidak boleh kosong').not().isEmpty(),
  body('tanggal_bergabung','tanggal_bergabung  tidak boleh kosong').not().isEmpty(),
]

module.exports = { postDataKaryawanPayloadValidator,putDataKaryawanPayloadValidator }
