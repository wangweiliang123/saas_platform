"use strict";
// 事务审批
const AffairController = require("../controllers/affair_controller");
const router_affair = require('koa-router')();
router_affair.prefix('/affair');
router_affair.get('/add', AffairController.add);
module.exports = router_affair;
