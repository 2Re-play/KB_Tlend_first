const { Router } = require('express')

const home = require('./home')
const stock = require('./stock')

const router = Router()


/* GET home page. */
router.use('/home', home)
router.use('/stock', stock)


module.exports = router
