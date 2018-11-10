const { Transaction, getConnection } = require('../lib/dbConnection')
const investmentDao = require('../dao/investmentDao')
const cloudfront = require('../lib/cloudfront')

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


exports.getInvestment = async () => {
  const connection = await getConnection()
  let result
  try {
    const itemList = await investmentDao.investmentItem(connection)
    const hotItem = await investmentDao.hotInvestmentItem(connection)
    const investmentvideoKey = await investmentDao.videoKey(connection, hotItem.investment_idx)
    hotItem.video = await cloudfront.video(investmentvideoKey.video_key)
    for (const i in itemList) {
      console.log(i)
      const investmentListKey = await investmentDao.videoKey(connection, itemList[i].investment_idx)
      itemList[i].video = await cloudfront.video(investmentListKey.video_key)
    }
    result = {
      hotItem,
      itemList,
    }
    console.log(result)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  console.log(result)
  return result
}
