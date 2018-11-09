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


module.exports = reward
