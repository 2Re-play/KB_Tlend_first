const { Transaction } = require('../lib/dbConnection')
const rewardDao = require('../dao/rewardDao')

// 메인 홈 가져오기
exports.postReward = async (req, next) => {

  try {
    const {
      title, description, goalMoney, finishDate, startDate, categoryName, itemPrice, itemlist, video, image,
    } = req.body
    const data = {
      title,
      description,
      goalMoney,
      finishDate,
      startDate,
      categoryName,
      itemPrice,
      itemlist,
      video,
      image,
    }

    await rewardDao.postReward(Transaction, data, next, req)
  } catch (e) {
    console.log(e.message)
  }
}
