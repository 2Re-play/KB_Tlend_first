const { Transaction } = require('../lib/dbConnection')
const stockDao = require('../dao/stockDao')

// 메인 홈 가져오기
exports.postStock = async (req, next) => {

  try {
    const {
      title, description, goalMoney, price, minPrice, comValue, schedule, repayDate, startDate, finishDate, enterDate, categoryName,
    } = req.body
    const data = {
      title,
      description,
      goalMoney,
      price,
      minPrice,
      comValue,
      schedule,
      repayDate,
      startDate,
      finishDate,
      enterDate,
      categoryName,
    }

    await stockDao.postStock(Transaction, data, next, req)
  } catch (e) {
    console.log(e.message)
  }
}


