const { Transaction, getConnection } = require('../lib/dbConnection')
const investmentDao = require('../dao/investmentDao')
const stockDao = require('../dao/stockDao')
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
  let item
  const investmentHotItem = []
  const stockHotItem = []
  let SoHot
  try {
    const investmentItemList = await investmentDao.investmentItem(connection)
    investmentHotItem.push(await investmentDao.hotInvestmentItem(connection))
    stockHotItem.push(await stockDao.hotStockItem(connection))
    const stockItemList = await stockDao.stockItem(connection)
    const hotItem = investmentHotItem.concat(stockHotItem)
    if (hotItem[0].achievement > hotItem[1].achievement) {
      SoHot = hotItem[0]
      const investmentvideoKey = await investmentDao.videoKey(connection, hotItem[0].investment_idx)
      hotItem[0].video = await cloudfront.video(investmentvideoKey.video_key)
    } else {
      SoHot = hotItem[1]
      const stockvideoKey = await stockDao.videoKey(connection, hotItem[1].stock_idx)
      hotItem[1].video = await cloudfront.video(stockvideoKey.video_key)
    }
    console.log('select hotitem123123123123', SoHot)
    for (const i in investmentItemList) {
      console.log(i)
      const investmentListKey = await investmentDao.videoKey(connection, investmentItemList[i].investment_idx)
      investmentItemList[i].video = await cloudfront.video(investmentListKey.video_key)
    }
    for (const i in stockItemList) {
      const bondListKey = await stockDao.videoKey(connection, stockItemList[i].stock_idx)
      console.log(bondListKey.video_key)
      stockItemList[i].video = await cloudfront.video(bondListKey.video_key)
    }
    const merge = investmentItemList.concat(stockItemList)
    for (const i in merge) {
      item = merge.sort(merge.startDate)
    }
    result = {
      SoHot,
      item,
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

// 특정투자상품 보기
exports.getDetailInvestment = async (req) => {
  const connection = await getConnection()
  let result
  try {
    const itemList = await investmentDao.investmentDetail(connection, req.params.investment_idx)
    itemList[0].video_key = await cloudfront.video(itemList.video_key)
    itemList[0].image_key = await cloudfront.video(itemList.image_key)
    result = {
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

exports.postInvestmentFund = async (req, next) => {
  const connection = await getConnection()
  try {
    await investmentDao.investmentFund(Transaction, next, req)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
}


exports.getInvestmentFund = async (req) => {
  const connection = await getConnection()
  let result
  try {
    const itemList = await investmentDao.getInvestmentFund(connection, req.params.investment_idx)
    result = {
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
