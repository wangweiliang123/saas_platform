export {}
import { checkToken, uncheckToken } from '../configs/system.config'
const tokenCheck = async (ctx: any, next: any, type: number) => {
  console.log(55555666)
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
      if (headerToken !== sessionToken) {
        console.log('此处存在token篡改行为，需发警告邮件')
        ctx.throw(203)
        ctx.body.errMessage = '用户登录信息错误，请重新登录'
        return
      } else {
        const tokenInfo = ctx.util.token.getToken(headerToken)
        if (!tokenInfo) {
          ctx.throw(203)
          ctx.body.errMessage = errInfo
          return
        } else {
          if (!ctx.request.header.userAgent || !ctx.request.headers['hardware']) {
            ctx.throw(203)
            ctx.body.errMessage = '用户登录信息错误，请重新登录'
            return
          } else {
            if (ctx.request.header['user-agent'] !== ctx.request.headers['hardware']) {
              console.log('此处存在token篡改行为，需发警告邮件')
              ctx.throw(203)
              ctx.body.errMessage = '用户登录信息错误，请重新登录'
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
                ctx.throw(203)
                ctx.body.errMessage = '用户登录信息错误，请重新登录'
                return
              } else {
                const timeNow = new Date().getTime()
                const overTime = Number(tokenInfo.exp || 0)
                if (timeNow > overTime) {
                  ctx.throw(203)
                  ctx.body.errMessage = '登录信息已过期，请重新登录'
                  return
                }
              }
            } else {
              ctx.throw(203)
              ctx.body.errMessage = errInfo
              return
            }
          })
        }
      }
    }
  }
}
module.exports = tokenCheck