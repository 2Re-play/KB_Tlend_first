const { Router } = require('express')

const stockCtrl = require('../controller/stockController')

const stock = Router()

/* GET home page. */
stock.post('/', stockCtrl.postStock)


module.exports = stock
