import { randomString } from '../../utils/system'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { BlackList } = require('../../models/mysql_models/blacklist_model')
import { formatTime } from '../../utils/timer'
module.exports = {
  addToBlack: (
    userId: number,
    roleId: number,
    organizationId: number,
    type: number,
    userGetId: number,
    ip: string,
    organizationGetId: number,
    roleGetId: number,
  ) => {
    const singleId = randomString()
    const sql = `INSERT INTO blacklist (create_date,unique_id,creater_id,creater_role_id,creater_organization_id,type${
      ip ? ',ip' : ''
    }${userGetId ? ',user_id' : ''}${organizationGetId ? ',organization_id' : ''}${
      roleGetId ? ',role_id' : ''
    }) VALUES ('${formatTime(new Date().getTime())}', '${singleId}',${userId},${roleId},${organizationId},${type}${
      ip ? `,'${ip}'` : ''
    }${userGetId ? `,${userGetId}` : ''}${organizationGetId ? `,${organizationGetId}` : ''}${
      roleGetId ? `,${roleGetId}` : ''
    } )`
    return sql
  },
}
