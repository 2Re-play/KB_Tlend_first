exports.main = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT investment_title FROM INVESTMENT'
    connection.query(Query, (err, result) => {
      err && reject(err)
      console.log(result)
      resolve(result)
    })
  })
}
