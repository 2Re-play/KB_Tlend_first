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
investment.post('/:investment_idx', investmentCtrl.postInvestmentFund)
investment.get('/', investmentCtrl.getInvestment)
investment.get('/:investment_idx', investmentCtrl.getDetailInvestment)
investment.get('/:investment_idx/fund', investmentCtrl.getInvestmentFund)
investment.get('/:investment_idx/fund/finish', investmentCtrl.getInvestmentFundFinish)

module.exports = investment
