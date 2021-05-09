export {}
import { formatTime } from '../utils/timer'
const logUtil = require('../logger/log4Util')
import { checkToken, uncheckToken } from '../configs/system.config'
const tokenCheck = async (ctx: any, next: any, type: number) => {
  if ((checkToken !== true && type !== 1) || uncheckToken) {
    await next()
  } else {
    const url = ctx.url.split('?')[0]
    if (url === '/system/login' || url === '/system/register') {
      await next()
    } else {
      // 获取到token
      const errInfo = '用户未登录或登录已过期'
      const headerToken = ctx.request.headers['authorization'] || ctx.request.headers['token']
      const sessionToken = ctx.session.token
      if (!headerToken) {
        console.log('此处存在token篡改行为，需发警告邮件')
        logUtil.logDanger(ctx, '未携带token请求', formatTime(new Date().getTime()))
        ctx.status = 203
        ctx.body = {
          errMessage: '用户登录信息错误，请重新登录',
        }
        return
      }
      if (headerToken !== sessionToken) {
        console.log('此处存在token篡改行为，需发警告邮件')
        logUtil.logDanger(ctx, 'headerToken与sessionToken不一致', formatTime(new Date().getTime()))
        ctx.status = 203
        ctx.body = {
          errMessage: '用户登录信息错误，请重新登录',
        }
        return
      } else {
        const tokenInfo = ctx.util.token.getToken(headerToken)
        if (!tokenInfo) {
          ctx.status = 203
          ctx.body = {
            errMessage: errInfo,
          }
          return
        } else {
          if (!ctx.request.header['user-agent'] || !ctx.request.headers['hardware']) {
            logUtil.logDanger(ctx, '请求未携带硬件信息', formatTime(new Date().getTime()))
            ctx.status = 203
            ctx.body = {
              errMessage: '用户登录信息错误，请重新登录',
            }
            return
          } else {
            if (ctx.request.header['user-agent'] !== ctx.request.headers['hardware']) {
              console.log('此处存在token篡改行为，需发警告邮件')
              logUtil.logDanger(ctx, '请求硬件信息不一致', formatTime(new Date().getTime()))
              ctx.status = 203
              ctx.body = {
                errMessage: '用户登录信息错误，请重新登录',
              }
              return
            }
          }
          const userId = tokenInfo.userId
          const redisTokenKey = `${userId}_token`
          await ctx.util.redis.redisToken.getString(redisTokenKey).then((res: any) => {
            if (res.dataStatus === 1) {
              const redisToken = res.result
              if (redisToken !== headerToken) {
                console.log('此处存在token篡改行为，需发警告邮件')
                logUtil.logDanger(ctx, 'headerToken与redisToken不一致', formatTime(new Date().getTime()))
                ctx.status = 203
                ctx.body = {
                  errMessage: '用户登录信息错误，请重新登录',
                }
                return
              } else {
                const timeNow = new Date().getTime()
                const overTime = Number(tokenInfo.exp || 0)
                if (timeNow > overTime) {
                  ctx.status = 203
                  ctx.body = {
                    errMessage: '登录信息已过期，请重新登录',
                  }
                  return
                }
              }
            } else {
              ctx.status = 203
              ctx.body = {
                errMessage: errInfo,
              }
              return
            }
          })
        }
      }
      await next()
    }
  }
}
module.exports = tokenCheck
