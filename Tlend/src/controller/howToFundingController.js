const response = require('../lib/response')
const htfService = require('../service/howToFundingService')

exports.getQuestion = async (req, res) => {
  try {
    const result = await htfService.getQuestion(req)
    response.respondJson('Successfully get question list', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}


exports.getAnswer = async (req, res) => {
  try {
    const result = await htfService.getAnswer(req)
    response.respondJson('Successfully get answer', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}
