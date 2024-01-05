const express = require('express')
const bodyParser = require('body-parser')
const karyawanRoutes=  require('./api/karyawan/routes/karyawanRoutes.js')
const cutiRoutes = require('./api/cuti/routes/cutiRoutes.js')


const app = express()

app.use(bodyParser.json())

app.use('/',karyawanRoutes)
app.use('/',cutiRoutes)



const PORT =  3000

app.listen(PORT,()=>{
  // eslint-disable-next-line no-console
  console.log(`server berjalan pada port ${PORT}`)
})