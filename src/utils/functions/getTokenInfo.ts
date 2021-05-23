export {}
const getTokenInfo = async (ctx: any, info: any, type = 1) => {
  if (!ctx) {
    return ''
  }
  if (!info) {
    return ''
  }
  let infoGet
  const headerToken = ctx.request.headers['token'] || ctx.request.headers['authorization']
  if (headerToken) {
    const tokenInfo = await ctx.util.token.getToken(headerToken)
    if (typeof info === 'string') {
      infoGet = ''
      infoGet = tokenInfo[info]
    } else if (Object.prototype.toString.call(info) === '[object Array]') {
      infoGet = []
      for (let i = 0; i < info.length; i++) {
        let obj = tokenInfo[info]
        if (!obj && type === 2) {
          obj = ctx.session ? ctx.session[info] || '' : ''
        }
        infoGet.push(obj)
      }
      return infoGet
    }
  }
  if (!infoGet && type === 2) {
    infoGet = ctx.session ? ctx.session[info] || '' : ''
  }
  return infoGet || ''
}
module.exports = getTokenInfo
