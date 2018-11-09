const { Router } = require('express')

const home = require('./home')
const stock = require('./stock')
const investment = require('./investment')
const reward = require('./reward')

const router = Router()


/* GET home page. */
router.use('/home', home)
router.use('/stock', stock)
router.use('/investment', investment)
router.use('/reward', reward)


module.exports = router
