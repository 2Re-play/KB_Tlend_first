const { Router } = require('express')

const htfCtrl = require('../controller/howToFundingController')


const howToFunding = Router()

/* GET home page. */
howToFunding.get('/question', htfCtrl.getQuestion)
howToFunding.get('/answer/:question_idx', htfCtrl.getAnswer)

module.exports = howToFunding
