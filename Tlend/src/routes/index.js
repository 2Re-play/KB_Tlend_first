const { Router } = require('express')

const home = require('./home')
const stock = require('./stock')
const investment = require('./investment')
const reward = require('./reward')
const search = require('./search')

const router = Router()


/* GET home page. */
router.use('/home', home)
router.use('/stock', stock)
router.use('/investment', investment)
router.use('/reward', reward)
router.use('/search', search)


module.exports = router
