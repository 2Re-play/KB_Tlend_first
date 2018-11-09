const { Router } = require('express')

const investmentCtrl = require('../controller/investmentController')
const { multer } = require('../../config/s3bucket')

const upload = multer('stock')

const investment = Router()

/* GET home page. */
investment.post('/', upload.fields([
  { name: 'video' },
  { name: 'image' },
]), investmentCtrl.postInvestment)


module.exports = investment
