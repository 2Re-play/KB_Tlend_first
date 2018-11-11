// ***************
// **주식 상품 등록**
// ***************
exports.postReward = (Transaction, data, next, req) => {
  Transaction(async (connection) => {
    const videoData = req.files.video[0]
    const imageData = req.files.image[0]
    console.log(videoData)
    console.log(imageData)
    const Query1 = `
      INSERT INTO
        REWARD(
          reward_title,
          reward_description,
          reward_goalMoney,
          reward_startDate,
          reward_finishDate,
          reward_itemPrice,
          reward_itemlist)
        VALUES('${data.title}',
         '${data.description}',
          ${data.goalMoney},
          '${data.startDate}',
          '${data.finishDate}',
          ${data.itemPrice},
          '${data.itemlist}')`
    await connection.query(Query1)
    const Query2 = `
      SELECT reward_idx FROM REWARD WHERE reward_title = "${data.title}";`
    const reward_idx = await connection.query(Query2)
    const Query3 = `
      INSERT INTO VIDEO
            (reward_idx, video_originalName, video_key, video_location, video_size) 
      VALUES(${reward_idx[0].reward_idx},
            "${videoData.originalname}",
            "${videoData.key}",
            "${videoData.location}",
            "${videoData.size}")
      `
    await connection.query(Query3)
    const Query4 = `
      INSERT INTO IMAGE
            (reward_idx, image_originalName, image_key, image_location, image_size) 
      VALUES(${reward_idx[0].reward_idx},
            "${imageData.originalname}",
            "${imageData.transforms[0].key}",
            "${imageData.transforms[0].location}",
            "${imageData.transforms[0].size}")
      `
    await connection.query(Query4)
    const Query5 = `
      INSERT INTO CATEGORY(reward_idx, category_name) VALUES(${reward_idx[0].reward_idx}, "${data.categoryName}")
      `
    await connection.query(Query5)
    console.log('success')

  }).catch(error => {
    return next(error)
  })
}
// investment item list 가져오기
exports.rewardItem = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT reward_title, reward_description,reward_finishDate, reward_achievement, reward_idx FROM Tlend.REWARD ORDER BY reward_time DESC'
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

// HOT investment item list 가져오기
exports.hotRewardItem = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT reward_title, reward_description,reward_finishDate, reward_achievement, reward_idx FROM Tlend.REWARD ORDER BY reward_achievement DESC'
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

exports.videoKey = (connection, reward_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT video_key FROM VIDEO WHERE reward_idx =${reward_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.rewardDetail = (connection, reward_idx) => {
  return new Promise((resolve, reject) => {
    console.log(reward_idx)
    const Query = `SELECT 
    b.video_key,
    reward_title,
    reward_description,
    reward_companyName,
    reward_achievement,
    reward_currentMoney,
    reward_goalMoney,
    reward_finishDate,
    reward_itemPrice,
    reward_itemlist,
    reward_startDate,
    reward_finishDate,
    c.image_key
FROM
    IMAGE c
    JOIN (REWARD a
    JOIN VIDEO b USING (reward_idx)) USING (reward_idx)
WHERE
    reward_idx = ${reward_idx}
ORDER BY reward_startDate DESC`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.rewardFund = (Transaction, next, req) => {
  Transaction(async (connection) => {
    const Query1 = `
     SELECT reward_currentMoney FROM REWARD WHERE reward_idx = ${req.params.reward_idx}`
    const currentMoney = await connection.query(Query1)
    const sum = currentMoney[0].reward_currentMoney + Number(req.body.itemPrice)
    const Query2 = `
      UPDATE REWARD SET reward_currentMoney = ${sum} WHERE reward_idx = ${req.params.reward_idx}`
    await connection.query(Query2)
    console.log('success')
  }).catch(error => {
    return next(error)
  })
}

exports.getRewardFund = (connection, reward_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT reward_title, reward_itemPrice FROM REWARD WHERE reward_idx = ${reward_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}
