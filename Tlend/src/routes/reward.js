const { Router } = require('express')

const rewardCtrl = require('../controller/rewardController')
const { multer } = require('../../config/s3bucket')

const upload = multer('stock')

const reward = Router()

/* GET home page. */
reward.post('/', upload.fields([
  { name: 'video' },
  { name: 'image' },
]), rewardCtrl.postReward)
reward.post('/:reward_idx', rewardCtrl.postRewardFund)
reward.get('/', rewardCtrl.getReward)
reward.get('/:reward_idx', rewardCtrl.getDetailReward)
reward.get('/:reward_idx/fund', rewardCtrl.getRewardFund)

module.exports = reward
