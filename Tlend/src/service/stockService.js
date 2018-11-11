const { Transaction, getConnection } = require('../lib/dbConnection')
const stockDao = require('../dao/stockDao')
const cloudfront = require('../lib/cloudfront')

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


exports.getDetailStock = async (req) => {
  const connection = await getConnection()
  let result
  try {
    const itemList = await stockDao.stockDetail(connection, req.params.stock_idx)
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

exports.postStockFund = async (req, next) => {
  const connection = await getConnection()
  try {
    await stockDao.stockFund(Transaction, next, req)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
}

exports.getStockFund = async (req) => {
  const connection = await getConnection()
  let result
  try {
    const itemList = await stockDao.getStockFund(connection, req.params.stock_idx)
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

exports.getStockFundFinsh = async (req) => {
  const connection = await getConnection()
  let result
  try {
    const itemList = await stockDao.getStockFundFinish(connection, req.params.stock_idx)
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
