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

exports.getReward = async (req, res, next) => {
  try {
    const result = await rewardService.getReward(req, next)
    response.respondJson('Successfully get investmentHome item', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

exports.getDetailReward = async (req, res) => {
  try {
    const result = await rewardService.getDetailReward(req)
    response.respondJson('Successfully get detil reward item', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

exports.postRewardFund = async (req, res, next) => {
  try {
    await rewardService.postRewardFund(req, next)
    response.respondJson2('Successfully post reward fund', res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

exports.getRewardFund = async (req, res) => {
  try {
    const result = await rewardService.getRewardFund(req)
    response.respondJson('Successfully get reward fund', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}
