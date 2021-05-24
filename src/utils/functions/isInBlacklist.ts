export {}
const SystemServiceSql = require('../../db_sqls/mysql_sql/system_sql')
const getTokenInfo = require('./getTokenInfo')
const isInBlacklist = async (ctx: any, type = 1, belongOrganization: any, userInfoGet?: Array<string>) => {
  let userInfo = await getTokenInfo(ctx, ['userId', 'userRoleId', 'userOrganizationId'], type)
  if (userInfoGet && userInfoGet.length) {
    userInfo = userInfoGet
  }
  const ipGet = ctx.ip
  if (ipGet) {
    const redis = await ctx.util.redisTool('redisBlacklist')
    if (redis) {
      const resultGet = await redis.getString(ipGet)
      if (resultGet.dataStatus === 1 && resultGet.result) {
        return 1
      }
    } else {
      return 2
    }
  }
  if (userInfo) {
    const userId = userInfo[0]
    const userRoleId = userInfo[1]
    const userOrganizationId = userInfo[2]
    if (userId) {
      const redis = await ctx.util.redisTool('redisBlacklist')
      if (redis) {
        const resultGet = await redis.getString(userId)
        if (resultGet.dataStatus === 1 && resultGet.result) {
          return 1
        }
      } else {
        return 2
      }
    }
    if (userOrganizationId) {
      const redis = await ctx.util.redisTool('redisBlacklist')
      if (redis) {
        const resultGet = await redis.getString(userOrganizationId)
        if (resultGet.dataStatus === 1 && resultGet.result) {
          return 1
        }
      } else {
        return 2
      }
    }
    if (userRoleId) {
      const redis = await ctx.util.redisTool('redisBlacklist')
      if (redis) {
        const resultGet = await redis.getString(userRoleId)
        if (resultGet.dataStatus === 1 && resultGet.result) {
          return 1
        }
      } else {
        return 2
      }
    }
  }
  const sql = SystemServiceSql.getBlackListInfo(
    userInfo[0] || '',
    ipGet || '',
    userInfo[2] || '',
    userInfo[1] || '',
    belongOrganization,
    1,
  )
  await ctx.util
    .mysql(sql)
    .then((res: any) => {
      if (res.dataStatus === 1) {
        if (res.result && res.result.length === 0) {
          return 0
        } else {
          return 1
        }
      } else {
        return 2
      }
    })
    .catch(() => {
      return 2
    })
  return 0
}
module.exports = isInBlacklist
