const { getConnection } = require('../lib/dbConnection')
const homeDao = require('../dao/homeDao')
const signedurl = require('../../config/signedurl')

// 메인 홈 가져오기
exports.mainHome = async () => {
  const connection = await getConnection()
  let info
  try {
    const data = await homeDao.stockItem(connection)
    const data2 = await homeDao.investmentItem(connection)
    const data3 = await homeDao.rewardItem(connection)
    const stockImageKey = await homeDao.stockImagePath(connection, data.stock_idx)
    const rewardImageKey = await homeDao.rewardImagePath(connection, data3.reward_idx)
    const investmentImageKey = await homeDao.investmentImagePath(connection, data2.investment_idx)
    data.stockImage = await signedurl.getSignedUrl(stockImageKey.image_key)
    data3.rewardImage = await signedurl.getSignedUrl(rewardImageKey.image_key)
    data2.investmentImage = await signedurl.getSignedUrl(investmentImageKey.image_key)
    info = {
      data,
      data2,
      data3,
    }
    console.log(info)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  console.log(info)
  return info
}
