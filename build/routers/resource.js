"use strict";
// 资源服务
var ResourceController = require('../controllers/resource_controller');
var router_resource = require('koa-router')();
router_resource.prefix('/resource');
router_resource.get('/add', ResourceController.add);
module.exports = router_resource;