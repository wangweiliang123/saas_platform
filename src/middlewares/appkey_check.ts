export {}
import { checkAppkey, uncheckAppkey } from '../configs/system.config'
const appkeyCheck = async (ctx: any, next: any, type: number) => {
  if ((checkAppkey !== true && type !== 1) || uncheckAppkey) {
    await next()
  } else {
    const appKey = ctx.request.headers['appKey']
    const appInfo = ctx.request.headers['appKeyInfo']
    const appKeySet = ctx.request.headers['appKeySet']

    await next()
  }
}
module.exports = appkeyCheck
