const response = require('../lib/response')
const investmentService = require('../service/investmentService')

// 주식상품 등록하기
exports.postInvestment = async (req, res, next) => {
  try {
    await investmentService.postInvestment(req, next)
    response.respondJson2('Successfully insert investment item', res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

exports.getInvestment = async (req, res, next) => {
  try {
    const result = await investmentService.getInvestment(req, next)
    response.respondJson('Successfully get investmentHome item', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

exports.getDetailInvestment = async (req, res) => {
  try {
    const result = await investmentService.getDetailInvestment(req)
    response.respondJson('Successfully get detil investment item', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

exports.postInvestmentFund = async (req, res, next) => {
  try {
    await investmentService.postInvestmentFund(req, next)
    response.respondJson2('Successfully post investment fund', res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}


exports.getInvestmentFund = async (req, res) => {
  try {
    const result = await investmentService.getInvestmentFund(req)
    response.respondJson('Successfully get investment fund', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

exports.getInvestmentFundFinish = async (req, res) => {
  try {
    const result = await investmentService.getInvestmentFundFinsh(req)
    response.respondJson('Successfully get investment fund finish', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}
