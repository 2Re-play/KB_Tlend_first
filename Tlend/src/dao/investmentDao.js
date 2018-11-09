// ***************
// **주식 상품 등록**
// ***************
exports.postInvestment = (Transaction, data, next, req) => {
  Transaction(async (connection) => {
    const videoData = req.files.video[0]
    const imageData = req.files.image[0]
    console.log(videoData)
    console.log(imageData)
    const Query1 = `INSERT INTO
         INVESTMENT(
            investment_title,
            investment_description,
            investment_goalMoney,
            investment_accountMoney,
            investment_minMoney,
            investment_schedule,
            investment_dueDate,
            investment_dueMonth,
            investment_startDate,
            investment_finishDate,
            investment_enterDate
            investment_interestRate)
          VALUES(
         "${data.title}",
         "${data.description}",
          ${data.goalMoney},
          ${data.accountPrice},
          ${data.minPrice},
          "${data.schedule}",
          "${data.dueDate}",
          "${data.dueMonth}",
          "${data.startDate}",
          "${data.finishDate}",
          "${data.enterDate}"
           ${data.interstRate}
          )`
    await connection.query(Query1)
    const Query2 = `
      SELECT investment_idx FROM INVESTMENT WHERE investment_title = "${data.title}";`
    const investment_idx = await connection.query(Query2)
    const Query3 = `
      INSERT INTO VIDEO
            (investment_idx, video_originalName, video_key, video_location, video_size) 
      VALUES(${investment_idx[0].investment_idx},
            "${videoData.originalname}",
            "${videoData.key}",
            "${videoData.location}",
            "${videoData.size}")
      `
    await connection.query(Query3)
    const Query4 = `
      INSERT INTO IMAGE
            (investment_idx, image_originalName, image_key, image_location, image_size) 
      VALUES(${investment_idx[0].investment_idx},
            "${imageData.originalname}",
            "${imageData.transforms[0].key}",
            "${imageData.transforms[0].location}",
            "${imageData.transforms[0].size}")
        `
    await connection.query(Query4)
    const Query5 = `
        INSERT INTO CATEGORY(investment_idx, category_name) VALUES(${investment_idx[0].investment_idx}, "${data.categoryName}")
        `
    await connection.query(Query5)
    const Query6 = `
        INSERT INTO FUNDPOINT(investment_idx, fundpoint_text1, fundpoint_text2, fundpoint_text3) VALUES(${investment_idx[0].investment_idx}, "${data.fundPoint1}", "${data.fundPoint2}", "${data.fundPoint3}")
        `
    await connection.query(Query6)

    console.log('success')

  }).catch(error => {
    return next(error)
  })
}
// investment item list 가져오기
exports.investmentItem = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT investment_title, investment_description,investment_finishDate, investment_achievement, investment_idx FROM Tlend.INVESTMENT ORDER BY investment_time DESC;'
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

// HOT investment item list 가져오기
exports.hotInvestmentItem = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT investment_title, investment_description,investment_finishDate, investment_achievement, investment_idx FROM Tlend.INVESTMENT ORDER BY investment_achievement DESC'
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

exports.videoKey = (connection, investment_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT video_key FROM VIDEO WHERE investment_idx =${investment_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}
