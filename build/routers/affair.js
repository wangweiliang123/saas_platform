'use strict'
// 事务审批
var AffairController = require('../controllers/affair_controller')
var router_affair = require('koa-router')()
router_affair.prefix('/affair')
router_affair.get('/add', AffairController.add)
module.exports = router_affair
