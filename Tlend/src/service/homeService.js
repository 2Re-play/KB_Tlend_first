const { getConnection } = require('../lib/dbConnection')
const homeDao = require('../dao/homeDao')

// 메인 홈 가져오기
exports.mainHome = async () => {
  const connection = await getConnection()
  let result
  try {
    result = await homeDao.main(connection)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  console.log(result)
  return result
}
