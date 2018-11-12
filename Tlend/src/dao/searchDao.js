// 검색 투자상품 정렬
exports.getSearchInvestment = (connection, query) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT investment_title, investment_description, investment_achievement, investment_idx, investment_finishDate, investment_startDate FROM INVESTMENT WHERE investment_title LIKE '%${query}%'`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

// 검색 주식상품 정렬
exports.getSearchStock = (connection, query) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT stock_title, stock_description, stock_achievement, stock_idx, stock_finishDate, stock_startDate FROM STOCK WHERE stock_title LIKE '%${query}%' `
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

// 검색 리워드 상품 정렬
exports.getSearchReward = (connection, query) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT reward_title, reward_description, reward_achievement, reward_idx, reward_finishDate, reward_startDate FROM REWARD WHERE reward_title LIKE '%${query}%'`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
// 투자상품 비디오 키
exports.investmentVideoKey = (connection, investment_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT video_key FROM VIDEO WHERE investment_idx =${investment_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

// 주식상품 비디오 키
exports.stockVideoKey = (connection, stock_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT video_key FROM VIDEO WHERE stock_idx =${stock_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

// 리워드상품 비디오 키
exports.rewardVideoKey = (connection, reward_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT video_key FROM VIDEO WHERE reward_idx =${reward_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}
