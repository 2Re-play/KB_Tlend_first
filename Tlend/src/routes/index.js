const { Router } = require('express')

const home = require('./home')
const stock = require('./stock')
const investment = require('./investment')

const router = Router()


/* GET home page. */
router.use('/home', home)
router.use('/stock', stock)
router.use('/investment', investment)


module.exports = router
