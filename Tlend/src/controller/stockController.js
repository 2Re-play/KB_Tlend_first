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
