// 用户服务
const UserController = require('../controllers/user_controller')
const router_user = require('koa-router')()

router_user.prefix('/user')

router_user.post('/add', UserController.add)

module.exports = router_user
