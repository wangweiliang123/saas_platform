'use strict'
//封装mysql
const MysqlSettings = require('../configs/mysql.config')
const mysql = require('mysql')
let pools = {} //连接池
let mysql_query = (sql, host = '127.0.0.1') => {
  if (!pools.hasOwnProperty(host)) {
    //是否存在连接池
    pools[host] = mysql.createPool(
      MysqlSettings, //不存在创建
    )
  }
  return new Promise((resolve, reject) => {
    pools[host].getConnection((err, connection) => {
      if (err) {
        return reject({
          errInfo: err,
          errMessage: '数据库连接失败',
        })
      } else
        connection.query(sql, (err, results) => {
          connection.release() //释放连接资源
          if (err) {
            return reject({
              dataStatus: 0,
              errInfo: err,
              errMessage: '执行数据库操作失败',
            })
          } else {
            resolve({
              dataStatus: 1,
              result: JSON.parse(JSON.stringify(results)),
            })
          }
        })
    })
  })
}
module.exports = mysql_query
