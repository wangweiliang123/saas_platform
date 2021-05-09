'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var timer_1 = require('../utils/timer')
var MysqlSettings = require('../configs/mysql.config')
var logUtil = require('../logger/log4Util')
var mysql = require('mysql')
var pools = {} //连接池
var mysql_query = function (sql, host) {
  if (host === void 0) {
    host = '127.0.0.1'
  }
  if (!pools.hasOwnProperty(host)) {
    //是否存在连接池
    pools[host] = mysql.createPool(MysqlSettings)
  }
  return new Promise(function (resolve, reject) {
    pools[host].getConnection(function (err, connection) {
      //初始化连接池
      if (err) {
        logUtil.logSql(JSON.stringify(err), '', timer_1.formatTime(new Date().getTime()))
        return reject({
          dataStatus: 0,
          errInfo: err,
          errMessage: '数据库连接失败',
          successMessage: '',
          result: [],
        })
      } else
        connection.query(sql, function (err, results) {
          //去数据库查询数据
          connection.release() //释放连接资源
          if (err) {
            logUtil.logSql(JSON.stringify(err), '', timer_1.formatTime(new Date().getTime()))
            return reject({
              dataStatus: 0,
              errInfo: err,
              errMessage: '执行数据库操作失败',
              result: [],
              successMessage: '',
            })
          } else {
            logUtil.logSql(JSON.stringify(sql), '', timer_1.formatTime(new Date().getTime()))
            resolve({
              dataStatus: 1,
              result: JSON.parse(JSON.stringify(results)),
              errInfo: '',
              errMessage: '',
              successMessage: '执行数据库操作成功',
            })
          }
        })
    })
  })
}
module.exports = mysql_query
