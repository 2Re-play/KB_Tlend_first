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
