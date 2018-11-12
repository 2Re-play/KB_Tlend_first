const response = require('../lib/response')
const HomeService = require('../service/homeService')

exports.getHome = async (req, res) => {
  try {
    const result = await HomeService.mainHome()
    response.respondJson('Successfully get main home', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}
