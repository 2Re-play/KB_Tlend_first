const response = require('../lib/response')
const rewardService = require('../service/rewardService')

// 주식상품 등록하기
exports.postReward = async (req, res, next) => {
  try {
    await rewardService.postReward(req, next)
    response.respondJson2('Successfully insert reward item', res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}
