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
