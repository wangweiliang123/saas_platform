export {}
const mongoose = require('mongoose')
const mongodbConfig = require('../../configs/mongodb.config')
const logUtil = require('../../logger/log4Util')
import { formatTime } from '../../utils/timer'
const db = mongodbConfig.dbUrl + mongodbConfig.dbName + '?authSource=admin'
mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    poolSize: 5,
  },
  (err: any) => {
    if (err) {
      logUtil.logSql(JSON.stringify(err), '', formatTime(new Date().getTime()))
      logUtil.logError('', err, '', formatTime(new Date().getTime()))
    } else {
      logUtil.logSql('连接MongoDB成功', '', formatTime(new Date().getTime()))
    }
  },
)

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
  logUtil.logSql(`连接MongoDB成功:${db}`, '', formatTime(new Date().getTime()))
})

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err: any) {
  logUtil.logSql(JSON.stringify(err), '', formatTime(new Date().getTime()))
  logUtil.logError('', err, '', formatTime(new Date().getTime()))
})

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
  logUtil.logError('', 'mongodb连接中断', '', formatTime(new Date().getTime()))
})

module.exports = mongoose
