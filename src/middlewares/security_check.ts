export {}
import { formatTime } from '../utils/timer'
const sendEmails = require('../email_settings')
const logUtil = require('../logger/log4Util')
const SystemServiceSql = require('../db_sqls/mysql_sql/system_sql')
const addToBlackList = require('../utils/functions/addToBlack')
import { checkSecurity, uncheckSecurity, systemAcceptEmailList, timerList } from '../configs/system.config'
const securityCheck = async (ctx: any, next: any, type: number) => {
  if ((checkSecurity !== true && type !== 1) || uncheckSecurity) {
    await next()
  } else {
    let requestMap = ctx.session.requestMap
    const errInfo = '存在安全风险，系统拒绝访问'
    const ipGet = ctx.ip
    const obj = {
      url: ctx.originalUrl,
      timeStamp: new Date().getTime(),
    }
    if (requestMap && requestMap.length) {
      requestMap.push(obj)
      if (requestMap.length > 6) {
        requestMap.shift()
      }
      const urlList = []
      const timeList = []
      for (let i = 0; i < requestMap.length; i++) {
        urlList.push(requestMap[i].url)
        timeList.push(requestMap[i].timeStamp)
      }
      if (timeList.length > 0 && timeList[timeList.length - 1] - timeList[0] < 1000) {
        let isTrue = false
        let timer = 4
        if (timeList.length > 4) {
          timer = 8
          isTrue = true
          const urlListSet = new Set(urlList)
          if (urlListSet.size <= 1) {
            console.log('此处有强刷接口风险，需发警告邮件,永久拉黑')
            timer = 0
          }
        } else if (timeList.length > 2) {
          isTrue = true
        }
        if (isTrue) {
          console.log('此处有强刷接口风险，需发警告邮件')
          sendEmails(
            systemAcceptEmailList,
            `风险提示：存在强刷接口风险,请求体：${JSON.stringify(ctx.request)},RequestMap:${JSON.stringify(
              requestMap,
            )}，timer:${timer}`,
            '系统报警',
          )
          logUtil.logDanger(ctx, '存在强刷接口风险', formatTime(new Date().getTime()))
          const redis = await ctx.util.redisTool('redisBlacklist')
          if (redis) {
            redis.setString(ipGet, 1, timerList[timer])
          }
          ctx.status = 203
          ctx.body = {
            errMessage: errInfo,
          }
          return
        }
      }
    } else {
      const url = ctx.url.split('?')[0]
      if (url === '/system/login' || url === '/system/register') {
        requestMap = []
        requestMap.push(obj)
        ctx.session.requestMap = requestMap
        await next()
      } else {
        console.log('此处RequestMap为空，需发警告邮件')
        sendEmails(
          systemAcceptEmailList,
          `风险提示：请求未携带RequestMap,请求体：${JSON.stringify(ctx.request)}`,
          '系统报警',
        )
        logUtil.logDanger(ctx, '请求未携带RequestMap', formatTime(new Date().getTime()))
        let userId = ctx.session.userId
        if (!userId) {
          const headerToken = ctx.request.headers['token'] || ctx.request.headers['authorization']
          if (headerToken) {
            const tokenInfo = ctx.util.token.getToken(headerToken)
            userId = tokenInfo.userId
          }
        }
        if (userId) {
          addToBlackList(ctx, 1, [], userId, timerList[6])
          addToBlackList(ctx, 2, [userId])
        } else {
          addToBlackList(ctx, 1, [], ipGet, timerList[6])
          addToBlackList(ctx, 2, ['', ipGet])
        }
        ctx.status = 203
        ctx.body = {
          errMessage: errInfo,
        }
        return
      }
    }
    await next()
  }
}
module.exports = securityCheck
