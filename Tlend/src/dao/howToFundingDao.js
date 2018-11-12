
exports.questionFunder = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT questions_idx, question_content FROM QUESTIONS WHERE question_kind = \'투자자\''
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.questionClient = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT questions_idx, question_content FROM QUESTIONS WHERE question_kind = \'신청자\''
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.answer = (connection, question_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT answer_content FROM ANSWER WHERE question_idx = ${question_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}
