export {}
import { formatTime } from '../utils/timer'
const sendEmails = require('../email_settings')
const logUtil = require('../logger/log4Util')
import { checkReferer, uncheckReferer, refererList, systemAcceptEmailList } from '../configs/system.config'
const refererCheck = async (ctx: any, next: any, type: number) => {
  if ((checkReferer !== true && type !== 1) || uncheckReferer) {
    await next()
  } else {
    const referer = ctx.request.header['referer']
    const errInfo = '非信任的请求环境'
    if (!referer) {
      console.log('此处存在referer篡改行为，需发警告邮件')
      sendEmails(
        systemAcceptEmailList,
        `风险提示：请求未携带referer,请求体：${JSON.stringify(ctx.request)}`,
        '系统报警',
      )
      logUtil.logDanger(ctx, '请求未携带referer', formatTime(new Date().getTime()))
      ctx.status = 203
      ctx.body = {
        errMessage: errInfo,
      }
      return
    } else {
      const refererInfo = referer.split('?')[0]
      let result = false
      for (let i = 0; i < refererList.length; i++) {
        if (refererInfo.indexOf(refererList[i]) !== -1) {
          result = true
          break
        }
      }
      if (!result) {
        console.log('此处存在referer不合法，需发警告邮件')
        sendEmails(systemAcceptEmailList, `风险提示：referer不合法,请求体：${JSON.stringify(ctx.request)}`, '系统报警')
        logUtil.logDanger(ctx, '请求referer不合法', formatTime(new Date().getTime()))
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
module.exports = refererCheck
