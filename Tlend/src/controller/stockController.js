const response = require('../lib/response')
const stockService = require('../service/stockService')

// 주식상품 등록하기
exports.postStock = async (req, res, next) => {
  try {
    await stockService.postStock(req, next)
    response.respondJson2('Successfully insert stock item', res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

exports.getDetailStock = async (req, res) => {
  try {
    const result = await stockService.getDetailStock(req)
    response.respondJson('Successfully get detil stock item', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

exports.postRewardFund = async (req, res, next) => {
  try {
    await stockService.postStockFund(req, next)
    response.respondJson2('Successfully post stock fund', res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}


exports.postStockFund = async (req, res, next) => {
  try {
    await stockService.postStockFund(req, next)
    response.respondJson2('Successfully post stock fund', res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

exports.getStcokFund = async (req, res) => {
  try {
    const result = await stockService.getStockFund(req)
    response.respondJson('Successfully get stock fund', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}


exports.getStcokFundFinish = async (req, res) => {
  try {
    const result = await stockService.getStockFundFinsh(req)
    response.respondJson('Successfully get stock fund finish', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}
