export {}
//加密依赖
const Keygrip = require('keygrip')
//session,cookie加密key
export const appKeys = new Keygrip(['kjasdfjdl56sadfs', 'a4dfa54asdfwasd514'], 'sha256')
// session对象在redis存储的地址名前面添加的前缀
export const sessionRedis = 'appSession'
// 前端储存的session名
export const sessionName = 'sessionForApp'
// 响应警告时间
export const responseWarning = 800
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
export const uncheckToken = true
//全局校验Referer
export const checkReferer = true
//不校验Referer
export const uncheckReferer = true
// 允许的referer
export const refererList = ['localhost', '192.168.']
//系统发送邮箱地址
export const systemSendEmail = '17343133119@163.com'
//系统发送邮箱类型
export const systemSendEmailType = '163'
//系统邮箱授权码
export const systemEmailKey = 'SQLZHHXXZVYRFSEM'
//系统接收邮箱列表
export const systemAcceptEmailList = ['2427028918@qq.com']
// 定时任务
export const schedule = false
