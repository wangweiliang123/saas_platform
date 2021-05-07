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

// logger
app.use(async (ctx: any, next: any) => {
  const start = new Date().getTime()
  await next()
  const ms: number = new Date().getTime() - start
  ctx.util.logger.logConsole(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(registerRouter())

// error-handling
app.on('error', (err: any, ctx: any) => {
  console.error('server error', err, ctx)
})

module.exports = app
