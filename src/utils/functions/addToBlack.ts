export {}
const SystemServiceSql = require('../../db_sqls/mysql_sql/system_sql')
const getTokenInfo = require('./getTokenInfo')
import { systemUserId, systemRoleId, systemOrganizationId } from '../../configs/system.config'
const addToBlackList = async (
  ctx: any,
  type: number,
  belongOrganization: any,
  parameterList: Array<any>,
  redisName: any,
  overTime: any,
) => {
  return new Promise(async (resolve, reject) => {
    let parameterListGet = []
    if (type === 2) {
      parameterListGet = [systemUserId, systemRoleId, systemOrganizationId, 1].concat(parameterList)
    } else if (type === 4) {
      const userId = getTokenInfo(ctx, 'userId', 2)
      if (!userId) {
        reject({
          result: 0,
          errInfo: '获取用户信息失败',
        })
        return
      }
      parameterListGet = [
        getTokenInfo(ctx, 'userId', 2),
        getTokenInfo(ctx, 'userRoleId', 2),
        getTokenInfo(ctx, 'userOrganizationId', 2),
        2,
      ].concat(parameterList)
    }
    if (type === 1 || type === 3) {
      let status = 1
      if (type === 3) {
        status = 2
      }
      const redis = await ctx.util.redisTool('redisBlacklist')
      if (redis) {
        if (redisName) {
          const resultGet = await redis.setString(redisName, status, parseInt(overTime))
          if (resultGet.dataStatus === 1) {
            reject({
              result: 1,
              successInfo: 'Redis写入成功',
            })
            return
          } else {
            reject({
              result: 0,
              errInfo: 'Redis写入失败',
            })
            return
          }
        } else {
          reject({
            result: 0,
            errInfo: '缺少redis储存名',
          })
          return
        }
      } else {
        reject({
          result: 0,
          errInfo: '加入redis失败',
        })
        return
      }
    } else if (type === 2 || type === 4) {
      if (!parameterList || !parameterList.length) {
        reject({
          result: 0,
          errInfo: '调用参数错误，parameterList不能为空',
        })
        return
      }
      const sql = SystemServiceSql.addToBlack(
        parameterListGet[0],
        parameterListGet[1],
        parameterListGet[2],
        belongOrganization,
        parameterListGet[3],
        parameterListGet[4],
        parameterListGet[5],
        parameterListGet[6],
        parameterListGet[7],
      )
      ctx.util
        .mysql(sql)
        .then((res: any) => {
          resolve(res)
          return
        })
        .catch((err: any) => {
          reject(err)
        })
      return
    }
    reject({
      result: 0,
      errInfo: '调用参数，type错误，只支持1、2、3、4',
    })
  })
}
module.exports = addToBlackList
