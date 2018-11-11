const response = require('../lib/response')
const searchService = require('../service/searchService')

// 검색 투자상품 정렬
exports.getSearchInvestment = async (req, res) => {
  try {
    const { query } = req.query
    const result = await searchService.getSearchInvestment(query)
    response.respondJson('Successfully search investment item', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

// 검색 리워드상품 정렬
exports.getSearchReward = async (req, res) => {
  try {
    const { query } = req.query
    const result = await searchService.getSearchReward(query)
    response.respondJson('Successfully get reward item', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}
