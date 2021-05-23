export {}
const SystemServiceSql = require('../../db_sqls/mysql_sql/system_sql')
const getTokenInfo = require('./getTokenInfo')
const isInBlacklist = async (ctx: any, type = 1) => {
  const result = 0
  const userInfo = await getTokenInfo(ctx, ['userId', 'userRoleId', 'userOrganizationId'], type)
  if (!userInfo) {
    return result
  } else {
    return 1
  }
}
module.exports = isInBlacklist
