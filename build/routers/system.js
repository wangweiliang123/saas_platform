"use strict";
// 系统服务
var SystemController = require('../controllers/system_controller');
var router_system = require('koa-router')();
router_system.prefix('/system');
router_system.get('/login', SystemController.login);
module.exports = router_system;
