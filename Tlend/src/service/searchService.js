const { getConnection } = require('../lib/dbConnection')
const { closingDate } = require('../lib/closingDate')
const searchDao = require('../dao/searchDao')
const cloudfront = require('../lib/cloudfront')


// 검색 키워드 - 투자
exports.getSearchInvestment = async (query) => {
  const connection = await getConnection()
  let result
  let item
  try {
    const investmentItemList = await searchDao.getSearchInvestment(connection, query)
    const stockItemList = await searchDao.getSearchStock(connection, query)
    for (const i in investmentItemList) {
      const bondListKey = await searchDao.investmentVideoKey(connection, investmentItemList[i].investment_idx)
      investmentItemList[i].video = await cloudfront.video(bondListKey.video_key)
      investmentItemList[i].day = await closingDate(investmentItemList[i].investment_finishDate)
    }
    for (const i in stockItemList) {
      const bondListKey = await searchDao.stockVideoKey(connection, stockItemList[i].stock_idx)
      stockItemList[i].video = await cloudfront.video(bondListKey.video_key)
      stockItemList[i].day = await closingDate(stockItemList[i].stock_finishDate)
    }
    const merge = investmentItemList.concat(stockItemList)
    for (const i in merge) {
      item = merge.sort(merge.startDate)
    }
    result = {
      item,
    }
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  return result
}

// 검색 키워드 - 리워드
exports.getSearchReward = async (query) => {
  const connection = await getConnection()
  let result
  try {
    const rewardItemList = await searchDao.getSearchReward(connection, query)
    for (const i in rewardItemList) {
      console.log(i)
      const rewardListKey = await searchDao.rewardVideoKey(connection, rewardItemList[i].reward_idx)
      rewardItemList[i].video = await cloudfront.video(rewardListKey.video_key)
      rewardItemList[i].day = await closingDate(rewardItemList[i].reward_finishDate)
    }
    result = {
      rewardItemList,
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
