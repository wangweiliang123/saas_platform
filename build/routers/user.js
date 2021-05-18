"use strict";
// 用户服务
var UserController = require('../controllers/user_controller');
var router_user = require('koa-router')();
router_user.prefix('/user');
router_user.get('/add', UserController.add);
module.exports = router_user;
