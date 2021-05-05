"use strict";
// 系统服务
const SystemController = require("../controllers/system_controller");
const router_system = require('koa-router')();
router_system.prefix('/system');
router_system.get('/login', SystemController.login);
module.exports = router_system;
