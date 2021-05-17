'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var mongoose = require('mongoose')
var mongodbConfig = require('../../configs/mongodb.config')
var logUtil = require('../../logger/log4Util')
var timer_1 = require('../../utils/timer')
var db = mongodbConfig.dbUrl + mongodbConfig.dbName + '?authSource=admin'
mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    poolSize: 5,
  },
  function (err) {
    if (err) {
      logUtil.logSql(JSON.stringify(err), '', timer_1.formatTime(new Date().getTime()))
      logUtil.logError('', err, '', timer_1.formatTime(new Date().getTime()))
    } else {
      logUtil.logSql('连接MongoDB成功', '', timer_1.formatTime(new Date().getTime()))
    }
  },
)
/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
  logUtil.logSql('\u8FDE\u63A5MongoDB\u6210\u529F:' + db, '', timer_1.formatTime(new Date().getTime()))
})
/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
  logUtil.logSql(JSON.stringify(err), '', timer_1.formatTime(new Date().getTime()))
  logUtil.logError('', err, '', timer_1.formatTime(new Date().getTime()))
})
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
  logUtil.logError('', 'mongodb连接中断', '', timer_1.formatTime(new Date().getTime()))
})
module.exports = mongoose
