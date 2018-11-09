const { Router } = require('express')

const stockCtrl = require('../controller/stockController')
const { multer } = require('../../config/s3bucket')

const upload = multer('stock')

const stock = Router()

/* GET home page. */
stock.post('/', upload.fields([
  { name: 'video' },
  { name: 'image' },
]), stockCtrl.postStock)


module.exports = stock
