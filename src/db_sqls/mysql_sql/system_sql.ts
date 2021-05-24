import { randomString } from '../../utils/system'
import { prefixList } from '../../configs/system.config'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { BlackList } = require('../../models/mysql_models/blacklist_model')
import { formatTime } from '../../utils/timer'
module.exports = {
  // 添加进黑名单
  addToBlack: (
    userId: any,
    roleId: any,
    organizationId: any,
    belongOrganization: any,
    type: any,
    userGetId: any,
    ip: string,
    organizationGetId: any,
    roleGetId: any,
  ) => {
    if (!userId || !roleId || !organizationId || !type) {
      return ''
    }
    if (!userGetId && !ip && !organizationGetId && !roleGetId) {
      return ''
    }
    const singleId = randomString(prefixList.data)
    const sql = `INSERT INTO blacklist (create_date,unique_id,creater_id,creater_role_id,creater_organization_id,belong_organization,type${
      ip ? ',ip' : ''
    }${userGetId ? ',user_id' : ''}${organizationGetId ? ',organization_id' : ''}${
      roleGetId ? ',role_id' : ''
    }) VALUES ('${formatTime(
      new Date().getTime(),
    )}', '${singleId}',${userId},${roleId},${organizationId},'${belongOrganization}',${type}${ip ? `,'${ip}'` : ''}${
      userGetId ? `,${userGetId}` : ''
    }${organizationGetId ? `,${organizationGetId}` : ''}${roleGetId ? `,${roleGetId}` : ''} )`
    return sql
  },
  //查询黑名单
  getBlackListInfo: (
    userId: any,
    ipGet: any,
    userOrganizationId: any,
    userRoleId: any,
    organization: any,
    type = 1,
  ) => {
    if (!userId && !ipGet && !userOrganizationId && !userRoleId) {
      return ''
    }
    const sql = `select user_id,role_id,organization_id,ip from blacklist where (${
      userId ? `user_id = ${userId}` : ''
    } ${userRoleId ? (userId ? ` or role_id = ${userRoleId}` : ` role_id = ${userRoleId}`) : ''} ${
      userOrganizationId
        ? userId || userRoleId
          ? ` or organization_id = ${userOrganizationId}`
          : ` organization_id = ${userOrganizationId}`
        : ''
    } ${
      ipGet ? (userId || userRoleId || userRoleId ? ` or ip = '${ipGet}'` : ` ip = '${ipGet}'`) : ''
    } ) and is_delete = 0 ${
      organization
        ? type === 2
          ? ` and belong_organization_id LIKE '${organization}'%`
          : ` and belong_organization_id = '${organization}'`
        : ''
    }`
    return sql
  },
}
