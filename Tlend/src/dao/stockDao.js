// ***************
// **주식 상품 등록**
// ***************
exports.postStock = (Transaction, data, next, req) => {
  Transaction(async (connection) => {
    const videoData = req.files.video[0]
    const imageData = req.files.image[0]
    console.log(videoData)
    console.log(imageData)
    const Query1 = `
      INSERT INTO
        STOCK(
          stock_title,
          stock_description,
          stock_goalMoney,
          stock_money,
          stock_minMoney,
          stock_schedule,
          stock_comValue,
          stock_repayDate,
          stock_startDate,
          stock_finishDate,
          stock_enterDate)
        VALUES('${data.title}',
         '${data.description}',
          '${data.goalMoney}',
          '${data.price}',
          '${data.minPrice}',
          '${data.schedule}',
          '${data.comValue}',
          '${data.repayDate}',
          '${data.startDate}',
          '${data.finishDate}',
          '${data.enterDate}')`
    await connection.query(Query1)
    const Query2 = `
      SELECT stock_idx FROM STOCK WHERE stock_title = "${data.title}";`
    const stock_idx = await connection.query(Query2)
    const Query3 = `
      INSERT INTO VIDEO
            (stock_idx, video_originalName, video_key, video_location, video_size) 
      VALUES(${stock_idx[0].stock_idx},
            "${videoData.originalname}",
            "${videoData.key}",
            "${videoData.location}",
            "${videoData.size}")
      `
    await connection.query(Query3)
    const Query4 = `
      INSERT INTO IMAGE
            (stock_idx, image_originalName, image_key, image_location, image_size) 
      VALUES(${stock_idx[0].stock_idx},
            "${imageData.originalname}",
            "${imageData.transforms[0].key}",
            "${imageData.transforms[0].location}",
            "${imageData.transforms[0].size}")
      `
    await connection.query(Query4)
    const Query5 = `
      INSERT INTO CATEGORY(stock_idx, category_name) VALUES(${stock_idx[0].stock_idx}, "${data.categoryName}")
      `
    await connection.query(Query5)
    console.log('success')

  }).catch(error => {
    return next(error)
  })
}

// investment item list 가져오기
exports.stockItem = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT stock_title, stock_description,stock_finishDate, stock_achievement, stock_idx FROM STOCK ORDER BY stock_time DESC;'
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

// HOT investment item list 가져오기
exports.hotStockItem = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT stock_title, stock_description,stock_finishDate, stock_achievement as achievement, stock_idx FROM STOCK ORDER BY stock_achievement DESC'
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

exports.videoKey = (connection, stock_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT video_key FROM VIDEO WHERE stock_idx =${stock_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}


exports.stockDetail = (connection, stock_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT 
    b.video_key,
    stock_title,
    stock_description,
    stock_companyName,
    stock_achievement,
    stock_currentMoney,
    stock_goalMoney,
    stock_finishDate,
    stock_money,
    stock_schedule,
    stock_minStock,
    stock_comValue,
    stock_repayDate,
    stock_startDate,
    stock_finishDate,
    stock_enterDate,
    d.fundpoint_text1,
    d.fundpoint_text2,
    d.fundpoint_text3,
    c.image_key
FROM
    FUNDPOINT d
        JOIN
    (IMAGE c
    JOIN (STOCK a
    JOIN VIDEO b USING (stock_idx)) USING (stock_idx)) USING (stock_idx)
WHERE
    stock_idx = ${stock_idx}
ORDER BY stock_startDate DESC`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.stockFund = (Transaction, next, req) => {
  Transaction(async (connection) => {
    const Query1 = `
     SELECT stock_currentMoney FROM STOCK WHERE stock_idx = ${req.params.stock_idx}`
    const currentMoney = await connection.query(Query1)
    const sum = currentMoney[0].stock_currentMoney + Number(req.body.itemPrice)
    const Query2 = `
      UPDATE STOCK SET stock_currentMoney = ${sum} WHERE stock_idx = ${req.params.stock_idx}`
    await connection.query(Query2)
    console.log('success')
  }).catch(error => {
    return next(error)
  })
}

exports.getStockFund = (connection, stock_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT stock_title, stock_minStock, stock_money FROM STOCK WHERE stock_idx = ${stock_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

exports.getStockFundFinish = (connection, stock_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT stock_companyName, stock_enterDate FROM STOCK WHERE stock_idx = ${stock_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}
