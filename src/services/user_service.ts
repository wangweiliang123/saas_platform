const UserServiceSql = require("../db_sqls/mysql_sql/user_sql")
module.exports = {
    getUserAll:async (ctx:any, next:any)=>{
        return new Promise((resolve, reject)=>{
            ctx.util.mysql(UserServiceSql.getUserAll()).then((res:any)=>{
                resolve(res)
            }).catch((err:any)=>{
                reject(err)
            })
        })
    }
}