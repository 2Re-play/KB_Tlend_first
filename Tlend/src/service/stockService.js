const { getConnection, Transaction } = require('../lib/dbConnection')
const stockDao = require('../dao/stockDao')

// 메인 홈 가져오기
exports.postStock = async (req, next) => {
  // const connection = await getConnection()

  try {
    const {
      title, description, goalMoney, price, minPrice, comValue, schdule, repayDate, startDate, finishDate, enterDate, videoName, imageName, categoryName,
    } = req.body
    const data = {
      title,
      description,
      goalMoney,
      price,
      minPrice,
      comValue,
      schdule,
      repayDate,
      startDate,
      finishDate,
      enterDate,
      videoName,
      imageName,
      categoryName,
    }
    await stockDao.postStock(Transaction, data, next)
  } catch (e) {
    console.log(e.message)
  }
}
