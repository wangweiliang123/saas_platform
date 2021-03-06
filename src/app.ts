const path = require('path')
const staticPath = path.join(__dirname, '../public') // 静态地址
const viewsPath = path.join(__dirname, '../views') // 模板地
const cors = require('koa2-cors') // CORS是一个W3C标准，全称是"跨域资源共享"
const Koa = require('koa')
const app = new Koa({
  proxy: true,
  proxyIpHeader: 'X-Real-IP',
})
const views = require('koa-views')
const json = require('koa-json')
const error = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const registerRouter = require('./routers')
const session = require('koa-generic-session')
const RedisGet = require('koa-redis')
const RedisConfig = require('./configs/redis.config')
const securityCheck = require('./middlewares/security_check')
const refererCheck = require('./middlewares/referer_check')
const tokenCheck = require('./middlewares/token_check')
const appkeyCheck = require('./middlewares/appkey_check')
const blacklistCheck = require('./middlewares/blacklist_check')
const schedules = require('./schedules')
import { formatTime } from './utils/timer'
import {
  appKeys,
  sessionRedis,
  sessionName,
  redisDatabaseForSession,
  sessionMaxAge,
  responseWarning,
} from './configs/system.config'

//设置系统参数
app.keys = appKeys
// error handler
error(app)

//允许跨域
app.use(
  cors({
    exposeHeaders: ['appKey', 'appKeyInfo', 'appKeySet', 'token'], //设置获取其他自定义字段
  }),
)

// middlewares
/*
 通过一个中间件，把所有的工具关联起来
*/
app.use(async (ctx: any, next: any) => {
  //挂载到util中
  ctx.util = {
    mysql: require('./db_operation/mysql'),
    mongo: require('./db_operation/mongodb'),
    logger: require('./logger/log4Util'),
    redisTool: require('./db_operation/redis'),
    token: require('./token_settings'),
  }
  await next()
})

//设置Session
app.use(
  session({
    prefix: sessionRedis, // 给session对象在redis存储的地址名前面添加的前缀内容
    HttpOnly: true,
    key: sessionName, // key名
    cookie: {
      maxAge: sessionMaxAge,
    },
    store: new RedisGet({
      port: RedisConfig.port,
      host: RedisConfig.host,
      password: RedisConfig.password,
      db: redisDatabaseForSession,
    }), // 在Redis中放入一个session对象
  }),
)

app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  }),
)
app.use(json())
app.use(require('koa-static')(staticPath))

app.use(
  views(viewsPath, {
    extension: 'pug',
  }),
)

// logger及字段封装
app.use(async (ctx: any, next: any) => {
  ctx.util.logger.logRequest(ctx, formatTime(new Date().getTime()))
  const start = new Date().getTime()
  ctx.startTime = start
  await next()
  ctx.endTime = new Date().getTime()
  ctx.exeTime = ctx.endTime - ctx.startTime
  //封装固定字段
  if (ctx.body) {
    ctx.body.statusCode = ctx.status
    ctx.body.startTime = ctx.startTime
    ctx.body.endTime = ctx.endTime
    ctx.body.exeTime = ctx.exeTime
    if (responseWarning && ctx.body.exeTime > parseInt(String(responseWarning))) {
      ctx.util.logger.logWarning('系统警告：相应时间过长', ctx, formatTime(new Date().getTime()))
    }
    if (ctx.body.dataStatus === undefined) {
      ctx.body.dataStatus = ''
    }
    if (ctx.body.errInfo === undefined) {
      ctx.body.errInfo = ''
    }
    if (ctx.body.errMessage === undefined) {
      ctx.body.errMessage = ''
    }
    if (ctx.body.successMessage === undefined) {
      ctx.body.successMessage = ''
    }
    if (ctx.body.result === undefined) {
      ctx.body.result = ''
    }
  }
  ctx.util.logger.logConsole(`${ctx.method} ${ctx.url} - ${ctx.exeTime}ms`)
  ctx.util.logger.logResponse(ctx, formatTime(new Date().getTime()))
})

//appkey校验
app.use(appkeyCheck)

//校验黑名单
app.use(blacklistCheck)

//安全检验
app.use(securityCheck)

//referer检查
app.use(refererCheck)

//token检查
app.use(tokenCheck)

// routes
app.use(registerRouter())

// error-handling
app.on('error', (err: any, ctx: any) => {
  ctx.util.logger.logError(ctx, err, formatTime(new Date().getTime()))
})

//定时任务
schedules()

module.exports = app
