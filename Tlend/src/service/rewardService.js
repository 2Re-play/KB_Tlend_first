const { Transaction, getConnection } = require('../lib/dbConnection')
const rewardDao = require('../dao/rewardDao')
const cloudfront = require('../lib/cloudfront')

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

exports.getReward = async () => {
  const connection = await getConnection()
  let result
  try {
    const itemList = await rewardDao.rewardItem(connection)
    const hotItem = await rewardDao.hotRewardItem(connection)
    const rewardvideoKey = await rewardDao.videoKey(connection, hotItem.reward_idx)
    hotItem.video = await cloudfront.video(rewardvideoKey.video_key)
    for (const i in itemList) {
      console.log(i)
      const rewardListKey = await rewardDao.videoKey(connection, itemList[i].reward_idx)
      itemList[i].video = await cloudfront.video(rewardListKey.video_key)
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

exports.getDetailReward = async (req) => {
  const connection = await getConnection()
  let result
  try {
    const rewardItem = await rewardDao.rewardDetail(connection, req.params.reward_idx)
    rewardItem.video_key = await cloudfront.video(rewardItem.video_key)
    rewardItem.image_key = await cloudfront.video(rewardItem.image_key)
    result = {
      rewardItem,
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

exports.postRewardFund = async (req, next) => {
  try {
    await rewardDao.rewardFund(Transaction, next, req)
  } catch (e) {
    console.log(e.message)
  }
}

exports.getRewardFund = async (req) => {
  const connection = await getConnection()
  let result
  try {
    const itemList = await rewardDao.getRewardFund(connection, req.params.reward_idx)
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
