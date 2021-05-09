import { dataCleaning } from '../utils/formatData'
const UserServiceSql = require('../db_sqls/mysql_sql/user_sql')
module.exports = {
  getUserAll: async (ctx: any, format: any) => {
    return new Promise((resolve, reject) => {
      ctx.util
        .mysql(UserServiceSql.getUserAll())
        .then((res: any) => {
          if (format) {
            if (Object.prototype.toString.call(format) === '[object Array]') {
              res.result = dataCleaning(res.result, format)
            }
          }
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  },
}
