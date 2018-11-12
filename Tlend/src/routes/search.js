const { Router } = require('express')

const searchCtrl = require('../controller/searchController')

const search = Router()

/* GET home page. */
search.get('/investment', searchCtrl.getSearchInvestment)
search.get('/reward', searchCtrl.getSearchReward)


module.exports = search
