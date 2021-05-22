const getTokenInfo = (ctx: any, info: string, type = 1) => {
  if (!ctx) {
    return ''
  }
  if (!info) {
    return ''
  }
  let infoGet = ''
  const headerToken = ctx.request.headers['token'] || ctx.request.headers['authorization']
  if (headerToken) {
    const tokenInfo = ctx.util.token.getToken(headerToken)
    infoGet = tokenInfo[info]
  }
  if (!infoGet && type === 2) {
    infoGet = ctx.session[info]
  }
  return infoGet
}
module.exports = getTokenInfo
