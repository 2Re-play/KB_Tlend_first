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
stock.post('/:stock_idx', stockCtrl.postStockFund)
stock.get('/:stock_idx', stockCtrl.getDetailStock)
stock.get('/:stock_idx/fund', stockCtrl.getStcokFund)
stock.get('/:stock_idx/fund/finish', stockCtrl.getStcokFundFinish)


module.exports = stock
