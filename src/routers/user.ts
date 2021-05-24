// 用户服务
const userController = require('../controllers/user_controller')
const router_user = require('koa-router')()

router_user.prefix('/user')

router_user.get('/add', userController.add)

module.exports = router_user
