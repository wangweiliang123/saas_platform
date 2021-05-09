export {}
//加密依赖
const Keygrip = require('keygrip')
//session,cookie加密key
export const appKeys = new Keygrip(['kjasdfjdl56sadfs', 'a4dfa54asdfwasd514'], 'sha256')
// session对象在redis存储的地址名前面添加的前缀
export const sessionRedis = 'appSession'
// 前端储存的session名
export const sessionName = 'sessionForApp'
// session过期时间
export const sessionMaxAge = 7 * 24 * 60 * 60 * 1000
// 储存的session的redis数据库
export const redisDatabaseForSession = 10
// token加密串
export const tokenSecret = 'asd5=45as_pdf./}.99adf'
// token过期时间
export const tokenExpiresIn = '7d'
//全局校验token
export const checkToken = true
//不校验token
export const uncheckToken = false