exports.stockItem = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT stock_title, stock_description, stock_idx FROM STOCK ORDER BY stock_achievement DESC'
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}
exports.investmentItem = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT investment_title, investment_description, investment_idx FROM INVESTMENT ORDER BY investment_achievement DESC'
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

exports.rewardItem = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT reward_title, reward_description, reward_idx FROM REWARD ORDER BY reward_achievement DESC'
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

exports.stockImagePath = (connection, stock_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT image_key FROM IMAGE WHERE stock_idx = ${stock_idx} `
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

exports.rewardImagePath = (connection, reward_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT image_key FROM IMAGE WHERE reward_idx = ${reward_idx} `
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

exports.investmentImagePath = (connection, investment_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT image_key FROM IMAGE WHERE investment_idx = ${investment_idx} `
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}
