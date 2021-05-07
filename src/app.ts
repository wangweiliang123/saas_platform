const path = require('path')
const staticPath = path.join(__dirname, '../public') // 静态地址
const viewsPath = path.join(__dirname, '../views') // 模板地址
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const error = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const registerRouter = require('./routers')
import { formatTime } from './utils/timer'

// error handler
error(app)

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
  }
  await next()
})

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
    ctx.util.logger.logConsole(`${ctx.method} ${ctx.url} - ${ctx.exeTime}ms`)
    ctx.util.logger.logResponse(ctx, formatTime(new Date().getTime()))
  }
})

// routes
app.use(registerRouter())

// error-handling
app.on('error', (err: any, ctx: any) => {
  ctx.util.logger.logError(ctx, err, formatTime(new Date().getTime()))
})

module.exports = app
