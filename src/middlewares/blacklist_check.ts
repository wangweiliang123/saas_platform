export {}
const isInBlacklist = require('../utils/functions/isInBlacklist')
import { checkInBlackList, uncheckInBlackList } from '../configs/system.config'
const blacklistCheck = async (ctx: any, next: any, type: number) => {
  if ((checkInBlackList !== true && type !== 1) || uncheckInBlackList) {
    await next()
  } else {
    const result = await isInBlacklist(ctx, 2)
    if (result === 1) {
      ctx.status = 203
      ctx.body = {
        errMessage: '该账户已被拉黑，系统拒绝请求',
      }
      return
    }
    await next()
  }
}
module.exports = blacklistCheck
