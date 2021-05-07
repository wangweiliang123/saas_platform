//封装mysql
export {}
import {formatTime} from "../utils/timer"
const MysqlSettings = require('../configs/mysql.config')
const logUtil = require('../logger/log4Util')
const mysql = require('mysql')
const pools: any = {} //连接池
const mysql_query = (sql: string, host = '127.0.0.1') => {
  if (!pools.hasOwnProperty(host)) {
    //是否存在连接池
    pools[host] = mysql.createPool(
      MysqlSettings, //不存在创建
    )
  }
  return new Promise((resolve, reject) => {
    pools[host].getConnection((err: any, connection: any) => {
      //初始化连接池
      if (err) {
        logUtil.logSql(JSON.stringify(err),'',formatTime(new Date().getTime()))
        return reject({
          dataStatus: 0,
          errInfo: err,
          errMessage: '数据库连接失败',
          successMessage: '',
          result: [],
        })
      } else
        connection.query(sql, (err: any, results: any) => {
          //去数据库查询数据
          connection.release() //释放连接资源
          if (err) {
            logUtil.logSql(JSON.stringify(err),'',formatTime(new Date().getTime()))
            return reject({
              dataStatus: 0,
              errInfo: err,
              errMessage: '执行数据库操作失败',
              result: [],
              successMessage: '',
            })
          } else {
            logUtil.logSql(JSON.stringify(sql),'',formatTime(new Date().getTime()))
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
