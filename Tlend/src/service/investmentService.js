const { Transaction } = require('../lib/dbConnection')
const investmentDao = require('../dao/investmentDao')

// 투자상품 등록하기
exports.postInvestment = async (req, next) => {

  try {
    const {
      title, description, goalMoney, accountPrice, minPrice, dueDate, schedule, dueMonth, startDate, finishDate, enterDate, categoryName, fundPoint1, fundPoint2, fundPoint3, interstRate,
    } = req.body
    const data = {
      title,
      description,
      goalMoney,
      accountPrice,
      minPrice,
      dueDate,
      schedule,
      dueMonth,
      startDate,
      finishDate,
      enterDate,
      categoryName,
      fundPoint1,
      fundPoint2,
      fundPoint3,
      interstRate,
    }
    await investmentDao.postInvestment(Transaction, data, next, req)
  } catch (e) {
    console.log(e.message)
  }
}
