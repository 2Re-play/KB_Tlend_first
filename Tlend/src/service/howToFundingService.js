const { getConnection } = require('../lib/dbConnection')
const htfDao = require('../dao/howToFundingDao')


// 메인 홈 가져오기
exports.getQuestion = async () => {
  const connection = await getConnection()
  let info
  try {
    const funder = await htfDao.questionFunder(connection)
    const client = await htfDao.questionClient(connection)
    info = {
      funder,
      client,
    }
    console.log(info)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  console.log(info)
  return info
}

exports.getAnswer = async (req) => {
  const connection = await getConnection()
  let answer
  try {
    answer = await htfDao.answer(connection, req.params.question_idx)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  console.log(answer)
  return answer
}
