// ***************
// **주식 상품 등록**
// ***************
exports.postStock = (Transaction, data, next) => {
  Transaction(async (connection) => {
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
          '${data.goalmoney}',
          '${data.price}',
          '${data.minMoney}',
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
    console.log('어람ㄴ어라님어라ㅣ언ㅁㄹ', stock_idx)
    const Query3 = `
      INSERT INTO VIDEO(stock_idx, video_name) VALUES(${stock_idx[0].stock_idx},"${data.videoName}")
      `
    await connection.query(Query3)
    const Query4 = `
      INSERT INTO IMAGE(stock_idx, image_name) VALUES(${stock_idx[0].stock_idx}, "${data.imageName}")
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
